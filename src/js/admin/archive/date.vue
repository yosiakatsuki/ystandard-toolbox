<template>
	<div class="ystdtb-menu__section contents">
		<h3 class="ystdtb-menu__section-title">日付情報</h3>
		<p class="ystdtb-menu__subtext">投稿一覧に表示される日付情報の設定</p>
		<div class="ystdtb-menu__section">
			<div class="ystdtb-menu__table-collapse">
				<div class="is-label">日付表示</div>
				<div class="is-content">
					<select
						id="archiveDisplayDate"
						name="archive[archiveDisplayDate]"
						v-model="archiveDisplayDate"
						style="max-width: 200px;"
					>
						<option v-for="option in dateLabelList" :value="option.value">{{ option.label }}</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'date',
		data() {
			return {
				dateLabelList: [
					{ value: '', label: '公開日（デフォルト）' },
					{ value: 'modified', label: '更新日' },
				]
			}
		},
		components: {},
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
			archiveDisplayDate: {
				get() {
					return this.getOption( 'archiveDisplayDate' );
				},
				set( newValue ) {
					this.updateOption( 'archiveDisplayDate', newValue );
				}
			},
		}
	}
</script>

<style lang="scss">
</style>
