<template>
  <div>
    <my-header :title="title"  :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
  </div>
</template>

<script>
import myHeader from '@/components/header/header'
export default {
  data () {
    return {
      title: "登录",
      isSearch: false,
      isLogin: false,
      isBack: true
    }
  },
  created () {
    
  },
  methods: {
    
  },
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>

</style>
