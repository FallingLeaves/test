import * as types from "./mutation-types"

const mutations = {
  [types.SET_LATITUDE](state, latitude) {
    state.latitude = latitude
  },
  [types.SET_LONGITUDE](state, longitude) {
    state.longitude = longitude
  },
  [types.SET_GEOHASH](state) {
    state.geohash = `${state.latitude},${state.longitude}`
  },
  [types.SET_SHOPLIST](state, shopList) {
    state.shopList = shopList
  },
  [types.SET_FOODLIST](state, foodObj) {
    if (state.foodList.length) {
      console.log(1)
      let exist = false
      state.foodList.forEach((v, i) => {
        if (
          v.restaurant_id === foodObj.restaurant_id &&
          v.food_id === foodObj.food_id &&
          v.specs === foodObj.specs
        ) {
          exist = true
          console.log("存在", v, foodObj)
          v.food_num = foodObj.food_num
        }
        if (!exist) {
          console.log("不存在", v, foodObj)
          state.foodList.push(foodObj)
        }
      })
    } else {
      console.log(2)
      state.foodList.push(foodObj)
    }
  }
}

export default mutations
