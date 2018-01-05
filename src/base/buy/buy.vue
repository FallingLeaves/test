<template>
  <div class="buy">
    <img src="src/assets/img/reduce.svg" alt="" @click="reduce" v-if="num>0||show">
    <input type="number" id="" v-model="num" v-if="num>0||show">
    <img src="src/assets/img/add.svg" alt="" @click="add">
  </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
  props: {
    restaurant_id: {
      type: Number,
      default: null
    },
    food_id: {
      type: Number,
      default: null
    },
    food_name: {
      type: String,
      default: null
    },
    specs: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      num: 0,
      show: false,
      food: {}
    }
  },
  methods: {
    reduce() {
      this.num = Number(this.num) - 1
      if (this.num <= 0) {
        this.num = 0
        this.show = false
      }
    },
    add() {
      this.show = true
      this.num = Number(this.num) + 1
    },
    initFood() {
      this.food = {
        restaurant_id: this.restaurant_id,
        food_id: this.food_id,
        food_name: this.food_name,
        specs: this.specs,
        food_num: this.num
      }
      this.setFoodList(this.food)
    },
    ...mapMutations({
      setFoodList: "SET_FOODLIST"
    })
  },
  watch: {
    num: function() {
      this.initFood()
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.buy {
  .flex();
  img {
    .wh(0.2rem, 0.2rem);
  }
  input {
    outline: none;
    width: 30px;
    text-align: center;
    .sc(0.12rem, #000);
  }
}
</style>
