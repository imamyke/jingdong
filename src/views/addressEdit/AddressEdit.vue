<template>
<div class="wrapper">
  <Toast v-if="show" :message="toastMessage" />
  <div class="title">
    <div
      class="title__back iconfont"
      @click="handleBackClick"
    >&#xe7e0;</div>
    {{addressId ? '编辑地址' : '新建地址'}}
    <span
      class="title__save"
      @click="() => handleSaveClick()"
      >保存</span>
  </div>
  <div class="content">
    <div class="content__item">
      <label class="content__item__label">所在城市:</label>
      <input
        class="content__item__input"
        placeholder="请输入所在城市"
        v-model="city"
      >
    </div>
    <div class="content__item">
      <label class="content__item__label">小区/大厦/学校:</label>
      <input
        class="content__item__input"
        placeholder="请输入小区/大厦/学校"
        v-model="department"
      >
    </div>
    <div class="content__item">
      <label class="content__item__label">楼号-门牌号：</label>
      <input
        class="content__item__input"
        placeholder="请输入楼号-门牌号"
        v-model="houseNumber"
      >
    </div>
    <div class="content__item">
      <label class="content__item__label">收货人:</label>
      <input
        class="content__item__input"
        placeholder="请输入收货人"
        v-model="name"
      >
    </div>
    <div class="content__item">
      <label class="content__item__label">联系电话:</label>
      <input
        class="content__item__input"
        placeholder="请输入联系电话"
        v-model="phone"
      >
    </div>
  </div>
</div>
</template>
<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get, post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
// 編輯
const useAddressEffect = (city, department, houseNumber, name, phone) => {
  // 獲取地址信息
  const getAddressData = async (addressId) => {
    if (addressId) {
      const result = await get(`/user/address/${addressId}`)
      if (result?.errno === 0) {
        const data = result.data
        city.value = data.city
        department.value = data.department
        houseNumber.value = data.houseNumber
        name.value = data.name
        phone.value = data.phone
      }
    } else {
      console.log('新建狀態')
    }
  }
  // 儲存地址信息
  const handleSaveClick = async (showToast) => {
    const router = useRouter()
    if (!city.value || !department.value || !houseNumber.value ||
      !name.value || !phone.value) {
      showToast('所有字段必填')
    } else {
      const result = await post('/user/address', {
        city: city.value,
        department: department.value,
        houseNumber: houseNumber.value,
        name: name.value,
        phone: phone.value
      })
      if (result?.errno === 0) {
        router.back()
      }
    }
  }

  return { getAddressData, handleSaveClick }
}
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'AddressEdit',
  components: { Toast },
  setup () {
    const route = useRoute()
    const addressId = route.query.addressId
    const { handleBackClick } = useBackRouterEffect()
    const { show, toastMessage, showToast } = useToastEffect()
    const city = ref('')
    const department = ref('')
    const houseNumber = ref('')
    const name = ref('')
    const phone = ref('')
    const { getAddressData, handleSaveClick } = useAddressEffect(
      city, department, houseNumber, name, phone, showToast)

    getAddressData(addressId)
    return {
      addressId,
      show,
      toastMessage,
      city,
      department,
      houseNumber,
      name,
      phone,
      handleBackClick,
      handleSaveClick
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.wrapper {
  position: absolute;
  overflow: scroll;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background: $darkBgColor;
}
.title {
  position: relative;
  @include title;
  &__back {
    position: absolute;
    left: .1rem;
    width: .3rem;
    font-size: .24rem;
    color: $search-fontColor;
    top: .04rem;
  }
  &__save {
    position: absolute;
    right: .18rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }
}
.content {
  margin-top: .12rem;
  padding: 0 .18rem;
  background: $bgColor;
  &__item {
    display: flex;
    overflow: hidden;
    height: .44rem;
    line-height: .44rem;
    border-bottom: .01rem solid $content-bgColor;
    font-size: .14rem;
    &__label {
      color: $content-fontcolor;
    }
    &__input {
      flex: 1;
      border: none;
      outline: none;
    }
  }
}

</style>
