<template>
  <div class="coupon-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <nav class="category-title">
      <div @click="categoryType=0">
        <span :class="{active: categoryType==0}">红包</span>
      </div>
      <div @click="categoryType=1">
        <span :class="{active: categoryType==1}">商家代金券</span>
      </div>
    </nav>
    <transition name="router-fade">
      <section v-if="categoryType==0" class="hongBaoList">
        <scroll :data="hongBaoList" class="coupon-scroll">
          <div>
            <header>
              <div>有<span>{{hongBaoList.length}}</span>个红包即将到期</div>
              <router-link to="/coupon/detail" class="enterDetail">
                <img src="../../assets/img/description.png" alt="">
                <span>红包说明</span>
              </router-link>
            </header>
            <ul>
              <li v-for="(item, index) in hongBaoList" :key="index">
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
                    {{item.description_map.validity_delta}}
                  </div>
                </section>
                <footer v-if="item.limit_map">
                  {{item.limit_map.restaurant_flavor_ids}}
                </footer>
              </li>
            </ul>
            <div class="history-hongbao" @click="lookhb">
              <div>查看历史红包</div><span></span>
            </div>
          </div>
          <div class="foot">
            <div @click="exchange">兑换红包</div>
            <div @click="commend">推荐有奖</div>
          </div>
        </scroll>
      </section>
    </transition>
    <transition name="router-fade">
      <section v-if="categoryType==1" class="chit">
        <header>
          <router-link to="/coupon/chit" class="enterChit">
            <img src="../../assets/img/description.png" alt="">
            <span>商家代金券说明</span>
          </router-link>
        </header>
        <div class="no-log">
          <img src="../../assets/img/voucher.png" alt="">
          <div>无法使用代金券</div>
        </div>
      </section>
    </transition>
    <transition name="router-slid" mode="out-in">
      <router-view class="coupon-next"></router-view>
    </transition>
  </div>
</template>

<script>
import myHeader from "@/components/header/header";
import Scroll from "@/base/scroll/scroll";
import { getHongBao } from "@/config/getData";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isBack: true,
      isSearch: false,
      isLogin: false,
      title: "我的优惠",
      categoryType: 0,
      hongBaoList: [],
      limit: 20,
      offset: 0
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    this._getHongBao();
  },
  methods: {
    _getHongBao() {
      if (this.userInfo) {
        getHongBao(this.userInfo.user_id, this.limit, this.offset).then(
          res => {
            this.hongBaoList = res.body;
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    lookhb() {
      this.$router.push({ path: "/coupon/historyhb" });
    },
    commend() {
      this.$router.push({ path: "/coupon/commend" });
    },
    exchange() {
      this.$router.push({ path: "/coupon/exchange" });
    }
  },
  components: {
    myHeader,
    Scroll
  },
  watch: {
    userInfo() {
      this._getHongBao();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.coupon-view {
  padding-top: 0.46rem;
  .flex();
  flex-direction: column;
  .category-title {
    .flex();
    background-color: #fff;
    padding: 0.1rem 0;
    > div {
      flex: 1;
      padding: 0.1rem 0;
      text-align: center;
      .sc(0.14rem, #333);
      span {
        border-bottom: 3px solid #fff;
      }
      .active {
        color: @blue;
        border-bottom: 3px solid @blue;
      }
    }
  }
  .hongBaoList {
    flex: 1;
    overflow: hidden;
    position: relative;
    .coupon-scroll {
      height: 100%;
      overflow: hidden;
    }
    header {
      .flex();
      align-items: center;
      padding: 0.1rem;
      .sc(0.14rem, #666);
      span {
        color: #ff5340;
      }
      .enterDetail {
        .flex();
        align-items: center;
        img {
          .wh(15px, 15px);
          margin-right: 0.1rem;
        }
        span {
          color: @blue;
        }
      }
    }
    ul {
      padding: 0 0.1rem;
      li {
        padding: 0.2rem 0.1rem;
        background-image: url("../../../static/img/hongbao.png");
        background-repeat: repeat-x;
        background-position: top;
        background-color: #fff;
        background-size: 10px 4px;
        .border-radius(8px);
        margin-bottom: 0.1rem;
        section {
          .flex();
        }
        footer {
          .sc(0.12rem, #999);
          margin-top: 0.1rem;
        }
        .num {
          flex: 1;
          border-right: 1px dotted #ccc;
          font-size: 0;
          padding-right: 0.1rem;
          span {
            color: #ff5340;
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
          .sc(0.18rem, #ff5340);
        }
      }
    }
    .history-hongbao {
      .flex(center);
      align-items: center;
      .sc(0.14rem, #999);
      span {
        .wh(0.08rem, 0.08rem);
        border-bottom: 1px solid #999;
        border-right: 1px solid #999;
        transform: rotate(-45deg);
      }
    }
    .foot {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      .flex();
      background: #fff;
      div {
        flex: 1;
        .sc(0.14rem, #555);
        padding: 0.2rem 0;
        text-align: center;
      }
    }
  }

  .chit {
    flex: 1;
    header {
      .flex(flex-end);
      align-items: center;
      padding: 0.1rem;
      .sc(0.14rem, #666);
      .enterChit {
        .flex();
        align-items: center;
        img {
          .wh(15px, 15px);
          margin-right: 0.1rem;
        }
        span {
          color: @blue;
        }
      }
    }
    .no-log {
      .flex();
      flex-direction: column;
      align-items: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      img {
        .wh(1.4rem, 0.8rem);
      }
      div {
        margin-top: 0.1rem;
        .sc(0.16rem, #666);
      }
    }
  }

  .coupon-next {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 12;
    background-color: #f5f5f5;
    padding-top: 0.46rem;
  }

  .router-fade-enter-active,
  .router-fade-leave-active {
    transition: opacity 0.3s;
  }
  .router-fade-enter,
  .router-fade-leave-active {
    opacity: 0;
  }
  .router-slid-enter-active,
  .router-slid-leave-active {
    transition: all 0.4s;
  }
  .router-slid-enter,
  .router-slid-leave-active {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
