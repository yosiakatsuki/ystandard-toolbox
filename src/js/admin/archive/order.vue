<template>
	<div class="ystdtb-menu__section order">
		<h3 class="ystdtb-menu__section-title">並び順</h3>
		<p class="ystdtb-menu__subtext">投稿一覧の並び順設定</p>
		<div class="ystdtb-menu__section">
			<div class="ystdtb-menu__table-collapse">
				<div class="is-label">並び順</div>
				<div class="is-content">
					<select
						name="archive[archiveOrder]"
						v-model="archiveOrder"
						style="max-width: 200px;"
					>
						<option v-for="option in orderList" :value="option.value">{{ option.label }}</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'order',
		data() {
			return {
				orderList: [
					{ value: '', label: '公開日/降順(デフォルト)' },
					{ value: 'date/ASC', label: '公開日/昇順' },
					{ value: 'modified/DESC', label: '更新日/降順' },
					{ value: 'modified/ASC', label: '更新日/昇順' },
					{ value: 'rand/ASC', label: 'ランダム' },
				],
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
			archiveOrder: {
				get() {
					return this.getOption( 'archiveOrder' );
				},
				set( newValue ) {
					this.updateOption( 'archiveOrder', newValue );
				}
			},
		}
	}
</script>

<style lang="scss">
	.default-image__preview {
		width: 300px;
		max-width: 100%;

		img {
			display: block;
			max-width: 100%;
			height: auto;
		}
	}
</style>
