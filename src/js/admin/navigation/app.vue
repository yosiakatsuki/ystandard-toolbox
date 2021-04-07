<template>
  <div class="ystdtb-menu__form navigation">
    <MobileMenu/>

    <div class="ystdtb-menu__section">
      <SaveButton
          :ajaxUrl="ajaxUrl"
          :optionName="getConfig('optionName')"
          :options="options"
      />
    </div>
  </div>
</template>

<script>
import SaveButton from '../component/save-button';
import MobileMenu from './mobile-menu';

export default {
  name: 'app-navigation',
  components: {
    SaveButton,
    MobileMenu,
  },
  methods: {
    getConfig( name ) {
      return this.$store.getters.getConfig( name );
    },
  },
  computed: {
    options: function () {
      return this.$store.getters.options;
    },
    ajaxUrl() {
      return this.getConfig('ajaxUrl');
    }
  },
  beforeCreate() {
    this.$store.commit( 'initOptions' );
    this.$store.commit( 'initConfig' );
  },
}
</script>

<style lang="scss">

</style>
