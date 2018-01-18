import * as types from "./mutation-types"
import { getStore } from "@/config/mUtil"
import { getUserInfo } from "@/config/getData"

export const getUser = function({ commit, state }) {
  let user_id = getStore("userId")
  getUserInfo(user_id).then(
    res => {
      let info = res.body
      commit(types.RECODE_USERINFO, info)
    },
    err => {
      console.log(err)
    }
  )
}
