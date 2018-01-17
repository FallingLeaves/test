<template>
  <div class="view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <div class="search">
      <input type="text" placeholder="输入商店或美食名称" v-model="keyword" @keyup.enter="search">
      <input type="button" value="提交" @click="search">
    </div>
    <div v-if="showHistory&&history.length" class="title">
      搜索历史
    </div>
    <div v-if="placeList.length&&keyword" class="title">
      商家
    </div>
    <div v-if="showHistory&&history.length" class="history">
      <ul>
        <li v-for="(item, index) in history" :key="index">
          <div @click="choose(item)">{{item}}</div>
          <img src="src/assets/img/delete.svg" alt="" @click="del(index)">
        </li>
        <li @click="clear">清空搜索历史</li>
      </ul>
    </div>
    <div v-if="placeList.length&&keyword" class="search-place">
      <ul>
        <li v-for="item in placeList" :key="item.id" @click="enter(item.id)">
          <img v-lazy="SHOP_IMG_BASE_PATH+item.image_path" alt="">
          <div class="info">
            <div>{{item.name}}</div>
            <div>月售 {{item.recent_order_num}} 单</div>
            <div>
              <div>{{item.float_minimum_order_amount}}元起送</div>
              <div>/</div>
              <div>距离{{item.distance}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="no-place" v-if="noPlace">很抱歉！无搜索结果</div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import { searchRestaurants } from "@/config/getData"
import { setStore, getStore, removeStore } from "@/config/mUtil"
import { SHOP_IMG_BASE_PATH } from "@/config/env"
import { mapGetters } from "vuex"
import myHeader from "@/components/header/header"
import TabBar from "@/components/tabBar/tabBar"
export default {
  data() {
    return {
      SHOP_IMG_BASE_PATH,
      title: "搜索",
      isSearch: false,
      isBack: true,
      isLogin: false,
      keyword: "",
      showHistory: true,
      history: [], //缓存搜索历史
      placeList: [], //根据关键字展示的地点
      noPlace: false //没有搜索结果
    }
  },
  computed: {
    ...mapGetters(["geohash"])
  },
  created() {
    this.getHistory()
  },
  mounted () {
    this.refreshback()
  },
  methods: {
    refreshback() {
      if(!this.geohash) {
        this.$router.go(-1)
      }
    },
    getHistory() {
      if (getStore("historySearch")) {
        this.history = JSON.parse(getStore("historySearch"))
      } else {
        this.history = []
      }
    },
    search() {
      if (this.keyword) {
        this.showHistory = false
        searchRestaurants(this.geohash, this.keyword).then(
          res => {
            this.placeList = res.body
            this.noPlace = res.body.length ? false : true
          },
          err => {
            console.log(err)
          }
        )
        let searchPlace = this.keyword
        let history = getStore("historySearch")
        if(history) {
          let exist = false
          this.history = JSON.parse(history)
          this.history.forEach(v=>{
            if(v==searchPlace) {
              exist = true
            }
          })
          if(!exist) {
            this.history.push(searchPlace)
          }
        } else {
          this.history.push(searchPlace)
        }
        setStore("historySearch", this.history)
      }
    },
    clear() {
      removeStore("historySearch")
      this.showHistory = false
      this.getHistory()
    },
    del(index) {
      console.log(index)
      let history = JSON.parse(getStore("historySearch"))
      history.splice(index, 1)
      setStore("historySearch", history)
      this.getHistory()
    },
    choose(item) {
      this.keyword = item
      this.search()
    },
    enter(id) {
      this.$router.push({ path: `/shop/${id}`})
    }
  },
  components: {
    myHeader,
    TabBar
  },
  watch: {
    keyword(val) {
      if(!val) {
        this.showHistory = true
        this.noPlace = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.view {
  padding-top: 0.46rem;
}
.search {
  .flex();
  padding: 0.1rem 0.2rem;
  background-color: #fff;
  input[type="text"] {
    .wh(70%, auto);
    padding: 0.05rem;
    border: 1px solid #e4e4e4;
    .border-radius(5px);
    .sc(0.16rem, #333);
  }
  input[type="button"] {
    .wh(20%, auto);
    padding: 0.05rem 0;
    background-color: @blue;
    .border-radius(5px);
    .sc(0.16rem);
  }
}
.title {
  .sc(0.14rem, #000);
  padding: .1rem .2rem;
}
.history {
  background-color: #fff;
  ul {
    li {
      padding: .1rem .2rem;
      .flex();
      align-items: center;
      .sc(.16rem, #000);
      border-bottom: 1px solid #e4e4e4;
      &:last-of-type {
        color: @blue;
        border-bottom: none;
        text-align: center;
      }
      > div {
        flex: 1;
      }
      img {
        .wh(.3rem, .3rem);
      }
    }
  }
}
.search-place {
  background-color: #fff;
  .sc(.14rem, #000);
  ul {
    li {
      height: .8rem;
      padding: 0 .2rem;
      .flex(flex-start);
      align-items: center;
      border-bottom: 1px solid #e4e4e4;
      img {
        .wh(.5rem, .5rem);
        margin-right: .2rem;
      }
      .info {
        .flex();
        flex-direction: column;
        > div:nth-of-type(3) {
          .flex();
        } 
      }
    }
  }
}
.no-place {
  .sc(0.16rem, #000);
  font-weight: bold;
  text-align: center;
}
</style>
