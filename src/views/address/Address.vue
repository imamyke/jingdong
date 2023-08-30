<template>
<div class="wrapper">
  <div class="title">
    我的地址
    <span class="title__create">
      <router-link to='/addressEdit'>新建</router-link>
    </span>
  </div>
  <div
    class="empty"
    v-if="!addressList.length"
  >
    暂无地址信息
  </div>
  <div
    class="address"
    v-if="addressList.length"
  >
    <div
      class="address__item"
      v-for="address in addressList"
      :key="address._id"
      @click="() => handleAddressClick(address._id)"
    >
      <p class="address__item__basic">
        {{address.name}}
        <span class="address__item__phone">18598685485</span>
      </p>
      <p class="address__item__address">
        {{address.city}}{{address.department}}{{address.houseNumber}}
      </p>
    <div class="iconfont">&#xe7e0;</div>
  </div>
  </div>
</div>
<Docker :currentIndex="3" />
</template>
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'
import Docker from '../home/Docker.vue'

const useAddressEffect = () => {
  const router = useRouter()
  const addressList = ref([])
  // 處理地址列表邏輯
  const getAddressList = async () => {
    const result = await get('/user/address')
    if (result?.errno === 0 && result?.data?.length) {
      addressList.value = result.data
    }
  }
  // 到編輯頁
  const handleAddressClick = (id) => {
    router.push(`/addressEdit?addressId=${id}`)
  }
  getAddressList()
  return { addressList, handleAddressClick }
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Address',
  components: { Docker },
  setup () {
    const { addressList, handleAddressClick } = useAddressEffect()
    return { addressList, handleAddressClick }
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
  position: relative;
  @include title;
  &__create {
    position: absolute;
    right: .18rem;
    font-size: .14rem;
    a {
      text-decoration: none;
      color: $content-fontcolor;
    }
  }
}
.address {
  margin: .16rem .18rem 0 .18rem;
  &__item {
    position: relative;
    box-sizing: border-box;
    padding: .18rem .63rem .18rem .16rem;
    margin-bottom: .16rem;
    background: $bgColor;
    border-radius: .04rem;
    &__basic {
      line-height: .2rem;
      margin: 0;
      font-size: .14rem;
      color: $light-fontColor;
    }
    &__phone {
      margin-left: .66rem;
    }
    &__address {
      line-height: .2rem;
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: $content-fontcolor;
    }
    .iconfont {
      transform: rotate(180deg);
      position: absolute;
      right: .16rem;
      top: .44rem;
      color: $light-fontColor;
      font-size: .2rem;
    }
  }
}
.empty {
  @include empty;
}
</style>
