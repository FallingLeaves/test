<template>
  <div class="loading">
    <div class="box">
      <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
      </svg>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 13;
  background-color: #fff;
}

.box {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url("../../assets/img/icon_loading.png") no-repeat;
  animation: move 0.7s infinite ease-in-out, loading steps(6) 7s infinite;
}
.load_ellipse {
  width: 54px;
  height: 20px;
  position: absolute;
  left: 50%;
  bottom: -30px;
  transform: translate(-50%, 0);
  animation: scale 0.7s infinite ease-in-out;
}
@keyframes scale {
  0% {
    transform: translate(-50%, 0) scale(1);
  }
  50% {
    transform: translate(-50%, 0) scale(0.6);
  }
  100% {
    transform: translate(-50%, 0) scale(1);
  }
}
@keyframes move {
  0% {
    transform: translate(-50%, 0px);
  }
  50% {
    transform: translate(-50%, -50px);
  }
  100% {
    transform: translate(-50%, 0px);
  }
}
@keyframes loading {
  from {
    background-position-y: 0px;
  }
  to {
    background-position-y: -600px;
  }
}
</style>
