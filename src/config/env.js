let SHOP_IMG_BASE_PATH = "http://cangdu.org:8001/img/"

let FOOD_IMG_BASE_URL = "https://fuss10.elemecdn.com"

if (process.env.NODE_ENV == "development") {

} else if (process.env.NODE_ENV == "production") {
  
}

export { 
  SHOP_IMG_BASE_PATH, 
  FOOD_IMG_BASE_URL 
}