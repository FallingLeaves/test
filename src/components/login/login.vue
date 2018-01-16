<template>
  <div class="login-view">
    <my-header :title="title"  :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <form class="login">
      <section class="input-container">
        <input type="text" placeholder="账号" v-model.lazy="userAccount">
      </section>
      <section class="input-container">
        <input type="password" placeholder="密码" v-model="userPassword" v-if="!showPassword">
        <input type="text" placeholder="密码" v-model="userPassword" v-else>
        <div class="button-switch">
          <div class="circle-button" :class="{'circle-right': showPassword}" @click="changePasswordType"></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input-container">
        <input type="text" placeholder="验证码" v-model="identifyCode">
        <div class="identify">
          <div class="img">
            <img :src="imgCode.code" alt="" v-if="imgCode">
          </div>
          <div class="change-img" @click="changeImgCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import { getcaptchas } from "@/config/getData"
export default {
  data() {
    return {
      title: "密码登录",
      isSearch: false,
      isLogin: false,
      isBack: true,
      imgCode: null,
      showPassword: false,
      userAccount: null,
      userPassword: null,
      identifyCode: null
    }
  },
  created() {
    this._getcaptchas()
  },
  methods: {
    _getcaptchas() {
      getcaptchas().then(
        res => {
          this.imgCode = res.body
        },
        err => {
          console.log(err)
        }
      )
    },
    changePasswordType() {
      this.showPassword = !this.showPassword;
    },
    changeImgCode() {
      this._getcaptchas()
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.login-view {
  padding-top: 0.46rem;
  .login {
    background-color: #fff;
    margin-top: 0.1rem;
    .input-container {
      .flex();
      padding: 0.2rem;
      height: .6rem;
      border-bottom: 1px solid #f1f1ff;
      input {
        .sc(0.16rem, #666);
      }
      .button-switch {
        .flex();
        align-items: center;
        background-color: #ccc;
        .wh(.5rem, 0.2rem);
        padding: 0 .1rem;
        border: 1px;
        .border-radius(8px);
        position: relative;
        .circle-button {
          position: absolute;
          left: -.05rem;
          .wh(0.35rem, 0.35rem);
          .border-radius(50%);
          box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0, 0, 0, 0.1);
          background-color: #f1f1f1;
          transition: all .3s;
        }
        .circle-right {
          transform: translateX(.35rem);
        }
        span {
          text-align: center;
          .sc(.12rem, #fff);
        }
      }
      .identify {
        .flex();
        align-items: center;
        img {
          .wh(.7rem, .3rem);
          margin-right: .1rem;
        }
        .change-img {
          flex: 1;
          .flex();
          flex-direction: column;
          p {
            .sc(.12rem, #666);
          }
          p:nth-of-type(2) {
            color: @blue;
          }
        }
      }
    }
  }
}
</style>
