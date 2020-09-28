<template>
	<div class="ystdtb-menu__section layout">
		<h3 class="ystdtb-menu__section-title">レイアウト設定</h3>
		<p class="ystdtb-menu__subtext">投稿一覧ページレイアウト設定</p>
		<div class="ystdtb-menu__section">
			<div class="ystdtb-menu__table-collapse">
				<div class="is-label">デスクトップ・タブレット</div>
				<div class="is-content">
					<div class="ystdtb-menu__horizontal">
						<input
							type="hidden"
							name="archive[theme_ys_archive_type]"
							v-model="archiveDesktopLayout"
						/>
						<button type="button" :class="desktopLayoutButtonClass('card')" @click="selectDesktopLayout('card')">
							<img :src="`${pluginUrl}/assets/menu-page/archive/card.png`" alt="" width="100" height="100"/>
						</button>
						<button type="button" :class="desktopLayoutButtonClass('list')" @click="selectDesktopLayout('list')">
							<img :src="`${pluginUrl}/assets/menu-page/archive/list.png`" alt="" width="100" height="100"/>
						</button>
					</div>
					<p class="ystdtb-menu__subtext">※カスタマイザーの「デザイン」→「アーカイブページ」→「一覧レイアウト」と同じ設定です。</p>
				</div>
			</div>
			<div class="ystdtb-menu__table-collapse">
				<div class="is-label">モバイル</div>
				<div class="is-content">
					<div class="ystdtb-menu__horizontal">
						<input
							type="hidden"
							name="archive[archiveMobileLayout]"
							v-model="archiveMobileLayout"
						/>
						<button type="button" :class="mobileLayoutButtonClass('card')" @click="selectMobileLayout('card')">
							<img :src="`${pluginUrl}/assets/menu-page/archive/card.png`" alt="" width="100" height="100"/>
						</button>
						<button type="button" :class="mobileLayoutButtonClass('list')" @click="selectMobileLayout('list')">
							<img :src="`${pluginUrl}/assets/menu-page/archive/list.png`" alt="" width="100" height="100"/>
						</button>
					</div>
					<button type="button" class="is-small is-cancel is-small" @click="clearMobileLayout" style="margin-top: .5em;">クリア</button>
					<p class="ystdtb-menu__subtext">※未選択の場合、デスクトップ・タブレットと同じレイアウトが適用されます。</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'layout',
		data() {
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
			desktopLayoutButtonClass( type ) {
				return [
					'is-image-button',
					{
						'is-select': this.archiveDesktopLayout === type,
					}
				];
			},
			selectDesktopLayout( type ) {
				this.archiveDesktopLayout = type;
			},
			mobileLayoutButtonClass( type ) {
				return [
					'is-image-button',
					{
						'is-select': this.archiveMobileLayout === type,
					}
				];
			},
			selectMobileLayout( type ) {
				this.archiveMobileLayout = type;
			},
			clearMobileLayout() {
				this.archiveMobileLayout = '';
			},
		},
		computed: {
			pluginUrl() {
				return this.getOption( 'plugin-url' );
			},
			archiveDesktopLayout: {
				get() {
					return this.getOption( 'theme_ys_archive_type' );
				},
				set( newValue ) {
					this.updateOption( 'theme_ys_archive_type', newValue );
				}
			},
			archiveMobileLayout: {
				get() {
					return this.getOption( 'archiveMobileLayout' );
				},
				set( newValue ) {
					this.updateOption( 'archiveMobileLayout', newValue );
				}
			},
		}
	}
</script>

<style lang="scss">

</style>
