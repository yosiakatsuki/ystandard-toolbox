<template>
	<div class="preset-select">
		<div class="ystdtb-menu__horizontal">
			<button type="button" class="select" @click="openPresetSelect()" style="font-size: .9em;padding: .35em .75em;">
				{{ presetName }}
			</button>
			<input
				:name="`ystdtb_heading[${level}][preset]`"
				type="hidden"
				v-model="preset"
			/>
			<button
				type="button"
				class="is-nowrap"
				style="font-size: 0.8em;"
				@click="openPresetSelect()"
			>
				変更
			</button>
		</div>
		<transition name="fade">
			<div v-show="showPresetSelect" class="ystdtb-menu__modal preset-select__modal has-cover">
				<div class="ystdtb-menu__modal-cover" @click="closePresetSelect"></div>
				<div class="ystdtb-menu__modal-content is-large preset-select__modal-content ystdtb-menu__card">
					<h3>デザインテンプレート選択</h3>
					<ul class="preset-select__list">
						<li v-for="(value, name) in presetList">
							<button
								type="button"
								:class="buttonClass(name,value)"
								@click="changePreset(name,value.default,value.clearPseudoElements)"
							>

								<span class="preset-select__button-content" :style="getContentStyle(name,value.default)">
									<span :style="previewPseudoElements(name,'before')" v-html="getPseudoElementsContent(name,'before')"></span>
									<span>{{ value.name }}</span>
									<span :style="previewPseudoElements(name,'after')" v-html="getPseudoElementsContent(name,'after')"></span>
								</span>

							</button>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>

</template>

<script>
	import presets from './preset.json';
	import _parseStyle from "../function/_parseStyle";
	import _getFeatherIcon from "../function/_getFeatherIcon";
	import _getColorStyle from "../function/_getColorStyle";
	import _getPseudoElementsSizeStyle from "../function/_getPseudoElementsSizeStyle";
	import _replaceStyles from "../function/_replaceStyles";

	export default {
		name: 'preset-select',
		props: [ 'level' ],
		components: {},
		data() {
			return {
				showPresetSelect: false,
				presetList: presets
			}
		},
		computed: {
			preset: {
				get() {
					return this.getOption( 'preset' );
				},
				set( newValue ) {
					this.updateOption( 'preset', newValue );
				}
			},
			presetName() {
				if ( this.presetList[ this.preset ] ) {
					return this.presetList[ this.preset ].name;
				}
				return '選択してください';
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
			changePreset( value, style, clearPseudoElements ) {
				this.updateOption( 'preset', value );
				this.setDefaultStyle( style );
				if ( clearPseudoElements ) {
					this.clearPseudoElements();
				}
				this.updateOption( 'useCustomStyle', true );
				this.closePresetSelect();
			},
			openPresetSelect() {
				this.showPresetSelect = true;
			},
			closePresetSelect() {
				this.showPresetSelect = false;
			},
			buttonClass( name, value ) {
				const useAdvanced = undefined !== value[ 'enablePseudoElements' ];
				return [
					'is-nowrap',
					'preset-select__button',
					{
						'is-selected': name === this.getOption( 'preset' ),
						'use-advanced': useAdvanced
					}
				]
			},
			getContentStyle( name, defaults ) {
				const additional = this.getAdditionalStyle( name, 'content' );
				return _replaceStyles( {
					..._parseStyle( defaults ),
					...additional
				} );
			},
			setDefaultStyle( style ) {
				for ( const key in style ) {
					this.updateOption( key, style[ key ] );
				}
			},
			previewPseudoElements( name, section ) {
				if ( ! this.presetList.hasOwnProperty( name ) ) {
					return {
						display: 'none'
					}
				}
				const style = this.presetList[ name ];
				if ( ! style.default.hasOwnProperty( `${ section }Size` ) ) {
					return {
						display: 'none'
					}
				}

				const size = style.default[ `${ section }Size` ];
				const colorType = style.default[ `${ section }ColorType` ];
				const color = style.default[ `${ section }Color` ];
				const sizeStyles = _getPseudoElementsSizeStyle( size, style );
				const colorStyles = _getColorStyle( colorType, color );
				const styles = this.getAdditionalStyle( name, section );
				return _replaceStyles( {
					...colorStyles,
					...sizeStyles,
					...styles,
				} );
			},
			getPreset( name ) {
				if ( ! this.presetList.hasOwnProperty( name ) ) {
					return false;
				}
				return this.presetList[ name ];
			},
			getAdditionalStyle( name, type ) {
				const preset = this.getPreset( name );

				if ( ! preset.hasOwnProperty( 'additionalStyle' ) ) {
					return {};
				}
				if ( ! preset.additionalStyle.hasOwnProperty( type ) ) {
					return {};
				}
				return preset.additionalStyle[ type ];
			},
			getPseudoElementsContent( name, type ) {
				const preset = this.getPreset( name );
				if ( preset.default.hasOwnProperty( `${ type }Icon` ) ) {
					const size = preset.default[ `${ type }Size` ];
					return _getFeatherIcon(
						preset.default[ `${ type }Icon` ],
						{
							style: `width:${ size }em;height:${ size }em;`
						}
					);
				}
				if ( preset.default.hasOwnProperty( `${ type }Content` ) ) {
					return _getFeatherIcon( preset.default[ `${ type }Content` ], {} );
				}
				return '';
			},
			clearPseudoElements() {
				this.updateOption( 'beforeContent', '' );
				this.updateOption( 'beforeIcon', '' );
				this.updateOption( 'beforeSize', '' );
				this.updateOption( 'beforeColor', '' );
				this.updateOption( 'beforeColorType', '' );
				this.updateOption( 'afterContent', '' );
				this.updateOption( 'afterIcon', '' );
				this.updateOption( 'afterSize', '' );
				this.updateOption( 'afterColor', '' );
				this.updateOption( 'afterColorType', '' );
			}
		}
	}
</script>

<style lang="scss">
	.preset-select__modal {

		.preset-select__modal-content {
			h3 {
				margin: 0 0 1em;
				text-align: center;
				font-size: 1rem;
				color: #07689f;
				line-height: 1.3;

				@media (min-width: 769px) {
					font-size: 1.5em;
				}
			}
		}

		.preset-select__list {
			display: flex;
			flex-wrap: wrap;
			align-items: flex-start;
			max-height: 90%;
			overflow-y: scroll;

			> li {
				margin: 0 0 1.5em;
				padding: 0 1em;
				width: 100%;
				@media (min-width: 600px) {
					width: 50%;
				}
				@media (min-width: 769px) {
					width: 25%;
				}

			}
		}

		.preset-select__button {
			width: 100%;
			min-height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #222;

			&.is-selected {
				border: 2px solid #07689f;
			}

			&.use-advanced {
				background-color: rgba(#e2830b, 0.05);
			}
		}

		.preset-select__button-content {
			display: block;
			width: 100%;
			text-align: left;
			font-size: .9em;

			svg {
				vertical-align: baseline;
			}
		}
	}
</style>
