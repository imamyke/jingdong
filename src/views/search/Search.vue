<template>
  <div class="wrapper">
    <div class="search">
      <span class="search__icon iconfont">&#xe65c;</span>
      <input
        class="search__area"
        @change="(e) => handleSearchChange(e)"
        placeHolder="鮮花"
      >
      <div
        class="search__cancel"
        @click="handleCancelClick"
        >取消</div>
    </div>
    <div class="area" v-if="searchHistory.length">
      <div class="area__search">
        <h4 class="area__search__title">搜索历史</h4>
        <span
          class="area__search__clear"
          @click="handleRemoveHistory"
          >清除搜索历史</span>
      </div>
      <ul class="area__list">
        <li
          class="area__list__item"
          v-for="(item, idx) in searchHistory"
          :key="idx"
          @click="() => goToSearchKeyword(item)"
        >{{item}}</li>
      </ul>
    </div>
    <div class="area">
      <div class="area__search">
        <h4 class="area__search__title">热门搜索 </h4>
      </div>
      <ul class="area__list">
        <li
          class="area__list__item"
          v-for="(item, idx) in hotWordList"
          :key="idx"
          @click="() => goToSearchKeyword(item)"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'

const useSearchEffect = () => {
  const router = useRouter()
  const searchHistory = ref(JSON.parse(localStorage.getItem('searchHistory') || '[]'))
  const handleSearchChange = (e) => {
    const searchKeyword = e.target.value
    if (!searchKeyword) return
    const historyKeyword = searchHistory.value.find(history => history === searchKeyword)
    if (!historyKeyword) {
      searchHistory.value.push(searchKeyword)
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
    }
    e.target.value = ''
    router.push(`/searchList?keyword=${searchKeyword}`)
  }
  const handleRemoveHistory = () => {
    localStorage.removeItem('searchHistory')
    searchHistory.value = []
  }

  return { searchHistory, handleSearchChange, handleRemoveHistory }
}
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleCancelClick = () => {
    router.back()
  }
  return { handleCancelClick }
}

const useSearchKeywordEffect = () => {
  const router = useRouter()
  const hotWordList = ref([])
  const getHotWordList = async () => {
    const result = await get('/shop/search/hot-words')
    if (result?.errno === 0 && result?.data?.length) {
      hotWordList.value = result.data
    }
  }
  const goToSearchKeyword = (searchKeyword) => {
    router.push(`/searchList?keyword=${searchKeyword}`)
  }
  getHotWordList()
  return { hotWordList, goToSearchKeyword }
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',
  setup () {
    const { searchHistory, handleSearchChange, handleRemoveHistory } = useSearchEffect()
    const { handleCancelClick } = useBackRouterEffect()
    const { hotWordList, goToSearchKeyword } = useSearchKeywordEffect()
    return { searchHistory, hotWordList, goToSearchKeyword, handleSearchChange, handleRemoveHistory, handleCancelClick }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  margin: 0 .18rem;
  .search {
    position: relative;
    display: flex;
    line-height: .32rem;
    margin-top: .16rem;
    color: $content-fontcolor;
    &__icon {
      position: absolute;
      left: .16rem;
      color: $search-fontColor;
    }
    &__area {
      flex: 1;
      padding: 0 .12rem 0 .44rem;
      background: $search-bgColor;
      border-radius: .16rem;
      border: none;
      outline: none;
      font-size: .14rem;
    }
    &__cancel {
      margin-left: .12rem;
      font-size: .16rem;
    }
  }
  .area {
    margin-top: .24rem;
    &__search {
      display: flex;
      justify-content: space-between;
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontcolor;
      &__title {
        margin: 0;
        font-weight: normal;
      }
      &__clear {
        font-size: .14rem;
      }
    }
    &__list {
      margin: 0 0 0 -.1rem;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      color: $medium-fontColor;
      &__item {
        display: inline-block;
        margin-top: .12rem;
        margin-left: .1rem;
        line-height: .32rem;
        font-size: .14rem;
        background: $search-bgColor;
        border-radius: .02rem;
        padding: 0 .1rem;
      }
    }
  }
}
</style>
