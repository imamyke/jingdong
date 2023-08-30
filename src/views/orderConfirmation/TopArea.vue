<template>
  <div class="top">
    <div class="top__header">
      <div
        class="top__header__back iconfont"
        @click="handleBackClick"
        >&#xe7e0;</div>
      确认订单
    </div>
    <div
      class="top__receiver"
      @click="() => handleAddressClick(path)"
    >
      <div class="top__receiver__title">收货地址</div>
      <div
        class="top__receiver__address"
      >
        {{addressId
          ? `${addressData.city}${addressData.department}${addressData.houseNumber}`
          : '请选择收货地址'}}
      </div>
      <div
        class="top__receiver__info"
        v-if="addressId"
      >
        <span class="top__receiver__info__name">{{addressData.name}}</span>
        <span class="top__receiver__info__phone">{{addressData.phone}}</span>
      </div>
      <div class="top__receiver__icon iconfont">&#xe7e0;</div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
const useRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  const handleAddressClick = (path) => {
    router.push(`/addressSelect?path=${path}`)
  }
  return { handleBackClick, handleAddressClick }
}

const useAddressEffect = (addressId) => {
  const addressData = reactive({})
  const onBeforeMount = async (addressId) => {
    if (addressId) {
      const result = await get(`/user/address/${addressId}`)
      if (result?.errno === 0) {
        addressData.city = result.data.city
        addressData.department = result.data.department
        addressData.houseNumber = result.data.houseNumber
        addressData.name = result.data.name
        addressData.phone = result.data.phone
      }
    }
  }
  onBeforeMount(addressId)
  return { addressData }
}
export default {
  name: 'TopArea',
  setup () {
    const route = useRoute()
    const addressId = route.query.addressId
    const path = route.path
    const { handleBackClick, handleAddressClick } = useRouterEffect()
    const { addressData } = useAddressEffect(addressId)
    return { addressId, path, addressData, handleBackClick, handleAddressClick }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, $btn-bgColor 50%);
  background-repeat: no-repeat;
  &__header {
    padding-top: .2rem;
    line-height: .24rem;
    color: $bgColor;
    text-align: center;
    position: relative;
    font-size: .16rem;
    &__back {
      position: absolute;
      left: .18rem;
      font-size: .22rem;
    }
  }
  &__receiver {
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background: $bgColor;
    border-radius: .04rem;
    &__title {
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__address {
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
      color: $content-fontcolor;
      font-size: .14rem;
    }
    &__info {
      padding:  .06rem 0 0 .16rem;
      &__name {
        margin-right: .06rem;
        font-size: .12rem;
        line-height: .18rem;
        color: $medium-fontColor;
      }
    }
    &__icon {
      position: absolute;
      right: .16rem;
      top: .5rem;
      color: $medium-fontColor;
      font-size: .2rem;
      transform: rotate(180deg);
    }
  }
}
</style>
