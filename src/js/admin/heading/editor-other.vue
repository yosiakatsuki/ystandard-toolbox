<template>
	<div class="heading-editor-other">
		<div class="ystdtb-menu__section" style="margin-top: 0;">
			<label class="is-block">高度な設定</label>
			<div class="ystdtb-menu__subtext">※薄紫色のデザインテンプレートのみ高度な設定が使用できます。</div>
			<input :name="`ystdtb_heading[${level}][display]`" type="hidden" v-model="display"/>
			<div class="ystdtb-menu__table">
				<div class="is-label">before</div>
				<div class="is-content">

					<input :name="`ystdtb_heading[${level}][beforeAlignSelf]`" type="hidden" v-model="beforeAlignSelf"/>
					<input :name="`ystdtb_heading[${level}][beforeFlexGrow]`" type="hidden" v-model="beforeFlexGrow"/>
					<input :name="`ystdtb_heading[${level}][beforeMinWidth]`" type="hidden" v-model="beforeMinWidth"/>
					<input :name="`ystdtb_heading[${level}][beforeColorType]`" type="hidden" v-model="beforeColorType"/>

					<div v-show="false" class="advanced-option__before-after-container">
						<label :for="`before-content--${level}`" class="is-block is-small">content</label>
						<input
							:id="`before-content--${level}`"
							:name="`ystdtb_heading[${level}][beforeContent]`"
							type="text"
							v-model="beforeContent"
							:disabled="isDisable('beforeContent')"
						/>
					</div>
					<div class="advanced-option__before-after-container">
						<label :for="`before-size--${level}`" class="is-block is-small">size</label>
						<input
							:id="`before-size--${level}`"
							type="number"
							max="50"
							min="0"
							step="1"
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
						<label :for="`before-color--${level}`" class="is-block is-small">color</label>
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

					<input :name="`ystdtb_heading[${level}][afterAlignSelf]`" type="hidden" v-model="afterAlignSelf"/>
					<input :name="`ystdtb_heading[${level}][afterFlexGrow]`" type="hidden" v-model="afterFlexGrow"/>
					<input :name="`ystdtb_heading[${level}][afterMinWidth]`" type="hidden" v-model="afterMinWidth"/>
					<input :name="`ystdtb_heading[${level}][afterColorType]`" type="hidden" v-model="afterColorType"/>

					<div v-show="false" class="advanced-option__before-after-container">
						<label :for="`after-content--${level}`" class="is-block is-small">content</label>
						<input
							:id="`after-content--${level}`"
							:name="`ystdtb_heading[${level}][afterContent]`"
							type="text"
							v-model="afterContent"
							:disabled="isDisable('afterContent')"
						/>
					</div>
					<div class="advanced-option__before-after-container">
						<label :for="`after-size--${level}`" class="is-block is-small">size</label>
						<input
							:id="`after-size--${level}`"
							type="number"
							max="50"
							min="0"
							step="1"
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
						<label :for="`after-color--${level}`" class="is-block is-small">color</label>
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
						<p>これまで設定した {{ labelLevel }} のデザインがすべて初期化されますがよろしいですか？</p>
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
	import presets from './preset.json';

	export default {
		name: 'editor-other',
		props: [ 'level' ],
		components: {
			ColorPicker
		},
		data() {
			return {
				showResetModal: false,
				labelLevel: this.level,
				presetList: presets,
			}
		},
		computed: {
			display: {
				get() {
					return this.getOption( 'display' );
				},
				set( newValue ) {
					this.updateOption( 'display', newValue );
				}
			},
			beforeContent: {
				get() {
					return this.getOption( 'beforeContent' );
				},
				set( newValue ) {
					this.updateOption( 'beforeContent', newValue );
				}
			},
			beforeAlignSelf: {
				get() {
					return this.getOption( 'beforeAlignSelf' );
				},
				set( newValue ) {
					this.updateOption( 'beforeAlignSelf', newValue );
				}
			},
			beforeFlexGrow: {
				get() {
					return this.getOption( 'beforeFlexGrow' );
				},
				set( newValue ) {
					this.updateOption( 'beforeFlexGrow', newValue );
				}
			},
			beforeMinWidth: {
				get() {
					return this.getOption( 'beforeMinWidth' );
				},
				set( newValue ) {
					this.updateOption( 'beforeMinWidth', newValue );
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
			afterAlignSelf: {
				get() {
					return this.getOption( 'afterAlignSelf' );
				},
				set( newValue ) {
					this.updateOption( 'afterAlignSelf', newValue );
				}
			},
			afterFlexGrow: {
				get() {
					return this.getOption( 'afterFlexGrow' );
				},
				set( newValue ) {
					this.updateOption( 'afterFlexGrow', newValue );
				}
			},
			afterMinWidth: {
				get() {
					return this.getOption( 'afterMinWidth' );
				},
				set( newValue ) {
					this.updateOption( 'afterMinWidth', newValue );
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
				if ( undefined === this.presetList[ preset ][ 'enableAdvanced' ] ) {
					return true;
				}
				return ! this.presetList[ preset ].enableAdvanced.includes( name );
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
			width: 65px;
			margin-right: .5em;
		}
	}
</style>
