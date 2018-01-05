<template>
  <div>
    <div class="nav">
      <div @click.stop="choose(index)" v-for="(item, index) in sort" :key="index" ref="cls" :class="{active:item.checked}">
        <span ref="chooseItem">{{item.name}}</span>
        <span class="arrow" ref="arrow" :class="{reserve:item.checked}"></span>
      </div>
      <section class="shop-sort" v-if="shopCategory" ref="shopSort" :class="{show:sort[0].checked}">
        <div class="food-sort">
          <ul>
            <li v-for="(foodSort, index) in shopCategory" :class="{choose : index == currentIndex}" @click="select(index)">
              <div>
                <img :src="foodSort.image_url" alt="">
                <span>{{foodSort.name}}</span>
              </div>
              <div>
                <span class="count">{{foodSort.count}}</span>
                <span>></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="shop" v-if="shopCategory[currentIndex]">
          <scroll :data="shopCategory[currentIndex].sub_categories">
            <div>
              <ul>
                <li v-for="(shop, index) in shopCategory[currentIndex].sub_categories" :key="index" v-if="shop.level==2" @click="chooseShop(shop.id, shopCategory[currentIndex].name)" :class="{active : foodId == shop.id}">
                  <span>{{shop.name}}</span>
                  <span>{{shop.count}}</span>
                </li>
              </ul>
            </div>
          </scroll>
        </div>
      </section>
      <section class="order-sort" ref="orderSort" :class="{show:sort[1].checked}">
        <ul>
          <li v-for="(item, index) in order" :key="index" @click="chooseOrder(item.order_by)" :class="{active : order_by == item.order_by}">
            <!-- <img :src="item.img_url" alt=""> -->
            <img v-lazy="item.img_url" alt="">
            <!-- <img src="../../assets/img/address.png" alt=""> -->
            <div>{{item.title}}</div>
          </li>
        </ul>
      </section>
      <section class="delivery-sort" :class="{show:sort[2].checked}">
        <div v-if="delivery_mode.length">
          <header>配送方式</header>
          <ul>
            <li v-for="(item, index) in delivery_mode" :key="index">{{item.text}}</li>
          </ul>
        </div>
        <div v-if="shop_atteibute.length">
          <header>商家属性(可以多选)</header>
          <ul>
            <li v-for="(item, index) in shop_atteibute" :key="index" @click="chooseAttr(index)">
              <div :style="{border: `1px solid #${shop_atteibute[index].icon_color}`,color: `#${shop_atteibute[index].icon_color}`}" v-if="!choose_attr[index].checked">{{item.icon_name}}</div>
              <div class="checked" v-if="choose_attr[index].checked"><span></span></div>
              <div :class="{active: choose_attr[index].checked}">{{item.name}}</div>
            </li>
          </ul>
          <div class="btn">
            <div @click="clear">清空</div>
            <div @click="sure">确定<span v-if="num>0">{{num}}</span></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// import { hasClass, addClass, removeClass, toggleClass } from "@/config/dom"
import { shopCategory, delivery, shopAttribute } from "@/config/getData"
import { mapGetters } from "vuex"
import Scroll from "@/base/scroll/scroll"
export default {
  data() {
    return {
      sort: [
        { name: "分类", checked: false },
        { name: "排序", checked: false },
        { name: "筛选", checked: false }
      ],
      shopCategory: [],
      currentIndex: 1,
      foodId: null,
      // restaurant_category_ids: null,
      order_by: 4,
      FOOD_IMG_BASE_URL: "https://fuss10.elemecdn.com",
      order: [
        { title: "智能排序", img_url: "src/assets/img/order.png", order_by: 4 },
        { title: "距离最近", img_url: "src/assets/img/address.png", order_by: 5 },
        { title: "销量最高", img_url: "src/assets/img/fire.png", order_by: 6 },
        { title: "起送价最低", img_url: "src/assets/img/rmb.png", order_by: 1 },
        { title: "配送速度最快", img_url: "src/assets/img/time.png", order_by: 2 },
        { title: "评分最高", img_url: "src/assets/img/star.png", order_by: 3 }
      ],
      delivery_mode: [],
      shop_atteibute: [],
      choose_attr: [],
      num: 0
    }
  },
  computed: {
    ...mapGetters(["latitude", "longitude"])
  },
  created() {
    this.getShopCategeory()
    this.getDelivery_mode()
    this.getShop_atteibute()
  },
  methods: {
    choose(index) {
      this.sort.forEach((item, i) => {
        if (item.checked && i != index) {
          item.checked = !item.checked
        }
      })
      this.sort[index].checked = !this.sort[index].checked
      // console.log(this.sort)

      // if (hasClass(this.$refs.arrow[index], "reserve")) {
      //   toggleClass(this.$refs.arrow[index], "reserve")
      //   toggleClass(this.$refs.cls[index], "active")
      // } else {
      //   this.$refs.arrow.forEach(ele => {
      //     removeClass(ele, "reserve")
      //   })
      //   this.$refs.cls.forEach(ele => {
      //     removeClass(ele, "active")
      //   })
      //   addClass(this.$refs.arrow[index], "reserve")
      //   addClass(this.$refs.cls[index], "active")
      // }
      // index == 0 && toggleClass(this.$refs.shopSort, "show")
      // index != 0 && removeClass(this.$refs.shopSort, "show")
      // index == 1 && toggleClass(this.$refs.orderSort, "show")
      // index != 1 && removeClass(this.$refs.orderSort, "show")
    },
    getShopCategeory() {
      if (!this.latitude) {
        this.$router.go(-1)
        return
      }
      shopCategory(this.latitude, this.longitude).then(
        res => {
          // console.log(res.body)
          res.body.forEach(item => {
            if (item.image_url) {
              item.image_url =
                this.FOOD_IMG_BASE_URL + this.changeUrl(item.image_url)
            } else {
              item.image_url = "http://test.fe.ptdev.cn/elm/elmlogo.jpeg"
            }
          })
          this.shopCategory = res.body
        },
        err => {
          console.log(err)
        }
      )
    },
    getDelivery_mode() {
      if (!this.latitude) {
        this.$router.go(-1)
        return
      }
      delivery(this.latitude, this.longitude).then(
        res => {
          this.delivery_mode = res.body
        },
        err => {
          console.log(err)
        }
      )
    },
    getShop_atteibute() {
      if (!this.latitude) {
        this.$router.go(-1)
        return
      }
      shopAttribute(this.latitude, this.longitude).then(
        res => {
          this.shop_atteibute = res.body
          this.choose_attr = this.shop_atteibute.map(v => {
            return { id: v.id, checked: false }
          })
        },
        err => {
          console.log(err)
        }
      )
    },
    select(index) {
      this.currentIndex = index
    },
    chooseShop(id, name) {
      this.foodId = id
      this.$refs.chooseItem[0].innerHTML = name
      // toggleClass(this.$refs.arrow[0], "reserve")
      // toggleClass(this.$refs.cls[0], "active")
      // toggleClass(this.$refs.shopSort, "show")
      this.sort[0].checked = false
      // this.restaurant_category_ids = id
      this.$emit("selectShop", id)
    },
    chooseOrder(order_by) {
      this.order_by = order_by
      this.sort[1].checked = false
      this.$emit("selectOrder", order_by)
    },
    chooseAttr(index) {
      this.choose_attr[index].checked = !this.choose_attr[index].checked
      this.getAttrNum()
    },
    getAttrNum() {
      let num = 0
      this.choose_attr.forEach(v => {
        if (v.checked) {
          num+=1
        }
      })
      this.num = num
    },
    clear() {
      this.choose_attr.forEach(v => {
        v.checked = false
      })
      this.getAttrNum()
    },
    sure() {
      this.sort[2].checked = false
      let arr = []
      this.choose_attr.forEach(v => {
        if (v.checked) {
          arr.push(v.id)
        }
      })
      // console.log(arr)
      this.$emit("selectAttr", arr)
    },
    changeUrl(str) {
      var url
      "gif,jpg,jpeg,png,GIF,JPG,PNG".split(",").forEach(item => {
        if (str.indexOf(item) != -1) {
          var newStr = str.replace(item, item + "." + item)
          var arr = newStr.split("")
          arr.splice(0, 1, "/" + arr[0] + "/")
          arr.splice(2, 1, arr[2] + "/")
          url = arr.join("")
        }
      })
      return url
    }
  },
  components: {
    Scroll
  },
  watch: {
    
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.nav {
  background-color: #fff;
  .flex();
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 1000;
  height: 0.4rem;
  top: 0.46rem;
  border-bottom: 1px solid #e4e4e4;
  > div {
    flex: 1;
    .sc(0.14rem, #333);
    .flex(center);
    border-right: 1px solid #e4e4e4;
    padding: 0.1rem 0;
    &:nth-of-type(3) {
      border: none;
    }
    .arrow {
      .wh(0, 0);
      border-style: solid;
      border-width: 6px;
      border-color: #333 transparent transparent transparent;
      align-self: flex-end;
      transition: all 0.2s;
    }
    .reserve {
      transform-origin: 50% 25%;
      transform: rotate(180deg);
    }
  }
  section {
    .flex();
    position: absolute;
    width: 100%;
    top: 0.4rem;
    .sc(0.14rem, #333);
  }
  .shop-sort {
    display: none;
    > div {
      flex: 1;
      height: 3.5rem;
      overflow: hidden;
    }
    .food-sort {
      background-color: #f1f1f1;
      ul {
        .flex();
        flex-direction: column;
        height: 100%;
        li {
          flex: 1;
          .flex();
          align-items: center;
          padding: 0 0.1rem;
          > div {
            .flex();
          }
          img {
            .wh(0.2rem,0.2rem);
            margin-right: 0.1rem;
          }
          .count {
            .sc(0.12rem);
            background-color: #ccc;
            padding: 0.02rem 0.05rem;
            border-radius: 0.08rem;
          }
        }
        .choose {
          background-color: #fff;
        }
      }
    }
    .shop {
      background-color: #fff;
      padding-left: 0.1rem;
      > div {
        height: 100%;
      }
      ul {
        li {
          line-height: 0.4rem;
          padding-right: 0.1rem;
          border-bottom: 1px solid #e4e4e4;
          .flex();
        }
      }
    }
  }
  .order-sort {
    display: none;
    background-color: #fff;
    ul {
      width: 100%;
      li {
        .flex(flex-start);
        align-items: center;
        height: 0.5rem;
        img {
          .wh(0.2rem,0.2rem);
          margin: 0 0.1rem 0 0.2rem;
        }
        div {
          flex: 1;
          height: 100%;
          line-height: 0.5rem;
          border-bottom: 1px solid #e4e4e4;
          padding-left: 0.1rem;
        }
      }
    }
  }
  .delivery-sort {
    display: none;
    background-color: #fff;
    padding: 0 0.1rem;
    flex-direction: column;
    header {
      padding: 0.1rem 0;
    }
    ul {
      .flex();
      flex-wrap: wrap;
      li {
        width: 32%;
        .flex(flex-start);
        align-items: center;
        padding: 0.05rem;
        margin-bottom: 0.05rem;
        border: 1px solid #e4e4e4;
        .border-radius(5px);
        > div {
          &:nth-of-type(1):not(.checked) {
            .border-radius(5px);
            .wh(0.2rem, 0.2rem);
            text-align: center;
            line-height: 0.2rem;
            margin-right: 0.05rem;
          }
        }
      }
    }
    .checked {
      .wh(.2rem, .2rem);
      margin-right: 0.05rem;
      .flex(center);
      align-items: center;
      > span {
        .wh(0.1rem, 0.05rem);
        border-left: 1px solid @blue;
        border-bottom: 1px solid @blue;
        transform: rotate(-45deg);
      }
    }
    .btn {
      position: absolute;
      left: 0;
      right: 0;
      .flex(space-around);
      background-color: #f1f1f1;
      padding: 0.05rem;
      > div {
        width: 48%;
        padding: 0.05rem 0;
        .sc(0.18rem, #333);
        text-align: center;
        .border-radius(5px);
        background-color: #fff;
        &:nth-of-type(2) {
          color: #fff;
          background-color: rgb(21, 224, 31);
        }
      }
    }
  }
  .show {
    display: flex;
  }
}
.active {
  color: @blue !important;
  .arrow {
    border-top-color: @blue !important;
  }
}
</style>
