<template>
	<div class="editor-preview">
		<div class="ystdtb-menu__card editor-preview__content">
			<textarea class="heading-editor-preview" :style="previewStyle">見出しのプレビュー</textarea>
		</div>
	</div>
</template>


<script>
	export default {
		props: [ 'level' ],
		data() {
			return {}
		},
		computed: {
			previewStyle: function () {
				return {
					fontSize: this.getFontSize() + this.getOption( 'fontSizeUnit' ),
					color: this.getOption( 'fontColor' ),
					fontWeight: this.getOption( 'fontWeight' ),
					fontStyle: this.getOption( 'fontStyle' ),
					fontFamily: this.getFontFamily(),
					lineHeight: this.getLineHeight(),
					letterSpacing: this.getLetterSpacing(),
				}
			}
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
