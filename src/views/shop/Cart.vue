<template>
<div class="mask"
  v-if="setCartShow"
  @click="() => handleCartShowClick()"
/>
<div class="cart">
  <div class="product" v-if="setCartShow">
    <div class="product__header">
      <div
        class="product__header__all"
        @click="() => setCartItemsChecked(shopId)"
      >
        <span
          class="product__header__icon iconfont"
          v-html="calculations.allChecked ? '&#xe63b;' : '&#xe63a;'"
        />
        全选
      </div>
      <div
        class="product__header__clear"
      >
        <span
          class="product__header__clear__btn"
          @click="() => cleanCartProducts(shopId)">清空购物车</span>
      </div>
    </div>
    <div
      class="product__item"
      v-for="(item) in productList"
      :key="item._id"
    >
      <div
        class="product__item__checked iconfont"
        v-html="item.check ? '&#xe63b;' : '&#xe63a;'"
        @click="() => changeCartItemChecked(shopId, item._id)"
      />
      <img :src="item.imgUrl" class="product__item__img" />
      <div class="product__item__detail">
        <h4 class="product__item__title">{{item.name}}</h4>
        <p class="product__item__price">
          <span class="product__item__yen">&yen;</span>{{item.price}}
          <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
        </p>
      </div>
      <div class="product__number">
        <span
          class="product__number__minus iconfont"
          @click="changeCartList(shopId, item._id, item, -1)"
          >&#xe866;</span>
          {{item.qty || 0}}
        <span
          class="product__number__plus iconfont"
          @click="changeCartList(shopId, item._id, item, 1)"
        >&#xe86c;</span>
      </div>
    </div>
  </div>
  <div class="check">
    <div
      class="check__icon"
      @click="() => handleCartShowClick()"
    >
      <span class="check__icon__img iconfont">&#xe63c;</span>
      <div class="check__icon__tag">{{calculations.totalQty}}</div>
    </div>
    <div class="check__info">
      总计:
      <span class="check__info__yen">&yen;</span>
      <span class="check__info__price">{{calculations.totalPrice}}</span>
    </div>
    <div
      class="check__btn"
      v-show="setCheckBtnShow">
      <router-link :to="{ path: `/orderConfirmation/${shopId}` }">
        去结算
      </router-link>
    </div>
  </div>
</div>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffect'
// 獲取購物車信息邏輯
const useCartEffect = (shopId) => {
  const { changeCartList, productList, calculations } = useCommonCartEffect(shopId)
  const store = useStore()
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }

  return {
    calculations,
    productList,
    changeCartList,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked
  }
}
// 展示隱藏購物車邏輯
const toggleCartEffect = (shopId) => {
  const showCart = ref(false)
  const { calculations } = useCartEffect(shopId)
  const handleCartShowClick = () => {
    showCart.value = !showCart.value
  }
  const setCartShow = computed(() => {
    return showCart.value && calculations.value.totalQty > 0
  })
  const setCheckBtnShow = computed(() => {
    return calculations.value.totalPrice > 0
  })
  return { handleCartShowClick, setCartShow, setCheckBtnShow }
}
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { handleCartShowClick, setCartShow, setCheckBtnShow } = toggleCartEffect(shopId)
    const {
      changeCartList, changeCartItemChecked,
      cleanCartProducts, setCartItemsChecked,
      calculations, productList
    } = useCartEffect(shopId)
    return {
      changeCartList,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      handleCartShowClick,
      calculations,
      productList,
      shopId,
      setCartShow,
      setCheckBtnShow
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .5);
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.product {
  flex: 1;
  overflow: scroll;
  background: $bgColor;
  border-radius: .1rem .1rem 0 0;
  &__header {
    display: flex;
    align-items: center;
    background: $bgColor;
    line-height: .52rem;
    border-bottom: .01rem solid $content-bgColor;
    font-size: .14rem;
    color: $content-fontcolor;
    &__all {
      display: flex;
      align-items: center;
      width: .86rem;
      color: $content-fontcolor;
      margin-left: .16rem;
      font-size: .14rem;
    }
    &__icon {
      display: inline-block;
      vertical-align: top;
      color: $btn-bgColor;
      font-size: .2rem;
      margin-right: .2rem;
    }
    &__clear {
      flex: 1;
      margin-right: .16rem;
      text-align: right;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &__checked {
      line-height: .5rem;
      margin-right: .2rem;
      color: $btn-bgColor;
      font-size: .2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: .06rem 0 0 0;
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
      bottom: .26rem;
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
.check {
  background: $bgColor;
  box-sizing: border-box;
  display: flex;
  line-height: .49rem;
  border-top: .01rem solid $content-bgColor;
  &__icon {
    width: .84rem;
    display: flex;
    position: relative;
    &__img {
      width: .84rem;
      text-align: center;
      position: relative;
      font-size: .26rem;
      color: #4FB0F9;
    }
    &__tag {
      position: absolute;
      top: .04rem;
      left: .46rem; // tag
      padding: 0 .04rem; //tag
      min-width: .2rem; //tag
      border-radius: .1rem;
      height: .2rem;
      line-height: .2rem;
      background-color: $highlight-fontColor;
      font-size: .12rem;
      text-align: center;
      color: $bgColor;
      transform: scale(.5); // tag
      transform-origin: center left; //tag
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: .12rem;
    &__price, &__yen {
      color: $highlight-fontColor;
      font-size: .18rem;
    }
    &__yen {
      margin-right: .02rem;
    }
  }
  &__btn {
    border: 0;
    width: .98rem;
    color: $bgColor;
    font-size: .14rem;
    text-align: center;
    background-color: #4FB0F9;
    a {
      width: 100%;
      display: inline-block;
      color: $bgColor;
      text-decoration: none;
      line-height: 0.49rem;
    }
  }
}
</style>
