import Vue from "vue"
import Router from "vue-router"
import Home from "@/components/home/home"
import Login from "@/components/login/login"
import City from "@/components/city/city"
import Site from "@/components/site/site"
import Search from "@/components/search/search"
import Order from "@/components/order/order"
import Profile from "@/components/profile/profile"
import Food from "@/components/food/food"
import Shop from "@/components/shop/shop"
import ShopDetail from "@/components/shopDetail/shopDetail"
import FoodSafety from "@/components/foodSafety/foodSafety"

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
      component: Profile
    },
    {
      path: "/food/:category/:id",
      component: Food
    },
    {
      path: "/shop/:id",
      component: Shop
    },
    {
      path: "/shopDetail/:id",
      component: ShopDetail
    },
    {
      path: "/shopDetail/:id/foodSafety",
      component: FoodSafety
    }
  ]
})
