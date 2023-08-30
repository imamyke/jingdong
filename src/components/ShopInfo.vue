<template>
  <div class="shop">
    <img class="shop__img" :src="item.imgUrl" />
    <div :class="{'shop__content': true, 'shop__content--bordered': border && true}">
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售: {{ item.sales }}</span>
        <span class="shop__content__tag">起送: {{ item.expressLimit }}</span>
        <span class="shop__content__tag">基础运费: {{ item.expressPrice }}</span>
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>
      <!-- products -->
      <div class="shop__products" v-if="item.products">
        <div class="shop__product" v-for="(product) in item.products" :key="product.name">
          <img class="shop__product__img" :src="product.imgUrl" />
          <p class="shop__product__title">{{product.name}}</p>
          <p class="shop__product__price">
            <span class="price__yen">&yen;<span class="price">{{product.price}}</span></span>
            <span class="origin__price">&yen;{{product.oldPrice}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ShopInfo',
  props: ['item', 'border']
}
</script>
<style scoped lang='scss'>
@import '../style/variables.scss';
@import '../style/mixins.scss';
.shop {
  display: flex;
  padding-top: .12rem;
  &__img {
    margin-right: .16rem;
    width: .56rem;
    height: .56rem;
  }
  &__content {
    flex: 1;
    padding-bottom: .12rem;
    &--bordered {
      border-bottom: .01rem solid $content-bgColor;
    }
    &__title {
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__tags {
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontcolor;
    }
    &__tag {
      margin-right: .16rem;
    }
    &__highlight {
      margin: .08rem 0 0 0;
      line-height: .18rem;
      font-size: .13rem;
      color: $highlight-fontColor;
    }
  }
  &__products {
    overflow: hidden;
    margin: .08rem .07rem 0 -.18rem;
    display: flex;
    justify-content: flex-start;
  }
  &__product {
    width: 33.33%;
    padding-left: .18rem;
    box-sizing: border-box;
    &__img {
      width: 100%;
    }
    &__title {
      margin: .04rem 0 0 0;
      line-height: .17rem;
      font-size: .12rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      width: 100%;
      margin: .02rem 0 0 0;
      line-height: .2rem;
      color: $highlight-fontColor;
      @include ellipsis;
      font-size: .12rem;
      .price {
        font-size: .14rem;
        margin-right: .04rem;
      }
      .origin__price {
        color: $light-fontColor;
        text-decoration: line-through;
      }
    }
  }
}
</style>
