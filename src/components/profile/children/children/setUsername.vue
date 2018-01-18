<template>
  <div class="setname-view">
    <my-header :title="title" :isSearch="isSearch" :isBack="isBack" :isLogin="isLogin"></my-header>
    <section>
      <input type="text" 
             v-model="username" 
             placeholder="输入用户名"
             @input="setname" 
             :class="{'input-warn':!earn}">
      <div class="tip">
        <p v-if="earn">用户名只能修改一次（5-24字符之间）</p>
        <p v-else class="warn">用户名长度在5到24位之间</p>
      </div>
    </section>
    <div class="sure" @click="sureSet" :style="{opacity:opa}">确认修改</div>
  </div>
</template>

<script>
import myHeader from "@/components/header/header"
import { mapMutations } from "vuex"
export default {
  data () {
    return {
      title: "修改用户名",
      isSearch: false,
      isBack: true,
      isLogin: false,
      username: null,
      earn: true,
      opa: 0.5
    }
  },
  methods: {
    setname() {
      if(this.username.length>=5&&this.username.length<=24) {
        this.earn = true
        this.opa = 1
      } else {
        this.earn = false
        this.opa = 0.5
      }
    },
    sureSet() {
      if(this.earn) {
        this.resetName(this.username)
        this.$router.go(-1)
      }
    },
    ...mapMutations({
      resetName: "RESET_NAME"
    })
  },
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import "../../../../style/mixin.less";
.setname-view {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 11;
  background-color: #f5f5f5;
  padding-top: 0.46rem;
  section {
    padding: .1rem;
    input {
      display: block;
      width: 100%;
      .sc(.16rem, #666);
      padding: 8px 5px;
      border:1px solid #ddd;
      .border-radius(2px);
    }
    .input-warn {
      border-color: #ea3106;
    }
    p {
      .sc(.12rem, #666);
      padding: .1rem 0;
    }
    .warn {
      color: #ea3106;
    }
  }
  .sure {
    background-color: @blue;
    .border-radius(5px);
    .sc(.16rem);
    font-weight: 700;
    line-height: .4rem;
    margin: .2rem .1rem;
    text-align: center;
  }
}
</style>
