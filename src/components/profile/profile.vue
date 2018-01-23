<template>
  <div class="profile-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <section class="user">
      <div class="avatar">
        <img :src="SHOP_IMG_BASE_PATH+userInfo.avatar" alt="" v-if="userInfo&&userInfo.user_id">
        <img src="src/assets/img/user.svg" alt="" v-else>
      </div>
      <div class="user-info" @click="enterProfile">
        <p class="name">{{userName}}</p>
        <p class="mobile">
          <img src="src/assets/img/mobile.svg" alt="">
          <span>{{mobile}}</span>
        </p>
      </div>
    </section>
    <section class="info-data">
      <ul>
        <router-link to="/balance" tag="li" class="info-data-link">
          <span class="info-data-num"><b>{{balance.toFixed(2)}}</b>元</span>
          <span class="info-data-item">我的余额</span>
        </router-link>
        <router-link to="/coupon" tag="li" class="info-data-link">
          <span class="info-data-num"><b>{{count}}</b>个</span>
          <span class="info-data-item">我的优惠</span>
        </router-link>
        <router-link to="/points" tag="li" class="info-data-link">
          <span class="info-data-num"><b>{{integral}}</b>分</span>
          <span class="info-data-item">我的积分</span>
        </router-link>
      </ul>
    </section>
    <div class="user-item">
      <ul>
        <router-link v-for="(item, index) in userItem" :key="index" :to="item.linkTo" tag="li" class="user-server-item">
          <img :src="item.icon" alt="">
          <div class="user-server-name">
            {{item.item}}<span class="arrow"></span>
          </div>
        </router-link>
      </ul>
    </div>
    <tab-bar></tab-bar>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { SHOP_IMG_BASE_PATH } from "@/config/env"
import myHeader from "@/components/header/header"
import TabBar from "@/components/tabBar/tabBar"
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      SHOP_IMG_BASE_PATH,
      title: "我的",
      isSearch: false,
      isBack: true,
      isLogin: false,
      userName: "登录/注册",
      mobile: "暂无绑定手机号",
      balance: 0, //余额
      count: 0, //优惠券个数
      integral: 0, //积分
      userItem: [
        {
          icon: "src/assets/img/order04.svg",
          item: "我的订单",
          linkTo: "/order"
        },
        {
          icon: "src/assets/img/integral.svg",
          item: "积分商城",
          linkTo: "/shoppingMall"
        },
        {
          icon: "src/assets/img/member.svg",
          item: "饿了么会员卡",
          linkTo: "/profile/member"
        },
        {
          icon: "src/assets/img/server.svg",
          item: "服务中心",
          linkTo: "/profile/server"
        },
        {
          icon: "src/assets/img/download.svg",
          item: "下载饿了么APP",
          linkTo: "/dowmload"
        }
      ]
    }
  },
  created() {
    this.initUserInfo()
  },
  mounted() {},
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    initUserInfo() {
      if (this.userInfo && this.userInfo.user_id) {
        this.userName = this.userInfo.username
        this.mobile = this.userInfo.mobile || "暂无绑定手机号"
        this.balance = this.userInfo.balance
        this.count = this.userInfo.gift_amount
        this.integral = this.userInfo.point
      } else {
        this.userName = "登录/注册"
        this.mobile = "暂无绑定手机号"
        this.balance = 0
        this.count = 0
        this.integral = 0
      }
    },
    enterProfile() {
      if (this.userInfo && this.userInfo.user_id) {
        this.$router.push({ path: "/profile/info" })
      } else {
        this.$router.push({ path: "/login" })
      }
    }
  },
  components: {
    myHeader,
    TabBar
  },
  watch: {
    userInfo: {
      handler() {
        this.initUserInfo()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.profile-view {
  padding-top: 0.46rem;
  .user {
    background-color: @blue;
    padding: 0.1rem;
    .flex(flex-start);
    align-items: center;
    .avatar {
      background-color: #fff;
      .wh(0.5rem, 0.5rem);
      .border-radius(50%);
      margin-right: 0.1rem;
      overflow: hidden;
    }
    .user-info {
      flex: 1;
      .flex();
      flex-direction: column;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%) rotate(-45deg);
        .wh(0.1rem, 0.1rem);
        border-bottom: 2px solid #fff;
        border-right: 2px solid #fff;
      }
      .name {
        .sc(0.16rem);
        font-weight: 700;
        padding-left: 0.08rem;
      }
      .mobile {
        .sc(0.14rem);
        .flex(flex-start);
        align-items: center;
        img {
          .wh(0.3rem, 0.3rem);
        }
      }
    }
  }
  .info-data {
    background-color: #fff;
    margin-bottom: 0.1rem;
    ul {
      .flex();
      .info-data-link {
        flex: 1;
        border-right: 1px solid #f1f1f1;
        padding: 0.1rem 0;
        text-align: center;
        .flex();
        flex-direction: column;
        .info-data-num {
          .sc(0.14rem, #333);
          margin-bottom: 0.1rem;
          b {
            .sc(0.26rem, #f90);
            font-weight: 700;
          }
        }
        .info-data-item {
          .sc(0.16rem, #666);
        }
      }
      .info-data-link:nth-of-type(2) {
        .info-data-num {
          b {
            color: #ff5f3e;
          }
        }
      }
      .info-data-link:nth-of-type(3) {
        border: none;
        .info-data-num {
          b {
            color: #6ac20b;
          }
        }
      }
    }
  }
  .user-item {
    ul {
      .user-server-item {
        .flex(flex-start);
        background-color: #fff;
        padding-left: 0.2rem;
        align-items: center;
        img {
          .wh(0.2rem, 0.2rem);
          margin-right: 0.1rem;
        }
        .user-server-name {
          flex: 1;
          line-height: 0.4rem;
          .sc(0.16rem, #333);
          border-bottom: 1px solid #f5f5f5;
          position: relative;
          .arrow {
            position: absolute;
            .wh(0.1rem, 0.1rem);
            border-bottom: 1px solid #999;
            border-right: 1px solid #999;
            right: 0.1rem;
            top: 50%;
            transform: translateY(-50%) rotate(-45deg);
          }
        }
      }
      .user-server-item:nth-of-type(2) {
        margin-bottom: 0.1rem;
      }
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
