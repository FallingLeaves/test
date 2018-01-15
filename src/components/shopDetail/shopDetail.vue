<template>
  <div class="shopDetail-view" v-if="shopDetail">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <div class="actAndAttr">
      <h5>活动与属性</h5>
      <ul v-if="actAndAttr.length">
        <li v-for="(item, index) in actAndAttr" :key="index">
          <div :style="{backgroundColor:`#${item.icon_color}`}" class="item">{{item.icon_name}}</div>
          <div>{{item.description}}<span>（APP专享）</span></div>
        </li>
      </ul>
    </div>
    <div class="food-safety">
      <router-link :to="`/shopDetail/${shopDetail.id}/FoodSafety`">
        <header @click="enterFoodSafety">
          <h5>食品监督安全公示</h5>
          <div>企业认证详情</div>
        </header>
      </router-link>
      <section>
        <img src="src/assets/img/cry.svg" alt="" v-if="shopDetail.status==0">
        <img src="src/assets/img/laugh.svg" alt="" v-if="shopDetail.status==1">
        <div>
          <div>监督检查结果：<span v-if="shopDetail.status==0" style="color:red">差</span><span v-if="shopDetail.status==1" style="color: green">优</span></div>
          <div>检查日期：{{shopDetail.identification.licenses_date}}</div>
        </div>
      </section>
    </div>
    <div class="shop-info">
      <h5>商家信息</h5>
      <ul>
        <li>{{shopDetail.name}}</li>
        <li>地址：{{shopDetail.address}}</li>
        <li>营业时间：{{shopDetail.opening_hours[0]}}</li>
        <li class="arrow">营业执照</li>
        <li class="arrow">餐饮服务许可证</li>
      </ul>
    </div>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import { shop } from "@/config/getData"
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      title: "商家详情",
      isSearch: false,
      isBack: true,
      isLogin: false,
      actAndAttr: [],
      // shopInfo: {}
    }
  },
  created() {
    // this._shop()
    this.test()
  },
  computed: {
    ...mapGetters(["shopDetail"])
  },
  methods: {
    test() {
      if(!this.shopDetail) {
        this.$router.go(-1)
        return
      }
      this.actAndAttr = this.shopDetail.activities.concat(this.shopDetail.supports)
    },
    _shop() {
      shop(this.$route.params.id).then(
        res => {
          this.shopInfo = res.body
          this.actAndAttr = res.body.activities.concat(res.body.supports)
        },
        err => {
          console.log(err)
        }
      )
    },
    enterFoodSafety() {
      // this.$router.push({path: `/shopDetail/${this.shopInfo.id}/FoodSafety`})
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.shopDetail-view {
  padding-top: 0.46rem;
  background-color: rgb(235, 235, 235);
  .actAndAttr {
    background-color: #fff;
    margin-bottom: .1rem;
    h5 {
      padding: .1rem;
      .sc(0.18rem, #000);
      border-bottom: 1px solid rgb(235, 235, 235);
    }
    ul {
      li {
        .flex(flex-start);
        align-items: center;
        .sc(.14rem, #333);
        padding: .1rem;
        .item {
          color: #fff;
          padding: 1px 3px;
          .border-radius(5px);
          margin-right: .1rem;
        }
      }
    }
  }
  .food-safety {
    background-color: #fff;
    margin-bottom: .1rem;
    header {
      .flex();
      padding: .1rem;
      border-bottom: 1px solid rgb(235, 235, 235);
      h5 {
        .sc(0.18rem, #000);
      }
      div {
        .sc(0.16rem, #ccc);
        position: relative;
        padding-right: 20px;
        &::before {
          content: "";
          position: absolute;
          .wh(10px, 10px);
          border-right: 1px solid #999;
          border-bottom: 1px solid #999;
          right: 0;
          top: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
    section {
      .flex(flex-start);
      padding: .1rem;
      img {
        .wh(.4rem, .4rem);
        margin-right: .1rem;
      }
      > div {
        .sc(.14rem, #333);
        div {
          padding: .05rem 0;
        }
      }
    }
  }
  .shop-info {
    background-color: #fff;
    h5 {
      padding: .1rem;
      .sc(0.18rem, #000);
      border-bottom: 1px solid rgb(235, 235, 235);
    }
    ul {
      li {
        .sc(.14rem, #999);
        padding: .15rem .1rem;
        border-bottom: 1px solid rgb(235, 235, 235);
      }
      .arrow {
        position: relative;
        &:before {
          content: "";
          position: absolute;
          .wh(10px, 10px);
          border-right: 1px solid #999;
          border-bottom: 1px solid #999;
          right: .1rem;
          top: 50%;
          transform: translate(-50%) rotate(-45deg);
        }
      }
    }
  }
}
</style>
