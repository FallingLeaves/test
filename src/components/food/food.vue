<template>
  <div class="view">
    <my-header :title="this.$route.params.category" :isBack="isBack"></my-header>
    <choose-category @selectShop="selectShop" @selectOrder="selectOrder" @selectAttr="selectAttr"></choose-category>
    <scroll class="scroll" :data="shopList" :pullup="pullup" @scrollToEnd="onScrollToEnd">
      <div>
        <shop-list  :latitude="latitude" 
                :longitude="longitude" 
                :limit="limit" 
                :restaurant_category_ids="restaurant_category_ids"
                :order_by="order_by"
                :support_ids="support_ids"
                v-if="latitude">
        </shop-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import ShopList from "@/base/shopList/shopList"
import ChooseCategory from '@/base/chooseCategory/chooseCategory'
import Scroll from "@/base/scroll/scroll"
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      isBack: true,
      isSearch: false,
      isLogin: false,
      limit: 20,
      restaurant_category_ids: null,
      order_by: 4,
      support_ids: null,
      pullup: true
    }
  },
  computed: {
    ...mapGetters(["latitude", "longitude", "shopList"])
  },
  created() {
    
  },
  methods: {
    selectShop(id) {
      this.limit = 20
      this.restaurant_category_ids = id
    },
    selectOrder(order_by) {
      this.limit = 20
      this.order_by = order_by
    },
    selectAttr(arr) {
      this.limit = 20
      this.support_ids = arr
    },
    onScrollToEnd() {
      if (this.shopList.length == this.limit) {
        this.limit += 20
      }
    }
  },
  components: {
    myHeader,
    ShopList,
    ChooseCategory,
    Scroll
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.view {
  padding-top: 0.86rem;
}
.scroll {
  position: fixed;
  top: .86rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
