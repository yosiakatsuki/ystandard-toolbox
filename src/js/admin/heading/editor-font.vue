<template>
  <div class="heading-editor-font">
    <div class="ystdtb-menu__table">
      <div class="is-label">文字サイズ</div>
      <div class="is-content">
        <div class="ystdtb-menu__horizontal">
          <label class="ystdtb-menu__horizontal">
            <MonitorIcon size="20"/>
            <input
                :id="`font-size--${level}`"
                :name="`ystdtb_heading[${level}][fontSizePc]`"
                type="number"
                min="0"
                max="100"
                :step="fontSizeStep"
                v-model="fontSizePc"
            />
          </label>
          <label
              class="ystdtb-menu__horizontal"
              v-show="fontSizeResponsive"
          >
            <TabletIcon size="20"/>
            <input
                :id="`font-size--${level}-tablet`"
                :name="`ystdtb_heading[${level}][fontSizeTablet]`"
                type="number"
                min="0"
                max="100"
                :step="fontSizeStep"
                v-model="fontSizeTablet"
            />
          </label>
          <label
              class="ystdtb-menu__horizontal"
              v-show="fontSizeResponsive"
          >
            <SmartphoneIcon size="20"/>
            <input
                :id="`font-size--${level}-sp`"
                :name="`ystdtb_heading[${level}][fontSizeMobile]`"
                type="number"
                min="0"
                max="100"
                :step="fontSizeStep"
                v-model="fontSizeMobile"
            />
          </label>
          <button type="button" class="is-white" style="height: 100%" @click="toggleFontSizeUnit">{{
              fontSizeUnit
            }}
          </button>
          <input type="hidden" :name="`ystdtb_heading[${level}][fontSizeUnit]`" v-model="fontSizeUnit">
        </div>
      </div>
    </div>
    <div class="ystdtb-menu__table">
      <div class="is-label">文字色</div>
      <div class="is-content">
        <div class="ystdtb-menu__horizontal">
          <ColorPicker
              :name="`ystdtb_heading[${level}][fontColor]`"
              v-model="fontColor"
          />
          <button class="is-cancel is-small" type="button" @click="clearTextColor()">クリア</button>
        </div>
      </div>
    </div>
    <div class="ystdtb-menu__table">
      <div class="is-label">揃え位置</div>
      <div class="is-content">
        <div class="font-align-buttons">
          <button type="button" :class="getAlignClass('left')" @click="setAlign('left')">
            <AlignLeftIcon size="20"/>
          </button>
          <button type="button" :class="getAlignClass('center')" @click="setAlign('center')">
            <AlignCenterIcon size="20"/>
          </button>
          <button type="button" :class="getAlignClass('right')" @click="setAlign('right')">
            <AlignRightIcon size="20"/>
          </button>
          <input type="hidden" :name="`ystdtb_heading[${level}][fontAlign]`" v-model="fontAlign">
        </div>
      </div>
    </div>
    <div class="ystdtb-menu__table">
      <div class="is-label">太さ</div>
      <div class="is-content">
        <select
            :name="`ystdtb_heading[${level}][fontWeight]`"
            v-model="fontWeight"
        >
          <option value="normal">標準</option>
          <option value="bold">太字</option>
          <optgroup label="高度な設定">
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </optgroup>
        </select>
      </div>
    </div>
    <div class="ystdtb-menu__table">
      <div class="is-label">スタイル</div>
      <div class="is-content">
        <select
            :name="`ystdtb_heading[${level}][fontStyle]`"
            v-model="fontStyle"
        >
          <option value="normal">標準</option>
          <option value="italic">イタリック体</option>
        </select>
      </div>
    </div>
    <div class="ystdtb-menu__card" style="margin-top: 1em;">
      <div class="ystdtb-menu__advanced-switch">
        <input
            :name="`ystdtb_heading[${level}][fontAdvanced]`"
            type="hidden"
            value="false"
        >
        <input
            :id="`font-size-advanced-switch--${level}`"
            :name="`ystdtb_heading[${level}][fontAdvanced]`"
            class="toggle-button"
            type="checkbox"
            value="true"
            v-model="fontAdvanced"
        >
        <label :for="`font-size-advanced-switch--${level}`"></label>
      </div>
      <div v-show="fontAdvanced">
        <div class="ystdtb-menu__table">
          <div class="is-label">レスポンシブ</div>
          <div class="is-content" style="padding-top: .4em;">
            <div class="ystdtb-menu__horizontal">
              <div>
                <input
                    :name="`ystdtb_heading[${level}][fontSizeResponsive]`"
                    type="hidden"
                    value="false"
                >
                <input
                    :id="`font-size-responsive--${level}`"
                    :name="`ystdtb_heading[${level}][fontSizeResponsive]`"
                    class="toggle-button"
                    type="checkbox"
                    value="true"
                    v-model="fontSizeResponsive"
                >
                <label :for="`font-size-responsive--${level}`"></label>
              </div>
              <span style="font-size: .8em;">文字サイズを画面サイズ別に設定する</span>
            </div>

          </div>
        </div>
        <div class="ystdtb-menu__table">
          <div class="is-label">
            <label :for="`font-family--${level}`">font-family</label>
          </div>
          <div class="is-content">
            <input
                :id="`font-family--${level}`"
                :name="`ystdtb_heading[${level}][fontFamily]`"
                type="text"
                v-model="fontFamily"
            />
          </div>
        </div>
        <div class="ystdtb-menu__table">
          <div class="is-label">
            <label :for="`line-height--${level}`">line-height</label>
          </div>
          <div class="is-content">
            <input
                :id="`line-height--${level}`"
                :name="`ystdtb_heading[${level}][lineHeight]`"
                type="number"
                min="0"
                max="5"
                step="0.1"
                v-model="lineHeight"
            />
          </div>
        </div>
        <div class="ystdtb-menu__table">
          <div class="is-label">
            <label :for="`letter-spacing--${level}`">letter-spacing</label>
          </div>
          <div class="is-content">
            <div class="ystdtb-menu__horizontal">
              <input
                  :id="`letter-spacing--${level}`"
                  :name="`ystdtb_heading[${level}][letterSpacing]`"
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  v-model="letterSpacing"
              />
              <span>em</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {
  MonitorIcon,
  TabletIcon,
  SmartphoneIcon,
  BoldIcon,
  ItalicIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon
} from 'vue-feather-icons'
import ColorPicker from '../component/color-picker';
import _toBool from '../function/_toBool';
import _toggleSizeInUnit from '../function/_toggleSizeInUnit';

export default {
  name: 'editor-font',
  props: [ 'level' ],
  data() {
    return {}
  },
  components: {
    ColorPicker,
    MonitorIcon,
    TabletIcon,
    SmartphoneIcon,
    BoldIcon,
    ItalicIcon,
    AlignLeftIcon,
    AlignCenterIcon,
    AlignRightIcon
  },
  computed: {
    fontSizeResponsive: {
      get() {
        return _toBool( this.getOption( 'fontSizeResponsive' ) );
      },
      set( newValue ) {
        this.updateOption( 'fontSizeResponsive', newValue );
      }
    },
    fontSizePc: {
      get() {
        return this.getOption( 'fontSizePc' );
      },
      set( newValue ) {
        this.updateOption( 'fontSizePc', newValue );
      }
    },
    fontSizeTablet: {
      get() {
        return this.getOption( 'fontSizeTablet' );
      },
      set( newValue ) {
        this.updateOption( 'fontSizeTablet', newValue );
      }
    },
    fontSizeMobile: {
      get() {
        return this.getOption( 'fontSizeMobile' );
      },
      set( newValue ) {
        this.updateOption( 'fontSizeMobile', newValue );
      }
    },
    fontSizeUnit: function () {
      return this.getOption( 'fontSizeUnit' );
    },
    fontColor: {
      get() {
        return this.getOption( 'fontColor' );
      },
      set( newValue ) {
        this.updateOption( 'fontColor', newValue );
      }
    },
    fontAlign: {
      get() {
        return this.getOption( 'fontAlign' );
      },
      set( newValue ) {
        this.updateOption( 'fontAlign', newValue );
      }
    },
    fontWeight: {
      get() {
        return this.getOption( 'fontWeight' );
      },
      set( newValue ) {
        this.updateOption( 'fontWeight', newValue );
      }
    },
    fontStyle: {
      get() {
        return this.getOption( 'fontStyle' );
      },
      set( newValue ) {
        this.updateOption( 'fontStyle', newValue );
      }
    },
    fontAdvanced: {
      get() {
        return _toBool( this.getOption( 'fontAdvanced' ) );
      },
      set( newValue ) {
        this.updateOption( 'fontAdvanced', newValue );
      }
    },
    fontFamily: {
      get() {
        return this.getOption( 'fontFamily' );
      },
      set( newValue ) {
        const _value = !! newValue ? newValue.replace( ';', '' ) : newValue;
        this.updateOption( 'fontFamily', _value );
      }
    },
    lineHeight: {
      get() {
        return this.getOption( 'lineHeight' );
      },
      set( newValue ) {
        this.updateOption( 'lineHeight', newValue );
      }
    },
    letterSpacing: {
      get() {
        return this.getOption( 'letterSpacing' );
      },
      set( newValue ) {
        this.updateOption( 'letterSpacing', newValue );
      }
    },
    fontSizeStep: function () {
      if ( 'em' === this.fontSizeUnit ) {
        return 0.1;
      }
      return 1;
    }
  },
  methods: {
    getOption( name ) {
      return this.$store.state.options[ this.level ][ name ];
    },
    updateOption( name, newValue ) {
      this.$store.commit( 'updateOption', {
        level: this.level,
        name: name,
        value: newValue
      } );
    },
    setAlign( value ) {
      let oldValue = this.getOption( 'fontAlign' );
      if ( value === oldValue ) {
        value = '';
      }
      this.fontAlign = value;
    },
    getAlignClass( align ) {
      return [
        'is-white',
        {
          'is-active': align === this.fontAlign
        }
      ]
    },
    toggleFontSizeUnit() {
      const unit = 'em' === this.fontSizeUnit ? 'px' : 'em';
      this.updateOption( 'fontSizeUnit', unit );
      this.updateOption(
          'fontSizePc',
          _toggleSizeInUnit( this.fontSizePc, unit )
      );
      this.updateOption(
          'fontSizeTablet',
          _toggleSizeInUnit( this.fontSizeTablet, unit )
      );
      this.updateOption(
          'fontSizeMobile',
          _toggleSizeInUnit( this.fontSizeMobile, unit )
      );
    },
    clearTextColor() {
      this.updateOption( 'fontColor', '' );
    }
  },
};
</script>

<style lang="scss">
.font-size-columns {
  display: flex;
  align-items: center;
  width: 100%;

  > * {
    margin-right: .5em;

    &:last-child {
      margin-right: 0;
    }
  }
}

.font-align-buttons {
  display: flex;

  button {
    border-radius: 0;

    &:first-of-type {
      border-right: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-of-type {
      border-left: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &.is-active {
      background-color: #eee;
    }
  }
}
</style>
