const state = {
  geohash: "", //经纬度
  latitude: "", //纬度
  longitude: "", //经度
  shopList: [],
  buyFoodList: [], //购买商品信息  所属商店ID(restaurant_id) 商品ID(food_id) 商品名称(food_name) 商品数量(food_num) 规格(specs)
  cartTime:"",//购买商品存入vuex中的时间
  shopDetail: null
}

export default state