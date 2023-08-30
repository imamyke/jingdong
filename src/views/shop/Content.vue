<template>
  <div class="content">
    <ul class="category">
      <li
        v-for="(category) in categories"
        :key="category.name"
        :class="{'category__item': true, 'category__item--active': category.tab === currentTab}"
        @click="handleTabClick(category.tab)"
      >{{category.name}}</li>
    </ul>
    <div class="product">
      <div
        v-for="(item) in list"
        :key="item._id"
        class="product__item"
      >
        <img :src="item.imgUrl" class="product__item__img" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售{{item.sales}}分</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="changeCartItem(shopId, item._id, item, -1, shopName)"
            >&#xe866;</span>
            {{getProductCartQty(shopId, item._id)}}
          <span
            class="product__number__plus iconfont"
            @click="changeCartItem(shopId, item._id, item, 1, shopName)"
          >&#xe86c;</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffect'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]
// 和 Tab 相關的邏輯
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表內容的相關邏輯
const useCurrenListEffect = (tab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    const result = await get(`/shop/${shopId}/products`, { tab: tab.value })
    if (result?.errno === 0 && result?.data) {
      content.list = result.data
    }
  }
  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)

  return { list }
}

// 購物車相關邏輯
const useCartEffect = () => {
  const store = useStore()
  const { changeCartList, cartList } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartList(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCartQty = (shopId, productId) => {
    return cartList[shopId]?.productList?.[productId]?.qty || 0
  }
  return { changeCartItem, cartList, getProductCartQty }
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.shopId
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrenListEffect(currentTab, shopId)
    const { changeCartItem, cartList, getProductCartQty } = useCartEffect()
    return {
      list,
      cartList,
      shopId,
      categories,
      currentTab,
      handleTabClick,
      changeCartItem,
      getProductCartQty
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
.category {
  width: .76rem;
  /* height: 100%; */
  overflow-y: scroll;
  background: $search-bgColor;
  list-style: none;
  margin: 0;
  padding: 0;
  &__item {
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;
    color: $content-fontcolor;
    &--active {
      background: #fff;
    }
  }
}
.product {
  flex: 1;
  overflow: scroll;
  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__sales {
      margin: .06rem 0;
      line-height: .16rem;
      font-size: .12rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
      line-height: .16rem;
      font-size: .12rem;
      color: $highlight-fontColor;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: .12rem;
      &__minus, &__plus {
        display: inline-block;
        width: .2rem;
        height: .2rem;
        line-height: .2rem;
        border-radius: 50%;
        font-size: .16rem;
        text-align: center;
      }
      &__minus {
        border: .01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: .05rem;
      }
      &__plus {
        background: $btn-bgColor;
        color: $bgColor;
        margin-left: .05rem;
      }
    }
  }
}
</style>
