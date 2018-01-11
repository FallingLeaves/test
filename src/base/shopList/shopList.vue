<template>
  <div>
    <section v-for="(item, index) in shopList" :key="item.id" @click="enter(item.id, index)">
      <!-- <img :src="SHOP_IMG_BASE_PATH + item.image_path"> -->
      <img v-lazy="SHOP_IMG_BASE_PATH + item.image_path">
      <div class="info">
        <div class="top">
          <div>
            <span>品牌</span>
            <span>{{item.name}}</span>
          </div>
          <div>
            <span v-for="(icon, index) in item.supports" :key="index">{{icon.icon_name}}</span>
          </div>
        </div>
        <div class="middle">
          <div>
            <div><rating :rating="item.rating"></rating>{{item.rating}}</div>
            <div>月售{{item.recent_order_num}}单</div>
          </div>
          <div>
            <span>蜂鸟专送</span>
            <span>准时达</span>
          </div>
        </div>
        <div class="bottom">
          <span>¥{{item.float_minimum_order_amount}}起送/配送费约¥{{item.float_delivery_fee}}</span>
          <div>
            <span>{{item.distance}}</span>
            <span>/</span>
            <span>{{item.order_lead_time}}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { shopList } from "@/config/getData"
import Rating from '@/base/rating/rating'
import { mapMutations } from "vuex"
import Bus from '@/config/bus'
export default {
  data () {
    return {
      SHOP_IMG_BASE_PATH: "http://cangdu.org:8001/img/",
      queryObj: {},
      shopList: [],
      shopIndex: 0
    }
  },
  props: {
    latitude: {//纬度
      type: String,
      default: null
    },
    longitude: {//经度
      type: String,
      default: null
    },
    offset: {//跳过条数
      type: Number,
      default: 0
    },
    limit: {//限制条数
      type: Number,
      default: 20
    },
    restaurant_category_id: {//商店ID
      type: Number,
      default: null
    },
    order_by: {//订单类型
      type: Number,
      default: 4
    },
    delivery_mode: {//配送方式
      type: Number,
      default: null
    },
    support_ids :{
      type: Array,
      default: null
    },
    restaurant_category_ids: {
      type: Number,
      default: null
    }
  },
  computed: {
    
  },
  created () {
    this.initQueryObj()
  },
  destroyed () {
    // Bus.$emit("packingFee", {
    //   min_packing_fee: this.shopList[this.shopIndex].float_minimum_order_amount,
    //   float_delivery_fee: this.shopList[this.shopIndex].float_delivery_fee
    // })
  },
  methods: {
    initQueryObj() {//初始化请求参数
      Object.assign(this.queryObj, {
        latitude: this.latitude,
        longitude: this.longitude,
        offset: this.offset,
        limit: this.limit,
        restaurant_category_id: this.restaurant_category_id,
        order_by: this.order_by,
        delivery_mode: this.delivery_mode,
        support_ids: this.support_ids,
        restaurant_category_ids: this.restaurant_category_ids
      })
      this._shopList()
    },
    _shopList() {
      shopList(this.queryObj).then(
        res => {
          //console.log(res.body)
          this.shopList = res.body
          this.setShopList(this.shopList)
        },
        err => {
          console.log(err)
        }
      )
    },
    enter(id, index) {
      this.shopIndex = index
      this.$router.push({ path: `/shop/${id}?min_packing_fee=${this.shopList[index].float_minimum_order_amount}&float_delivery_fee=${this.shopList[index].float_delivery_fee}`})
    },
    ...mapMutations({
      setShopList: "SET_SHOPLIST",
    })
  },
  components: {
    Rating
  },
  watch: {
    limit() {
      this.initQueryObj()
    },
    order_by() {
      this.initQueryObj()
    },
    restaurant_category_ids() {
      this.initQueryObj()
    },
    support_ids() {
      this.initQueryObj()
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
section {
  padding: 0.2rem 0.1rem;
  border-bottom: 1px solid #e4e4e4;
  .flex();
  > img {
    .wh(0.6rem, 0.6rem);
    margin-right: 0.1rem;
  }
  .info {
    flex: 1;
    .flex();
    flex-direction: column;
    .sc(0);
    .top {
      .flex();
      align-items: baseline;
      div {
        &:nth-of-type(1) {
          span {
            &:nth-of-type(1) {
              .sc(0.12rem, #000);
              background-color: #ffd930;
              margin-right: 0.1rem;
            }
            &:nth-of-type(2) {
              .sc(0.14rem, #000);
              font-weight: bold;
            }
          }
        }
        &:nth-of-type(2) {
          span {
            .sc(0.12rem, #999);
          }
        }
      }
    }
    .middle {
      .flex();
      align-items: center;
      > div {
        display: flex;
        align-items: center;
        &:nth-of-type(1) {
          div {
            &:nth-of-type(1) {
              .sc(0.12rem, #ff6000);
              transform: scale(0.9);
              display: flex;
              align-items: center;
            }
            &:nth-of-type(2) {
              transform: scale(0.9);
              .sc(0.12rem, #666);
            }
          }
        }
        &:nth-of-type(2) {
          span {
            &:nth-of-type(1) {
              transform: scale(0.8);
              .sc(0.12rem);
              background-color: @blue;
              border: 1px solid @blue;
            }
            &:nth-of-type(2) {
              transform: scale(0.8);
              .sc(0.12rem, @blue);
              border: 1px solid @blue;
            }
          }
        }
      }
    }
    .bottom {
      .flex();
      align-items: center;
      > span {
        transform: scale(0.9);
        .sc(0.12rem, #666);
      }
      div {
        span {
          &:nth-of-type(1) {
            transform: scale(0.9);
            .sc(0.12rem, #999);
          }
          &:nth-of-type(2) {
            transform: scale(0.9);
            .sc(0.12rem, #999);
          }
          &:nth-of-type(3) {
            transform: scale(0.9);
            .sc(0.12rem, @blue);
          }
        }
      }
    }
  }
}
</style>
