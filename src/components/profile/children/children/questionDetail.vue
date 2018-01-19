<template>
  <div class="question-view" v-if="questions">
    <my-header :title="questions.title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <scroll :data="questions.question" class="question-scroll">
      <div>
        <section v-for="item in questions.question" v-html="markdownText(item)">
        </section>
      </div>
    </scroll>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import Scroll from "@/base/scroll/scroll"
import showdown from "showdown"
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      isSearch: false,
      isBack: true,
      isLogin: false
    }
  },
  created () {
    this.test()
  },
  computed: {
    ...mapGetters(["questions"])
  },
  methods: {
    markdownText: function(detail) {
      //转换markDown格式
      let converter = new showdown.Converter()
      return converter.makeHtml(detail)
    },
    test() {
      if(!this.questions) {
        this.$router.go(-1)
      }
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
.question-view {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 11;
  background-color: #fff;
  padding-top: 0.46rem;
  overflow: hidden;
  .question-scroll {
    height: 100%;
    overflow: hidden;
  }
  section {
    .sc(.16rem, #666);
    padding: .2rem;
  }
}
</style>
