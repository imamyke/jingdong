<template>
  <div class="wrapper">
    <div class="search">
      <div
        class="search__back iconfont"
        @click="handleBackClick"
      >&#xe7e0;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe65c;</span>
        <input
          class="search__content__input"
          placeholder="请输入商品名称"
        />
      </div>
    </div>
    <ShopInfo :item="shopInfo" v-show="shopInfo.imgUrl" />
    <Content :shopName="shopInfo.name" />
    <Cart />
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ shopInfo: {} })
  const shopId = route.params.shopId
  const getShopInfoData = async () => {
    const result = await get(`/shop/${shopId}`)
    if (result?.errno === 0 && result?.data) {
      data.shopInfo = result.data
    }
  }
  const { shopInfo } = toRefs(data)
  return { getShopInfoData, shopInfo }
}
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const router = useRouter()
    const { getShopInfoData, shopInfo } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    getShopInfoData()
    return {
      handleBackClick,
      router,
      shopInfo
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/variables.scss';
  .wrapper {
    padding: 0 .18rem;
  }
  .search {
    display: flex;
    margin: .14rem 0 .04rem 0;
    line-height: .32rem;
    &__back {
      width: .3rem;
      font-size: .24rem;
      color: #B6B6B6;
      position: relative;
      top: .04rem;
    }
    &__content {
      display: flex;
      align-items: center;
      flex: 1;
      border-radius: .16rem;
      background: $search-bgColor;
      &__icon {
        width: .44rem;
        height: .32rem;
        text-align: center;
        color: $search-fontColor;
      }
      &__input {
        display: block;
        width: 100%;
        height: .32rem;
        padding-right: .2rem;
        border: none;
        outline: none;
        background: none;
        font-size: .14rem;
        color: $content-fontcolor;
        &::placeholder {
          color: $content-fontcolor;
        }
      }
    }
  }
</style>
