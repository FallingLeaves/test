<template>
  <div class="history-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <scroll :data="historyHb" class="history-srcoll" :pullup="pullup" @scrollToEnd="onScrollToEnd">
      <div>
        <ul>
          <li v-for="(item, index) in historyHb" :key="index">
            <section>
              <div class="num">
                <div>
                  <span>¥</span>
                  <span>{{String(item.amount).split(".")[0]}}</span>
                  <span>.</span>
                  <span>{{String(item.amount).split(".")[1] || 0}}</span>
                </div>
                <p>{{item.description_map.sum_condition}}</p>
              </div>
              <div class="info">
                <p>{{item.name}}</p>
                <div>{{item.description_map.validity_periods}}</div>
                <div>{{item.description_map.phone}}</div>
              </div>
              <div class="last-day">
                <!-- {{item.description_map.validity_delta}} -->
                <img src="../../../../static/img/expire.svg" alt="">
              </div>
            </section>
            <footer v-if="item.limit_map">
              {{item.limit_map.restaurant_flavor_ids}}
            </footer>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import myHeader from "@/components/header/header";
import Scroll from "@/base/scroll/scroll";
import { mapGetters } from "vuex";
import { getExpired } from "@/config/getData";
export default {
  data() {
    return {
      isBack: true,
      isSearch: false,
      isLogin: false,
      title: "历史红包",
      limit: 10,
      offset: 0,
      historyHb: [],
      pullup: true
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    this._getExpired();
  },
  methods: {
    _getExpired() {
      if (this.userInfo) {
        getExpired(this.userInfo.user_id, this.limit, this.offset).then(
          res => {
            this.historyHb = res.body;
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    onScrollToEnd() {
      if (this.historyHb.length == this.limit) {
        this.limit += 20;
      }
    }
  },
  components: {
    myHeader,
    Scroll
  },
  watch: {
    userInfo() {
      this._getExpired();
    },
    limit() {
      this._getExpired();
    }
  }
};
</script>


<style lang="less" scoped>
@import "../../../style/mixin.less";
.history-view {
  .history-srcoll {
    height: 100%;
  }
  ul {
    padding: 0 0.1rem;
    li {
      padding: 0.2rem 0.1rem;
      background-image: url("../../../../static/img/expired.png");
      background-repeat: repeat-x;
      background-position: top;
      background-color: #fff;
      background-size: 10px 4px;
      .border-radius(8px);
      margin-bottom: 0.1rem;
      position: relative;
      section {
        .flex();
      }
      footer {
        .sc(0.12rem, #999);
        margin-top: 0.1rem;
      }
      .num {
        border-right: 1px dotted #ccc;
        font-size: 0;
        padding-right: 0.1rem;
        span {
          color: #bfbfbf;
          &:nth-of-type(1) {
            font-size: 0.14rem;
            font-weight: 700;
          }
          &:nth-of-type(2) {
            font-size: 0.2rem;
          }
          &:nth-of-type(3) {
            font-size: 0.14rem;
            font-weight: 700;
          }
          &:nth-of-type(4) {
            font-size: 0.16rem;
            font-weight: 700;
          }
        }
        p {
          .sc(0.12rem, #999);
        }
      }
      .info {
        flex: 2;
        padding: 0 0.1rem;
        p {
          .sc(0.16rem, #666);
          .ellipsis();
        }
        div {
          .sc(0.12rem, #999);
          .ellipsis();
        }
      }
      .last-day {
        // .sc(0.18rem, #bfbfbf);
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        img {
          .wh(0.8rem, 0.8rem);
        }
      }
    }
  }
}
</style>
