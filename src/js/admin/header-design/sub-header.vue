<template>
	<div class="sub-header">
		<h3 class="ystdtb-menu__section-title">サブヘッダーメニュー</h3>
		<div class="ystdtb-menu__section is-w-600">
			<div class="ystdtb-menu__table">
				<div class="is-label">背景色</div>
				<div class="is-content">
					<div class="ystdtb-menu__horizontal">
						<ColorPicker
							name="header_design[subHeaderBackgroundColorDesktop]"
							v-model="subHeaderBackgroundColorDesktop"
						/>
					</div>
				</div>
			</div>
			<div class="ystdtb-menu__table">
				<div class="is-label">文字色</div>
				<div class="is-content">
					<div class="ystdtb-menu__horizontal">
						<ColorPicker
							name="header_design[subHeaderColorDesktop]"
							v-model="subHeaderColorDesktop"
						/>
					</div>
				</div>
			</div>
			<div class="ystdtb-menu__table">
				<div class="is-label">表示位置</div>
				<div class="is-content">
					<div class="ystdtb-menu__horizontal">
						<select name="header_design[subHeaderAlignDesktop]" id="subHeaderAlignDesktop" v-model="subHeaderAlignDesktop">
							<option value="left">左揃え</option>
							<option value="center">中央揃え</option>
							<option value="right">右揃え</option>
						</select>
					</div>
				</div>
			</div>
			<div class="ystdtb-menu__table">
				<div class="is-label">文字サイズ</div>
				<div class="is-content">
					<div class="ystdtb-menu__horizontal">
						<input
							type="number"
							name="header_design[subHeaderFontSizeDesktop]"
							v-model="subHeaderFontSizeDesktop"
							:step="subHeaderFontSizeStep"
						>
						<UnitSelect
							name="header_design[subHeaderFontSizeUnitDesktop]"
							id="subHeaderFontSizeUnitDesktop"
							v-model="subHeaderFontSizeUnitDesktop"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../component/color-picker';
	import UnitSelect from '../component/unit-select';
	import _getNumberStep from "../function/_getNumberStep";

	export default {
		name: 'sub-header',
		data() {

		},
		components: {
			ColorPicker,
			UnitSelect
		},
		methods: {
			getOption( name ) {
				return this.$store.state.options[ name ];
			},
			updateOption( name, newValue ) {
				this.$store.commit( 'updateOption', {
					name: name,
					value: newValue
				} );
			},
		},
		computed: {
			subHeaderBackgroundColorDesktop: {
				get() {
					return this.getOption( 'subHeaderBackgroundColorDesktop' );
				},
				set( newValue ) {
					this.updateOption( 'subHeaderBackgroundColorDesktop', newValue );
				}
			},
			subHeaderColorDesktop: {
				get() {
					return this.getOption( 'subHeaderColorDesktop' );
				},
				set( newValue ) {
					this.updateOption( 'subHeaderColorDesktop', newValue );
				}
			},
			subHeaderAlignDesktop: {
				get() {
					return this.getOption( 'subHeaderAlignDesktop' );
				},
				set( newValue ) {
					this.updateOption( 'subHeaderAlignDesktop', newValue );
				}
			},
			subHeaderFontSizeDesktop: {
				get() {
					return this.getOption( 'subHeaderFontSizeDesktop' );
				},
				set( newValue ) {
					this.updateOption( 'subHeaderFontSizeDesktop', newValue );
				}
			},
			subHeaderFontSizeStep() {
				return _getNumberStep( this.subHeaderFontSizeUnitDesktop );
			},
			subHeaderFontSizeUnitDesktop: {
				get() {
					return this.getOption( 'subHeaderFontSizeUnitDesktop' );
				},
				set( newValue ) {
					this.updateOption( 'subHeaderFontSizeUnitDesktop', newValue );
				}
			},
		}
	}
</script>

<style lang="scss">

</style>
