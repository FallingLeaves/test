/**
 * 判断是否拥有类名
 * @param {*DOM} ele 
 * @param {*类名} className 
 */
export const hasClass = (ele, className) => {
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)")
  return reg.test(ele.className)
}
/**
 * 添加类名
 * @param {*DOM} ele 
 * @param {*类名} className 
 */
export const addClass = (ele, className) => {
  if (hasClass(ele, className)) {
    return
  }

  let newClass = ele.className.split(" ")
  newClass.push(className)
  ele.className = newClass.join(" ")
}
/**
 * 删除类名
 * @param {*DOM} ele 
 * @param {*类名} className 
 */
export const removeClass = (ele, className) => {
  if (!hasClass(ele, className)) {
    return 
  }
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)")
  ele.className = ele.className.replace(reg, "")
}
/**
 * 切换类名
 * @param {*DOM} ele 
 * @param {*类名} className 
 */
export const toggleClass = (ele, className) => {
  if (hasClass(ele, className)) {
    removeClass(ele, className)
  } else {
    addClass(ele, className)
  }
}