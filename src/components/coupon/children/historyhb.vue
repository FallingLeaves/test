<template>
  <div>
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
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
      limit: 20,
      offset: 0,
      historyHb: []
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    this._getExpired();
  },
  mounted() {
    // this._getExpired();
  },
  methods: {
    _getExpired() {
      if (this.userInfo) {
        console.log("-------------");

        getExpired(this.userInfo.user_id, this.limit, this.offset).then(
          res => {
            this.historyHb = res.body;
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  },
  components: {
    myHeader
  },
  watch: {
    $route(to, from) {
      this._getExpired();
    }
  }
};
</script>


<style lang="less" scoped>

</style>
