<template>
  <div class="cta-sort">
    <h3 class="ystdtb-menu__section-title">詳細ページ 上部・下部 並び替え</h3>
    <div class="ystdtb-menu__section">
      <div>
        <label for="sort-post-type">投稿タイプ : </label>
        <select id="sort-post-type" style="width: auto;padding-right: 2em;" v-model="selectedPostType"
                @change="setCtaData()" :disabled="disabledPostType">
          <option v-if="1 < postTypes.length" value="">選択してください</option>
          <option v-for="data in postTypes" :key="data.id" :value="data.id">{{ data.name }}</option>
        </select>
      </div>

      <div class="ystdtb-menu__section" v-show="!!selectedPostType">
        <div class="cta-sort__container">
          <div>
            <h4 class="ystdtb-menu__section-sub-title">コンテンツ 上</h4>
            <div class="sort-items">
              <draggable group="footer" draggable=".sort-items__item" handle=".sort-items__item-icon"
                         v-model="headerCta" v-bind="{animation:200}"
                         @end="draggableEndHeader">
                <transition-group :name="transitionName">
                  <div class="sort-items__item" v-for="item in headerCta" :key="item.id">
                    <div class="sort-items__item-icon">
                      <MenuIcon size="20"/>
                    </div>
                    <div class="sort-items__item-text">
                      <div class="sort-items__item-label">{{ item.label }}</div>
                    </div>
                    <div class="sort-items__item-arrow">
                      <button type="button" @click="upItem(item.index,'header')">
                        <ChevronUpIcon size="14"/>
                      </button>
                      <button type="button" @click="downItem(item.index,'header')">
                        <ChevronDownIcon size="14"/>
                      </button>
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </div>
          </div>
          <div>
            <h4 class="ystdtb-menu__section-sub-title">コンテンツ 下</h4>
            <div class="sort-items">
              <draggable group="footer" draggable=".sort-items__item" handle=".sort-items__item-icon"
                         v-model="footerCta" v-bind="{animation:200}"
                         @end="draggableEndFooter">
                <transition-group :name="transitionName">
                  <div class="sort-items__item" v-for="item in footerCta" :key="item.id">
                    <div class="sort-items__item-icon">
                      <MenuIcon size="20"/>
                    </div>
                    <div class="sort-items__item-text">
                      <div class="sort-items__item-label">{{ item.label }}</div>
                    </div>
                    <div class="sort-items__item-arrow">
                      <button type="button" @click="upItem(item.index,'footer')">
                        <ChevronUpIcon size="14"/>
                      </button>
                      <button type="button" @click="downItem(item.index,'footer')">
                        <ChevronDownIcon size="14"/>
                      </button>
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </div>
          </div>
        </div>
      </div>

      <div class="ystdtb-menu__section" style="max-width: 1000px;" v-show="!!selectedPostType">
        <div class="ystdtb-menu__horizontal">
          <SaveButton
              ref="ctaSave"
              :ajaxUrl="ajaxUrl"
              :optionName="getConfig('optionName')"
              :options="saveOptions"
              :disabled="!this.isEdit"
              :onSuccess="saveSuccess"
              :onError="saveError"
          />
          <button type="button" class="button ystdtb-button-cancel" @click="selectCancel" :disabled="!isEdit"
                  style="margin-left: 2em;">
            キャンセル
          </button>
          <button type="button" class="button ystdtb-button-delete" @click="selectDelete" :disabled="!selectedPostType"
                  style="margin-left: auto;">
            初期値に戻す
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>


import SaveButton from "../component/save-button";
import draggable from 'vuedraggable';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MenuIcon
} from 'vue-feather-icons'
import _copyObject from "../function/_copyObject";

export default {
  name: 'cta-sort',
  components: {
    SaveButton,
    draggable,
    ChevronUpIcon,
    ChevronDownIcon,
    MenuIcon
  },
  data() {
    return {
      selected: '',
      headerCta: [],
      footerCta: [],
      transitionName: 'sort-item',
      disabledPostType: false,
      tempData: null,
      isEdit: false,
    }
  },
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
    setCtaData() {
      this.setPostTypeCta( this.selectedPostType );
      this.sortCtaData();
    },
    refreshCtaName() {
      const priorityConfig = this.getConfig( 'priority' );
      const headerConfig = priorityConfig.header;
      const footerConfig = priorityConfig.footer;
      this.headerCta = this.headerCta.map( item => {
        const target = headerConfig.find( conf => {
          return conf.id === item.id;
        } );
        if ( target ) {
          item.label = target.label;
        }
        return item;
      } );
      this.footerCta = this.footerCta.map( item => {
        const target = footerConfig.find( conf => {
          return conf.id === item.id;
        } );
        if ( target ) {
          item.label = target.label;
        }
        return item;
      } );
    },
    sortCtaData() {
      this.headerCta = this.headerCta.sort( function ( a, b ) {
        if ( a.number < b.number ) return -1;
        if ( a.number > b.number ) return 1;
        return 0;
      } );
      this.footerCta = this.footerCta.sort( function ( a, b ) {
        if ( a.number < b.number ) return -1;
        if ( a.number > b.number ) return 1;
        return 0;
      } );
      this.updateHeaderCtaNumber();
      this.updateFooterCtaNumber();
    },
    setPostTypeCta( postType ) {
      if ( ! postType ) {
        this.headerCta = [];
        this.footerCta = [];
        this.sortCtaData();
        return;
      }
      const option = this.getOption( 'ctaSort' );
      if ( ! option ) {
        this.resetPriority( 'all' );
        return;
      }

      if ( ! option.hasOwnProperty( postType ) ) {
        this.resetPriority( 'all' );
        return;
      }
      const target = option[ postType ];
      if ( target.hasOwnProperty( 'header' ) && 0 < target.header.length ) {
        this.headerCta = target.header;
      } else {
        this.resetPriority( 'header' );
      }
      if ( target.hasOwnProperty( 'footer' ) && 0 < target.footer.length ) {
        this.footerCta = target.footer;
      } else {
        this.resetPriority( 'footer' );
      }
      this.refreshCtaName();
      this.tempData = {
        header: _copyObject( this.headerCta ),
        footer: _copyObject( this.footerCta ),
      };
    },
    resetPriority( type ) {
      const priorityConfig = this.getConfig( 'priority' );
      if ( 'header' === type || 'all' === type ) {
        this.headerCta = _copyObject( priorityConfig.header );
      }
      if ( 'footer' === type || 'all' === type ) {
        this.footerCta = _copyObject( priorityConfig.footer );
      }
      this.sortCtaData();
      this.tempData = {
        header: _copyObject( this.headerCta ),
        footer: _copyObject( this.footerCta ),
      };
    },
    updateHeaderCtaNumber() {
      this.headerCta = this.headerCta.map( function ( item, index ) {
        item.index = index + 1;
        item.number = item.index * 10;
        item.priority = item.number;
        return item;
      } );
    },
    updateFooterCtaNumber() {
      this.footerCta = this.footerCta.map( function ( item, index ) {
        item.index = index + 1;
        item.number = item.index * 10;
        item.priority = item.number;
        return item;
      } );
    },
    draggableEndHeader() {
      this.updateHeaderCtaNumber();
      this.disabledPostType = true;
      this.isEdit = true;
    },
    draggableEndFooter() {
      this.updateFooterCtaNumber();
      this.disabledPostType = true;
      this.isEdit = true;
    },
    upItem( index, type ) {
      if ( 1 >= index ) {
        return;
      }
      this.changeNumber(
          index - 1,
          index - 2,
          type
      );
      this.sortCtaData();
      this.disabledPostType = true;
      this.isEdit = true;
    },
    downItem( index, type ) {
      const length = 'header' === type ? this.headerCta.length : this.footerCta.length;
      if ( length <= index ) {
        return;
      }
      this.changeNumber(
          index - 1,
          index,
          type
      );
      this.sortCtaData();
      this.disabledPostType = true;
      this.isEdit = true;
    },
    changeNumber( nowIndex, toIndex, type ) {
      if ( 'header' === type ) {
        const nowNumber = this.headerCta[ nowIndex ].number;
        this.headerCta[ nowIndex ].number = this.headerCta[ toIndex ].number;
        this.headerCta[ toIndex ].number = nowNumber;
      }
      if ( 'footer' === type ) {
        const nowNumber = this.footerCta[ nowIndex ].number;
        this.footerCta[ nowIndex ].number = this.footerCta[ toIndex ].number;
        this.footerCta[ toIndex ].number = nowNumber;
      }
    },
    saveSuccess( status ) {
      this.saveCtaSort();
      this.disabledPostType = false;
      this.isEdit = false;
    },
    saveError( status ) {
      // this.disabledPostType = false;
      // this.isEdit = false;
    },
    selectCancel() {
      this.headerCta = _copyObject( this.tempData[ 'header' ] );
      this.footerCta = _copyObject( this.tempData[ 'footer' ] );
      this.saveCtaSort();
      this.sortCtaData();
      this.disabledPostType = false;
      this.isEdit = false;
    },
    selectDelete() {
      this.headerCta = _copyObject( [] );
      this.footerCta = _copyObject( [] );
      this.saveCtaSort();
      this.$refs.ctaSave.saveData( this.saveOptions );
      this.setCtaData();
    },
    saveCtaSort() {
      let option = this.getOption( 'ctaSort' );
      option[ this.selectedPostType ] = {
        header: this.headerCta,
        footer: this.footerCta,
      };
      this.updateOption( 'ctaSort', option );
    },
    resetSelectedPostType() {
      if ( 1 === this.postTypes.length ) {
        return;
      }
      this.selectedPostType = '';
    },
  },
  computed: {
    saveOptions: function () {
      return {
        "ctaSort": {
          "postType": this.selectedPostType,
          "header": this.headerCta,
          "footer": this.footerCta,
        }
      };
    },
    selectedPostType: {
      get() {
        if ( 1 >= this.postTypes.length ) {
          return this.postTypes[ 0 ].id;
        }
        return this.selected;
      },
      set( newValue ) {
        this.selected = newValue;
      }
    },
    postTypes: function () {
      return this.$store.getters.getConfig( 'postTypes' );
    },
    ajaxUrl() {
      return this.getConfig( 'ajaxUrl' );
    }
  },
  mounted() {
    if ( 1 >= this.postTypes.length ) {
      this.setCtaData();
    }
  }
}
</script>

<style lang="scss">
.cta-sort__container {
  max-width: 1000px;
  @media (min-width: 600px) {
    display: flex;
    justify-content: space-between;
  }

  > div {
    margin: 3em 0 0;

    &:first-child {
      margin-top: 0;
    }

    @media (min-width: 600px) {
      margin-top: 0;
      width: 48%;
    }
  }
}

.sort-items {
  border: 1px solid #ccc;
}

.sort-items__item {
  display: flex;
  align-items: center;
  padding: .5em 1em;
  border-bottom: 1px solid #ccc;
  background-color: #fff;

  &:last-child {
    border-bottom: 0;
  }
}

.sort-items__item-icon {
  margin-right: 1em;
  color: #aaa;
  cursor: move;

  svg {
    display: block;
  }
}

.sort-items__item-text {
  flex-grow: 1;
}

.sort-items__item-arrow {
  button {
    margin-top: 1px;
    display: block;
    padding: .25em;
    border: 0;
    color: #aaa;
    line-height: 1;
    outline: none;
    box-shadow: none;

    &:first-child {
      margin-top: 0;
    }

    &:focus {
      box-shadow: 0 0 0 1px currentColor;
    }
  }

  svg {
    display: block;
  }
}

.sort-item-move {
  transition: transform .3s;
}
</style>
