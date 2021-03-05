<template>
  <div class="submit ystdtb-save-button">
    <button type="button" class="button button-primary" @click="saveData" :disabled="disabled">変更を保存</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'saveButton',
  props: [ 'optionName', 'options' ],
  data() {
    return {
      disabled: false,
      toastedOptions: {
        position: 'bottom-right',
        duration: 2000,
        type: 'default',
        className: 'ystdbtb-toasted',
      },
      unknownErrorMessage: '予期せぬエラーが発生しました。時間をおいて再実行するか、ページを再読み込みしてください。',
    }
  },
  methods: {
    saveData() {
      const ajaxUrl = window.ystdtbAdminConfig[ 'ajaxUrl' ];
      const action = window.ystdtbAdminConfig[ 'nonceAction' ];
      const nonce = window.ystdtbAdminConfig[ 'nonceValue' ];
      let params = new URLSearchParams();
      const postData = { [ this.optionName ]: this.options };
      params.append( 'nonceAction', action );
      params.append( 'nonce', nonce );
      params.append( 'options', JSON.stringify( postData ) );
      if ( ajaxUrl ) {
        this.saveStart();
        axios.post( ajaxUrl, params )
            .then( response => {
              this.toastedOptions.type = 200 === response.data.status ? 'success' : 'error';
              this.$toasted.show( response.data.message, this.toastedOptions );
            } ).catch( error => {
          this.showErrorToast( this.unknownErrorMessage );
          /* eslint-disable no-console */
          console.log( error );
        } );
        this.saveEnd();
      } else {
        this.showErrorToast( this.unknownErrorMessage );
      }
    },
    saveStart() {
      this.disabled = true;
    },
    saveEnd() {
      this.disabled = false;
    },
    showErrorToast( message ) {
      this.toastedOptions.type = 'error';
      this.$toasted.show( message, this.toastedOptions );
    }
  },
}
</script>

<style lang="scss">
.toasted .primary,
.toasted.toasted-primary {

  border: 0;
  margin: 0;

  &.ystdbtb-toasted {
    &.success {
      background-color: rgba(#1ba207, 0.6);
    }

    &.error {
      background-color: rgba(#a20707, 0.6);
    }
  }
}


</style>
