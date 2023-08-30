import { useStore } from 'vuex'
import { computed } from 'vue'

// 購物車相關邏輯
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartList = (shopId, productId, productInfo, num) => {
    store.commit('changeCartList', { shopId, productId, productInfo, num })
  }
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const productId in productList) {
      const product = productList[productId]
      if (product.qty > 0) {
        notEmptyProductList[productId] = product
      }
    }
    return notEmptyProductList
  })
  const shopName = computed(() => { // 為了顯現在視圖上，需轉換成響應式
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { totalQty: 0, totalPrice: 0, allChecked: true } // allChecked 假設購物車是全選的
    if (productList) {
      for (const productId in productList) {
        const product = productList[productId]
        result.totalQty += product.qty
        if (product.check) {
          result.totalPrice += (product.price * product.qty)
        }
        if (product.qty > 0 && !product.check) {
          result.allChecked = false // 此時購物車為非全選
        }
      }
    }
    result.totalPrice = result.totalPrice.toFixed(2)
    return result
  })

  return { changeCartList, shopName, cartList, productList, calculations }
}
