<template>
	<div class="header-overlay is-beta-feature">
		<h3 class="ystdtb-menu__section-title">ヘッダーオーバーレイ</h3>
		<div class="ystdtb-menu__section is-w-600">
			<div class="ystdtb-menu__table">
				<div class="is-label">有効化</div>
				<div class="is-content">
					<label>
						<input type="hidden" name="header_design[enableOverlay]" value="false">
						<input type="checkbox" name="header_design[enableOverlay]" value="true" v-model="enableOverlay"> ヘッダーオーバーレイ機能を有効化する
					</label>
				</div>
			</div>
			<div v-show="enableOverlay">
				<div class="ystdtb-menu__table">
					<div class="is-label">ページタイプ</div>
					<div class="is-content">
						<div class="ystdtb-menu__subtext">オーバーレイ機能を有効にするページタイプにチェックを付けてください。</div>
						<h4>フロントページ/投稿一覧/検索/404</h4>
						<div>
							<label>
								<input type="checkbox" name="header_design[overlayPageType][]" value="front-page" v-model="overlayPageType">フロントページ
							</label>
						</div>
						<div>
							<label>
								<input type="checkbox" name="header_design[overlayPageType][]" value="archive-post" v-model="overlayPageType">投稿一覧
							</label>
						</div>
						<div>
							<label>
								<input type="checkbox" name="header_design[overlayPageType][]" value="search" v-model="overlayPageType">検索結果一覧
							</label>
						</div>
						<div>
							<label>
								<input type="checkbox" name="header_design[overlayPageType][]" value="404" v-model="overlayPageType">404
							</label>
						</div>
						<div v-if="hasPageTypes">
							<h4>ページタイプ別</h4>
							<div v-for="(page,name) in pageTypes">
								<label>
									<input type="checkbox" name="header_design[overlayPageType][]" :value="name" v-model="overlayPageType">{{ page }}
								</label>
							</div>
						</div>
						<div v-if="hasArchivePostTypes">
							<h4>投稿アーカイブ</h4>
							<div v-for="(page,name) in archivePostTypes">
								<label>
									<input type="checkbox" name="header_design[overlayPageType][]" :value="name" v-model="overlayPageType">{{ page }} 一覧
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="beta-feature-more">
				<h3>今後追加予定の機能</h3>
				<ul>
					<li>詳細ページ：ページ別オーバーレイ有効化・無効化機能</li>
					<li>カテゴリー・タグ一覧：カテゴリー別オーバーレイ有効化・無効化機能</li>
					<li>オーバーレイページ用ロゴ画像設定機能</li>
					<li>オーバーレイページ用文字色設定機能</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>

	import _toBool from "../function/_toBool";

	export default {
		name: 'header-overlay',
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
			enableOverlay: {
				get() {
					return _toBool( this.getOption( 'enableOverlay' ) );
				},
				set( newValue ) {
					this.updateOption( 'enableOverlay', newValue );
				}
			},
			overlayPageType: {
				get() {
					return this.getOption( 'overlayPageType' );
				},
				set( newValue ) {
					this.updateOption( 'overlayPageType', newValue );
				}
			},
			pageTypes() {
				return window.ystdtbHeaderDesignData.postTypes;
			},
			hasPageTypes() {
				return !! Object.keys( this.pageTypes ).length;
			},
			archivePostTypes() {
				return window.ystdtbHeaderDesignData.archivePostTypes;
			},
			hasArchivePostTypes() {
				return !! Object.keys( this.archivePostTypes ).length;
			},
		}
	}
</script>

<style lang="scss">

</style>
