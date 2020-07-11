<template>
	<div class="heading-editor-font">
		<h3>文字設定</h3>
		<div class="ystdtb-menu__table">
			<div class="is-label">レスポンシブモード</div>
			<div class="is-content">
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
		</div>
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
						v-if="fontSizeResponsive"
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
						v-if="fontSizeResponsive"
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
					<button type="button" style="height: 100%" @click="toggleFontSizeUnit">{{ fontSizeUnit }}</button>
				</div>
			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label">文字色</div>
			<div class="is-content">
				<div class="ystdtb-color-picker">
					<span class="ystdtb-color-picker__preview" :style="{background: fontColor}"> </span>
					<button type="button" @click="showColorPicker = ! showColorPicker">
						{{ fontColorButton }}
					</button>
					<chrome-picker
						v-if="showColorPicker"
						class="ystdtb-color-picker__control"
						v-model="fontColor"
					/>
					<input type="hidden" :name="`ystdtb_heading[${level}][fontColor]`" v-model="fontColor">
				</div>

			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label">太さ</div>
			<div class="is-content">
				<select
					name="`ystdtb_heading[${level}][fontWeight]`"
					v-model="fontWeight"
				>
					<option value="normal">normal</option>
					<option value="bold">bold</option>
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
					name="`ystdtb_heading[${level}][fontStyle]`"
					v-model="fontStyle"
				>
					<option value="normal">normal</option>
					<option value="italic">italic</option>
				</select>
			</div>
		</div>
		<div class="ystdtb-menu__card" style="margin-top: 1em;">
			<div class="ystdtb-menu__advanced-switch">
				<input
					:id="`font-size-advanced-switch--${level}`"
					class="toggle-button"
					type="checkbox"
					value="true"
					v-model="fontAdvanced"
				>
				<label :for="`font-size-advanced-switch--${level}`"></label>
			</div>
			<div v-if="fontAdvanced">
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
		ItalicIcon
	} from 'vue-feather-icons'
	import { Chrome } from 'vue-color';

	export default {
		props: [ 'level' ],
		data() {
			return {
				showColorPicker: false
			}
		},
		components: {
			'chrome-picker': Chrome,
			MonitorIcon,
			TabletIcon,
			SmartphoneIcon,
			BoldIcon,
			ItalicIcon
		},
		computed: {
			fontSizeResponsive: {
				get() {
					return this.getOption( 'fontSizeResponsive' );
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
					this.updateOption( 'fontColor', newValue.hex );
				}
			},
			fontColorButton: function() {
				return this.showColorPicker ? '閉じる' : '変更';
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
					return this.getOption( 'fontAdvanced' );
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
					this.updateOption( 'fontFamily', newValue );
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
			toggleFontSizeUnit() {
				const unit = 'em' === this.fontSizeUnit ? 'px' : 'em';
				this.updateOption( 'fontSizeUnit', unit );
				if ( 'px' === unit ) {
					this.updateOption( 'fontSizePc', parseInt( this.fontSizePc * 16 ) );
					this.updateOption( 'fontSizeTablet', parseInt( this.fontSizeTablet * 16 ) );
					this.updateOption( 'fontSizeMobile', parseInt( this.fontSizeMobile * 16 ) );
				} else {
					this.updateOption( 'fontSizePc', Math.round( this.fontSizePc / 16 * 10 ) / 10 );
					this.updateOption( 'fontSizeTablet', Math.round( this.fontSizeTablet / 16 * 10 ) / 10 );
					this.updateOption( 'fontSizeMobile', Math.round( this.fontSizeMobile / 16 * 10 ) / 10 );
				}
			}
		},
		created() {
		}
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
</style>
