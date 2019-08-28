// 存储用户信息 提供存储的函数 提供获取用户信息的函数
const KEY = 'hm-toutiao-user'
export default {
  setUser (user) {
    // 保存user对象 存储到sessionStorage
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    // 把sessionStorage获取出来,并转为对象
    const jsonStr = window.sessionStorage.getItem(KEY) || ' {}'
    // null.abc会报错 {}.abc不会报错
    return JSON.parse(jsonStr)
  },
  delUser () {
    // 删除用户信息 删除KEY的对应数据
    window.sessionStorage.removeItem(KEY)
  }
}
