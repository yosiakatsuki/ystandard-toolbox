<template>
	<div class="heading-editor-basic">
		<label class="is-block">デザイン</label>
		<presetSelect :level="level"/>

		<div v-if="false" class="ystdtb-menu__table">
			<div class="is-label">背景色</div>
			<div class="is-content">

			</div>
		</div>
	</div>
</template>

<script>
	import presetSelect from './preset-select';

	export default {
		name: 'editor-basic',
		props: [ 'level' ],
		components: {
			presetSelect
		},
		data() {
			return {
				showPresetSelect: false,
			}
		},
		computed: {},
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
