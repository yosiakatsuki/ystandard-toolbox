<template>
	<div class="heading-editor-other">
		<div class="ystdtb-menu__section" style="margin-top: 0;">
			<label class="is-block">高度な設定</label>
			<div class="ystdtb-menu__subtext">※薄橙色のデザインテンプレートのみ高度な設定が使用できます。</div>
			<div class="ystdtb-menu__table">
				<div class="is-label">before</div>
				<div class="is-content">

					<input :name="`ystdtb_heading[${level}][beforeColorType]`" type="hidden" v-model="beforeColorType"/>

					<div class="advanced-option__before-after-container">
						<label :for="`before-content--${level}`" class="is-block is-small">アイコン</label>
						<div style="font-size: .8em;">
							<iconSelect :level="level" :type="'before'"/>
						</div>
					</div>
					<div class="advanced-option__before-after-container">
						<label :for="`before-size--${level}`" class="is-block is-small">サイズ</label>
						<input
							:id="`before-size--${level}`"
							type="number"
							max="50"
							min="0"
							:step="sizeStep"
							v-model="beforeSize"
							:disabled="isDisable('beforeSize')"
						/>
						<input
							:name="`ystdtb_heading[${level}][beforeSize]`"
							type="hidden"
							v-model="beforeSize"
						/>
					</div>
					<div class="advanced-option__before-after-container">
						<label :for="`before-color--${level}`" class="is-block is-small">色</label>
						<div class="ystdtb-menu__horizontal">
							<ColorPicker
								:name="`ystdtb_heading[${level}][beforeColor]`"
								v-model="beforeColor"
								:disabled="isDisable('beforeColor')"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="ystdtb-menu__table">
				<div class="is-label">after</div>
				<div class="is-content">

					<input :name="`ystdtb_heading[${level}][afterColorType]`" type="hidden" v-model="afterColorType"/>

					<div class="advanced-option__before-after-container">
						<label :for="`before-content--${level}`" class="is-block is-small">アイコン</label>
						<div style="font-size: .8em;">
							<iconSelect :level="level" :type="'after'"/>
						</div>
					</div>
					<div class="advanced-option__before-after-container">
						<label :for="`after-size--${level}`" class="is-block is-small">サイズ</label>
						<input
							:id="`after-size--${level}`"
							type="number"
							max="50"
							min="0"
							:step="sizeStep"
							v-model="afterSize"
							:disabled="isDisable('afterSize')"
						/>
						<input
							:name="`ystdtb_heading[${level}][afterSize]`"
							type="hidden"
							v-model="afterSize"
						/>
					</div>
					<div class="advanced-option__before-after-container">
						<label :for="`after-color--${level}`" class="is-block is-small">色</label>
						<div class="ystdtb-menu__horizontal">
							<ColorPicker
								:name="`ystdtb_heading[${level}][afterColor]`"
								v-model="afterColor"
								:disabled="isDisable('afterColor')"
							/>
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="ystdtb-menu__section">
			<label class="is-block">初期化</label>
			<button type="button" class="is-danger is-block is-small" @click="showResetModal = true">設定をリセットする</button>
			<transition name="fade">
				<div v-if="showResetModal" class="ystdtb-menu__modal">
					<div class="ystdtb-menu__modal-content">
						<p>これまで設定した {{ label }} のデザインがすべて初期化されますがよろしいですか？</p>
						<div class="ystdtb-menu__horizontal">
							<button type="button" class="is-primary is-block" @click="resetOptions()">設定をリセット</button>
							<button type="button" class="is-cancel is-block" @click="showResetModal = false">キャンセル</button>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../component/color-picker';
	import iconSelect from './icon-select';
	import presets from './preset.json';

	export default {
		name: 'editor-other',
		props: [ 'level', 'label' ],
		components: {
			ColorPicker,
			iconSelect
		},
		data() {
			return {
				showResetModal: false,
				presetList: presets,
			}
		},
		computed: {
			beforeContent: {
				get() {
					return this.getOption( 'beforeContent' );
				},
				set( newValue ) {
					this.updateOption( 'beforeContent', newValue );
				}
			},
			beforeSize: {
				get() {
					return this.getOption( 'beforeSize' );
				},
				set( newValue ) {
					this.updateOption( 'beforeSize', newValue );
				}
			},
			beforeColor: {
				get() {
					return this.getOption( 'beforeColor' );
				},
				set( newValue ) {
					this.updateOption( 'beforeColor', newValue );
				}
			},
			beforeColorType: {
				get() {
					return this.getOption( 'beforeColorType' );
				},
				set( newValue ) {
					this.updateOption( 'beforeColorType', newValue );
				}
			},
			afterContent: {
				get() {
					return this.getOption( 'afterContent' );
				},
				set( newValue ) {
					this.updateOption( 'afterContent', newValue );
				}
			},
			afterSize: {
				get() {
					return this.getOption( 'afterSize' );
				},
				set( newValue ) {
					this.updateOption( 'afterSize', newValue );
				}
			},
			afterColor: {
				get() {
					return this.getOption( 'afterColor' );
				},
				set( newValue ) {
					this.updateOption( 'afterColor', newValue );
				}
			},
			afterColorType: {
				get() {
					return this.getOption( 'afterColorType' );
				},
				set( newValue ) {
					this.updateOption( 'afterColorType', newValue );
				}
			},
			other: {
				get() {
					return this.getOption( 'backgroundColor' );
				},
				set( newValue ) {
					this.updateOption( 'backgroundColor', newValue );
				}
			},
			sizeStep() {
				const preset = this.getOption( 'preset' );
				if ( undefined === this.presetList[ preset ] ) {
					return 1;
				}
				if ( undefined === this.presetList[ preset ][ 'usePseudoElementsSize' ] ) {
					return 1;
				}
				if ( this.presetList[ preset ].usePseudoElementsSize.includes( 'iconSize' ) ) {
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
			clearColor( name ) {
				this.updateOption( name, '' );
			},
			resetOptions() {
				this.$store.commit( 'resetOptions', {
					level: this.level,
				} );
				this.showResetModal = false;
			},
			isDisable( name ) {
				const preset = this.getOption( 'preset' );
				if ( undefined === this.presetList[ preset ] ) {
					return true;
				}
				if ( undefined === this.presetList[ preset ][ 'enablePseudoElements' ] ) {
					return true;
				}
				return ! this.presetList[ preset ].enablePseudoElements.includes( name );
			}
		}
	}
</script>

<style lang="scss">
	.advanced-option__before-after-container {
		display: flex;
		align-items: center;
		margin-top: .5em;

		label {
			flex-shrink: 0;
			width: 55px;
			margin-right: .5em;
		}
	}
</style>
