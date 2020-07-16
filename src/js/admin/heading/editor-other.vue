<template>
	<div class="heading-editor-other">
		<div class="ystdtb-menu__section">
			<button type="button" class="is-danger is-block" @click="showResetModal = true">設定をリセットする</button>
			<transition name="fade">
				<div v-if="showResetModal" class="ystdtb-menu__modal">
					<div class="ystdtb-menu__modal-content">
						<p>これまで設定した {{ labelLevel }} のデザインがすべて初期化されますがよろしいですか？</p>
						<div class="ystdtb-menu__horizontal">
							<button type="button" class="is-primary is-block" @click="resetOptions()">設定をリセット</button>
							<button type="button" class="is-cancel is-block" @click="showResetModal = false">キャンセル</button>
						</div>
					</div>
				</div>
			</transition>
		</div>
		<div v-if="false" class="ystdtb-menu__table">
			<div class="is-label">背景色</div>
			<div class="is-content">
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'editor-other',
		props: [ 'level' ],
		components: {},
		data() {
			return {
				showResetModal: false,
				labelLevel: this.level,
			}
		},
		computed: {
			other: {
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
			resetOptions() {
				this.$store.commit( 'resetOptions', {
					level: this.level,
				} );
				this.showResetModal = false;
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
