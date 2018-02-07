<template>
  <div class="info-view"
    v-if="userInfo">
    <my-header :title="title"
      :isSearch="isSearch"
      :isBack="isBack"
      :isLogin="isLogin"></my-header>
    <div class="user-info">
      <ul>
        <li class="info-item">
          <input type="file"
            class="upload-avatar"
            accept="images/*"
            @change="changeavatar">
          <div class="info-iten-name">头像</div>
          <div class="avatar">
            <img :src="SHOP_IMG_BASE_PATH+userInfo.avatar"
              alt=""
              v-if="userInfo.avatar">
            <img src="../../../assets/img/user.svg"
              alt=""
              v-else>
          </div>
        </li>
        <li class="info-item"
          @click="setUsername">
          <div class="info-iten-name">用户名</div>
          <div class="user-name">{{userInfo.username}}</div>
        </li>
        <li class="info-item"
          @click="setAddresses">
          <div class="info-iten-name">收货地址</div>
        </li>
      </ul>
    </div>
    <p>账号绑定</p>
    <div class="info-item">
      <div class="info-iten-name">
        <img src="../../../assets/img/mobile.svg"
          alt="">
        <div>手机</div>
      </div>
      <div class="user-name">{{userInfo.mobile}}</div>
    </div>
    <p>安全设置</p>
    <div class="info-item">
      <div class="info-iten-name">
        登录密码
      </div>
      <div class="user-name">修改</div>
    </div>
    <div class="quit">
      退出登录
    </div>
    <transition name="router-slid"
      mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { SHOP_IMG_BASE_PATH } from "@/config/env";
import { getUserInfo, signout, uploadAvatar } from "@/config/getData";
import { getStore, removeStore } from "@/config/mUtil";
import { mapGetters, mapMutations } from "vuex";
import myHeader from "@/components/header/header";
export default {
  data() {
    return {
      SHOP_IMG_BASE_PATH,
      title: "账户信息",
      isSearch: false,
      isBack: true,
      isLogin: false
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {},
  methods: {
    async changeavatar(e) {
      let file = e.target.files[0];
      if (!file.type.match("image.*")) {
        console.log("请上传图片");
        return;
      }
      let data = new FormData();
      data.append("file", file);
      let response = await fetch(
        "http://cangdu.org:8001/eus/v1/users/" +
          this.userInfo.user_id +
          "/avatar",
        {
          method: "POST",
          credentials: "include",
          body: data
        }
      );
      let res = await response.json();
      if (res.status == 1) {
        this.resetAvatar(res.image_path);
      }
    },
    setUsername() {
      this.$router.push({ path: "/profile/info/setusername" });
    },
    setAddresses() {
      this.$router.push({ path: "/profile/info/addresses" });
    },
    ...mapMutations({
      resetAvatar: "RESET_AVATAR"
    })
  },
  components: {
    myHeader
  }
};
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";
.info-view {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 11;
  background-color: #f5f5f5;
  padding-top: 0.46rem;
  .user-info {
    margin-top: 0.1rem;
    border-top: 1px solid #f5f5f5;
  }
  .info-item {
    .flex();
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    padding: 0.1rem 0.3rem 0.1rem 0.1rem;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      .wh(0.08rem, 0.08rem);
      border-bottom: 1px solid #999;
      border-right: 1px solid #999;
      right: 0.1rem;
      top: 50%;
      transform: translateY(-50%) rotate(-45deg);
    }
    .upload-avatar {
      position: absolute;
      .wh(100%, 100%);
      opacity: 0;
    }
    .info-iten-name {
      .sc(0.16rem, #333);
      .flex();
      align-items: center;
      img {
        .wh(0.3rem, 0.3rem);
        margin-right: 0.1rem;
        background-color: @blue;
        .border-radius(5px);
      }
    }
    .avatar {
      .wh(0.4rem, 0.4rem);
      .border-radius(50%);
      overflow: hidden;
    }
    .user-name {
      .sc(0.18rem, #666);
    }
  }
  p {
    .sc(0.14rem, #999);
    padding: 0.1rem;
    border-top: 1px solid #f5f5f5;
  }
  .quit {
    .sc(0.14rem);
    margin: 0.2rem 0.1rem 0;
    background-color: #d8584a;
    text-align: center;
    line-height: 0.4rem;
    .border-radius(5px);
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
