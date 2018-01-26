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
      <section v-if="categoryType==0">
        <header>
          <div>有<span>{{hongBaoList.length}}</span>个红包即将到期</div>
          <router-link to="/coupon/detail" class="enterDetail">
            <img src="src/assets/img/description.png" alt="">
            <span>红包说明</span>
          </router-link>
        </header>
      </section>
    </transition>
    <transition name="router-fade">
      <section v-if="categoryType==1">

      </section>
    </transition>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import { getHongBao } from "@/config/getData"
import { mapGetters } from "vuex"
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
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    this._getHongBao()
  },
  methods: {
    _getHongBao() {
      if (this.userInfo) {
        getHongBao(this.userInfo.user_id, this.limit, this.offset).then(
          res => {
            this.hongBaoList = res.body
          },
          err => {
            console.log(err)
          }
        )
      }
    }
  },
  components: {
    myHeader
  },
  watch: {
    userInfo() {
      this._getHongBao()
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.coupon-view {
  padding-top: 0.46rem;
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
  section {
    > header {
      .flex();
      align-items: center;
      padding: 0.1rem 0.2rem;
      .sc(0.14rem, #666);
      span {
        color: #ff5340;
      }
      .enterDetail {
        .flex();
        align-items: center;
        img {
          .wh(24px, 24px);
          margin-right: 0.1rem;
        }
        span {
          color: @blue;
        }
      }
    }
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
