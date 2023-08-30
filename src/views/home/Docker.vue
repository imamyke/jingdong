<template>
  <div class="docker">
    <div
      v-for="(item, idx) in dockerList"
      :class="{'docker__item': true, 'docker__item--active': idx === currentIndex}"
      :key="idx"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      {
        icon: '&#xe600;',
        text: '首页',
        to: { name: 'Home' }
      },
      {
        icon: '&#xe680;',
        text: '购物车',
        to: { name: 'CartList' }
      },
      {
        icon: '&#xe60c;',
        text: '订单',
        to: { name: 'OrderList' }
      },
      {
        icon: '&#xe660;',
        text: '我的',
        to: { name: 'Address' }
      }
    ]

    return {
      dockerList
    }
  }
}
</script>
<style lang="scss">
@import '../../style/variables.scss';
.docker {
  box-sizing: border-box;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  padding: 0 .18rem;
  border-top: .01rem solid $content-bgColor;
  &__item {
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
      color: $content-fontcolor;
    }
    .iconfont {
      margin: .07rem 0 .02rem 0;
      font-size: .18rem;
    }
    &--active {
      a {
        color: #1FA4FC;
      }
    }
  }
  &__title {
    font-size: .2rem;
    transform: scale(.5, .5);
    transform-origin: center top;
  }
}
</style>
