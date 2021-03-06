<template>
  <div class="mobile-menu">
    <h3 class="ystdtb-menu__section-title">モバイルメニュー</h3>
    <div class="ystdtb-menu__section is-w-600">
      <div class="ystdtb-menu__table">
        <div class="is-label">有効化</div>
        <div class="is-content">
          <label>
            <input type="checkbox" name="navigation[mobileMenuEnable]" v-model="enableMobileMenu">モバイルメニューウィジェットを有効化する
          </label>
        </div>
      </div>

      <div class="ystdtb-menu__table" v-show="enableMobileMenu">
        <div class="is-label">グローバルメニュー</div>
        <div class="is-content">
          <label>
            <input type="checkbox" name="navigation[mobileMenuHideGlobalMenu]" v-model="mobileMenuHideGlobalMenu">モバイルメニュー内のグローバルメニューを非表示にする
          </label>
        </div>
      </div>

    </div>
  </div>
</template>

<script>


import _toBool from "../function/_toBool";

export default {
  name: 'mobileMenu',
  methods: {
    getOption( name ) {
      return this.$store.getters.getOption( name );
    },
    getConfig( name ) {
      return this.$store.getters.getConfig( name );
    },
    updateOption( name, newValue ) {
      this.$store.commit( 'updateOption', {
        name: name,
        value: newValue
      } );
    },
  },
  computed: {
    enableMobileMenu: {
      get() {
        return _toBool( this.getOption( 'mobileMenuEnable' ) );
      },
      set( newValue ) {
        this.updateOption( 'mobileMenuEnable', _toBool( newValue ) );
      }
    },
    mobileMenuHideGlobalMenu: {
      get() {
        return _toBool( this.getOption( 'mobileMenuHideGlobalMenu' ) );
      },
      set( newValue ) {
        this.updateOption( 'mobileMenuHideGlobalMenu', _toBool( newValue ) );
      }
    },
  },
}
</script>

<style lang="scss">

</style>
