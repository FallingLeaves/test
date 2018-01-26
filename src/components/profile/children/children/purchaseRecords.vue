<template>
  <div>
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <section>
      <img src="../../../../assets/img/no-log.png" alt="">
      <p>无购买记录</p>
    </section>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
export default {
  data() {
    return {
      title: "购买记录",
      isSearch: false,
      isBack: true,
      isLogin: false
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import "../../../../style/mixin.less";
section {
  padding: 0.1rem 0.2rem;
  .flex();
  flex-direction: column;
  align-items: center;
  img {
    .wh(0.6rem, 0.34rem);
  }
  p {
    .sc(0.16rem, #999);
  }
}
</style>
