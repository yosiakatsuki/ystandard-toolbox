<template>
	<div class="ystdtb-color-picker">
		<span :class="{'ystdtb-color-picker__preview':true,'is-disable':disabled}" :style="{background: color}"> </span>
		<button class="ystdtb-color-picker__open" type="button" @click="openColorPicker" :disabled="disabled">
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
		props: [ 'value', 'name', 'disabled', 'defaultColor' ],
		data() {
			return {
				showColorPicker: false
			}
		},
		components: {
			'chrome-picker': Chrome,
		},
		methods: {
			openColorPicker() {
				if ( ! this.color ) {
					if ( undefined !== this.defaultColor && this.defaultColor ) {
						this.color = { hex: this.defaultColor };
					} else {
						this.color = { hex: '#000000' };
					}
				}
				this.showColorPicker = ! this.showColorPicker;
			},
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

		button {
			background-color: #fff;
			border-color: #eee;
			color: #666;
		}

		.ystdtb-color-picker__preview {
			min-width: 2.5em;
			border-top: 1px solid #eee;
			border-bottom: 1px solid #eee;
			border-left: 1px solid #eee;

			&.is-disable {
				background-color: #f7f7f7;
			}
		}

		.ystdtb-color-picker__open {
			border-radius: 0;
			white-space: nowrap;
			font-size: 0.9em;
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
