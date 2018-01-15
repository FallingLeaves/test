<template>
  <div>
    <header v-if="shopInfo.name">
      <img v-lazy="SHOP_IMG_BASE_PATH+shopInfo.image_path" alt="">
      <div class="back" @click="back">
        <div></div>
      </div>
      <div>
        <div class="info" @click="enterShopDetail">
          <img v-lazy="SHOP_IMG_BASE_PATH+shopInfo.image_path" alt="">
          <div>
            <div class="name">{{shopInfo.name}}</div>
            <div>
              <div>
                <p>
                  商家配送/分钟送达/{{shopInfo.piecewise_agent_fee.tips}}
                </p>
                <p>
                  公告：{{shopInfo.promotion_info}}
                </p>
              </div>
              <div class="enter"></div>
            </div>
          </div>
        </div>
        <div class="activities" @click="enterActivities" v-if="shopInfo.activities.length">
          <div>
            <div :style="{backgroundColor:`#${shopInfo.activities[0].icon_color}`}" class="item">{{shopInfo.activities[0].icon_name}}</div>
            <div>{{shopInfo.activities[0].description}}（APP专享）</div>
          </div>
          <div>
            {{shopInfo.activities.length}}个活动
          </div>
        </div>
      </div>
      <section v-show="showActivities">
        <header>{{shopInfo.name}}</header>
        <nav>
          <header>优惠信息</header>
          <div v-for="(item, index) in shopInfo.activities" :key="index">
            <div :style="{backgroundColor:`#${item.icon_color}`}" class="item">{{item.icon_name}}</div>
            <div>{{item.description}}<span v-if="item.icon_name=='减'">（APP专享）</span></div>
          </div>
        </nav>
        <nav>
          <header>商家公告</header>
          <div>
            <div>{{shopInfo.promotion_info}}</div>
          </div>
        </nav>
        <img src="src/assets/img/close.svg" alt="" @click="close">
      </section>
    </header>
  </div>
</template>

<script>
import { shop } from "@/config/getData"
import { SHOP_IMG_BASE_PATH } from "@/config/env"
import { mapMutations } from 'vuex'
export default {
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      // SHOP_IMG_BASE_PATH: "http://cangdu.org:8001/img/",
      SHOP_IMG_BASE_PATH,
      shopInfo: {},
      showActivities: false
    }
  },
  created() {
    this.getShopInfo()
  },
  methods: {
    getShopInfo() {
      shop(this.id).then(
        res => {
          this.shopInfo = res.body
          this.setShopDetail(this.shopInfo)
        },
        err => {
          console.log(err)
        }
      )
    },
    back() {
      this.$router.go(-1)
    },
    enterActivities() {
      this.showActivities = true
    },
    close() {
      this.showActivities = false
    },
    enterShopDetail() {
      this.$router.push({path: `/shopDetail/${this.id}`})
    },
    ...mapMutations({
      setShopDetail: "SET_SHOPDETAIL"
    })
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
header {
  position: relative;
  overflow: hidden;
  > img {
    position: absolute;
    filter: blur(10px);
  }
  .back {
    position: absolute;
    left: 0.1rem;
    top: 0.05rem;
    z-index: 2;
    padding: 5px;
    > div {
      .wh(0.15rem, 0.15rem);
      border-left: 3px solid #fff;
      border-bottom: 3px solid #fff;
      transform: rotate(45deg);
    }
  }
  > div:not(.back) {
    position: relative;
    background-color: rgba(119, 103, 137, 0.43);
    .info {
      padding: 0.1rem;
      .flex();
      align-items: center;
      > img {
        .wh(0.6rem, 0.6rem);
        margin-right: 0.1rem;
        .border-radius(5px);
      }
      > div {
        flex: 1;
        height: 100%;
        .flex();
        flex-direction: column;
        .name {
          .sc(0.2rem);
          .ellipsis();
        }
        div:nth-of-type(2) {
          .flex();
          .sc(0.14rem);
          align-items: center;
          > div {
            p:nth-of-type(2) {
              .ellipsis();
            }
          }
          .enter {
            .wh(0.1rem, 0.1rem);
            border-right: 1px solid #fff;
            border-bottom: 1px solid #fff;
            transform: rotate(-45deg);
          }
        }
      }
    }
    .activities {
      padding: 0.1rem;
      .sc(0.14rem);
      .flex();
      align-items: center;
      > div:nth-of-type(1) {
        .flex();
        align-items: center;
        .item {
          padding: 1px 3px;
          .border-radius(5px);
          margin-right: 10px;
        }
      }
      > div:nth-of-type(2) {
        position: relative;
        padding: 0 10px;
        &::after {
          content: "";
          position: absolute;
          .wh(0.1rem, 0.1rem);
          right: 0;
          top: 50%;
          border-right: 1px solid #fff;
          border-bottom: 1px solid #fff;
          transform: translateY(-50%) rotate(-45deg);
        }
      }
    }
  }
  > section {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #262626;
    padding: .3rem;
    z-index: 100;
    > header {
      .sc(.18rem);
      text-align: center;
    }
    > nav {
      text-align: center;
      > header {
        display: inline;
        .sc(.16rem);
        padding: 5px;
        text-align: center;
        .border-radius(10PX);
        border: 1px solid #ccc;
      }
      > div {
        .sc(.12rem);
        padding: 5px 0;
        .flex(flex-start);
        align-items: center;
        .item {
          padding: 1px 3px;
          .border-radius(5px);
          margin-right: 10px;
        }
      }
    }
    > img {
      .wh(.5rem, .5rem);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5%;
    }
  }
}
</style>
