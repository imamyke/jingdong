<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe61f;</span>
    北京理工大學國防科技園2號樓10層
    <span class="iconfont position__notice">&#xe7e5;</span>
  </div>
  <div
    class="search"
    @click="handleSearchClick"
  >
    <span class="iconfont">&#xe65c;</span>
    <span class="search__text">山姆會員商店優惠商品</span>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
  <div class="icons">
    <div
      class="icons__item"
      v-for="(item, idx) in iconList"
      :key="idx"
    >
      <img
        class="icons__item__img"
        :src="item.imgUrl"
      />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>
<script>
import { useRouter } from 'vue-router'
const useSearchEffect = () => {
  const router = useRouter()
  const handleSearchClick = () => {
    router.push({ name: 'Search' })
  }
  return { handleSearchClick }
}

const iconList = [
  { imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png', desc: '超市便利' },
  { imgUrl: 'http://www.dell-lee.com/imgs/vue3/菜市场.png', desc: '菜市场' },
  { imgUrl: 'http://www.dell-lee.com/imgs/vue3/水果店.png', desc: '水果店' },
  { imgUrl: 'http://www.dell-lee.com/imgs/vue3/鲜花.png', desc: '鲜花绿植' },
  { imgUrl: 'http://www.dell-lee.com/imgs/vue3/医药健康.png', desc: '医药健康' },
  { imgUrl: 'http://www.dell-lee.com/imgs/vue3/家居.png', desc: '家居時尚' },
  { imgUrl: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png', desc: '烘焙蛋糕' },
  { imgUrl: 'http://www.dell-lee.com/imgs/vue3/签到.png', desc: '签到' },
  { imgUrl: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png', desc: '大牌免运' },
  { imgUrl: 'http://www.dell-lee.com/imgs/vue3/红包.png', desc: '红包套餐' }
]
export default {
  name: 'StaticPart',
  setup () {
    const { handleSearchClick } = useSearchEffect()
    return { iconList, handleSearchClick }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';

.search {
  margin-bottom: .12rem;
  line-height: .32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: .16rem;
  .iconfont {
    position: relative;
    top: .01rem;
    padding: 0 .08rem 0 .16rem;
    display: inline-block;
    font-size: .16rem;
  }
  &__text {
    display: inline-block;
    font-size: .14rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      margin: 0 auto;
      width: .4rem;
      height: .4rem;
    }
    &__desc {
      margin: .06rem 0 .16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.position {
  position: relative;
  padding: .16rem .24rem .16rem 0;
  line-height: .16rem;
  font-size: .16rem;
  @include ellipsis;
  .position__icon {
    position: relative;
    top: .01rem;
    font-size: .2rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: .17rem;
    font-size: .2rem;
  }
  color: $content-fontcolor;
}
.gap {
  margin: 0 -.18rem;
  height: .1rem;
  background: $content-bgColor;
}
</style>
