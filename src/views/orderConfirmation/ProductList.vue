<template>
<div class="products">
  <div class="products__title">{{shopName}}</div>
  <div class="products__list__wrapper">
    <ul class="products__list">
      <li
        class="products__item"
        v-for="(item) in productList"
        :key="item._id"
      >
        <img :src="item.imgUrl" class="products__item__img" />
        <div class="products__item__detail">
          <h4 class="products__item__title">{{item.name}}</h4>
          <p class="products__item__price">
            <span class="products__item__single">
              <span class="products__item__yen">&yen; </span>
              {{item.price}} x {{item.qty}}
            </span>
            <span class="products__item__total">
              <span class="products__item__yen">&yen; </span>
              {{(item.price * item.qty).toFixed(2)}}
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { useCommonCartEffect } from '../../effects/cartEffect'
import { useRoute } from 'vue-router'
export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.products {
  margin: .16rem .18rem .2rem .16rem;
  background: $bgColor;
  &__title {
    padding: .16rem;
    font-size: .16rem;
    color: $content-fontcolor;
  }
  &__list {
    padding: 0 0 .16rem 0;
    list-style: none;
    margin: 0 .18rem 0 .16rem;
    background: $bgColor;
    &__wrapper {
      position: absolute;
      top: 2.62rem;
      left: 0;
      right: 0;
      bottom: .7rem;
      overflow-y: scroll;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: .16rem .16rem 0 .16rem;
    &:first-child {
      padding-top: 0;
    }
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__detail {
      flex: 1;
      overflow: hidden;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      display: flex;
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
    }
    &__total {
      text-align: right;
      flex: 1;
      color: $dark-fontColor;
    }
    &__yen {
      font-size: .12rem;
    }
  }
}
</style>
