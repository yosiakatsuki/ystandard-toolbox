<template>
  <div class="ystdtb-menu__form cta">
    <CtaSort/>
  </div>
</template>

<script>
import CtaSort from './cta-sort';

export default {
  name: 'app-cta',
  components: {
    CtaSort,
  },
  methods: {
    getConfig( name ) {
      return this.$store.getters.getConfig( name );
    },
  },
  beforeCreate() {
    this.$store.commit( 'initOptions' );
    this.$store.commit( 'initConfig' );
  },
}
</script>

<style lang="scss">

</style>
