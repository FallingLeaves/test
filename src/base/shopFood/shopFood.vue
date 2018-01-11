<template>
  <div>
    <div class="view">
      <scroll :data="foodList"
              class="food-item" 
              ref="itemScroll">
        <div>
          <ul>
            <li v-for="(item, index) in foodList" 
                :key="index" 
                :class="{active:currentIndex==index}"
                @click="select(index)"
                >
                {{item.name}}<span v-show="categoryNum[index].num>0">{{categoryNum[index].num}}</span>
            </li>
          </ul>
        </div>
      </scroll>
      <scroll :data="foodList" 
              :listenScroll="listenScroll"
              @scroll="scroll" 
              class="food-list" 
              ref="listScroll">
        <div>
          <section v-for="(item, index) in foodList" :key="index" ref="foodList">
            <header>{{item.name}}<span>{{item.description}}</span></header>
            <ul>
              <li v-for="(food, index) in item.foods" :key="index" :class="{newFood:food.attributes.length&&food.attributes[0].icon_name=='新'}">
                <img v-lazy="SHOP_IMG_BASE_PATH+food.image_path" alt="">
                <div>
                  <header>
                    <div>{{food.name}}</div>
                    <div v-if="food.attributes.length&&food.attributes[0].icon_name=='招牌'" :style="{color: `#${food.attributes[0].icon_color}`, border: `1px solid #${food.attributes[0].icon_color}`}">{{food.attributes[0].icon_name}}</div>
                  </header>
                  <div>{{food.description}}</div>
                  <div>
                    月售{{food.month_sales}}份  好评率{{food.satisfy_rate}}%
                  </div>
                  <div v-if="food.activity" :style="{color: `#${food.activity.image_text_color}`, border: `1px solid #${food.activity.icon_color}`}" class="activity">
                    {{food.activity.image_text}}
                  </div>
                  <div class="buy">
                    <div>
                      <span>￥</span><span>{{food.specfoods[0].price}}</span>
                    </div>
                    <div v-if="!food.specifications.length">
                      <!-- <img src="src/assets/img/add.svg" alt=""> -->
                      <buy :restaurant_id="food.restaurant_id" 
                           :food_id="food.specfoods[0].food_id"
                           :food_name="food.specfoods[0].name"
                           :specs="food.specfoods[0].specs_name"
                           :price="food.specfoods[0].price"
                           :category_id="food.category_id"
                           :category="item.name"
                           :packing_fee="food.specfoods[0].packing_fee"
                           :stock="food.specfoods[0].stock"
                           @shopping="shopping"></buy>
                    </div>
                    <div v-if="food.specifications.length" class="size" @click="chooseSPEC(food, item.name, food.restaurant_id)">
                      选规格
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </scroll>
    </div>
    <div v-show="show" class="show-SPEC">
      <section v-if="specfood">
        <div>
          <header>
            {{specfood.name}}
            <img src="src/assets/img/close.svg" alt="" @click="close">
          </header>
          <div class="info">
            <p>规格</p>
            <ul>
              <li v-for="(item, index) in specfood.specfoods" 
                  :key="index" 
                  :class="{active:index==specIndex}"
                  @click="specIndex=index">
                {{item.specs_name}}
              </li>
            </ul>
          </div>
        </div>
        <footer>
          <div>
            ￥<span v-if="specfood.specfoods">{{specfood.specfoods[specIndex].price}}</span>
          </div>
          <buy  v-if="specfood.specfoods"
                :restaurant_id="specfood.restaurant_id" 
                :food_id="specfood.specfoods[specIndex].food_id"
                :food_name="specfood.name"
                :specs="specfood.specfoods[specIndex].specs_name"
                :price="specfood.specfoods[specIndex].price"
                :category_id="specfood.category_id"
                :category="specfood.category"
                :packing_fee="specfood.specfoods[specIndex].packing_fee"
                :stock="specfood.specfoods[specIndex].stock"
                @shopping="shopping"></buy>
        </footer>
      </section>
    </div>
    <footer class="buycart">
      <div>
        <div class="img">
          <img src="src/assets/img/nobuy.svg" alt="" v-if="!currentShopBuyFood.length">
          <img src="src/assets/img/isbuy.svg" alt="" v-if="currentShopBuyFood.length">
        </div>
        <p>¥{{total.toFixed(2)}}</p>
        <div>配送费¥{{float_delivery_fee}}</div>
      </div>
      <div>
        <div v-if="min_packing_fee-total-total > 0">还差¥{{min_packing_fee-total-total}}起送</div>
        <div v-if="min_packing_fee-total-total <= 0" class="pay">去结算</div>
      </div>
      <!-- <section>
        <ul>
          <li v-for="item in buycart"></li>
        </ul>
      </section> -->
    </footer>
  </div>
</template>

<script>
import Scroll from "@/base/scroll/scroll"
import Buy from "@/base/buy/buy"
import { foodList } from "@/config/getData"
import { getStore } from "@/config/mUtil"
import { mapGetters } from "vuex"
import Bus from "@/config/bus"
export default {
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      SHOP_IMG_BASE_PATH: "http://cangdu.org:8001/img/",
      foodList: [],
      currentIndex: 0,
      listenScroll: true,
      scrollY: 0,
      listHeight: [],
      categoryNum: [],
      currentShopBuyFood: [],
      specfood: {},
      specIndex: 0,
      show: false,
      min_packing_fee: 0, //多少起送
      float_delivery_fee: 0, //配送费
      total: 0,
      buycart: []
    }
  },
  computed: {
    ...mapGetters(["buyFoodList"])
  },
  created() {
    this.getFoodList()
    this.getFee()
    // Bus.$on("packingFee", obj => {
    //   this.min_packing_fee = obj.min_packing_fee
    //   this.float_delivery_fee = obj.float_delivery_fee
    // })
  },
  mounted() {
    // this.initCategoryNum()
  },
  beforeDestroy() {
    // Bus.$off("packingFee", this.myhandle)
  },
  methods: {
    getFee() {
      // console.log(this.$route.query)
      this.min_packing_fee = parseInt(this.$route.query.min_packing_fee)
      this.float_delivery_fee = parseInt(this.$route.query.float_delivery_fee)
    },
    test() {
      let sum = 0
      this.buycart = []
      this.currentShopBuyFood.forEach(v1 => {
        v1.items.forEach(v2 => {
          sum += v2.total
          this.buycart.push(v2)
        })
      })
      this.total = sum
    },
    getFoodList() {
      foodList(this.id).then(
        res => {
          this.foodList = res.body
          this.initCategory()
        },
        err => {
          console.log(err)
        }
      )
    },
    select(index) {
      this.currentIndex = index
      this.$refs.listScroll.scrollToElement(this.$refs.foodList[index], 1000)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    getHeightList() {
      let listHeight = []
      let height = 0
      let children = this.$refs.foodList
      listHeight.push(height)
      for (let i = 0; i < children.length; i++) {
        let child = children[i]
        height += child.clientHeight
        listHeight.push(height)
      }
      this.listHeight = listHeight
    },
    initCategoryNum() {
      let buyFoodList = JSON.parse(getStore("buyFoodList"))
      if (!buyFoodList || !buyFoodList.length) {
        this.categoryNum.forEach(v => {
          v.num = 0
        })
        this.currentShopBuyFood = []
        this.test()
        return
      }
      buyFoodList.forEach((v1, i1) => {
        if (v1.restaurant_id == this.id) {
          this.currentShopBuyFood = buyFoodList[i1].category
        }
      })
      this.categoryNum.forEach((v1, i1) => {
        v1.num = 0
        this.currentShopBuyFood.forEach((v2, i2) => {
          if (v1.category_id == v2.category_id) {
            let sum = 0
            this.currentShopBuyFood[i2].items.forEach(v => {
              sum += v.food_num
            })
            this.categoryNum[i1].num = sum
          }
        })
      })
      this.test()
    },
    initCategory() {
      this.foodList.forEach(v => {
        this.categoryNum.push({
          category_id: v.id,
          num: 0
        })
      })
    },
    chooseSPEC(obj, name, id) {
      this.specIndex = 0
      this.specfood = obj
      this.specfood.category = name
      this.specfood.restaurant_id = id
      this.show = true
    },
    shopping(obj) {
      this.initCategoryNum()
      // console.log(obj)
    },
    close() {
      this.show = false
    }
  },
  components: {
    Scroll,
    Buy
  },
  watch: {
    foodList() {
      this.initCategoryNum()
      setTimeout(() => {
        this.getHeightList()
      }, 20)
    },
    scrollY(newY) {
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        let h1 = this.listHeight[i]
        let h2 = this.listHeight[i + 1]
        if (-newY > h1 && -newY < h2) {
          this.currentIndex = i
          return
        }
      }
      this.currentIndex = this.listHeight.length - 1
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.view {
  height: 100%;
  overflow: hidden;
  .flex();
  .food-item {
    .sc(0.14rem, #000);
    .wh(1rem, 100%);
    ul {
      li {
        padding: 0.2rem 0;
        text-align: center;
        border-bottom: 1px solid #e4e4e4;
        position: relative;
        > span {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #ff4616;
          color: #fff;
          line-height: 1em;
          min-width: 0.15rem;
          min-height: 0.15rem;
          .border-radius(50%);
        }
      }
      .active {
        border-left: 4px solid @blue;
        background-color: #fff;
      }
    }
  }
  .food-list {
    flex: 1;
    .sc(0.16rem, #000);
    section {
      > header {
        padding: 0.2rem 0.1rem;
        .sc(0.2rem,#000);
        font-weight: 700;
        span {
          .sc(0.14rem, #ccc);
        }
      }
      ul {
        li {
          padding: 0.1rem;
          background-color: #fff;
          border-bottom: 1px solid #f8f8f8;
          position: relative;
          overflow: hidden;
          .flex();
          align-items: center;
          img {
            .wh(0.5rem, 0.5rem);
            margin-right: 0.1rem;
          }
          > div {
            flex: 1;
            header {
              .flex();
              div:nth-of-type(1) {
                .sc(0.16rem,#000);
                font-weight: 700;
              }
              div:nth-of-type(2) {
                .sc(0.12rem);
                .border-radius(10px);
                padding: 2px 5px;
                transform: scale(0.8);
              }
            }
            > div:nth-of-type(1) {
              .sc(0.12rem, #ccc);
            }
            > div:nth-of-type(2) {
              .sc(0.12rem, #000);
            }
            > .activity {
              display: inline-block;
              text-align: center;
              padding: 1px 3px;
              .sc(0.12rem);
              .border-radius(10px);
            }
            .buy {
              .flex();
              align-items: center;
              div:nth-of-type(1) {
                span {
                  &:nth-of-type(1) {
                    .sc(0.12rem,#f60);
                  }
                  &:nth-of-type(2) {
                    .sc(0.16rem,#f60);
                  }
                }
              }
              img {
                .wh(0.2rem, 0.2rem);
              }
              .size {
                .sc(0.14rem);
                padding: 2px 5px;
                background-color: @blue;
                .border-radius(10px);
              }
            }
          }
        }
        .newFood {
          &::before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border-width: 20px;
            border-style: solid;
            border-color: transparent transparent green;
            transform: translate(-50%, -50%) rotate(-45deg);
            left: 0;
            top: 0;
          }
          &:after {
            content: "新品";
            .sc(0.12rem);
            position: absolute;
            transform: translate(-50%, -50%) rotate(-45deg) scale(0.8);
            left: 10px;
            top: 10px;
          }
        }
      }
    }
  }
}
.show-SPEC {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  > section {
    > div {
      background-color: #fff;
      padding: 0.1rem;
    }
    width: 70%;
    .border-radius(5px);
    .center();
    header {
      position: relative;
      .sc(0.16rem, #000);
      text-align: center;
      img {
        position: absolute;
        top: 0;
        right: 0;
        .wh(20px, 20px);
      }
    }
    .info {
      margin: 0.1rem 0;
      p {
        .sc(0.14rem, #666);
        padding: 10px 0;
      }
      ul {
        .flex(flex-start);
        li {
          .sc(0.14rem, #333);
          padding: 5px 10px;
          min-width: 40px;
          min-height: 20px;
          text-align: center;
          border: 1px solid #ddd;
          .border-radius(5px);
          margin-right: 0.1rem;
        }
        .active {
          color: @blue;
          border-color: @blue;
        }
      }
    }
    footer {
      padding: 0.1rem;
      background-color: #f9f9f9;
      .flex();
      > div {
        .sc(0.12rem, #ff6000);
        span {
          .sc(0.18rem, #ff6000);
          font-weight: 700;
        }
      }
    }
  }
}
footer.buycart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.5rem;
  background-color: #333;
  .flex();
  > div {
    &:nth-of-type(1) {
      flex: 1;
      .flex(center);
      flex-direction: column;
      align-items: center;
      > p {
        .sc(0.2rem);
        font-weight: 700;
      }
      > div {
        .sc(0.12rem);
      }
      .img {
        position: absolute;
        left: 0;
        .wh(0.6rem, 0.6rem);
        background-color: #fff;
        border: 5px solid #444;
        .border-radius(50%);
        left: 0.2rem;
        top: -0.2rem;
      }
    }
    &:nth-of-type(2) {
      .wh(1.2rem, 100%);
      text-align: center;
      .sc(0.14rem);
      font-weight: 500;
      line-height: 0.5rem;
      background-color: #535356;
    }
    .pay {
      background-color: #4cd964;
    }
  }
}
</style>
