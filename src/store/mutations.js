import * as types from "./mutation-types"
import { setStore, getStore } from "@/config/mUtil"
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
  [types.SET_BUYFOODLIST](state, foodObj) {
    if (!state.buyFoodList.length) {
      state.buyFoodList.push({
        restaurant_id: foodObj.restaurant_id,
        category: [
          {
            name: foodObj.category,
            category_id: foodObj.category_id,
            items: [
              {
                food_id: foodObj.food_id,
                food_name: foodObj.food_name,
                specs: foodObj.specs,
                food_num: foodObj.food_num,
                price: foodObj.price,
                packing_fee: foodObj.packing_fee,
                total: foodObj.total,
                stock: foodObj.stock
              }
            ]
          }
        ]
      })
    } else {
      let shopExist = false
      let shopIndex = 0
      let categoryExist = false
      let categoryIndex = 0
      let foodExist = false
      let foodIndex = 0
      state.buyFoodList.forEach((v, i) => {
        if (v.restaurant_id == foodObj.restaurant_id) {
          shopExist = true
          shopIndex = i
          state.buyFoodList[i].category.forEach((value, index) => {
            if (value.category_id == foodObj.category_id) {
              categoryExist = true
              categoryIndex = index
            }
            state.buyFoodList[i].category[index].items.forEach((v2, i2) => {
              if (v2.food_id == foodObj.food_id) {
                foodExist = true
                foodIndex = i2
              }
            })
          })
        }
      })
      if (shopExist) {
        if (categoryExist) {
          if (foodExist) {
            state.buyFoodList[shopIndex].category[categoryIndex].items[
              foodIndex
            ] = {
              food_id: foodObj.food_id,
              food_name: foodObj.food_name,
              specs: foodObj.specs,
              food_num: foodObj.food_num,
              price: foodObj.price,
              packing_fee: foodObj.packing_fee,
              total: foodObj.total,
              stock: foodObj.stock
            }
          } else {
            state.buyFoodList[shopIndex].category[categoryIndex].items.push({
              food_id: foodObj.food_id,
              food_name: foodObj.food_name,
              specs: foodObj.specs,
              food_num: foodObj.food_num,
              price: foodObj.price,
              packing_fee: foodObj.packing_fee,
              total: foodObj.total,
              stock: foodObj.stock
            })
          }
        } else {
          state.buyFoodList[shopIndex].category.push({
            name: foodObj.category,
            category_id: foodObj.category_id,
            items: [
              {
                food_id: foodObj.food_id,
                food_name: foodObj.food_name,
                specs: foodObj.specs,
                food_num: foodObj.food_num,
                price: foodObj.price,
                packing_fee: foodObj.packing_fee,
                total: foodObj.total,
                stock: foodObj.stock
              }
            ]
          })
        }
      } else {
        state.buyFoodList.push({
          restaurant_id: foodObj.restaurant_id,
          category: [
            {
              name: foodObj.category,
              category_id: foodObj.category_id,
              items: [
                {
                  food_id: foodObj.food_id,
                  food_name: foodObj.food_name,
                  specs: foodObj.specs,
                  food_num: foodObj.food_num,
                  price: foodObj.price,
                  packing_fee: foodObj.packing_fee,
                  total: foodObj.total,
                  stock: foodObj.stock
                }
              ]
            }
          ]
        })
      }
    }
    state.buyFoodList.forEach((v1, i1) => {
      v1.category.forEach((v2, i2) => {
        v2.items.forEach((v3, i3) => {
          if (v3.food_num == 0) {
            v2.items.splice(i3, 1)
          }
        })
        if (!v2.items.length) {
          v1.category.splice(i2, 1)
        }
      })
      if (!v1.category.length) {
        state.buyFoodList.splice(i1, 1)
      }
    })
    setStore("buyFoodList", state.buyFoodList)
  },
  [types.INIT_SET_BUYFOODLIST](state) {
    let initBuyFoodList = JSON.parse(getStore("buyFoodList"))
    if (initBuyFoodList) {
      state.buyFoodList = initBuyFoodList
    }
  },
  [types.CLEAR_BUYFOODLIST](state, shopId) {
    let index = 0
    state.buyFoodList.forEach((v, i) => {
      if (v.restaurant_id == shopId) {
        index = i
      }
    })
    state.buyFoodList.splice(index, 1)
    setStore("buyFoodList", state.buyFoodList)
  },
  [types.SET_CARTTIME](state, time) {
    state.cartTime = time
  },
  [types.SET_SHOPDETAIL](state, shopDetail) {
    state.shopDetail = shopDetail
  },
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
    setStore("userId", userInfo.user_id)
  },
  [types.RECODE_USERINFO](state, info) {
    if (state.userInfo && state.userInfo.username !== info.username) {
      return
    }
    if (!info.message) {
      state.userInfo = { ...info }
    } else {
      state.userInfo = null
    }
  },
  [types.RESET_AVATAR](state, avatar) {
    state.userInfo = Object.assign({}, state.userInfo, { avatar })
  },
  [types.RESET_NAME](state, username) {
    state.userInfo = Object.assign({}, state.userInfo, { username })
  }
}

export default mutations
