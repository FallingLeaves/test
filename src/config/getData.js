import Vue from "vue"
import VueResource from "vue-resource"
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.http.options.xhr = { withCredentials: true }
import VueCookie from "vue-cookie"
Vue.use(VueCookie)
Vue.http.interceptors.push(function(request, next) {
  //拦截器
  // 跨域携带cookie
  request.credentials = true
  next()
})

export const cityGuess = () => {
  let url = "http://cangdu.org:8001/v1/cities"
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          type: "guess"
        }
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}

export const cityHot = () => {
  let url = "http://cangdu.org:8001/v1/cities"
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          type: "hot"
        }
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}

export const cityGroup = () => {
  let url = "http://cangdu.org:8001/v1/cities"
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          type: "group"
        }
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 获取选择的城市详情
 * @param {*城市id} id
 */
export const cityChoose = id => {
  let url = "http://cangdu.org:8001/v1/cities/" + id
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 获取搜索地址列表
 * @param {*城市id} id
 * @param {*搜索关键字} keyword
 */
export const citySearch = (id, keyword) => {
  let url = "http://cangdu.org:8001/v1/pois"
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          type: "search",
          city_id: id,
          keyword: keyword
        }
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 获取详细定位信息
 * @param {*经纬度} geohash
 */
export const mySite = geohash => {
  let url = "http://cangdu.org:8001/v2/pois/" + geohash
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 获取食品分类
 */
export const foodSort = () => {
  let url = "http://cangdu.org:8001/v2/index_entry"
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 获取商店列表
 * @param {*} obj
 */
export const shopList = obj => {
  let url = "http://cangdu.org:8001/shopping/restaurants"
  /*let params = {
    latitude: obj.latitude, //纬度
    longitude: obj.longitude, //经度
    offset: obj.offset || 0, //跳过多少条数据
    limit: obj.limit || 20, //请求数据条数
    restaurant_category_id: obj.restaurant_category_id, //餐馆分类id
    order_by: obj.order_by || 4, //排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高
    "delivery_mode[]": obj.delivery_mode || null, //配送方式id
    "support_ids[]": obj.support_ids, //餐馆支持特权的id[]
    "restaurant_category_ids[]": obj.restaurant_category_ids //餐馆分类id
  }*/
  let params = `?latitude=${obj.latitude}&longitude=${obj.longitude}&offset=${
    obj.offset
  }&limit=${obj.limit}&restaurant_category_id=${
    obj.restaurant_category_id
  }&order_by=${obj.order_by}&delivery_mode[]=${
    obj.delivery_mode
  }&restaurant_category_ids[]=${obj.restaurant_category_ids}`
  obj.support_ids &&
    obj.support_ids.forEach(v => {
      params += `&support_ids[]=${v}`
    })
  url += params
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 获取所有商铺分类列表
 * @param {*} obj
 */
export const shopCategory = (latitude, longitude) => {
  let url = "http://cangdu.org:8001/shopping/v2/restaurant/category"
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          latitude: latitude || "",
          longitude: longitude || ""
        }
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 获取配送方式
 * @param {*纬度} lat
 * @param {*经度} lon
 */
export const delivery = (lat, lon) => {
  let url = "http://cangdu.org:8001/shopping/v1/restaurants/delivery_modes"
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          latitude: lat || "",
          longitude: lon || ""
        }
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 获取商家属性
 * @param {*经度} lat
 * @param {*纬度} lon
 */
export const shopAttribute = (lat, lon) => {
  let url = "http://cangdu.org:8001/shopping/v1/restaurants/activity_attributes"
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          latitude: lat || "",
          longitude: lon || ""
        }
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 搜索餐馆
 * @param {*经纬度} geohash
 * @param {*关键字} keyword
 */
export const searchRestaurants = (geohash, keyword) => {
  let url = "http://cangdu.org:8001/v4/restaurants"
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          geohash: geohash,
          keyword: keyword
        }
      })
      .then(res => {
        resolve(res),
          err => {
            reject(err)
          }
      })
  })
}
/**
 * 获取餐馆详情
 * @param {*商店id} id
 */
export const shop = id => {
  let url = "http://cangdu.org:8001/shopping/restaurant/" + id
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 获取食品列表
 * @param {*餐馆ID} id
 */
export const foodList = id => {
  let url = "http://cangdu.org:8001/shopping/v2/menu"
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          restaurant_id: id
        }
      })
      .then(res => {
        resolve(res),
          err => {
            reject(err)
          }
      })
  })
}
/**
 * 获取评价信息
 * @param {*餐馆ID} id
 * @param {*} obj
 */
export const ratings = (id, obj) => {
  let url = `http://cangdu.org:8001/ugc/v2/restaurants/${id}/ratings`
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          tag_name: obj.tagname || "", //评价类型，默认全部
          offset: obj.offset || 0, //跳过数据条数
          limit: obj.limit || 10 //单次获取数据条数
        }
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 获取评价分数
 * @param {*餐馆ID} id
 */
export const ratingsScorse = id => {
  let url = `http://cangdu.org:8001/ugc/v2/restaurants/${id}/ratings/scores`
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 获取评价分类
 * @param {*餐馆ID} id
 */
export const ratingsTags = id => {
  let url = `http://cangdu.org:8001/ugc/v2/restaurants/${id}/ratings/tags`
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 获取图片验证码
 */
export const getcaptchas = () => {
  let url = "http://cangdu.org:8001/v1/captchas"
  return new Promise((resolve, reject) => {
    Vue.http.post(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 登录
 * @param {*用户账号} username
 * @param {*密码} password
 * @param {*验证码} captcha_code
 */
export const login = (username, password, captcha_code) => {
  console.log(captcha_code)
  Vue.cookie.delete("cap", { domain: "http://cangdu.org:8001" })
  Vue.cookie.set("cap", captcha_code, {
    expires: "5M",
    domain: "http://cangdu.org:8001"
  })
  let url = "http://cangdu.org:8001/v2/login"
  return new Promise((resolve, reject) => {
    Vue.http
      .post(
        url,
        { username: username, password: password, captcha_code: captcha_code },
        { credentials: true }
      )
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 获取用户信息
 * @param {*用户id} user_id
 */
export const getUserInfo = user_id => {
  let url = "http://cangdu.org:8001/v1/user"
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          user_id
        }
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 退出登录
 */
export const signout = () => {
  let url = "http://cangdu.org:8001/v2/signout"
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**有问题
 * 上传图片
 * @param {*上传文件} file
 * @param {*类型：shop：商铺图片 0，food：食品图片 1，avatar：头像 2} type
 */
export const uploadAvatar = (file, type, user_id) => {
  let uploadType = ["shop", "food", "avatar"]
  let url = `http://cangdu.org:8001/eus/v1/users/${user_id}/${uploadType[type]}`
  return new Promise((resolve, reject) => {
    Vue.http
      .post(
        url,
        { file: file },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 获取送货地址
 * @param {*用户id} user_id
 */
export const getAddresses = user_id => {
  let url = `http://cangdu.org:8001/v1/users/${user_id}/addresses`
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 新增收货地址
 * @param {*} obj
 */
export const addAddress = obj => {
  let url = `http://cangdu.org:8001/v1/users/${obj.user_id}/addresses`
  return new Promise((resolve, reject) => {
    Vue.http
      .post(url, {
        user_id: obj.user_id, //用户id
        address: obj.address, //地址
        address_detail: obj.address_detail, //地址详情
        geohash: obj.geohash, //经纬度
        name: obj.name, //收货人姓名
        phone: obj.phone, //电话号码
        tag: obj.tag, //标签
        sex: obj.sex, //性别， 1:男，2:女
        poi_type: obj.poi_type || 0, //类型，默认：0
        phone_bk: obj.phone_bk, //备注电话
        tag_type: obj.tag_type //标签类型，2:家，3:学校，4:公司
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 删除收货地址
 * @param {*用户id} user_id
 * @param {*收货地址id} address_id
 */
export const delAddress = (user_id, address_id) => {
  let url = `http://cangdu.org:8001/v1/users/${user_id}/addresses/${address_id}`
  return new Promise((resolve, reject) => {
    Vue.http.delete(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 搜索收货地址
 * @param {*地址关键字} keyword
 */
export const addressSearch = keyword => {
  let url = "http://cangdu.org:8001/v1/pois"
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: {
          type: "nearby",
          keyword: keyword
        }
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 服务中心问题说明
 */
export const serverCenter = () => {
  let url = "http://cangdu.org:8001/v3/profile/explain"
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 兑换会员卡
 * @param {*用户id} user_id
 * @param {*卡号} num
 * @param {*密码} passward
 */
export const vipCard = (user_id, num, passward) => {
  let url = `http://cangdu.org:8001/member/v1/users/${user_id}/delivery_card/physical_card/bind`
  return new Promise((resolve, reject) => {
    Vue.http
      .post(url, {
        number: num,
        passward: passward
      })
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}
/**
 * 获取可用红包
 * @param {*用户id} user_id
 * @param {*限制} limit
 * @param {*跳过} offset
 */
export const getHongBao = (user_id, limit = 20, offset = 0) => {
  let url = `http://cangdu.org:8001/promotion/v2/users/${user_id}/hongbaos?limit=${limit}&offset=${offset}`
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * 获取过期红包
 * @param {*用户id} user_id
 * @param {*限制} limit
 * @param {*跳过} offset
 */
export const getExpired = (user_id, limit = 20, offset = 0) => {
  let url = `http://cangdu.org:8001/promotion/v2/users/${user_id}/expired_hongbaos?limit=${limit}&offset=${offset}`
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
