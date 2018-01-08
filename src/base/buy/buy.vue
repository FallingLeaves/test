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
    },
    price: {
      type: Number,
      default: null
    },
    category_id: {
      type: Number,
      default: null
    },
    category: {
      type: String,
      default: null
    },
    packing_fee: {
      type: Number,
      default: null
    },
    stock: {
      type: Number,
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
        restaurant_id: this.restaurant_id,//所属商店ID
        category_id: this.category_id,//分类ID
        category: this.category,//分类名称
        food_id: this.food_id,//商品ID
        food_name: this.food_name,//商品名称
        specs: this.specs,//规格
        food_num: this.num,//数量
        price: this.price,//单价
        packing_fee: this.packing_fee,//配送费
        total: this.num * this.price + this.packing_fee,//总价
        stock: this.stock//库存
      }
      this.setBuyFoodList(this.food)
    },
    ...mapMutations({
      setBuyFoodList: "SET_BUYFOODLIST"
    })
  },
  watch: {
    num() {
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
