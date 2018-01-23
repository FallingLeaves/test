<template>
  <div>
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <section>
      <img src="src/assets/img/no-log.png" alt="">
      <p>无购买记录</p>
    </section>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
export default {
  data () {
    return {
      title: "购买记录",
      isSearch: false,
      isBack: true,
      isLogin: false,
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
  padding: .1rem .2rem;
  .flex();
  flex-direction: column;
  align-items: center;
  img {
    .wh(.6rem, .34rem);
  }
  p {
    .sc(.16rem, #999);
  }
}
</style>
