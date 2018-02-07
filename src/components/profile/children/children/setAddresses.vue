<template>
  <div class="addresses-view">
    <my-header :title="title"
      :isSearch="isSearch"
      :isBack="isBack"
      :isLogin="isLogin"></my-header>
    <section v-if="addressess.length"
      class="addresses">
      <ul>
        <li v-for="(address, index) in addressess"
          :key="index">
          <div>
            <p>{{address.address}}</p>
            <p>{{address.phone}}</p>
          </div>
          <img src="../../../../assets/img/delete.svg"
            alt=""
            @click="deleteAddress(address.id)">
        </li>
      </ul>
      <div class="addNew"
        @click="addAddress">新增收货地址
        <span></span>
      </div>
    </section>
    <transition name="router-slid"
      mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import myHeader from "@/components/header/header";
import { getAddresses, delAddress } from "@/config/getData";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "修改收货地址",
      isSearch: false,
      isBack: true,
      isLogin: false,
      addressess: []
    };
  },
  created() {
    this._getAddresses();
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    _getAddresses() {
      getAddresses(this.userInfo.user_id).then(
        res => {
          this.addressess = res.body;
        },
        err => {
          console.log(err);
        }
      );
    },
    deleteAddress(address_id) {
      delAddress(this.userInfo.user_id, address_id).then(
        res => {
          this._getAddresses();
        },
        err => {
          console.log(err);
        }
      );
    },
    addAddress() {
      this.$router.push({ path: "/profile/info/addresses/addAddress" });
    }
  },
  components: {
    myHeader
  }
};
</script>

<style lang="less" scoped>
@import "../../../../style/mixin.less";
.addresses-view {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 11;
  background-color: #f5f5f5;
  padding-top: 0.46rem;
  .addresses {
    ul {
      li {
        .flex();
        align-items: center;
        background-color: #fff;
        padding: 0.1rem;
        border-bottom: 1px solid #ccc;
        margin-bottom: 0.1rem;
        div {
          flex: 1;
          p {
            .sc(0.14rem, #333);
          }
        }
        img {
          .wh(0.3rem, 0.3rem);
          padding: 5px;
        }
      }
    }
    .addNew {
      .sc(0.16rem, #000);
      position: relative;
      padding: 0.1rem;
      background: #fff;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
      span {
        position: absolute;
        right: 0.1rem;
        top: 50%;
        transform: translateY(-50%) rotate(-45deg);
        .wh(0.1rem, 0.1rem);
        border-bottom: 2px solid #ccc;
        border-right: 2px solid #ccc;
      }
    }
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
