<template>
  <div>
    <footer>
      <div @click="go({path: '/site', query: {geohash: geohash}})">
        <i class="iconfont" :class="{active: this.$route.path.indexOf('/site')!=-1}">&#xe68a;</i>
        <span>外卖</span>
      </div>
      <div @click="go({path: '/search'})">
        <i class="iconfont" :class="{active: this.$route.path.indexOf('/search')!=-1}">&#xe647;</i>
        <span>搜索</span>
      </div>
      <div @click="go({path: '/order'})">
        <i class="iconfont" :class="{active: this.$route.path.indexOf('/order')!=-1}">&#xe624;</i>
        <span>订单</span>
      </div>
      <div @click="go({path: '/profile'})">
        <i class="iconfont" :class="{active: this.$route.path.indexOf('/profile')!=-1}">&#xe601;</i>
        <span>我的</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      "geohash"
    ])
  },
  methods: {
    go(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
footer {
  .flex();
  position: fixed;
  z-index: 1000;
  height: .46rem;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  > div {
    .sc(.12rem, #666);
    flex: 1;
    .flex(center);
    flex-direction: column;
    align-items: center;
  }
}

.active {
  color: @blue;
}
</style>
