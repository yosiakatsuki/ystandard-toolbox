<template>
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
		<span
			class="ystdtb-color-picker__cover"
			@click="showColorPicker = ! showColorPicker"
			v-if="showColorPicker"
		></span>
	</div>
</template>

<script>
	import { Chrome } from 'vue-color';

	export default {
		name: 'ColorPicker',
		props: [ 'value' ],
		data() {
			return {
				showColorPicker: false
			}
		},
		components: {
			'chrome-picker': Chrome,
		},
		computed: {
			fontColor: {
				get() {
					return this.value;
				},
				set( value ) {
					this.$emit( 'input', value.hex );
				}
			},
			fontColorButton: function () {
				return this.showColorPicker ? '閉じる' : '変更';
			},
		},
	}
</script>

<style lang="scss">
	.ystdtb-color-picker {
		display: flex;
		position: relative;

		.ystdtb-color-picker__preview {
			min-width: 2.5em;
		}

		.ystdtb-color-picker__control {
			position: absolute;
			top: calc(100% + 1em);
			left: 0;
			z-index: 5;
		}

		.vc-chrome {
			.vc-chrome-toggle-btn,
			.vc-chrome-alpha-wrap,
			.vc-input__label {
				display: none;
			}
		}

		.ystdtb-color-picker__cover {
			display: block;
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 4;
		}
	}
</style>
