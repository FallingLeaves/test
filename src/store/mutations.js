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
      let exist = false
      let index = 0
      state.foodList.forEach((v, i) => {
        if (
          v.restaurant_id === foodObj.restaurant_id &&
          v.food_id === foodObj.food_id &&
          v.specs === foodObj.specs
        ) {
          exist = true
          index = i
        }
      })
      if (exist) {
        state.foodList[index].food_num = foodObj.food_num
      } else {
        state.foodList.push(foodObj)
      }
    } else {
      state.foodList.push(foodObj)
    }
  }
}

export default mutations
