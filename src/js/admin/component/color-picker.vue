<template>
	<div class="ystdtb-color-picker">
		<span class="ystdtb-color-picker__preview" :style="{background: color}"> </span>
		<button type="button" @click="showColorPicker = ! showColorPicker">
			{{ colorButton }}
		</button>
		<chrome-picker
			v-if="showColorPicker"
			class="ystdtb-color-picker__control"
			v-model="color"
		/>
		<input type="hidden" :name="name" v-model="color">
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
		props: [ 'value', 'name' ],
		data() {
			return {
				showColorPicker: false
			}
		},
		components: {
			'chrome-picker': Chrome,
		},
		computed: {
			color: {
				get() {
					return this.value;
				},
				set( value ) {
					this.$emit( 'input', value.hex );
				}
			},
			colorButton: function () {
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
			border-top: 1px solid #eee;
			border-bottom: 1px solid #eee;
			border-left: 1px solid #eee;
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
