<template>
	<div class="default-image">
		<h3 class="ystdtb-menu__section-title">投稿一覧デフォルト画像</h3>
		<p class="ystdtb-menu__subtext">投稿一覧でアイキャッチ画像がなかった場合に表示される画像の設定</p>
		<div class="ystdtb-menu__section">
			<div class="ystdtb-menu__table-collapse">
				<div class="is-label">デフォルト画像</div>
				<div class="is-content">
					<div class="ystdtb-menu__horizontal">
						<input
							type="hidden"
							name="archive[archiveDefaultImage]"
							v-model="archiveDefaultImage"
						/>
						<div v-if="hasImage">
							<div class="ystdtb-menu__preview-image default-image__preview">
								<img :src="archiveDefaultImage" alt="">
							</div>
							<button type="button" class="is-small is-cancel is-small" @click="clearImage" style="margin-top: .5em;">画像をクリア</button>
						</div>
						<div v-else>
							<button type="button" class="" @click="openMediaUploader">画像を選択</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'default-image',
		data() {
			return {
				mediaUploader: null,
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
			clearImage() {
				this.archiveDefaultImage = '';
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
						self.archiveDefaultImage = file.toJSON().url;
					} );
				} );
			},
		},
		computed: {
			archiveDefaultImage: {
				get() {
					return this.getOption( 'archiveDefaultImage' );
				},
				set( newValue ) {
					this.updateOption( 'archiveDefaultImage', newValue );
				}
			},
			hasImage() {
				return '' !== this.archiveDefaultImage;
			}
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
