<template>
  <div class="balance-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <section>
      <header>
        <div>当前余额</div>
        <router-link to="/balance/detail" class="enterDetail">
          <img src="src/assets/img/description.png" alt="">
          <span>余额说明</span>
        </router-link>
      </header>
      <p>
        <span>{{count}}</span>
        <span>元</span>
      </p>
      <div>提现</div>
    </section>
    <p class="log">交易明细</p>
    <div class="no-log">
      <img src="src/assets/img/no-log.png" alt="">
      <div>暂无明细记录</div>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
export default {
  data () {
    return {
      isBack: true,
      isSearch: false,
      isLogin: false,
      title: "我的余额",
      count: 0.00
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.balance-view {
  padding-top: 0.46rem;
  > section {
    background-color: #fff;
    .border-radius(.1rem);
    header {
      .flex();
      padding: .1rem .2rem;
      .sc(.16rem, #ccc);
      .enterDetail {
        .flex();
        align-items: center;
        img {
          .wh(24px, 24px);
          margin-right: .1rem;
        }
        span {
          color: @blue;
        }
      }
    }
    > p {
      span:nth-of-type(1) {
        .sc(.2rem, #333);
      }
      span:nth-of-type(2) {
        .sc(.14rem, #333);
      }
    }
    > div {
      .wh(100%, .3rem);
      line-height: .3rem;
      text-align: center;
      .border-radius(.1rem);
      background-color: #ccc;
      margin-top: .1rem;
    }
  }
  .log {
    padding: .1rem .2rem;
    .sc(.14rem, #999);
  }
  .no-log {
    .flex();
    flex-direction: column;
    align-items: center;
    img {
      .wh(.6rem, .34rem);
    }
    div {
      margin-top: .1rem;
      .sc(.16rem, #666);
    }
  }
  .router-slid-enter-active,
  .router-slid-leave-active {
    transition: all 0.4s;
  }
  .router-slid-enter,
  .router-slid-leave-active {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
