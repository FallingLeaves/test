<template>
  <div>
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import myHeader from "@/components/header/header";
import Loading from "@/base/loading/loading";
export default {
  data() {
    return {
      isBack: true,
      isSearch: false,
      isLogin: false,
      title: "推荐有奖",
      loading: true
    };
  },
  components: {
    myHeader,
    Loading
  },
  mounted() {
    this.closeLoading();
  },
  methods: {
    closeLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";
</style>
