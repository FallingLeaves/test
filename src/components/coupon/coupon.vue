<template>
  <div class="coupon-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
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
      title: "我的优惠"
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.coupon-view {
  padding-top: 0.46rem;
}
</style>
