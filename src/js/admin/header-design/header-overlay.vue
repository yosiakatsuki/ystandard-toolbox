<template>
	<div class="header-overlay">
		<h3 class="ystdtb-menu__section-title">ヘッダーオーバーレイ</h3>
		<div class="ystdtb-menu__section is-w-600">
			<div class="ystdtb-menu__table ystdtb-menu__section">
				<div class="is-label">有効化</div>
				<div class="is-content is-align-center">
					<label>
						<input type="hidden" name="header_design[enableOverlay]" value="false">
						<input type="checkbox" name="header_design[enableOverlay]" value="true" v-model="enableOverlay"> ヘッダーオーバーレイ機能を有効化する
					</label>
				</div>
			</div>
			<div v-show="enableOverlay">
				<div class="ystdtb-menu__section">
					<div class="ystdtb-menu__table">
						<div class="is-label">ページタイプ</div>
						<div class="is-content">
							<div class="ystdtb-menu__subtext">オーバーレイ機能を有効にするページタイプにチェックを付けてください。</div>
							<h4>フロントページ(TOPページ)</h4>
							<div>
								<label>
									<input type="checkbox" name="header_design[overlayPageType][]" value="front-page" v-model="overlayPageType">フロントページ(TOPページ)
								</label>
							</div>
							<div v-if="hasPageTypes">
								<h4>詳細ページ</h4>
								<div v-for="(page,name) in pageTypes">
									<label>
										<input type="checkbox" name="header_design[overlayPageType][]" :value="name" v-model="overlayPageType">{{ page }}
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="ystdtb-menu__section">
					<div class="ystdtb-menu__table">
						<div class="is-label">ロゴ</div>
						<div class="is-content">
							<div class="ystdtb-menu__image-select">
								<input type="hidden" :name="`header_design[overlayImage]`" v-model="overlayImage">
								<div v-if="hasImage">
									<div>
										<div class="ystdtb-menu__image-select-preview">
											<img :src="overlayImage" alt="" style="max-width: 300px;">
										</div>
									</div>
									<button type="button" class="is-small is-cancel is-small" @click="clearImage" style="margin-top: .5em;">画像をクリア</button>
								</div>
								<div v-else>
									<button type="button" @click="openMediaUploader">画像を選択</button>
								</div>
							</div>
							<div class="ystdtb-menu__subtext">オーバーレイ表示の際に使用するロゴ画像を設定します。</div>
						</div>
					</div>
				</div>
				<div class="ystdtb-menu__section">
					<div class="ystdtb-menu__table">
						<div class="is-label">文字色</div>
						<div class="is-content">
							<div class="ystdtb-menu__horizontal">
								<ColorPicker
									name="header_design[overlayTextColor]"
									v-model="overlayTextColor"
									defaultColor="#222222"
								/>
								<button type="button" class="is-cancel is-small" @click="clearTextColor">クリア</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../component/color-picker';
	import _toBool from "../function/_toBool";

	export default {
		name: 'header-overlay',
		components: {
			ColorPicker,
		},
		data() {
			return {
				mediaUploader: null,
			}
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
			openMediaUploader() {
				this.initMediaUploader();
				this.mediaUploader.open();
			},
			initMediaUploader() {
				if ( null !== this.mediaUploader ) {
					return;
				}
				this.mediaUploader = wp.media( {
					title: '画像を選択',
					button: {
						text: '選択'
					},
					multiple: false
				} );
				let self = this;
				this.mediaUploader.on( 'select', () => {
					const image = this.mediaUploader.state().get( 'selection' );
					image.each( function ( file ) {
						self.overlayImage = file.toJSON().url;
					} );
				} );
			},
			clearImage() {
				this.overlayImage = '';
			},
			clearTextColor() {
				this.overlayTextColor = '';
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
			overlayImage: {
				get() {
					return this.getOption( 'overlayImage' );
				},
				set( newValue ) {
					this.updateOption( 'overlayImage', newValue );
				}
			},
			hasImage() {
				return !! this.overlayImage;
			},
			overlayTextColor: {
				get() {
					return this.getOption( 'overlayTextColor' );
				},
				set( newValue ) {
					this.updateOption( 'overlayTextColor', newValue );
				}
			},
		}
	}
</script>

<style lang="scss">

</style>
