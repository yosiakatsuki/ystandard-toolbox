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
								@click="changePreset(name,value.default,value.clearAdvanced)"
							>

								<span class="preset-select__button-content" :style="getContentStyle(name,value.default)">
									<span :style="previewBeforeAfterStyle(name,'before')"></span>
									<span>{{ value.name }}</span>
									<span :style="previewBeforeAfterStyle(name,'after')"></span>
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
			changePreset( value, style, clearAdvanced ) {
				this.updateOption( 'preset', value );
				this.setDefaultStyle( style );
				if ( clearAdvanced ) {
					this.clearAdvanced();
				}
				this.closePresetSelect();
			},
			openPresetSelect() {
				this.showPresetSelect = true;
			},
			closePresetSelect() {
				this.showPresetSelect = false;
			},
			buttonClass( name, value ) {
				const useAdvanced = undefined !== value[ 'enableAdvanced' ];
				return {
					'is-nowrap': true,
					'preset-select__button': true,
					'is-selected': name === this.getOption( 'preset' ),
					'use-advanced': useAdvanced
				}
			},
			getContentStyle( name, defaults ) {
				const additional = this.getAdditionalStyle( name, 'content' );
				return {
					..._parseStyle( defaults ),
					...additional
				};
			},
			setDefaultStyle( style ) {
				for ( const key in style ) {
					this.updateOption( key, style[ key ] );
				}
			},
			previewBeforeAfterStyle( name, section ) {
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
				const type = style.useAdvancedSize;
				const colorType = style.default[ `${ section }ColorType` ];
				const color = style.default[ `${ section }Color` ];
				const styles = this.getAdditionalStyle( name, section );

				return {
					height: type.includes( 'height' ) ? size + 'px' : false,
					width: type.includes( 'width' ) ? size + 'px' : false,
					backgroundColor: 'background' === colorType ? color : false,
					color: 'color' === colorType ? color : false,
					...styles
				}
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
			clearAdvanced() {
				this.updateOption( 'beforeContent', '' );
				this.updateOption( 'beforeSize', '' );
				this.updateOption( 'beforeColor', '' );
				this.updateOption( 'beforeColorType', '' );
				this.updateOption( 'afterContent', '' );
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
				font-size: 1.5em;
				color: #07689f;
			}
		}

		.preset-select__list {
			display: flex;
			flex-wrap: wrap;

			> li {
				margin: 0 0 1.5em;
				padding: 0 1em;
				width: 25%;
			}
		}

		.preset-select__button {
			width: 100%;
			min-height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;

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
		}
	}
</style>
