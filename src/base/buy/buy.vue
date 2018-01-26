<template>
  <div class="buy">
    <img src="../../assets/img/reduce.svg" alt="" @click="reduce" v-if="num>0||show">
    <input type="number" id="" v-model.number="num" v-if="num>0||show">
    <img src="../../assets/img/add.svg" alt="" @click="add">
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex"
import { getStore } from "@/config/mUtil"
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
  computed: {
    getBuyFoodList() {
      return this.$store.getters.buyFoodList
    },
    getCartTime() {
      return this.$store.getters.cartTime
    }
  },
  created() {
    this.initNum()
    this.initBuyFoodList()
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
        restaurant_id: this.restaurant_id, //所属商店ID
        category_id: this.category_id, //分类ID
        category: this.category, //分类名称
        food_id: this.food_id, //商品ID
        food_name: this.food_name, //商品名称
        specs: this.specs, //规格
        food_num: this.num, //数量
        price: this.price, //单价
        packing_fee: this.packing_fee, //配送费
        total: this.num * this.price + this.packing_fee, //总价
        stock: this.stock //库存
      }
      this.setBuyFoodList(this.food)
      this.setCarttime(new Date())
    },
    initNum() {
      let buyFoodList = this.getBuyFoodList
      if (buyFoodList.length) {
        this.num = 0
        buyFoodList.forEach((v1, i1) => {
          if (v1.restaurant_id == this.restaurant_id) {
            v1.category.forEach((v2, i2) => {
              if (v2.category_id == this.category_id) {
                v2.items.forEach((v3, i3) => {
                  if (v3.food_id == this.food_id) {
                    let buyFood = v3
                    this.num = parseInt(buyFood.food_num)
                  }
                })
              }
            })
          }
        })
      } else {
        this.num = 0
      }
    },
    ...mapMutations({
      setBuyFoodList: "SET_BUYFOODLIST",
      initBuyFoodList: "INIT_SET_BUYFOODLIST",
      setCarttime:"SET_CARTTIME"
    })
  },
  watch: {
    num(newVal) {
      if (newVal > 0) {
        this.show = true
      } else {
        this.show = false
      }
      this.initFood()
      this.initNum()
      this.$emit("shopping", {
        num: Number(this.num),
        food_id: this.food_id,
        category_id: this.category_id
      })
    },
    getCartTime() {
      this.initNum()
      this.$emit("shopping", {
        num: Number(this.num),
        food_id: this.food_id,
        category_id: this.category_id
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.buy {
  .flex();
  align-items: center;
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
