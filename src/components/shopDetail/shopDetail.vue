<template>
  <div class="shopDetail-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <div class="actAndAttr">
      <h5>活动与属性</h5>
      <ul v-if="actAndAttr.length">
        <li v-for="(item, index) in actAndAttr" :key="index">
          <div :style="{backgroundColor:`#${item.icon_color}`}" class="item">{{item.icon_name}}</div>
          <div>{{item.description}}<span>（APP专享）</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import { shop } from "@/config/getData"
export default {
  data() {
    return {
      title: "商家详情",
      isSearch: false,
      isBack: true,
      isLogin: false,
      actAndAttr: []
    }
  },
  created() {
    this._shop()
  },
  methods: {
    _shop() {
      shop(this.$route.params.id).then(
        res => {
          this.actAndAttr = res.body.activities.concat(res.body.supports)
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.shopDetail-view {
  padding-top: 0.46rem;
  background-color: rgb(235, 235, 235);
  .actAndAttr {
    background-color: #fff;
    h5 {
      padding: 10px;
      .sc(0.18rem, #000);
      border-bottom: 1px solid rgb(235, 235, 235);
    }
    ul {
      li {
        .flex(flex-start);
        align-items: center;
        .sc(.14rem, #333);
        padding: 10px;
        .item {
          color: #fff;
          padding: 1px 3px;
          .border-radius(5px);
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
