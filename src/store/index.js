import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  localStorage.setItem('cartList', JSON.stringify(cartList))
}
const getLocalCartList = () => {
  return JSON.parse(localStorage.getItem('cartList')) || {}
}

export default createStore({
  state: {
    cartList: getLocalCartList()
    // cartList: {
    //   shopId: {
    //     shopName: '...',
    //     productList: {
    //       productId: { ...productInfo }
    //     }
    //   }
    // }

    // productInfo: {
    //   _id:"1"
    //   name:"沃尔玛"
    //   imgUrl:"http://www.dell-lee.com/imgs/vue3/near.png"
    //   sales:10000
    //   expressLimit:0
    //   expressPrice:5
    //   slogan:"VIP尊享满89元减4元运费券"
    // }
  },
  mutations: {
    changeCartList (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      const shop = state.cartList[shopId] || { shopName: '', productList: {} }
      // cartList = {} => 假設 cartList[shopId] "存在": { cartList: { shopId: { shopName: '', productList: {} } } }
      // 購物車沒有添加此店鋪 => 構建 shop 店鋪 = {}
      let product = shop.productList[productId] // productList: { productId: {} }
      if (!product) { // 購物車店鋪裡沒有此產品
        productInfo.qty = 0 // 產品的數量初始化為 0 // { ...productInfo, qty: 0 }
        product = productInfo // { productList: { productId: { ...productInfo, qty: 0 } } }
      }
      product.qty = product.qty + num // 產品數量 + 1
      if (product.qty < 0) { product.qty = 0 }
      if (num > 0) { product.check = true } // => 有問題 : 只要商品有 "加入" 必選取
      shop.productList[productId] = product // 構建 { cartList: { shopId: { shopName: '', productList: { productId: { ...productInfo, qty: 0, check: true } } } } }
      state.cartList[shopId] = shop // 構建 { state: { cartList: { shopId: { shopName: '', productList: { productId: { ...productInfo, qty: 0, check: true } } } } } }
      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const productId in products) {
          const product = products[productId]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    clearCartData (state, payload) {
      const { shopId } = payload
      delete state.cartList[shopId]
    }
  }
})
