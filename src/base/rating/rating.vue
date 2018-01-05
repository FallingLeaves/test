<template>
  <div>
    <div class="star">
      <span v-for="(item, index) in 5" :key="index">☆</span>
      <div class="star-on" ref="starOn">
        <span v-for="(item, index) in 5" :key="index">★</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.setStar()
  },
  methods: {
    setStar() {
      let per = this.rating / 5 * 100 + "%"
      this.$refs.starOn.style.width = per
    }
  }
}
</script>

<style lang="less" scoped>
.star {
  position: relative;
  color: gold;
  font-size: .16rem;
  .star-on {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    position: absolute;
    top: 0;
  }
}
</style>
