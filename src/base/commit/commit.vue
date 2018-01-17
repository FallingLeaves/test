<template>
  <div class="commit-view" v-if="scorses.overall_score">
    <header v-if="scorses.overall_score">
      <div class="scorse">
        <h4>{{scorses.overall_score.toFixed(1)}}</h4>
        <p>综合评价</p>
        <div>高于周边商家{{(scorses.compare_rating*100).toFixed(1)+"%"}}</div>
      </div>
      <div class="rating">
        <section>
          <div class="rating-item">服务态度</div>
          <rating :rating="scorses.service_score"></rating>
          <div class="rating-item-scorse">{{scorses.service_score.toFixed(1)}}</div>
        </section>
        <section>
          <div class="rating-item">菜品评价</div>
          <rating :rating="scorses.food_score"></rating>
          <div class="rating-item-scorse">{{scorses.food_score.toFixed(1)}}</div>
        </section>
        <section>
          <div class="rating-item">送达时间</div>
          <div class="deliver-time">{{scorses.deliver_time}}分钟</div>
        </section>
      </div>
    </header>
    <scroll :data="commits" :pullup="pullup"  @scrollToEnd="onScrollToEnd" class="commits-scroll">
      <div>
        <div class="tags" v-if="tags.length">
          <ul>
            <li v-for="(item, index) in tags" 
                :key="index" 
                :class="{active:tagIndex==index,unsatisfied:item.unsatisfied}"
                @click="selectTag(index)">
                {{item.name}}({{item.count}})
            </li>
          </ul>
        </div>
        <div class="commits">
          <section v-for="(commit, index) in commits" :key="index">
            <div class="avatar">
              <img v-lazy="commit.avatar" alt="">
            </div>
            <div class="info">
              <header>
                <div>{{commit.username}}</div>
                <div>{{commit.rated_at}}</div>
              </header>
              <div class="rating-star">
                <rating :rating="commit.rating_star"></rating>
                <div>{{commit.time_spent_desc}}</div>
              </div>
              <div class="item-ratings">
                <ul>
                  <li v-for="(item, index) in commit.item_ratings" :key="item.food_id">
                    <img v-lazy="item.image_hash" alt="">
                    <div>{{item.food_name}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Rating from "@/base/rating/rating"
import Scroll from "@/base/scroll/scroll"
import { ratingsScorse, ratingsTags, ratings } from "@/config/getData"
import { FOOD_IMG_BASE_URL } from "@/config/env"
export default {
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      FOOD_IMG_BASE_URL,
      scorses: {},
      tags: [],
      tagIndex: 0,
      ratingObj: {
        offset: 0,
        limit: 10
      },
      commits: [],
      pullup: true
    }
  },
  created() {
    this._ratingsScorse()
    this._ratingsTags()
  },
  methods: {
    _ratingsScorse() {
      ratingsScorse(this.id).then(
        res => {
          this.scorses = res.body
        },
        err => {
          console.log(err)
        }
      )
    },
    _ratingsTags() {
      ratingsTags(this.id).then(
        res => {
          this.tags = res.body
          this.initRatingObj()
        },
        err => {
          console.log(err)
        }
      )
    },
    selectTag(index) {
      this.tagIndex = index
      this.initRatingObj()
    },
    initRatingObj() {
      this.ratingObj.tagname = this.tags[this.tagIndex].name
      this._ratings()
    },
    _ratings() {
      ratings(this.id, this.ratingObj).then(
        res => {
          res.body.forEach(v1 => {
            if (v1.item_ratings.length) {
              v1.item_ratings.forEach(v2 => {
                v2.image_hash =
                  this.FOOD_IMG_BASE_URL + this.changeUrl(v2.image_hash)
              })
            }
            if (v1.avatar) {
              v1.avatar = this.FOOD_IMG_BASE_URL + this.changeUrl(v1.avatar)
            } else {
              v1.avatar = "http://test.fe.ptdev.cn/elm/elmlogo.jpeg"
            }
          })
          this.commits = res.body
        },
        err => {
          console.log(err)
        }
      )
    },
    changeUrl(str) {
      var url
      "gif,jpg,jpeg,png,GIF,JPG,PNG".split(",").forEach(item => {
        if (str.indexOf(item) != -1) {
          var newStr = str.replace(item, item + "." + item)
          var arr = newStr.split("")
          arr.splice(0, 1, "/" + arr[0] + "/")
          arr.splice(2, 1, arr[2] + "/")
          url = arr.join("")
        }
      })
      return url
    },
    onScrollToEnd() {
      if (this.commits.length == this.ratingObj.limit) {
        this.ratingObj.limit += 10
        this.initRatingObj()
      }
    }
  },
  components: {
    Rating,
    Scroll
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.commit-view {
  flex: 1;
  background-color: rgb(245, 245, 245);
  overflow: hidden;
  .flex();
  flex-direction: column;
  > header {
    .flex(flex-start);
    align-items: center;
    padding: 0.2rem;
    background-color: #fff;
    margin-bottom: 0.1rem;
    .scorse {
      text-align: center;
      padding: 0 0.2rem;
      h4 {
        .sc(0.2rem, @orange);
      }
      p {
        .sc(0.16rem, #333);
      }
      div {
        .sc(0.14rem, #999);
      }
    }
    .rating {
      flex: 1;
      .flex();
      flex-direction: column;
      > section {
        .flex();
        align-items: center;
        .rating-item {
          .sc(0.16rem, #333);
        }
        .rating-item-scorse {
          .sc(0.14rem, @orange);
        }
        .deliver-time {
          flex: 1;
          padding-left: 0.1rem;
          .sc(0.14rem, #999);
        }
      }
    }
  }
  .commits-scroll {
    flex: 1;
    overflow: hidden;
  }
  .tags {
    background-color: #fff;
    padding: 0.2rem;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 0.2rem;
      right: 0.2rem;
      height: 1px;
      background-color: rgb(245, 245, 245);
      bottom: 0;
    }
    ul {
      .flex(flex-start);
      flex-wrap: wrap;
      li {
        .sc(0.14rem, #333);
        background-color: rgb(219, 234, 250);
        padding: 5px;
        .border-radius(8px);
        margin-right: 10px;
        margin-bottom: 5px;
      }
      .active {
        color: #fff !important;
        background-color: @blue !important;
      }
      .unsatisfied {
        color: gray;
        background-color: rgb(245, 245, 245);
      }
    }
  }
  .commits {
    flex: 1;
    overflow: hidden;
    background-color: #fff;
    padding: 0 0.2rem;
    section {
      padding: 10px 0;
      border-bottom: 1px solid rgb(245, 245, 245);
      .flex();
      .avatar {
        .wh(0.4rem, 0.4rem);
        .border-radius(50%);
        overflow: hidden;
        margin-right: 20px;
      }
      .info {
        flex: 1;
        header {
          .flex();
          .sc(0.12rem, #333);
        }
        .rating-star {
          .flex(flex-start);
          .sc(0.14rem, #333);
        }
        .item-ratings {
          ul {
            .flex(flex-start);
            flex-wrap: wrap;
            li {
              margin-right: 10px;
              img {
                .wh(0.7rem, 0.7rem);
              }
              div {
                .ellipsis();
                .wh(0.6rem, auto);
                .sc(0.14rem, #999);
                margin: 10px auto;
                padding: 2px 5px;
                border: 1px solid #969393;
                .border-radius(5px);
              }
            }
          }
        }
      }
    }
  }
}
</style>
