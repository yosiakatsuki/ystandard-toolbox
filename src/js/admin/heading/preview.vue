<template>
	<div class="editor-preview">
		<div class="ystdtb-menu__card editor-preview__content">
			<div class="heading-editor-preview" :style="previewStyle">
				<span :style="previewBeforeStyle">{{ previewBeforeContent }}</span>
				<span contenteditable="true">見出しのプレビュー</span>
				<span :style="previewAfterStyle">{{ previewAfterContent }}</span>
			</div>
		</div>
	</div>
</template>


<script>

	import presets from './preset.json';

	export default {
		name: 'preview',
		props: [ 'level' ],
		data() {
			return {
				presetList: presets,
			}
		},
		computed: {
			previewStyle: function () {
				return {
					fontSize: this.getFontSize() + this.getOption( 'fontSizeUnit' ),
					color: this.getOption( 'fontColor' ),
					textAlign: this.getOption( 'fontAlign' ),
					fontWeight: this.getOption( 'fontWeight' ),
					fontStyle: this.getOption( 'fontStyle' ) + ' !important',
					fontFamily: this.getFontFamily(),
					lineHeight: this.getLineHeight(),
					letterSpacing: this.getLetterSpacing(),
					backgroundColor: this.getOption( 'backgroundColor' ),
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
					display: this.getOption( 'display' ),
				}
			},
			previewBeforeContent: function () {
				return this.getBeforeAfterContent( 'before' );
			},
			previewBeforeStyle: function () {
				return this.getBeforeAfterStyle( 'before' );
			},
			previewAfterContent: function () {
				return this.getBeforeAfterContent( 'after' );
			},
			previewAfterStyle: function () {
				return this.getBeforeAfterStyle( 'after' );
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
			getBeforeAfterContent( section ) {
				let content = this.getOption( `${ section }Content` );
				return content;
			},
			getBeforeAfterStyle( section ) {
				const size = this.getOption( `${ section }Size` );
				const align = this.getOption( `${ section }AlignSelf` );
				const marginRight = 'before' === section ? '.5em' : false;
				const marginLeft = 'after' === section ? '.5em' : false;
				if ( '' === size || 0 >= size ) {
					return {
						display: 'none',
					}
				}
				const flexGrow = this.getOption( `${ section }FlexGrow` );
				const minWidth = this.getOption( `${ section }MinWidth` );
				const color = this.getAdvancedOptionColor( section );
				const optionSize = this.getAdvancedOptionSize( section );

				return {
					...{
						flexGrow: flexGrow,
						marginRight: marginRight,
						marginLeft: marginLeft,
						alignSelf: align,
						minWidth: minWidth,
						wordBreak: 'break-all',
					},
					...color,
					...optionSize,
				}
			},
			getAdvancedOptionSize( section ) {
				const size = this.getOption( `${ section }Size` );
				const preset = this.getOption( 'preset' );
				if ( '' === size || 0 === size ) {
					return {};
				}
				if ( undefined === this.presetList[ preset ] ) {
					return {};
				}
				if ( undefined === this.presetList[ preset ][ 'useAdvancedSize' ] ) {
					return {};
				}
				const useSize = this.presetList[ preset ][ 'useAdvancedSize' ];

				return {
					height: useSize.includes( 'height' ) ? size + 'px' : false,
					width: useSize.includes( 'width' ) ? size + 'px' : false,
				}
			},
			getAdvancedOptionColor( section ) {
				let color = this.getOption( `${ section }Color` );
				let type = this.getOption( `${ section }ColorType` );
				color = '' === color ? false : color;

				return {
					backgroundColor: 'background' === type ? color : false,
					color: 'color' === type ? color : false,
				}
			}
		}
	};
</script>
<style lang="scss">
	.editor-preview {
		height: 100%;
		margin-left: 2em;

		.editor-preview__content {
			padding-top: 5em;
			padding-bottom: 5em;
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
	}
</style>
