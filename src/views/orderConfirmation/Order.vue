<template>
  <div class="order">
    <div class="order__price">實付金額 <b>&yen;{{calculations.totalPrice}}</b></div>
    <div
      class="order__btn"
      v-show="addressId"
      @click="() => handleSubmitClick(true)"
    >提交訂單</div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="() => handleSubmitClick(false)"
  >
    <div
      class="mask__content"
      @click.stop
    >
      <h3 class="mask__content__title">确认要离开收银台?</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >取消订单</div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useCommonCartEffect } from '../../effects/cartEffect'
import { post } from '../../utils/request'

// 下單相關邏輯
const useCreateOrderEffect = (shopId, productList, shopName, addressId) => {
  const router = useRouter()
  const store = useStore()

  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const productId in productList.value) {
      const product = productList.value[productId]
      products.push({
        id: product._id,
        num: product.qty
      })
    }
    try {
      const result = await post('/order', {
        addressId,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        const cartList = JSON.parse(localStorage.getItem('cartList') || '{}')
        delete cartList[shopId]
        localStorage.setItem('cartList', JSON.stringify(cartList))
        store.commit('clearCartData', { shopId })
        router.push({ name: 'OrderList' })
      }
    } catch (err) {
      console.log(err) // 需優化
    }
  }

  return { handleConfirmOrder }
}
// 蒙層展示相關邏輯
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleSubmitClick = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleSubmitClick }
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Order',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const addressId = route.query.addressId
    const { calculations, productList, shopName } = useCommonCartEffect(shopId)
    const { handleConfirmOrder } = useCreateOrderEffect(shopId, productList, shopName, addressId)
    const { showConfirm, handleSubmitClick } = useShowMaskEffect()
    return {
      addressId,
      calculations,
      showConfirm,
      handleSubmitClick,
      handleConfirmOrder
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/variables.scss';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: .98rem;
    background: $border-btn-bgColor;
    color: $bgColor;
    text-align: center;
    font-size: .14rem;
  }
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: $bgColor;
    border-radius: .04rem;
    text-align: center;
    &__title {
      margin: .24rem 0 0 0;
      line-height: .26rem;
      font-size: .18rem;
      color: $content-fontcolor;
    }
    &__desc {
      margin-top: .08rem 0 0 0;
      font-size: .14rem;
      color: $medium-fontColor;
    }
    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }
    &__btn {
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      border: .01rem solid $border-btn-bgColor;
      border-radius: .16rem;
      font-size: .14rem;
      &--first {
        margin-right: .24rem;
        color: $border-btn-bgColor;
      }
      &--last {
        background: $border-btn-bgColor;
        color: $bgColor;
      }
    }
  }
}
</style>
