<template>
  <div class="info-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <div class="user-info">
      <ul>
        <li class="info-item">
          <div class="info-iten-name">头像</div>
          <div class="avatar">
            <img :src="SHOP_IMG_BASE_PATH+userInfo.avatar" alt="" v-if="userInfo.avatar">
            <img src="src/assets/img/user.svg" alt="" v-else>
          </div>
        </li>
        <li class="info-item">
          <div class="info-iten-name">用户名</div>
          <div class="user-name">{{userInfo.username}}</div>
        </li>
        <li class="info-item">
          <div class="info-iten-name">收货地址</div>
        </li>
      </ul>
    </div>
    <p>账号绑定</p>
    <div class="info-item">
      <div class="info-iten-name">
        <img src="src/assets/img/mobile.svg" alt="">
        <div>手机</div>
      </div>
      <div class="user-name">{{userInfo.mobile}}</div>
    </div>
    <p>安全设置</p>
    <div class="info-item">
      <div class="info-iten-name">
        登录密码
      </div>
      <div class="user-name">修改</div>
    </div>
    <div class="quit">
      退出登录
    </div>
  </div>
</template>

<script>
import { SHOP_IMG_BASE_PATH } from "@/config/env"
import { getUserInfo, signout } from "@/config/getData"
import { getStore, removeStore } from "@/config/mUtil"
import { mapGetters } from "vuex"
import myHeader from "@/components/header/header"
export default {
  data() {
    return {
      SHOP_IMG_BASE_PATH,
      title: "账户信息",
      isSearch: false,
      isBack: true,
      isLogin: false
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {},
  methods: {},
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";
.info-view {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 11;
  background-color: #f5f5f5;
  padding-top: 0.46rem;
  .user-info {
    margin-top: 0.1rem;
    border-top: 1px solid #f5f5f5;
  }
  .info-item {
    .flex();
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    padding: 0.1rem 0.3rem 0.1rem 0.1rem;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      .wh(0.08rem, 0.08rem);
      border-bottom: 1px solid #999;
      border-right: 1px solid #999;
      right: 0.1rem;
      top: 50%;
      transform: translateY(-50%) rotate(-45deg);
    }
    .info-iten-name {
      .sc(0.16rem, #333);
      .flex();
      align-items: center;
      img {
        .wh(.3rem, .3rem);
        margin-right: .1rem;
        background-color: @blue;
        .border-radius(5px);
      }
    }
    .avatar {
      .wh(0.4rem, 0.4rem);
      .border-radius(50%);
      overflow: hidden;
    }
    .user-name {
      .sc(0.18rem, #666);
    }
  }
  p {
    .sc(.14rem, #999);
    padding: 0.1rem;
    border-top: 1px solid #f5f5f5;
  }
  .quit {
    .sc(.14rem);
    margin: .2rem .1rem 0;
    background-color: #d8584a;
    text-align: center;
    line-height: .4rem;
    .border-radius(5px);
  }
}
</style>
