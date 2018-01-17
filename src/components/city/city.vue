<template>
  <div class="view">
    <my-header :title="city.name" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin" v-if="city"></my-header>
    <div class="search">
      <input type="text" placeholder="输入学校、商务楼、地址" v-model="keyword" @keyup.enter="search">
      <input type="button" value="搜索" @click="search">
    </div>
    <div class="history" v-if="historyTitle">
      搜索历史
    </div>
    <div class="place-list" v-if="placeList.length">
      <ul>
        <li v-for="(item, index) in placeList" :key="index" @click="enter(index, item.geohash)">
          <h4>{{item.name}}</h4>
          <p>{{item.address}}</p>
        </li>
      </ul>
      <div class="clear" @click="clear">清空所有</div>
    </div>
    <div class="no-place" v-if="noPlace">很抱歉！无搜索结果</div>
  </div>
</template>

<script>
import { cityChoose, citySearch } from "@/config/getData"
import { setStore, getStore, removeStore } from "@/config/mUtil"
import myHeader from "@/components/header/header"
export default {
  data() {
    return {
      isBack: true,
      isLogin: false,
      isSearch: false,
      keyword: "",//搜索关键字
      city: null,//选择城市信息
      history: [],//缓存搜索历史
      placeList: [],//根据关键字展示的地点、缓存搜索历史
      historyTitle: true,//有搜索历史
      noPlace: false//没有搜索结果
    }
  },
  created() {
    this._cityChoose()
    this.getHistory()
  },
  methods: {
    _cityChoose() {
      cityChoose(this.$route.params.id).then(
        res => {
          this.city = res.body
        },
        err => {
          console.log(err)
        }
      )
    },
    getHistory() {
      if (getStore("historyPlace")) {
        this.placeList = JSON.parse(getStore("historyPlace"))
      } else {
        this.placeList = []
      }
    },
    search() {
      if (this.keyword) {
        citySearch(this.$route.params.id, this.keyword).then(
          res => {
            this.placeList = res.body
            this.historyTitle = false
            this.noPlace = res.body.length? false : true
          },
          err => {
            console.log(err)
          }
        )
      }
    },
    enter(index, geohash) {
      let chooseAddress = this.placeList[index]
      let history = getStore("historyPlace")
      // 判断是否有历史记录
      if (history) {
        let exist = false
        this.history = JSON.parse(history)
        this.history.forEach( item => {
          // 判断历史中是否存在选择的地址
          if (item.geohash == geohash) {
            exist = true
          }
          if (!exist) {
            this.history.push(chooseAddress)
          }
        })
      } else {
        this.history.push(chooseAddress)
      }
      // 存入locaStore
      setStore("historyPlace", this.history)
      // 跳转到选择的地址页面
      this.$router.push({ path: '/site', query: { geohash: geohash }})
    },
    clear() {
      removeStore("historyPlace")
      this.getHistory()
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.view {
  padding-top: .46rem;
}
.search {
  .flex();
  flex-direction: column;
  padding: 0.1rem 0.2rem;
  background-color: #fff;
  margin-top: 0.1rem;
  input[type="text"] {
    .wh(100%, auto);
    padding: 0.05rem;
    border: 1px solid #e4e4e4;
    .border-radius(5px);
    .sc(0.16rem, #333);
    margin-bottom: 0.1rem;
  }
  input[type="button"] {
    .wh(100%, auto);
    padding: 0.05rem 0;
    background-color: @blue;
    .border-radius(5px);
    .sc(0.16rem);
  }
}
.history {
  .sc(0.14rem, #666);
  padding: 0 0.1rem;
  border-top: 2px solid #e4e4e4;
  border-bottom: 2px solid #e4e4e4;
}
.place-list {
  background-color: #fff;
  ul {
    li {
      border-bottom: 1px solid #e4e4e4;
      padding: .1rem .2rem;
      h4 {
        .sc(.14rem, #333);
        margin-bottom: .05rem;
      }
      p {
        .sc(.14rem, #999);
        .ellipsis();
      }
    }
  }
  .clear {
    .sc(.14rem, #666);
    line-height: .4rem;
    text-align: center;
  }
}
.no-place {
  .sc(.16rem, #000);
  font-weight: bold;
}
</style>
