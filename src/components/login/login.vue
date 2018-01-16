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
    <p class="login—tips">
      温馨提示：未注册过的账号，登录时将自动注册
    </p>
    <p class="login—tips">
      注册过的用户可凭账号密码登录
    </p>
    <div class="login-button" @click="_login">登录</div>
    <div class="reset">重置密码?</div>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import { getcaptchas, login } from "@/config/getData"
import { mapMutations } from 'vuex'
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
      identifyCode: null,
      userInfo: null
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
      this.showPassword = !this.showPassword
    },
    changeImgCode() {
      this._getcaptchas()
    },
    _login() {
      if (!this.userAccount) {
        return
      }
      if (!this.userPassword) {
        return
      }
      if (!this.identifyCode) {
        return
      }
      login(this.userAccount, this.userPassword, this.identifyCode).then(
        res => {
          this.userInfo = res.body
          this.userInfo.user_id?this.setUserInfo(this.userInfo) : console.log(this.userInfo.message)
        },
        err => {
          console.log(err)
        }
      )
    },
    ...mapMutations({
      setUserInfo: "SET_USERINFO"
    })
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
      height: 0.6rem;
      border-bottom: 1px solid #f1f1ff;
      input {
        .sc(0.16rem, #666);
      }
      .button-switch {
        .flex();
        align-items: center;
        background-color: #ccc;
        .wh(0.5rem, 0.2rem);
        padding: 0 0.1rem;
        border: 1px;
        .border-radius(8px);
        position: relative;
        .circle-button {
          position: absolute;
          left: -0.05rem;
          .wh(0.35rem, 0.35rem);
          .border-radius(50%);
          box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0, 0, 0, 0.1);
          background-color: #f1f1f1;
          transition: all 0.3s;
        }
        .circle-right {
          transform: translateX(0.35rem);
        }
        span {
          text-align: center;
          .sc(0.12rem, #fff);
        }
      }
      .identify {
        .flex();
        align-items: center;
        img {
          .wh(0.7rem, 0.3rem);
          margin-right: 0.1rem;
        }
        .change-img {
          flex: 1;
          .flex();
          flex-direction: column;
          p {
            .sc(0.12rem, #666);
          }
          p:nth-of-type(2) {
            color: @blue;
          }
        }
      }
    }
  }
  .login—tips {
    .sc(0.12rem, rgb(241, 15, 15));
    padding: 0.1rem 0.1rem 0;
  }
  .login-button {
    background-color: rgb(76, 217, 100);
    .sc(0.14rem);
    text-align: center;
    padding: 0.1rem 0;
    margin: 0.2rem;
    .border-radius(5px);
  }
  .reset {
    .sc(0.14rem, @blue);
    text-align: right;
  }
}
</style>
