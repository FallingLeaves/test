<template>
  <div class="server-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <nav>
      <div>
        <img src="../../../assets/img/call.svg" alt="">
        <div>在线客服</div>
      </div>
      <div>
        <img src="../../../assets/img/tel.svg" alt="">
        <div>在线客服</div>
      </div>
    </nav>
    <scroll class="server-scroll" :data="question">
      <div>
        <h5>热门问题</h5>
        <section v-if="question.length" v-for="(item, index) in question" :key="index" @click="questionDetail(item)">
          <div>{{item.title}}</div>
          <div class="arrow"></div>
        </section>
      </div>
    </scroll>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import Scroll from "@/base/scroll/scroll"
import { serverCenter } from "@/config/getData"
import { mapMutations } from "vuex"
export default {
  data() {
    return {
      server: null,
      question: [],
      title: "服务中心",
      isSearch: false,
      isBack: true,
      isLogin: false
    }
  },
  created() {
    this.getServer()
  },
  methods: {
    getServer() {
      serverCenter().then(
        res => {
          this.server = res.body
          let arrtitle = new Set()
          let arr = []
          for (const key in this.server) {
            if (key.indexOf("Caption") != -1) {
              arrtitle.add(this.server[key])
            }
          }
          arrtitle.forEach(item => {
            arr.push({
              title: item,
              question: []
            })
          })
          arr.forEach(item => {
            for (const key in this.server) {
              if (this.server[key] == item.title) {
                let k = key.slice(0, -7) + "Content"
                item.question.push(this.server[k])
              }
            }
          })
          this.question = arr
        },
        err => {
          console.log(err)
        }
      )
    },
    questionDetail(item) {
      this.saveQuestions(item)
      this.$router.push({ path: "/profile/server/questionDetail" })
    },
    ...mapMutations({
      saveQuestions: "SAVE_QUESTIONS"
    })
  },
  components: {
    myHeader,
    Scroll
  }
}
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";
.server-view {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 11;
  background-color: #fff;
  padding-top: 0.46rem;
  overflow: hidden;
  .server-scroll {
    height: 100%;
    overflow: hidden;
  }
  nav {
    .flex();
    > div {
      flex: 1;
      .flex();
      padding: 0.1rem;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      border-right: 1px solid #f5f5f5;
      &:nth-of-type(2) {
        border-right: none;
      }
      img {
        .wh(0.3rem, 0.3rem);
      }
      div {
        .sc(0.14rem, #333);
        line-height: 0.4rem;
        text-align: center;
      }
    }
  }
  h5 {
    .sc(0.22rem, #333);
    border-bottom: 1px solid #f5f5f5;
    padding: 0.2rem;
  }
  section {
    position: relative;
    .flex();
    .sc(0.14rem, #666);
    border-bottom: 1px solid #f5f5f5;
    padding: 0.2rem;
    .arrow {
      position: absolute;
      .wh(0.08rem, 0.08rem);
      border-bottom: 1px solid #333;
      border-right: 1px solid #333;
      top: 50%;
      right: 0.2rem;
      transform: translateY(-50%) rotate(-45deg);
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
