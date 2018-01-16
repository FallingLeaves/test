<template>
  <div class="profile-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <section class="user">
      <div class="avatar">
        <img :src="SHOP_IMG_BASE_PATH+userInfo.avatar" alt="" v-if="userInfo&&userInfo.user_id">
        <img src="src/assets/img/user.svg" alt="" v-else>
      </div>
      <div class="user-info">
        <p class="name">{{userName}}</p>
        <p class="mobile">
          <img src="src/assets/img/mobile.svg" alt="">
          <span>{{mobile}}</span>
        </p>
      </div>
    </section>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import { SHOP_IMG_BASE_PATH } from "@/config/env"
import myHeader from "@/components/header/header"
import TabBar from "@/components/tabBar/tabBar"
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      SHOP_IMG_BASE_PATH,
      title: "我的",
      isSearch: false,
      isBack: true,
      isLogin: false,
      userName: "登录/注册",
      mobile: "暂无绑定手机号"
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
    TabBar
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.profile-view {
  padding-top: .46rem;
  .user {
    background-color: @blue;
    padding: .2rem;
    .flex(flex-start);
    align-items: center;
    .avatar {
      background-color: #fff;
      .wh(.5rem, .5rem);
      .border-radius(50%);
      margin-right: .1rem
    }
    .user-info {
      flex: 1;
      .flex();
      flex-direction: column;
      .name {
        .sc(.16rem);
        font-weight: 700;
      }
      .mobile {
        .sc(.14rem);
        .flex(flex-start);
        align-items: center;
        img {
          .wh(.3rem, .3rem);
        }
      }
    }
  }
}
</style>
