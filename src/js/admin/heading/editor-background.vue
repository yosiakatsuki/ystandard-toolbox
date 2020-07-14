<template>
	<div class="heading-editor-background">
		<div class="ystdtb-menu__table">
			<div class="is-label">背景色</div>
			<div class="is-content">
				<div class="editor-background__bgc">
					<ColorPicker
						:name="`ystdtb_heading[${level}][backgroundColor]`"
						v-model="backgroundColor"
					/>
					<button class="editor-background__bgc-clear" type="button" @click="clearBackgroundColor">クリア</button>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../component/color-picker';

	export default {
		name: 'editor-background',
		props: [ 'level' ],
		components: {
			ColorPicker
		},
		data() {
			return {}
		},
		computed: {
			backgroundColor: {
				get() {
					return this.getOption( 'backgroundColor' );
				},
				set( newValue ) {
					this.updateOption( 'backgroundColor', newValue );
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
			clearBackgroundColor() {
				this.updateOption( 'backgroundColor', '' );
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
