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
                {{item.name}}
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
                    <div v-if="food.specifications.length" class="size">
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
  </div>
</template>

<script>
import Scroll from "@/base/scroll/scroll"
import Buy from "@/base/buy/buy"
import { foodList } from "@/config/getData"
import { getStore } from "@/config/mUtil"
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
      change: 0
    }
  },
  computed: {},
  created() {
    this.getFoodList()
    this.initCategoryNum()
  },
  mounted() {},
  methods: {
    getFoodList() {
      foodList(this.id).then(
        res => {
          this.foodList = res.body
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
      let currentShopBuyFood = []
      let category = []
      if (!buyFoodList) {
        category.push(0)
        console.log(category)
        return
      }
      buyFoodList.forEach((v1, i1) => {
        if (v1.restaurant_id == this.id) {
          currentShopBuyFood = buyFoodList[i1]
        }
      })
      console.log(currentShopBuyFood)
      if (!currentShopBuyFood.category) {
        return
      }
      currentShopBuyFood.category.forEach(v => {
        category.push(v.items.length)
      })
      console.log(category)
    },
    shopping(num) {
      // console.log(num)
      this.change = this.change + 1
    }
  },
  components: {
    Scroll,
    Buy
  },
  watch: {
    foodList() {
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
    },
    change() {
      this.initCategoryNum()
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
</style>
