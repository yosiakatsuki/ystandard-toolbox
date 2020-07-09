<template>
	<div class="heading-editor-font">
		<h3>文字設定</h3>
		<div class="ystdtb-menu__table">
			<div class="is-label">デバイス別文字サイズモード</div>
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
				<div class="font-size-columns">
					<label class="ystdtb-menu__icon-control">
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
						class="ystdtb-menu__icon-control"
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
						class="ystdtb-menu__icon-control"
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
					<div style="cursor: pointer" @click="toggleFontSizeUnit">{{ fontSizeUnit }}</div>
				</div>
			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label">太さ</div>
			<div class="is-content">
				<select
					name="`ystdtb_heading[${level}][fontSizeMobile]`"
					v-model="fontWeight"
				>
					<optgroup label="選択">
						<option value="normal">normal</option>
						<option value="bold">bold</option>
					</optgroup>
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

	export default {
		props: [ 'level' ],
		data() {
			return {}
		},
		components: {
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
			fontWeight: {
				get() {
					return this.getOption( 'fontWeight' );
				},
				set( newValue ) {
					this.updateOption( 'fontWeight', newValue );
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
