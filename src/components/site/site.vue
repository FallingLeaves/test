<template>
  <div class="view">
    <my-header  :isSearch="isSearch" 
                :isLogin="isLogin" 
                :isBack="isBack" 
                :title="site.name" 
                v-if="site">
    </my-header>
    <div class="shop-list">
      <scroll ref="scroll" 
              class="scroll" 
              :data="shopList" 
              :pullup="pullup" 
              @scrollToEnd="onScrollToEnd">
        <div>
          <header>
            <slider v-if="foodSort.length">
              <div>
                <div v-for="item in foodSort.slice(0, 8)" :key="item.id" class="item">
                  <router-link :to="'/food/'+item.title+'/'+item.id">
                    <!-- <img :src="item.image_url" class="needsclick" @load="loadImage"> -->
                    <img v-lazy="item.image_url" class="needsclick" @load="loadImage">
                    <span>{{item.title}}</span>
                  </router-link>
                </div>
              </div>
              <div>
                <div v-for="item in foodSort.slice(8)" :key="item.id" class="item">
                  <router-link :to="'/food/'+item.title+'/'+item.id">
                    <img v-lazy="item.image_url" class="needsclick" @load="loadImage">
                    <span>{{item.title}}</span>
                  </router-link>
                </div>
              </div>
            </slider>
          </header>
          <div class="content">
            <p>附近商家</p>
            <shop-list :latitude="latitude" 
                       :longitude="longitude" 
                       :limit="limit">
            </shop-list>
          </div>
        </div>
      </scroll>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import { mySite, foodSort } from "@/config/getData";
import { FOOD_IMG_BASE_URL } from "@/config/env";
import myHeader from "@/components/header/header";
import TabBar from "@/components/tabBar/tabBar";
import Slider from "@/base/slider/slider";
import Scroll from "@/base/scroll/scroll";
import ShopList from "@/base/shopList/shopList";
import { mapMutations, mapGetters } from "vuex";
import { setStore, getStore, removeStore } from "@/config/mUtil";
export default {
  data() {
    return {
      isSearch: true,
      isLogin: true,
      isBack: false,
      site: {},
      foodSort: [],
      FOOD_IMG_BASE_URL,
      longitude: "",
      latitude: "",
      limit: 20,
      pullup: true,
      reloaded: false
    };
  },
  computed: {
    ...mapGetters(["shopList"])
  },
  created() {
    this._mySite();
    this._footSort();
    this.getLoc();
  },
  mounted() {},
  methods: {
    _mySite() {
      mySite(this.$route.query.geohash).then(
        res => {
          this.site = res.body;
        },
        err => {
          console.log(err);
        }
      );
    },
    _footSort() {
      foodSort().then(
        res => {
          res.body.forEach(item => {
            item.image_url = this.FOOD_IMG_BASE_URL + item.image_url;
          });
          this.foodSort = res.body;
        },
        err => {
          console.log(err);
        }
      );
    },
    getLoc() {
      this.latitude = this.$route.query.geohash.split(",")[0];
      this.longitude = this.$route.query.geohash.split(",")[1];
      this.setLatidute(this.latitude);
      this.setLongitude(this.longitude);
      this.setGeohash();
      setStore("latitude", this.latitude);
      setStore("longitude", this.longitude);
      setStore("geohash", this.$route.query.geohash);
    },
    loadImage() {
      this.$refs.scroll && this.$refs.scroll.refresh();
    },
    onScrollToEnd() {
      if (this.shopList.length == this.limit) {
        this.limit += 20;
      }
    },
    ...mapMutations({
      setLatidute: "SET_LATITUDE",
      setLongitude: "SET_LONGITUDE",
      setGeohash: "SET_GEOHASH"
    })
  },
  watch: {},
  components: {
    myHeader,
    Slider,
    Scroll,
    TabBar,
    ShopList
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.view {
  padding-top: 0.46rem;
}
.shop-list {
  position: fixed;
  width: 100%;
  top: 0.46rem;
  bottom: 0.46rem;
  .scroll {
    height: 100%;
    overflow: hidden;
  }
}
header {
  .item {
    width: 22%;
    .sc(0.12rem, #666);
    padding: 0.1rem;
  }
}
.content {
  background-color: #fff;
  border-top: 1px solid #e4e4e4;
  p {
    .sc(0.14rem, #999);
    padding: 0.1rem;
  }
}
</style>
