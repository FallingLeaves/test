<template>
  <div class="addresses-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import { getAddresses } from "@/config/getData"
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      title: "修改收货地址",
      isSearch: false,
      isBack: true,
      isLogin: false,
      addressess: []
    }
  },
  created() {
    this._getAddresses()
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    _getAddresses() {
      getAddresses(this.userInfo.user_id).then(
        res => {
          this.addressess = res.body
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  components: {
    myHeader
  }
}
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
}
</style>
