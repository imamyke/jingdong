<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div
        class="order"
        v-for="(item, idx) in list"
        :key="idx"
      >
        <div class="order__title">
          <h4 class="order__shopname">{{item.shopName}}</h4>
          <span class="order__status">{{item.isCanceled ? '已取消' : '已下单'}}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <img
              class="order__content__img"
              v-for="(innerItem, idx) in item.products"
              :src="innerItem.product.img"
              :key="idx"
            />
          </div>
          <div class="order__content__info">
            <div class="order__content__price">&yen;{{item.totalPrice}}</div>
            <div class="order__content__qty">共{{item.totalQty}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>
<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Docker from '../home/Docker.vue'
// 處理訂單列表邏輯
const useOrderListEffect = () => {
  const orderList = reactive({ list: [] })
  const getOrderList = async () => {
    const result = await get('/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orders = result.data
      for (const order of orders) {
        const products = order.products || []
        const totalPrice = products?.reduce((pre, item) => pre + item?.product?.price * item?.orderSales, 0)
        const totalQty = products?.reduce((pre, item) => pre + item?.orderSales, 0)
        order.totalPrice = totalPrice // 加入 order 的總價
        order.totalQty = totalQty // 加入 order 的總價
      }
      orderList.list = orders
    }
  }

  getOrderList()
  const { list } = toRefs(orderList)
  return { list }
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
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
.order {
  margin: .16rem .18rem;
  padding: .16rem;
  background: $bgColor;
  &__title {
    display: flex;
    justify-content: space-between;
    font-size: .16rem;
    line-height: .22rem;
    margin-bottom: .16rem;
  }
  &__shopname {
    color: $content-fontcolor;
    margin: 0;
  }
  &__status {
    text-align: right;
    font-size: .14rem;
    color: $light-fontColor;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &__info {
      width: .7rem;
      text-align: right;
    }
    &__price {
      margin-bottom: .04rem;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
    }
    &__qty {
      line-height: .14rem;
      font-size: .12rem;
      color: $content-fontcolor;
    }
  }
}
</style>
