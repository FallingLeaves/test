<template>
  <div>
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <header>
      成功兑换后将关联到当前账号：<span>{{userInfo.username}}</span>
    </header>
    <section>
      <input type="text" maxlength="10" v-model="cartNumber" placeholder="请输入10位卡号">
      <input type="text" maxlength="6" v-model="passWord" placeholder="请输入6位卡密">
    </section>
    <p :class="{'could-pay': couldPay}" @click="confrimPay">兑换</p>
    <footer>
      <h5>——温馨提示——</h5>
      <div>新兑换的会员服务，权益以「会员说明」为准。</div>
      <ul>
        <li v-for="(item, index) in cardItem" :key="index">
          <div>{{item.name}}:<b>{{item.num}}</b>{{item.item}}</div>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import { mapGetters } from "vuex"
import { vipCard } from "@/config/getData"
export default {
  data() {
    return {
      title: "兑换会员",
      isSearch: false,
      isBack: true,
      isLogin: false,
      cartNumber: null,
      passWord: null,
      cardItem: [
        { name: "月卡", num: "30次", item: "减免配送费。" },
        { name: "季卡", num: "90次", item: "减免配送费。" },
        { name: "年卡", num: "360次", item: "减免配送费。" }
      ]
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    couldPay: function() {
      return /^\d{10}$/.test(this.cartNumber) && /^\d{6}$/.test(this.passWord)
    }
  },
  methods: {
    confrimPay() {
      if (this.couldPay) {
        vipCard(this.userInfo.user_id, this.cartNumber, this.passWord).then(
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
          }
        )
      }
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import "../../../../style/mixin.less";
header {
  padding: 0.1rem 0.2rem;
  .sc(0.15rem, #666);
  span {
    font-weight: 700;
  }
}
section {
  .flex();
  flex-direction: column;
  padding: 0.1rem 0.2rem;
  input {
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    .sc(0.16rem, #999);
  }
}
p {
  background-color: #ccc;
  text-align: center;
  .sc(0.17rem);
  font-weight: 700;
  padding: .1rem 0;
  margin-top: .1rem;
  .border-radius(5px);
}
.could-pay {
  background-color: #4cd964;
}
footer {
  margin-top: .1rem;
  padding: 0 .2rem;
  h5 {
    .sc(.16rem, #aaa);
    text-align: center;
    div, b {
      .sc(.14rem, #aaa);
      line-height: .3rem;
    }
  }
}
</style>
