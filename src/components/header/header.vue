<template>
  <div class="header">
    <span v-if="isBack == true" class="back" @click="back"></span>
    <span v-if="isSearch == true">搜索</span>
    <span v-if="_isHome == true">ele.me</span>
    <span v-if="title" class="title">{{title}}</span>
    <div v-if="isLogin == true">
      <router-link to="/login">登录</router-link>|<router-link to="/login">注册</router-link>
    </div>
    <div v-if="_isCity == true" class="choose-city">
      <router-link to="/home">切换城市</router-link>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      _isHome: null,
      _isCity: null
    }
  },
  computed: {
    
  },
  props: {
    title: {//头部标题
      type: String,
      default: null
    },
    isSearch: {//是否显示搜索按钮
      type: Boolean,
      default: null
    },
    isBack: {//是否显示返回按钮
      type: Boolean,
      default: null
    },
    isLogin: {//是否显示登录按钮
      type: Boolean,
      default: null
    }
  },
  created () {
    this.isHome()
    this.isCity()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    isHome() {//判断是否是首页
      if(this.$route.path.indexOf("/home")!=-1) {
        return this._isHome = true
      } else {
        return this._isHome = false
      }
    },
    isCity() {//判断是否是
      if(this.$route.path.indexOf("/city")!=-1) {
        return this._isCity = true
      } else {
        return this._isCity = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.header {
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: @blue;
  line-height: .46rem;
  padding: 0 .1rem;
  .wh(100%, .46rem);
  .sc(.14rem);
  .flex();
  .back {
    position: absolute;
    .wh(.15rem, .15rem);
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  .title {
    .center;
    .sc(.16rem);
    font-weight: bold;
    width: 50%;
    text-align: center;
    .ellipsis();
  }
  .choose-city {
    position: absolute;
    right: .1rem;
  }
}
</style>
