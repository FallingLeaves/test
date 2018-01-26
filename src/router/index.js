import Vue from "vue"
import Router from "vue-router"
// import Home from "@/components/home/home"
const Home = r =>
  require.ensure([], () => require("../components/home/home.vue"), "group-home")
import Login from "@/components/login/login"
import City from "@/components/city/city"
import Site from "@/components/site/site"
import Search from "@/components/search/search"
import Order from "@/components/order/order"
import Profile from "@/components/profile/profile"
import Food from "@/components/food/food"
import Shop from "@/components/shop/shop"
import ShopDetail from "@/components/shop/children/shopDetail"
import FoodSafety from "@/components/shop/children/children/foodSafety"
import Info from "@/components/profile/children/info"
import Serverice from "@/components/profile/children/serverice"
import Member from "@/components/profile/children/member"
import SetUsername from "@/components/profile/children/children/setUsername"
import SetAddresses from "@/components/profile/children/children/setAddresses"
import QuestionDetail from "@/components/profile/children/children/questionDetail"
import VipDescription from "@/components/profile/children/children/vipDescription"
import ExchangeVip from "@/components/profile/children/children/exchangeVip"
import PurchaseRecords from "@/components/profile/children/children/purchaseRecords"
import Balance from "@/components/balance/balance"
import Coupon from "@/components/coupon/coupon"
import CouponDetail from "@/components/coupon/children/detail"
import Points from "@/components/points/points"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/city/:id",
      component: City
    },
    {
      path: "/site",
      component: Site
    },
    {
      path: "/search",
      component: Search
    },
    {
      path: "/order",
      component: Order
    },
    {
      path: "/profile",
      component: Profile,
      children: [
        {
          path: "info",
          component: Info,
          children: [
            {
              path: "setusername",
              component: SetUsername
            },
            {
              path: "setAddresses",
              component: SetAddresses
            }
          ]
        },
        {
          path: "server",
          component: Serverice,
          children: [
            {
              path: "questionDetail",
              component: QuestionDetail
            }
          ]
        },
        {
          path: "member",
          component: Member,
          children: [
            {
              path: "vipDescription",
              component: VipDescription
            },
            {
              path: "exchangeVip",
              component: ExchangeVip
            },
            {
              path: "purchaseRecords",
              component: PurchaseRecords
            }
          ]
        }
      ]
    },
    {
      path: "/food/:category/:id",
      component: Food
    },
    {
      path: "/shop/:id",
      component: Shop,
      children: [
        {
          path: "detail",
          component: ShopDetail,
          children: [
            {
              path: "foodSafety",
              component: FoodSafety
            }
          ]
        }
      ]
    },
    {
      path: "/balance",
      component: Balance
    },
    {
      path: "/coupon",
      component: Coupon,
      children: [
        {
          path: "detail",
          component: CouponDetail
        }
      ]
    },
    {
      path: "/points",
      component: Points
    }
  ]
})
