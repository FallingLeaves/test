<template>
  <div>
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
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
      title: "商家代金券说明"
    };
  },
  components: {
    myHeader
  }
};
</script>

<style lang="less" scoped>

</style>
