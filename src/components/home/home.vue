<template>
  <div class="view">
    <my-header :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <nav>
      <div class="city-tip">
        <span>当前定位城市</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to='"/city/"+guessCity.id' class="guess-city">
        <span>{{guessCity.name}}</span>
        <span></span>
      </router-link>
    </nav>
    <section class="hot-city">
      <div>热门城市</div>
      <ul>
        <li v-for="item in hotCity" :key="item.id">
          <router-link :to="'/city/'+item.id">{{item.name}}</router-link>
        </li>
      </ul>
    </section>
    <section v-for="(items, index) in sortCityGroup" :key="index" class="group-city">
      <div>
        {{items.title}}<span v-if="index == 0">(按字母排序)</span>
      </div>
      <ul>
        <li v-for="item in items.items" :key="item.id">
          <router-link :to="'/city/'+item.id">{{item.name}}</router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { cityGuess, cityHot, cityGroup } from "@/config/getData"
import myHeader from "@/components/header/header"
export default {
  data() {
    return {
      isBack: false,
      isSearch: false,
      isLogin: true,
      guessCity: {},//猜测城市
      hotCity: [],//热门城市
      groupCity: {},//全部城市
      sortCityGroup: []//处理后的全部城市
    }
  },
  created() {
    this._cityGuess()
    this._cityHot()
    this._cityGroup()
  },
  methods: {
    _cityGuess() {
      cityGuess().then(
        res => {
          this.guessCity = res.body;
        },
        err => {
          console.log(err);
        }
      );
    },
    _cityHot() {
      cityHot().then(
        res => {
          this.hotCity = res.body;
        },
        err => {
          console.log(err);
        }
      );
    },
    _cityGroup() {
      cityGroup().then(
        res => {
          this.groupCity = res.body;
          this._sortCityGroup(this.groupCity)
        },
        err => {
          console.log(err);
        }
      );
    },
    _sortCityGroup(obj) {
      let sortCityGroup = []
      // 全部城市对象转换成数组
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key]
          let map = {
            title: key,
            items: []
          }
          element.forEach(item => {
            map.items.push(item)
          });
          sortCityGroup.push(map)
        }
      }
      // 按字母排序
      sortCityGroup.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      this.sortCityGroup = sortCityGroup
    }
  },
  components: {
    myHeader
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.view {
  padding-top: .46rem;
}
nav {
  background-color: #fff;
  padding-top: 0.1rem;
  margin-bottom: 0.1rem;
  .city-tip {
    .flex();
    align-items: center;
    line-height: 0.4rem;
    padding: 0 0.1rem;
    > span {
      .sc(0.14rem);
      color: #666;
      &:nth-of-type(2) {
        color: #9f9f9f;
      }
    }
  }
  .guess-city {
    .flex();
    align-items: center;
    line-height: 0.4rem;
    border-top: 1px solid #e4e4e4;
    border-bottom: 2px solid #e4e4e4;
    padding: 0 0.1rem;
    > span {
      .sc(0.16rem, @blue);
      &:nth-of-type(2) {
        width: 0.1rem;
        height: 0.1rem;
        border-right: 2px solid #999;
        border-bottom: 2px solid #999;
        transform: rotate(-45deg);
      }
    }
  }
}

.hot-city, .group-city {
  background-color: #fff;
  margin-bottom: .1rem;
  border-bottom: 1px solid #e4e4e4;
  > div {
    .sc(.14rem, #666);
    padding:  0.1rem;
    border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      .flex(center);
      align-items: center;
      border-bottom: 1px solid #e4e4e4;
      border-right: 1px solid #e4e4e4;
      &:nth-of-type(4n) {
        border-right: none;
      }
      a {
        display: block;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        .sc(0.14rem, @blue);
        text-align: center;
        .ellipsis()
      }
    }
  }
}

.group-city {
  ul {
    li {
      a {
        .sc(0.14rem, #666);
      }
    }
  }
}
</style>
