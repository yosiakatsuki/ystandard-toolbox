<template>
	<div class="editor-preview">
		<div class="ystdtb-menu__card editor-preview__content">
			<div class="editor-preview__level">{{ label }}</div>
			<div class="heading-editor-preview" :style="previewStyle">
				<span class="heading-editor-preview__before" :style="previewBeforeStyle"><span v-html="previewBeforeContent"></span></span>
				<span class="heading-editor-preview__text" contenteditable="true">見出しのプレビュー</span>
				<span class="heading-editor-preview__after" :style="previewAfterStyle"><span v-html="previewAfterContent"></span></span>
			</div>
		</div>
	</div>
</template>


<script>
	import presets from './preset.json';
	import _getFeatherIcon from "../function/_getFeatherIcon";
	import _getColorStyle from "../function/_getColorStyle";
	import _getPseudoElementsSizeStyle from "../function/_getPseudoElementsSizeStyle";
	import _replaceStyles from "../function/_replaceStyles";

	export default {
		name: 'preview',
		props: [ 'level', 'label' ],
		data() {
			return {
				presetList: presets,
			}
		},
		computed: {
			previewStyle: function () {
				const styles = this.getAdditionalStyle( 'content' );
				return _replaceStyles( {
					fontSize: this.getFontSize() + this.getOption( 'fontSizeUnit' ),
					color: this.getOption( 'fontColor' ),
					textAlign: this.getOption( 'fontAlign' ),
					fontWeight: this.getOption( 'fontWeight' ),
					fontStyle: this.getOption( 'fontStyle' ) + ' !important',
					fontFamily: this.getFontFamily(),
					lineHeight: this.getLineHeight(),
					letterSpacing: this.getLetterSpacing(),
					backgroundColor: this.getOption( 'backgroundColor' ),
					backgroundImage: this.getBackgroundImage(),
					backgroundPosition: this.getBackgroundPosition(),
					backgroundRepeat: this.getOption( 'backgroundRepeat' ),
					backgroundSize: this.getOption( 'backgroundSize' ),
					borderTop: this.getBorder( 'Top' ),
					borderRight: this.getBorder( 'Right' ),
					borderBottom: this.getBorder( 'Bottom' ),
					borderLeft: this.getBorder( 'Left' ),
					paddingTop: this.getPadding( 'Top' ),
					paddingRight: this.getPadding( 'Right' ),
					paddingBottom: this.getPadding( 'Bottom' ),
					paddingLeft: this.getPadding( 'Left' ),
					marginTop: this.getMargin( 'Top' ),
					marginBottom: this.getMargin( 'Bottom' ),
					...styles
				} );
			},
			previewBeforeContent: function () {
				return this.getPseudoElementsContent( 'before' );
			},
			previewBeforeStyle: function () {
				return this.getPseudoElementsStyle( 'before' );
			},
			previewAfterContent: function () {
				return this.getPseudoElementsContent( 'after' );
			},
			previewAfterStyle: function () {
				return this.getPseudoElementsStyle( 'after' );
			},
		},
		methods: {
			getOption( name ) {
				return this.$store.state.options[ this.level ][ name ];
			},
			getFontSize() {
				let name = 'fontSizePc';
				return this.getOption( name );
			},
			getFontAdvancedValue( name ) {
				const value = this.getOption( name );
				if ( this.getOption( 'fontAdvanced' ) && value ) {
					return value;
				}
				return undefined;
			},
			getFontFamily() {
				return this.getFontAdvancedValue( 'fontFamily' );
			},
			getLineHeight() {
				return this.getFontAdvancedValue( 'lineHeight' );
			},
			getLetterSpacing() {
				const value = this.getFontAdvancedValue( 'letterSpacing' );
				return undefined === value ? undefined : value + 'em';
			},
			getBackgroundImage() {
				const url = this.getOption( 'backgroundImage' );
				return '' === url ? undefined : `url("${ url }")`;
			},
			getBackgroundPosition() {
				const value = this.getOption( 'backgroundPosition' );
				if ( '' === value ) {
					return undefined;
				}
				return value.replace( '-', ' ' );
			},
			getBorder( pos ) {
				const borderWidth = this.getOption( `border${ pos }Width` );
				const borderWidthUnit = this.getOption( `border${ pos }WidthUnit` );
				const borderStyle = this.getOption( `border${ pos }Style` );
				let borderColor = this.getOption( `border${ pos }Color` );
				if ( 0 >= borderWidth ) {
					return undefined;
				}
				if ( '' === borderColor ) {
					borderColor = 'transparent';
				}
				return `${ borderWidth }${ borderWidthUnit } ${ borderStyle } ${ borderColor }`;
			},
			getPadding( pos ) {
				const padding = this.getOption( `padding${ pos }` );
				const unit = this.getOption( `padding${ pos }Unit` );
				if ( '' === padding ) {
					return undefined;
				}
				if ( 0 === padding ) {
					return 0;
				}
				return `${ padding }${ unit }`;
			},
			getMargin( pos ) {
				const margin = this.getOption( `margin${ pos }` );
				const unit = this.getOption( `margin${ pos }Unit` );
				if ( '' === margin ) {
					return undefined;
				}
				if ( 0 === margin ) {
					return 0;
				}
				return `${ margin }${ unit }`;
			},
			getPreset() {
				const preset = this.getOption( 'preset' );
				if ( ! this.presetList.hasOwnProperty( preset ) ) {
					return false;
				}
				return this.presetList[ preset ];
			},
			getPseudoElementsContent( section ) {
				let content = this.getOption( `${ section }Content` );
				const icon = this.getOption( `${ section }Icon` );
				if ( icon ) {
					const size = this.getOption( `${ section }Size` );
					content = _getFeatherIcon(
						icon,
						{
							style: `width:${ size }em;height:${ size }em;`
						}
					);
				}
				return content;
			},
			getPseudoElementsStyle( section ) {
				const size = this.getOption( `${ section }Size` );
				if ( '' === size || 0 >= size ) {
					return {
						display: 'none',
					}
				}
				const color = this.getAdvancedOptionColor( section );
				const optionSize = this.getAdvancedOptionSize( section );
				const styles = this.getAdditionalStyle( section );
				return _replaceStyles(
					{
						...color,
						...optionSize,
						...styles,
					}
				);
			},
			getAdvancedOptionSize( section ) {
				const size = this.getOption( `${ section }Size` );
				const preset = this.getPreset();
				return _getPseudoElementsSizeStyle( size, preset );
			},
			getAdvancedOptionColor( section ) {
				let color = this.getOption( `${ section }Color` );
				let type = this.getOption( `${ section }ColorType` );

				return _getColorStyle( type, color );
			},
			getAdditionalStyle( type ) {
				const preset = this.getPreset();

				if ( ! preset.hasOwnProperty( 'additionalStyle' ) ) {
					return {};
				}
				if ( ! preset.additionalStyle.hasOwnProperty( type ) ) {
					return {};
				}
				return preset.additionalStyle[ type ];
			}
		}
	};
</script>
<style lang="scss">
	.editor-preview {
		height: 100%;
		margin: 1rem 0 0;
		@media (min-width: 769px) {
			margin: 0 0 0 1rem;
		}

		.editor-preview__content {
			position: relative;
			padding-top: 5em;
			padding-bottom: 5em;

			.editor-preview__level {
				position: absolute;
				top: .5em;
				left: .5em;
				font-weight: bold;
				color: #ccc;
				font-size: 1.4rem;
				opacity: .7;
			}
		}

		.heading-editor-preview,
		.heading-editor-preview:focus {
			display: inline-block;
			width: 100%;
			height: auto;
			min-height: auto;
			outline: none;
			border: 0;
			line-height: 1.3;
			appearance: none;
			box-shadow: none;
		}

		.heading-editor-preview__text {
			word-break: break-all;
			font-style: inherit !important;

			&:focus {
				outline: none;
				border: 0;
				box-shadow: none;
			}
		}
	}

	.heading-editor-preview__before,
	.heading-editor-preview__after {
		svg {
			transform: translateY(-5%);
		}
	}
</style>
