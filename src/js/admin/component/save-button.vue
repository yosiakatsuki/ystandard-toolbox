<template>
  <div class="submit ystdtb-save-button">
    <button type="button" :class="buttonClass" @click="onClickSaveButton" :disabled="buttonDisabled">{{
        buttonText
      }}
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'saveButton',
  props: [
    'ajaxUrl',
    'optionName',
    'options',
    'disabled',
    'onSuccess',
    'onError',
    'buttonType',
    'text',
    'saveText',
  ],
  data() {
    return {
      disabledSaveButton: false,
      isSaving: false,
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
    onClickSaveButton() {
      this.saveData();
    },
    saveData( option ) {
      const action = window.ystdtbAdminConfig[ 'nonceAction' ];
      const nonce = window.ystdtbAdminConfig[ 'nonceValue' ];
      let params = new URLSearchParams();
      const postOption = undefined !== option ? option : this.options;
      const postData = { [ this.optionName ]: postOption };
      params.append( 'nonceAction', action );
      params.append( 'nonce', nonce );
      params.append( 'options', JSON.stringify( postData ) );
      if ( this.ajaxUrl ) {
        this.saveStart();
        axios.post( this.ajaxUrl, params )
            .then( response => {
              this.toastedOptions.type = 200 === response.data.status ? 'success' : 'error';
              if ( 'success' === this.toastedOptions.type && this.onSuccess ) {
                this.onSuccess( response.data.status );
              } else if ( this.onError ) {
                this.onError( response.data.status );
              }
              this.$toasted.show( response.data.message, this.toastedOptions );
              this.saveEnd();
            } ).catch( error => {
          this.showErrorToast( this.unknownErrorMessage );
          this.saveEnd();
          /* eslint-disable no-console */
          console.log( error );
          if ( this.onError ) {
            this.onError( 500 );
          }
        } );

      } else {
        this.showErrorToast( this.unknownErrorMessage );
        if ( this.onError ) {
          this.onError( 404 );
        }
      }
    },
    saveStart() {
      this.buttonDisabled = true;
      this.isSaving = true;
    },
    saveEnd() {
      this.isSaving = false;
      this.buttonDisabled = false;
    },
    showErrorToast( message ) {
      this.toastedOptions.type = 'error';
      this.$toasted.show( message, this.toastedOptions );
    }
  },
  computed: {
    buttonDisabled: {
      get() {
        if ( true === this.disabledSaveButton ) {
          return true;
        }
        if ( null !== this.disabled && undefined !== this.disabled ) {
          return this.disabled;
        }
        return this.disabledSaveButton;
      },
      set( newValue ) {
        this.disabledSaveButton = newValue;
      }
    },
    buttonClass() {
      return {
        button: true,
        [ `button-primary` ]: ! this.buttonType || 'primary' === this.buttonType,
        [ `ystdtb-button-delete` ]: 'delete' === this.buttonType,
      }
    },
    buttonText() {
      if ( this.isSaving ) {
        return this.saveText ? this.saveText : '保存中…';
      }
      return this.text ? this.text : '変更を保存';
    }
  }
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
