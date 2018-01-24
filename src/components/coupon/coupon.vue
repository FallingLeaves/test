<template>
  <div class="coupon-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <nav class="category-title">
      <div @click="categoryType=0">
        <span :class="{active: categoryType==0}">红包</span>
      </div>
      <div @click="categoryType=1">
        <span :class="{active: categoryType==1}">商家代金券</span>
      </div>
    </nav>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
export default {
  data() {
    return {
      isBack: true,
      isSearch: false,
      isLogin: false,
      title: "我的优惠",
      categoryType: 0
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
  .category-title {
    .flex();
    background-color: #fff;
    padding: 0.1rem 0;
    > div {
      flex: 1;
      padding: 0.1rem 0;
      text-align: center;
      .sc(0.14rem, #333);
      span {
        border-bottom: 3px solid #fff;
      }
      .active {
        border-bottom: 3px solid @blue;
      }
    }
  }
}
</style>
