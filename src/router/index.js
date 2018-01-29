import Vue from "vue"
import Router from "vue-router"
// import Home from "@/components/home/home"
const Home = r =>
  require.ensure([], () => require("../components/home/home.vue"), "group-home")
// import Login from "@/components/login/login"
const Login = r =>
  require.ensure(
    [],
    () => require("../components/login/login.vue"),
    "group-login"
  )
// import City from "@/components/city/city"
const City = r =>
  require.ensure([], () => require("../components/city/city.vue"), "group-city")
// import Site from "@/components/site/site"
const Site = r =>
  require.ensure([], () => require("../components/site/site.vue"), "group-site")
// import Search from "@/components/search/search"
const Search = r =>
  require.ensure(
    [],
    () => require("../components/search/search.vue"),
    "group-search"
  )
// import Order from "@/components/order/order"
const Order = r =>
  require.ensure(
    [],
    () => require("../components/order/order.vue"),
    "group-order"
  )
// import Profile from "@/components/profile/profile"
const Profile = r =>
  require.ensure(
    [],
    () => require("../components/profile/profile.vue"),
    "group-profile"
  )
// import Food from "@/components/food/food"
const Food = r =>
  require.ensure([], () => require("../components/food/food.vue"), "group-food")
// import Shop from "@/components/shop/shop"
const Shop = r =>
  require.ensure([], () => require("../components/shop/shop.vue"), "group-shop")
// import ShopDetail from "@/components/shop/children/shopDetail"
const ShopDetail = r =>
  require.ensure(
    [],
    () => require("../components/shop/children/shopDetail.vue"),
    "group-shop"
  )
// import FoodSafety from "@/components/shop/children/children/foodSafety"
const FoodSafety = r =>
  require.ensure(
    [],
    () => require("../components/shop/children/children/foodSafety.vue"),
    "group-shop"
  )
// import Info from "@/components/profile/children/info"
const Info = r =>
  require.ensure(
    [],
    () => require("../components/profile/children/info.vue"),
    "group-profile"
  )
// import Serverice from "@/components/profile/children/serverice"
const Serverice = r =>
  require.ensure(
    [],
    () => require("../components/profile/children/serverice.vue"),
    "group-profile"
  )
// import Member from "@/components/profile/children/member"
const Member = r =>
  require.ensure(
    [],
    () => require("../components/profile/children/member.vue"),
    "group-profile"
  )
// import SetUsername from "@/components/profile/children/children/setUsername"
const SetUsername = r =>
  require.ensure(
    [],
    () => require("../components/profile/children/children/setUsername.vue"),
    "group-profile"
  )
// import SetAddresses from "@/components/profile/children/children/setAddresses"
const SetAddresses = r =>
  require.ensure(
    [],
    () => require("../components/profile/children/children/setAddresses.vue"),
    "group-profile"
  )
// import QuestionDetail from "@/components/profile/children/children/questionDetail"
const QuestionDetail = r =>
  require.ensure(
    [],
    () => require("../components/profile/children/children/questionDetail.vue"),
    "group-profile"
  )
// import VipDescription from "@/components/profile/children/children/vipDescription"
const VipDescription = r =>
  require.ensure(
    [],
    () => require("../components/profile/children/children/vipDescription.vue"),
    "group-profile"
  )
// import ExchangeVip from "@/components/profile/children/children/exchangeVip"
const ExchangeVip = r =>
  require.ensure(
    [],
    () => require("../components/profile/children/children/exchangeVip.vue"),
    "group-profile"
  )
// import PurchaseRecords from "@/components/profile/children/children/purchaseRecords"
const PurchaseRecords = r =>
  require.ensure(
    [],
    () =>
      require("../components/profile/children/children/purchaseRecords.vue"),
    "group-profile"
  )
// import Balance from "@/components/balance/balance"
const Balance = r =>
  require.ensure(
    [],
    () => require("../components/balance/balance.vue"),
    "group-balance"
  )
// import Coupon from "@/components/coupon/coupon"
const Coupon = r =>
  require.ensure(
    [],
    () => require("../components/coupon/coupon.vue"),
    "group-coupon"
  )
// import CouponDetail from "@/components/coupon/children/detail"
const CouponDetail = r =>
  require.ensure(
    [],
    () => require("../components/coupon/children/detail.vue"),
    "group-coupon"
  )
// import Points from "@/components/points/points"
const Points = r =>
  require.ensure(
    [],
    () => require("../components/points/points.vue"),
    "group-points"
  )

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
