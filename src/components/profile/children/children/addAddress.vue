<template>
  <div class="add-view">
    <my-header :title="title"
      :isSearch="isSearch"
      :isBack="isBack"
      :isLogin="isLogin"></my-header>
    <div class="form">
      <div class="new">
        <input type="text"
          placeholder="请填写你的姓名"
          v-model="username"
          @input="addname"
          :class="{err:nameerr}">
        <p v-if="nameerr">请填写你的姓名</p>
      </div>
      <div class="new">
        <input type="text"
          placeholder="小区/写字楼/学校等"
          v-model="useraddress">
      </div>
      <div class="new">
        <input type="text"
          placeholder="请填写详细送餐地址"
          v-model="detailaddress"
          @input="addaddress"
          :class="{err:addresserr}">
        <p v-if="addresserr">{{addressmsg}}</p>
      </div>
      <div class="new">
        <input type="text"
          placeholder="请填写能够联系你的电话号码"
          v-model="tel"
          @input="addtel"
          :class="{err:telerr}">
        <p v-if="telerr">{{telmsg}}</p>
      </div>
      <div class="new">
        <input type="text"
          placeholder="备用联系电话（选填）"
          v-model="standbytel"
          @input="addstanby"
          :class="{err: standbyerr}">
        <p v-if="standbyerr">{{standbymsg}}</p>
      </div>
    </div>
    <div class="btn"
      :class="{abled:!(nameerr||addresserr||telerr)}">新增收货地址</div>
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
      title: "新增收货地址",
      username: null,
      nameerr: false,
      useraddress: null,
      addresserr: false,
      detailaddress: null,
      detailerr: false,
      tel: null,
      telerr: false,
      standbytel: null,
      standbyerr: false,
      addressmsg: null,
      telmsg: null,
      standbymsg: null
    };
  },
  components: {
    myHeader
  },
  methods: {
    addname() {
      !this.username ? (this.nameerr = true) : (this.nameerr = false);
    },
    addaddress() {
      this.addresserr = true;
      if (!this.detailaddress.length) {
        this.addressmsg = "请详细填写送餐地址";
      } else if (
        this.detailaddress.length > 1 &&
        this.detailaddress.length < 3
      ) {
        this.addressmsg = "送餐地址太短了，不能辨识";
      } else {
        this.addresserr = false;
        this.addressmsg = null;
      }
    },
    addtel() {
      this.telerr = true;
      if (/^[1][358][0-9]{9}$/.test(this.tel)) {
        this.telerr = false;
      } else if (this.tel == "") {
        this.telmsg = "手机号不能为空";
      } else {
        this.telmsg = "请输入正确的手机号";
      }
    },
    addstanby() {
      this.standbyerr = true;
      if (/^[1][358][0-9]{9}$/.test(this.standbytel) || this.standbymsg == "") {
        this.standbyerr = false;
      } else {
        this.standbymsg = "请输入正确的手机号";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../style/mixin.less";
.add-view {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 11;
  background-color: #f5f5f5;
  padding-top: 0.46rem;
  .form {
    margin-top: 0.1rem;
    background-color: #fff;
    padding: 0.1rem;
    .new {
      .flex();
      flex-direction: column;
      margin-bottom: 0.1rem;
      input {
        background: #f2f2f2;
        border: 1px solid #ddd;
        padding: 0.1rem;
        .border-radius(3px);
        .sc(0.14rem, #333);
      }
      .err {
        border-color: #ea3106;
      }
      p {
        .sc(0.12rem, #ea3106);
        line-height: 2em;
      }
    }
  }
  .btn {
    opacity: 0.3;
    .sc(0.14rem);
    background-color: #28a745;
    text-align: center;
    padding: 0.1rem;
    margin: 0.1rem 0.1rem 0;
    .border-radius(5px);
  }
  .abled {
    opacity: 1;
  }
}
</style>

