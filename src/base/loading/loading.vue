<template>
  <div>
    <div class="loading"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.loading {
  .center();
  .wh(100px, 100px);
  border: 1px solid #333;
  background: url("../../assets/img/icon_loading.png") no-repeat;
  animation: loading steps(6) 7s infinite;
  @keyframes loading {
    from {
      background-position-y: 0px;
    }
    to {
      background-position-y: -600px;
    }
  }
}
</style>
