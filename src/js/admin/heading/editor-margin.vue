<template>
	<div class="heading-editor-margin">
		<label class="is-block">内側余白(padding)</label>
		<div class="ystdtb-menu__table">
			<div class="is-label is-small">上</div>
			<div class="is-content">
				<div class="ystdtb-menu__horizontal">
					<input
						:id="`padding-top--${level}`"
						:name="`ystdtb_heading[${level}][paddingTop]`"
						type="number"
						min="0"
						max="50"
						:step="paddingTopStep"
						v-model="paddingTop"
					/>
					<button type="button" class="is-white" style="height: 100%" @click="togglePaddingUnit('Top')">{{ paddingTopUnit }}</button>
					<input type="hidden" :name="`ystdtb_heading[${level}][paddingTopUnit]`" v-model="paddingTopUnit">
					<button class="is-cancel is-small" type="button" @click="clearPadding('Top')">クリア</button>
				</div>
			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label is-small">右</div>
			<div class="is-content">
				<div class="ystdtb-menu__horizontal">
					<input
						:id="`padding-right--${level}`"
						:name="`ystdtb_heading[${level}][paddingRight]`"
						type="number"
						min="0"
						max="50"
						:step="paddingRightStep"
						v-model="paddingRight"
					/>
					<button type="button" class="is-white" style="height: 100%" @click="togglePaddingUnit('Right')">{{ paddingRightUnit }}</button>
					<input type="hidden" :name="`ystdtb_heading[${level}][paddingRightUnit]`" v-model="paddingRightUnit">
					<button class="is-cancel is-small" type="button" @click="clearPadding('Right')">クリア</button>
				</div>
			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label is-small">下</div>
			<div class="is-content">
				<div class="ystdtb-menu__horizontal">
					<input
						:id="`padding-bottom--${level}`"
						:name="`ystdtb_heading[${level}][paddingBottom]`"
						type="number"
						min="0"
						max="50"
						:step="paddingBottomStep"
						v-model="paddingBottom"
					/>
					<button type="button" class="is-white" style="height: 100%" @click="togglePaddingUnit('Bottom')">{{ paddingBottomUnit }}</button>
					<input type="hidden" :name="`ystdtb_heading[${level}][paddingBottomUnit]`" v-model="paddingBottomUnit">
					<button class="is-cancel is-small" type="button" @click="clearPadding('Bottom')">クリア</button>
				</div>
			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label is-small">左</div>
			<div class="is-content">
				<div class="ystdtb-menu__horizontal">
					<input
						:id="`padding-left--${level}`"
						:name="`ystdtb_heading[${level}][paddingLeft]`"
						type="number"
						min="0"
						max="50"
						:step="paddingLeftStep"
						v-model="paddingLeft"
					/>
					<button type="button" class="is-white" style="height: 100%" @click="togglePaddingUnit('Left')">{{ paddingLeftUnit }}</button>
					<input type="hidden" :name="`ystdtb_heading[${level}][paddingLeftUnit]`" v-model="paddingLeftUnit">
					<button class="is-cancel is-small" type="button" @click="clearPadding('Left')">クリア</button>
				</div>
			</div>
		</div>
		<label class="is-block" style="margin-top: 1em;">外側余白(margin)</label>
		<div class="ystdtb-menu__table">
			<div class="is-label is-small">上</div>
			<div class="is-content">
				<div class="ystdtb-menu__horizontal">
					<input
						:id="`margin-top--${level}`"
						:name="`ystdtb_heading[${level}][marginTop]`"
						type="number"
						min="0"
						max="50"
						:step="marginTopStep"
						v-model="marginTop"
					/>
					<button type="button" class="is-white" style="height: 100%" @click="toggleMarginUnit('Top')">{{ marginTopUnit }}</button>
					<input type="hidden" :name="`ystdtb_heading[${level}][marginTopUnit]`" v-model="marginTopUnit">
					<button class="is-cancel is-small" type="button" @click="clearMargin('Top')">クリア</button>
				</div>
			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label is-small">下</div>
			<div class="is-content">
				<div class="ystdtb-menu__horizontal">
					<input
						:id="`margin-bottom--${level}`"
						:name="`ystdtb_heading[${level}][marginBottom]`"
						type="number"
						min="0"
						max="50"
						:step="marginBottomStep"
						v-model="marginBottom"
					/>
					<button type="button" class="is-white" style="height: 100%" @click="toggleMarginUnit('Bottom')">{{ marginBottomUnit }}</button>
					<input type="hidden" :name="`ystdtb_heading[${level}][marginBottomUnit]`" v-model="marginBottomUnit">
					<button class="is-cancel is-small" type="button" @click="clearMargin('Bottom')">クリア</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import _getNumberStep from "../function/_getNumberStep";
	import _toggleSizeInUnit from '../function/_toggleSizeInUnit';

	export default {
		name: 'editor-margin',
		props: [ 'level' ],
		components: {
		},
		data() {
			return {}
		},
		computed: {
			paddingTop: {
				get() {
					return this.getOption( 'paddingTop' );
				},
				set( newValue ) {
					this.updateOption( 'paddingTop', newValue );
				}
			},
			paddingTopUnit: {
				get() {
					return this.getOption( 'paddingTopUnit' );
				},
				set( newValue ) {
					this.updateOption( 'paddingTopUnit', newValue );
				}
			},
			paddingTopStep() {
				return _getNumberStep( this.getOption( 'paddingTopUnit' ) );
			},
			paddingRight: {
				get() {
					return this.getOption( 'paddingRight' );
				},
				set( newValue ) {
					this.updateOption( 'paddingRight', newValue );
				}
			},
			paddingRightUnit: {
				get() {
					return this.getOption( 'paddingRightUnit' );
				},
				set( newValue ) {
					this.updateOption( 'paddingRightUnit', newValue );
				}
			},
			paddingRightStep() {
				return _getNumberStep( this.getOption( 'paddingRightUnit' ) );
			},
			paddingBottom: {
				get() {
					return this.getOption( 'paddingBottom' );
				},
				set( newValue ) {
					this.updateOption( 'paddingBottom', newValue );
				}
			},
			paddingBottomUnit: {
				get() {
					return this.getOption( 'paddingBottomUnit' );
				},
				set( newValue ) {
					this.updateOption( 'paddingBottomUnit', newValue );
				}
			},
			paddingBottomStep() {
				return _getNumberStep( this.getOption( 'paddingBottomUnit' ) );
			},
			paddingLeft: {
				get() {
					return this.getOption( 'paddingLeft' );
				},
				set( newValue ) {
					this.updateOption( 'paddingLeft', newValue );
				}
			},
			paddingLeftUnit: {
				get() {
					return this.getOption( 'paddingLeftUnit' );
				},
				set( newValue ) {
					this.updateOption( 'paddingLeftUnit', newValue );
				}
			},
			paddingLeftStep() {
				return _getNumberStep( this.getOption( 'paddingLeftUnit' ) );
			},
			marginTop: {
				get() {
					return this.getOption( 'marginTop' );
				},
				set( newValue ) {
					this.updateOption( 'marginTop', newValue );
				}
			},
			marginTopUnit: {
				get() {
					return this.getOption( 'marginTopUnit' );
				},
				set( newValue ) {
					this.updateOption( 'marginTopUnit', newValue );
				}
			},
			marginTopStep() {
				return _getNumberStep( this.getOption( 'marginTopUnit' ) );
			},
			marginBottom: {
				get() {
					return this.getOption( 'marginBottom' );
				},
				set( newValue ) {
					this.updateOption( 'marginBottom', newValue );
				}
			},
			marginBottomUnit: {
				get() {
					return this.getOption( 'marginBottomUnit' );
				},
				set( newValue ) {
					this.updateOption( 'marginBottomUnit', newValue );
				}
			},
			marginBottomStep() {
				return _getNumberStep( this.getOption( 'marginBottomUnit' ) );
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
			togglePaddingUnit( pos ) {
				const unit = this.getOption( `padding${ pos }Unit` );
				const size = this.getOption( `padding${ pos }` );
				const newUnit = 'px' === unit ? 'em' : 'px';
				this.updateOption( `padding${ pos }Unit`, newUnit );
				this.updateOption( `padding${ pos }`, _toggleSizeInUnit( size, newUnit ) );
			},
			toggleMarginUnit( pos ) {
				const unit = this.getOption( `margin${ pos }Unit` );
				const size = this.getOption( `margin${ pos }` );
				const newUnit = 'px' === unit ? 'em' : 'px';
				this.updateOption( `margin${ pos }Unit`, newUnit );
				this.updateOption( `margin${ pos }`, _toggleSizeInUnit( size, newUnit ) );
			},
			clearPadding( pos ) {
				this.updateOption( `padding${ pos }`, '' );
			},
			clearMargin( pos ) {
				this.updateOption( `margin${ pos }`, '' );
			}
		}
	}
</script>

<style lang="scss">
	.editor-background__bgc {
		display: flex;
		align-items: center;

		.editor-background__bgc-clear {
			margin-left: 1em;
			font-size: .8em;
		}
	}
</style>
