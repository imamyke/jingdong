<template>
<div class="wrapper">
  <div class="title">我的全部购物车</div>
  <ul class="cart"
    v-for="(list, shopId) in cartList"
    :key="shopId"
    @click="() => handleCartClick(shopId)"
  >
    <li class="cart__item">
      <div class="cart__item__title">{{list.shopName}}</div>
        <div
          class="cart__content"
          v-for="(product) in list.productList"
          :key="product._id"
        >
          <img class="cart__content__image" :src="product.imgUrl" />
          <div class="cart__content__detail">
            <p class="cart__content__title">{{product.name}}</p>
            <p class="cart__content__price">
              <span class="single__price"><span class="price__yen">&yen;</span>{{product.price}} x {{product.qty}}</span>
              <span class="total__price"><span class="price__yen">&yen;</span>{{(product.price * product.qty).toFixed(1)}}</span>
            </p>
          </div>
        </div>
      <div class="cart__total">共計 {{list.totalQty}} 件</div>
    </li>
  </ul>
  <div class="empty" v-if="!Object.keys(cartList).length">购物车是空的唷</div>
</div>
<Docker :currentIndex="1" />
</template>
<script>
import Docker from '../home/Docker.vue'
import { useRouter } from 'vue-router'
// 處理購物車列表邏輯
const useCartListEffect = () => {
  const cartList = JSON.parse(localStorage.getItem('cartList')) || {}
  return { cartList }
}
const useCartCalculationEffect = () => {
  const calculateCart = (cartList) => {
    for (const shopId in cartList) {
      const productList = cartList[shopId].productList
      let totalPrice = 0
      let totalQty = 0
      for (const productId in productList) {
        const product = productList[productId]
        totalPrice += product.price * product.qty
        totalQty += product.qty
      }
      cartList[shopId].totalPrice = totalPrice.toFixed(1)
      cartList[shopId].totalQty = totalQty
    }
  }
  return { calculateCart }
}
const useCartClickEffect = () => {
  const router = useRouter()
  const handleCartClick = (shopId) => {
    router.push(`/orderConfirmation/${shopId}`)
  }
  return { handleCartClick }
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'CartList',
  components: { Docker },
  setup () {
    const { cartList } = useCartListEffect()
    const { calculateCart } = useCartCalculationEffect()
    const { handleCartClick } = useCartClickEffect()
    calculateCart(cartList)
    return { cartList, handleCartClick }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.wrapper {
  overflow-y: auto;
  background: $darkBgColor;
  @include fix-content;
}
.title {
  @include title;
}
.cart {
  margin: .16rem;
  padding: 0;
  background: $bgColor;
  &__item {
    padding: 0 0 .16rem .16rem;
    list-style: none;
    &__title {
      padding: .16rem 0 .16rem 0;
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
  }
  &__content {
    display: flex;
    padding-bottom: .16rem;
    &__image {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__detail {
      flex: 1;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: 0;
      padding-right: .16rem;
      color: $highlight-fontColor;
      display: flex;
      justify-content: space-between;
      font-size: .14rem;
      .price__yen {
        font-size: .12rem;
      }
      .total__price {
        color: $dark-fontColor;
      }
    }
  }
  &__total {
    line-height: .28rem;
    margin: 0 .16rem 0 .16rem;
    color: $light-fontColor;
    font-size: .14rem;
    text-align: center;
    background: $search-bgColor;
  }
}
.empty {
  @include empty;
}
</style>
