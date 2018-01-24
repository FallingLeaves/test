<template>
  <div class="points-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <section>
      <header>
        <div>当前积分</div>
        <router-link to="/points/detail" class="enterDetail">
          <img src="src/assets/img/description.png" alt="">
          <span>积分说明</span>
        </router-link>
      </header>
      <p>
        <span>{{count}}</span>
        <span>分</span>
      </p>
      <div>积分兑换商品</div>
    </section>
    <p class="log">最近30天积分纪录</p>
    <div class="no-log">
      <img src="src/assets/img/no-log.png" alt="">
      <div>最近30天无积分纪录</div>
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
      title: "我的积分",
      count: 0
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.points-view {
  padding-top: 0.46rem;
  > section {
    background-color: #fff;
    .border-radius(.1rem);
    padding: .1rem 0;
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
      .flex(flex-start);
      align-items: center;
      padding: .1rem .2rem;
      span:nth-of-type(1) {
        .sc(.2rem, #333);
      }
      span:nth-of-type(2) {
        .sc(.14rem, #333);
      }
    }
    > div {
      .sc(.16rem, #333);
      line-height: .3rem;
      text-align: center;
      .border-radius(.1rem);
      background-color: #ccc;
      margin: .1rem .2rem;
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
