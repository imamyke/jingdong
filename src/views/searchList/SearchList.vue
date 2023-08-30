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
          v-model="searchKeyword"
          @change="(e) => handleSearchInputChange(e)"
        />
      </div>
    </div>
    <router-link
      v-for="(list, idx) in searchList"
      :key="idx"
      :to="`/shop/${list._id}`"
    >
      <ShopInfo :item="list" />
    </router-link>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
const useSearchKeywordEffect = () => {
  const searchList = ref([])
  const getSearchList = async (keyword) => {
    const result = await get('/shop/search', { keyword })
    if (result?.errno === 0 && result?.data?.length) {
      searchList.value = result.data
    }
  }
  getSearchList()
  return { searchList, getSearchList }
}

export default {
  name: 'SearchList',
  components: { ShopInfo },
  setup () {
    const { handleBackClick } = useBackRouterEffect()
    const route = useRoute()
    const searchKeyword = ref(route.query.keyword || '')
    const { searchList, getSearchList } = useSearchKeywordEffect()
    const handleSearchInputChange = () => {
      getSearchList(searchKeyword.value)
    }
    getSearchList(searchKeyword)
    return { handleBackClick, searchKeyword, handleSearchInputChange, searchList }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/variables.scss';
.wrapper {
  padding: 0 .18rem;
  a {
    text-decoration: none;
  }
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
