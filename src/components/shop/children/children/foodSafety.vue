<template>
  <transition name="fade" mode="out-in">
    <div v-if="shopDetail" class="safety-view">
      <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
      <scroll class="scroll" ref="scroll">
        <div>
          <div class="food-safety">
            <header>
              <h5>食品监督安全公示</h5>
            </header>
            <section>
              <img src="../../../../assets/img/cry.svg" alt="" v-if="shopDetail.status==0">
              <img src="../../../../assets/img/laugh.svg" alt="" v-else>
              <div>
                <div>监督检查结果：<span v-if="shopDetail.status==0" style="color:red">差</span><span v-else style="color: green">优</span></div>
                <div>检查日期：{{shopDetail.identification.licenses_date}}</div>
              </div>
            </section>
          </div>
          <div class="shop-info">
            <h5>工商登记信息</h5>
            <ul>
              <li>
                <p>企业名称</p>
                <p>{{shopDetail.identification.company_name}}</p>
              </li>
              <li>
                <p>工商执照注册号</p>
                <p>{{shopDetail.identification.identificate_agency}}</p>
              </li>
              <li>
                <p>注册资本</p>
                <p>{{shopDetail.identification.registered_number}}</p>
              </li>
              <li>
                <p>注册地址</p>
                <p>{{shopDetail.identification.registered_address}}</p>
              </li>
              <li>
                <p>属地监管所</p>
                <p>{{shopDetail.identification.registered_principal}}</p>
              </li>
              <li>
                <p>法定代表人</p>
                <p>{{shopDetail.identification.legal_person}}</p>
              </li>
              <li>
                <p>经营范围</p>
                <p>{{shopDetail.identification.operation_period}}</p>
              </li>
            </ul>
          </div>
          <div class="shop-info">
            <h5>餐饮许可证</h5>
            <ul>
              <li>
                <p>营业范围</p>
                <p>{{shopDetail.identification.operation_period}}</p>
              </li>
              <li>
                <p>许可证有效期</p>
                <p>{{shopDetail.identification.licenses_date}}</p>
              </li>
              <li>
                <p>许可证号</p>
                <p>{{shopDetail.identification.licenses_number}}</p>
              </li>
              <li>
                <p>发证时间</p>
                <p>{{shopDetail.identification.licenses_scope}}</p>
              </li>
              <li>
                <p>发证机关</p>
                <p>{{shopDetail.identification.registered_principal}}</p>
              </li>
            </ul>
          </div>
          <div class="shop-info">
            <h5>许可证书</h5>
            <div>
              <img v-lazy="SHOP_IMG_BASE_PATH+shopDetail.license.business_license_image" alt="" @load="loadImage">
              <img v-lazy="SHOP_IMG_BASE_PATH+shopDetail.license.catering_service_license_image" alt="" @load="loadImage">
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import myHeader from "@/components/header/header"
import Scroll from "@/base/scroll/scroll"
import { SHOP_IMG_BASE_PATH } from "@/config/env"
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      title: "食品监督安全公示",
      isSearch: false,
      isBack: true,
      isLogin: false,
      SHOP_IMG_BASE_PATH
    }
  },
  created() {
    this.test()
  },
  computed: {
    ...mapGetters(["shopDetail"])
  },
  methods: {
    test() {
      if (!this.shopDetail) {
        this.$router.go(-1)
        return
      }
    },
    loadImage() {
      this.$refs.scroll && this.$refs.scroll.refresh()
    }
  },
  components: {
    myHeader,
    Scroll
  }
}
</script>

<style lang="less" scoped>
@import "../../../../style/mixin.less";
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.safety-view {
  background-color: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 12;
  overflow: hidden;
}

.scroll {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0.46rem;
  bottom: 0;
}

.food-safety {
  background-color: #fff;
  margin-bottom: 0.1rem;
  header {
    .flex();
    padding: 0.1rem;
    border-bottom: 1px solid rgb(235, 235, 235);
    h5 {
      .sc(0.18rem, #000);
    }
  }
  section {
    .flex(flex-start);
    padding: 0.1rem;
    img {
      .wh(0.4rem, 0.4rem);
      margin-right: 0.1rem;
    }
    > div {
      .sc(0.14rem, #333);
      div {
        padding: 0.05rem 0;
      }
    }
  }
}

.shop-info {
  background-color: #fff;
  margin-bottom: 0.1rem;
  h5 {
    .sc(0.18rem, #000);
    padding: 0.1rem;
    border-bottom: 1px solid rgb(235, 235, 235);
  }
  ul {
    li {
      .flex();
      padding: 0.1rem 0.2rem;
      p:nth-of-type(1) {
        .sc(0.16rem, #333);
      }
      p:nth-of-type(2) {
        .sc(0.14rem, #999);
      }
    }
  }
  > div {
    .flex();
    padding: 0.2rem;
    img {
      .wh(40%, 100%);
    }
  }
}
</style>
