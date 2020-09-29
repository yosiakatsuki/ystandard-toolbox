<template>
	<div class="ystdtb-menu__section contents">
		<h3 class="ystdtb-menu__section-title">画像の縦横比設定</h3>
		<p class="ystdtb-menu__subtext">
			投稿一覧ページ画像の縦横比の設定<br>
			※モバイル用レイアウトが設定されている場合、「デスクトップ・タブレット」と「モバイル」で別々の縦横比を設定できます。
		</p>
		<div class="ystdtb-menu__section">
			<div class="ystdtb-menu__table-collapse">
				<div class="is-label">デスクトップ・タブレット</div>
				<div class="is-content">
					<select
						id="archiveImageRatio"
						name="archive[archiveImageRatio]"
						v-model="archiveImageRatio"
						style="width: 100px;"
					>
						<option v-for="option in ratioList" :value="option.value">{{ option.label }}</option>
					</select>
				</div>
			</div>
			<div v-if="isActiveMobileLayout" class="ystdtb-menu__table-collapse">
				<div class="is-label">モバイル</div>
				<div class="is-content">
					<select
						id="archiveImageRatioMobile"
						name="archive[archiveImageRatioMobile]"
						v-model="archiveImageRatioMobile"
						style="width: 100px;"
					>
						<option v-for="option in ratioList" :value="option.value">{{ option.label }}</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'image-ratio',
		data() {
			return {
				ratioList: [
					{ value: '16-9', label: '16:9' },
					{ value: '4-3', label: '4:3' },
					{ value: '3-2', label: '3:2' },
					{ value: '1-1', label: '1:1' },
					{ value: '2-1', label: '2:1' },
					{ value: '3-1', label: '3:1' },
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
			archiveImageRatio: {
				get() {
					return this.getOption( 'archiveImageRatio' );
				},
				set( newValue ) {
					this.updateOption( 'archiveImageRatio', newValue );
				}
			},
			archiveImageRatioMobile: {
				get() {
					return this.getOption( 'archiveImageRatioMobile' );
				},
				set( newValue ) {
					this.updateOption( 'archiveImageRatioMobile', newValue );
				}
			},
			isActiveMobileLayout() {
				return '' !== this.getOption( 'archiveMobileLayout' );
			},
		}
	}
</script>

<style lang="scss">
	.image-ratio-label {
		width: 130px;
	}
</style>
