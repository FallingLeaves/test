<template>
  <div>
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
export default {
  data () {
    return {
      title: "会员特权",
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

</style>
