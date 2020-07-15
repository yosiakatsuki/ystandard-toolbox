<template>
	<div class="heading-editor-background">
		<div class="ystdtb-menu__table">
			<div class="is-label is-small">上</div>
			<div class="is-content">
				<div class="ystdtb-menu__horizontal">
					<input
						:id="`border-top-width--${level}`"
						class="is-small"
						:name="`ystdtb_heading[${level}][borderTopWidth]`"
						type="number"
						min="0"
						max="50"
						:step="borderTopWidthStep"
						v-model="borderTopWidth"
					/>
					<button type="button" style="height: 100%" @click="toggleBorderWidth('Top')">{{ borderTopWidthUnit }}</button>
					<input type="hidden" :name="`ystdtb_heading[${level}][borderTopWidthUnit]`" v-model="borderTopWidthUnit">
					<select
						:name="`ystdtb_heading[${level}][borderTopStyle]`"
						:id="`border-top-style--${level}`"
						v-model="borderTopStyle"
					>
						<option v-for="option in borderStyle" :value="option.value">{{ option.label }}</option>
					</select>
					<ColorPicker
						:name="`ystdtb_heading[${level}][borderTopColor]`"
						v-model="borderTopColor"
					/>
					<button class="editor-border__color-clear" type="button" @click="clearBorderColor('Top')">クリア</button>
				</div>
			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label is-small">右</div>
			<div class="is-content">
				<div class="ystdtb-menu__horizontal">
					<input
						:id="`border-right-width--${level}`"
						class="is-small"
						:name="`ystdtb_heading[${level}][borderRightWidth]`"
						type="number"
						min="0"
						max="50"
						:step="borderRightWidthStep"
						v-model="borderRightWidth"
					/>
					<button type="button" style="height: 100%" @click="toggleBorderWidth('Right')">{{ borderRightWidthUnit }}</button>
					<input type="hidden" :name="`ystdtb_heading[${level}][borderRightWidthUnit]`" v-model="borderRightWidthUnit">
					<select
						:name="`ystdtb_heading[${level}][borderRightStyle]`"
						:id="`border-right-style--${level}`"
						v-model="borderRightStyle"
					>
						<option v-for="option in borderStyle" :value="option.value">{{ option.label }}</option>
					</select>
					<ColorPicker
						:name="`ystdtb_heading[${level}][borderRightColor]`"
						v-model="borderRightColor"
					/>
					<button class="editor-border__color-clear" type="button" @click="clearBorderColor('Right')">クリア</button>
				</div>
			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label is-small">下</div>
			<div class="is-content">
				<div class="ystdtb-menu__horizontal">
					<input
						:id="`border-bottom-width--${level}`"
						class="is-small"
						:name="`ystdtb_heading[${level}][borderBottomWidth]`"
						type="number"
						min="0"
						max="50"
						:step="borderBottomWidthStep"
						v-model="borderBottomWidth"
					/>
					<button type="button" style="height: 100%" @click="toggleBorderWidth('Bottom')">{{ borderBottomWidthUnit }}</button>
					<input type="hidden" :name="`ystdtb_heading[${level}][borderBottomWidthUnit]`" v-model="borderBottomWidthUnit">
					<select
						:name="`ystdtb_heading[${level}][borderBottomStyle]`"
						:id="`border-bottom-style--${level}`"
						v-model="borderBottomStyle"
					>
						<option v-for="option in borderStyle" :value="option.value">{{ option.label }}</option>
					</select>
					<ColorPicker
						:name="`ystdtb_heading[${level}][borderBottomColor]`"
						v-model="borderBottomColor"
					/>
					<button class="editor-border__color-clear" type="button" @click="clearBorderColor('Bottom')">クリア</button>
				</div>
			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label is-small">左</div>
			<div class="is-content">
				<div class="ystdtb-menu__horizontal">
					<input
						:id="`border-left-width--${level}`"
						class="is-small"
						:name="`ystdtb_heading[${level}][borderLeftWidth]`"
						type="number"
						min="0"
						max="50"
						:step="borderLeftWidthStep"
						v-model="borderLeftWidth"
					/>
					<button type="button" style="height: 100%" @click="toggleBorderWidth('Left')">{{ borderLeftWidthUnit }}</button>
					<input type="hidden" :name="`ystdtb_heading[${level}][borderLeftWidthUnit]`" v-model="borderLeftWidthUnit">
					<select
						:name="`ystdtb_heading[${level}][borderLeftStyle]`"
						:id="`border-left-style--${level}`"
						v-model="borderLeftStyle"
					>
						<option v-for="option in borderStyle" :value="option.value">{{ option.label }}</option>
					</select>
					<ColorPicker
						:name="`ystdtb_heading[${level}][borderLeftColor]`"
						v-model="borderLeftColor"
					/>
					<button class="editor-border__color-clear" type="button" @click="clearBorderColor('Left')">クリア</button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import ColorPicker from '../component/color-picker';
	import _toggleSizeInUnit from '../function/_toggleSizeInUnit';

	export default {
		name: 'editor-border',
		props: [ 'level' ],
		components: {
			ColorPicker
		},
		data() {
			return {
				step: {
					top: 1,
					right: 1,
					bottom: 1,
					left: 1,
				},
				borderStyle: [
					{ value: 'solid', label: '直線' },
					{ value: 'dotted', label: 'ドット' },
					{ value: 'dashed', label: 'ダッシュ' },
					{ value: 'double', label: '2重線' },
				]
			}
		},
		computed: {
			borderTopWidth: {
				get() {
					return this.getOption( 'borderTopWidth' );
				},
				set( newValue ) {
					this.updateOption( 'borderTopWidth', newValue );
				}
			},
			borderTopWidthStep() {
				return this.getWidthStep( this.getOption( 'borderTopWidthUnit' ) );
			},
			borderTopWidthUnit() {
				return this.getOption( 'borderTopWidthUnit' );
			},
			borderTopStyle: {
				get() {
					return this.getOption( 'borderTopStyle' );
				},
				set( newValue ) {
					this.updateOption( 'borderTopStyle', newValue );
				}
			},
			borderTopColor: {
				get() {
					return this.getOption( 'borderTopColor' );
				},
				set( newValue ) {
					this.updateOption( 'borderTopColor', newValue );
				}
			},
			borderRightWidth: {
				get() {
					return this.getOption( 'borderRightWidth' );
				},
				set( newValue ) {
					this.updateOption( 'borderRightWidth', newValue );
				}
			},
			borderRightWidthStep() {
				return this.getWidthStep( this.getOption( 'borderRightWidthUnit' ) );
			},
			borderRightWidthUnit() {
				return this.getOption( 'borderRightWidthUnit' );
			},
			borderRightStyle: {
				get() {
					return this.getOption( 'borderRightStyle' );
				},
				set( newValue ) {
					this.updateOption( 'borderRightStyle', newValue );
				}
			},
			borderRightColor: {
				get() {
					return this.getOption( 'borderRightColor' );
				},
				set( newValue ) {
					this.updateOption( 'borderRightColor', newValue );
				}
			},
			borderBottomWidth: {
				get() {
					return this.getOption( 'borderBottomWidth' );
				},
				set( newValue ) {
					this.updateOption( 'borderBottomWidth', newValue );
				}
			},
			borderBottomWidthStep() {
				return this.getWidthStep( this.getOption( 'borderBottomWidthUnit' ) );
			},
			borderBottomWidthUnit() {
				return this.getOption( 'borderBottomWidthUnit' );
			},
			borderBottomStyle: {
				get() {
					return this.getOption( 'borderBottomStyle' );
				},
				set( newValue ) {
					this.updateOption( 'borderBottomStyle', newValue );
				}
			},
			borderBottomColor: {
				get() {
					return this.getOption( 'borderBottomColor' );
				},
				set( newValue ) {
					this.updateOption( 'borderBottomColor', newValue );
				}
			},
			borderLeftWidth: {
				get() {
					return this.getOption( 'borderLeftWidth' );
				},
				set( newValue ) {
					this.updateOption( 'borderLeftWidth', newValue );
				}
			},
			borderLeftWidthStep() {
				return this.getWidthStep( this.getOption( 'borderLeftWidthUnit' ) );
			},
			borderLeftWidthUnit() {
				return this.getOption( 'borderLeftWidthUnit' );
			},
			borderLeftStyle: {
				get() {
					return this.getOption( 'borderLeftStyle' );
				},
				set( newValue ) {
					this.updateOption( 'borderLeftStyle', newValue );
				}
			},
			borderLeftColor: {
				get() {
					return this.getOption( 'borderLeftColor' );
				},
				set( newValue ) {
					this.updateOption( 'borderLeftColor', newValue );
				}
			},
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
			clearBorderColor( pos ) {
				this.updateOption( `border${ pos }Color`, '' );
			},
			toggleBorderWidth( pos ) {
				const unit = this.getOption( `border${ pos }WidthUnit` );
				const size = this.getOption( `border${ pos }Width` );
				const newUnit = 'px' === unit ? 'em' : 'px';
				this.updateOption( `border${ pos }WidthUnit`, newUnit );
				this.updateOption( `border${ pos }Width`, _toggleSizeInUnit( size, newUnit ) );
			},
			getWidthStep( unit ) {
				return 'px' === unit ? 1 : 0.1;
			}
		},

	}
</script>

<style lang="scss">
	.editor-border__color-clear {
		font-size: .8em;
		white-space: nowrap;
	}
</style>
