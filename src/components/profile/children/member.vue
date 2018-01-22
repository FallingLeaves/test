<template>
  <div class="member-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <scroll class="member-scroll" :data="franchise">
      <div>
        <p class="top">为账户<span>{{userInfo.username}}</span>购买会员</p>
      </div>
      <header>
        <div>会员特权</div>
        <div>会员说明<span></span></div>
      </header>
      <section v-for="(item, index) in franchise" :key="index" class="franchise">
        <img :src="item.icon" alt="">
        <div class="franchise-item">
          <p>{{item.title}}</p>
          <div>{{item.subTitle}}</div>
          <div>{{item.delivery}}</div>
        </div>
      </section>
      <section class="open">
        <div>开通会员</div>
        <div class="subscriptions">
          <div>1个月<span>¥{{subscriptions}}</span></div>
          <div>购买</div>
        </div>
      </section>
      <header class="member-other">
        <div>兑换会员</div>
        <div>使用卡号卡密<span></span></div>
      </header>
      <header class="member-other">
        <div>购买记录</div>
        <div>开发票<span></span></div>
      </header>
    </scroll>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import Scroll from "@/base/scroll/scroll"
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      title: "会员中心",
      isSearch: false,
      isBack: true,
      isLogin: false,
      franchise: [
        {
          icon: "src/assets/img/sheng.jpeg", title: "减免配送费", subTitle: "每月减免30单，每日可减免3单，每单最高减4元", delivery: "蜂鸟专送专享"
        },
        {
          icon: "src/assets/img/jifen.jpeg", title: "减免配送费", subTitle: "每月减免30单，每日可减免3单，每单最高减4元", delivery: "蜂鸟专送专享"
        }
      ],
      subscriptions: 20
    }
  },
  created () {
    
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    
  },
  components: {
    myHeader,
    Scroll
  }
}
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";
.member-view {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 11;
  background-color: #f5f5f5;
  padding-top: 0.46rem;
  overflow: hidden;
  .member-scroll {
    height: 100%;
    overflow: hidden;
  }
  .top {
    .sc(.14rem, #ccc);
    span {
      color: #000;
    }
  }
  header {
    .flex();
    align-items: center;
    padding: .1rem .2rem;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    div:nth-of-type(1) {
      .sc(.16rem, #333);
    }
    div:nth-of-type(2) {
      .sc(.14rem, #666);
      position: relative;
      span {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%) rotate(-45deg);
        .wh(0.1rem, 0.1rem);
        border-bottom: 1px solid #999;
        border-right: 1px solid #999;
      }
    }
  }
  .franchise {
    background-color: #fff;
    padding: .1rem .2rem;
    border-bottom: 1px solid #f5f5f5;
    .flex();
    img {
      .wh(.5rem, .5rem);
      margin-right: .2rem;
    }
    .franchise-item {
      flex: 1;
      .flex();
      flex-direction: column;
      p {
        .sc(.16rem, #333);
      }
      div {
        .sc(.14rem, #666);
      }
    }
  }
  .open {
    background-color: #fff;
    padding: .1rem .2rem;
    margin-top: .2rem;
    >div {
      .sc(.16rem, #333);
    }
    .subscriptions {
      border-top: 1px solid #f5f5f5;
      .flex();
      align-items: center;
      span {
        color: #f60;
        font-weight: 700;
      }
      > div:nth-of-type(2) {
        color: #f60;
        border: 1px solid #f60;
        .border-radius(50px);
        padding: 3px 5px;
      }
    }
  }
  .member-other {
    margin-top: .2rem;
    border: none;
  }
}
</style>
