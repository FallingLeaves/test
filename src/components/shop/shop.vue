<template>
  <div class="view">
    <shop-top :id="getId"></shop-top>
    <nav>
      <div v-for="(item, index) in title">
        <span :class="{active:currentIndex==index}" @click="choose(index)">{{item}}</span>
      </div>
    </nav>
    <shop-food :id="getId" class="shop-food"></shop-food>
  </div>
</template>

<script>
import ShopTop from '@/base/shopTop/shopTop'
import ShopFood from '@/base/shopFood/shopFood'
export default {
  data () {
    return {
      title: ["商品", "评论"],
      currentIndex: 0
    }
  },
  computed: {
    getId() {
      return Number(this.$route.params.id)
    }
  },
  created () {
    
  },
  methods: {
    choose(index) {
      this.currentIndex = index
    }
  },
  components: {
    ShopTop,
    ShopFood
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.view {
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  overflow: hidden;
  .flex();
  flex-direction: column;
  > nav {
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    .flex();
    > div {
      flex: 1;
      padding: .15rem 0;
      .sc(.16rem, #666);
      text-align: center;
      >span.active {
        color: @blue;
        border-bottom: 3px solid @blue;
      }
    }
  }
  .shop-food {
    flex: 1;
    padding-bottom: .5rem;
    overflow: hidden;
  }
}
</style>
