<template>
  <div class="balance-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <section>
      <header>
        <div>当前余额</div>
        <router-link to="/balance/detail" class="enterDetail">
          <img src="../../assets/img/description.png" alt="">
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
      <img src="../../assets/img/no-log.png" alt="">
      <div>暂无明细记录</div>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view class="balance-next"></router-view>
    </transition>
  </div>
</template>

<script>
import myHeader from "@/components/header/header";
export default {
  data() {
    return {
      isBack: true,
      isSearch: false,
      isLogin: false,
      title: "我的余额",
      count: 0.0
    };
  },
  components: {
    myHeader
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.balance-view {
  padding-top: 0.46rem;
  > section {
    background-color: #fff;
    .border-radius(0.1rem);
    padding: 0.1rem 0;
    header {
      .flex();
      padding: 0.1rem 0.2rem;
      .sc(0.16rem, #ccc);
      .enterDetail {
        .flex();
        align-items: center;
        img {
          .wh(24px, 24px);
          margin-right: 0.1rem;
        }
        span {
          color: @blue;
        }
      }
    }
    > p {
      .flex(flex-start);
      align-items: center;
      padding: 0.1rem 0.2rem;
      span:nth-of-type(1) {
        .sc(0.2rem, #333);
      }
      span:nth-of-type(2) {
        .sc(0.14rem, #333);
      }
    }
    > div {
      .sc(0.16rem, #333);
      line-height: 0.3rem;
      text-align: center;
      .border-radius(0.1rem);
      background-color: #ccc;
      margin: 0.1rem 0.2rem;
    }
  }
  .log {
    padding: 0.1rem 0.2rem;
    .sc(0.14rem, #999);
  }
  .no-log {
    .flex();
    flex-direction: column;
    align-items: center;
    img {
      .wh(0.6rem, 0.34rem);
    }
    div {
      margin-top: 0.1rem;
      .sc(0.16rem, #666);
    }
  }
  .balance-next {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 12;
    background-color: #f5f5f5;
    padding-top: 0.46rem;
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
