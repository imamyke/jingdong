<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :currentIndex="0" />
</template>

<script>
import Nearby from './Nearby.vue'
import StaticPart from './StaticPart.vue'
import Docker from './Docker.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    StaticPart,
    Nearby,
    Docker
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.wrapper {
  overflow-y: auto;
  padding: 0 .18rem .1rem .18rem;
  @include fix-content;
}
</style>
