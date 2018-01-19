<template>
  <div class="member-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <scroll class="member-scroll">
      <div>
        <p class="top">为账户<span>{{userInfo.username}}</span>购买会员</p>
      </div>
    </scroll>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import Scroll from "@/base/scroll/scroll"
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      title: "会员中心",
      isSearch: false,
      isBack: true,
      isLogin: false
    }
  },
  created () {
    
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    
  },
  components: {
    myHeader,
    Scroll
  }
}
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";
.member-view {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 11;
  background-color: #f5f5f5;
  padding-top: 0.46rem;
  overflow: hidden;
  .member-scroll {
    height: 100%;
    overflow: hidden;
  }
  .top {
    .sc(.14rem, #ccc);
  }
}
</style>
