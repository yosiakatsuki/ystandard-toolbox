<template>
	<div class="heading-editor-basic">
		<div class="label is-block">
			{{ description }}
		</div>
		<div class="ystdtb-menu__section">
			<label class="is-block">デザインテンプレート</label>
			<div style="margin-top: .5em;">
				<presetSelect :level="level"/>
			</div>
		</div>

		<div class="ystdtb-menu__section">
			<label class="is-block">有効・無効</label>
			<div class="ystdtb-menu__table">
				<div class="is-label">有効化</div>
				<div class="is-content">
					<div class="ystdtb-menu__horizontal">
						<div>
							<input
								:name="`ystdtb_heading[${level}][useCustomStyle]`"
								type="hidden"
								value="false"
							>
							<input
								:id="`use-custom-style--${level}`"
								:name="`ystdtb_heading[${level}][useCustomStyle]`"
								class="toggle-button"
								type="checkbox"
								value="true"
								v-model="useCustomStyle"
							>
							<label :for="`use-custom-style--${level}`"></label>
						</div>
						<span class="ystdtb-menu__subtext">この見出しデザインを有効化する</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import presetSelect from './preset-select';
	import _toBool from '../function/_toBool';

	export default {
		name: 'editor-basic',
		props: [ 'level', 'description' ],
		components: {
			presetSelect
		},
		data() {
			return {
				showPresetSelect: false,
			}
		},
		computed: {
			useCustomStyle: {
				get() {
					return _toBool( this.getOption( 'useCustomStyle' ) );
				},
				set( newValue ) {
					this.updateOption( 'useCustomStyle', newValue );
				}
			},
			optionDescription() {

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
		}
	}
</script>

<style lang="scss">

</style>
