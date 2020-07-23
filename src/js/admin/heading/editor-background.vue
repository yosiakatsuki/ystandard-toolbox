<template>
	<div class="heading-editor-background">
		<div class="ystdtb-menu__table">
			<div class="is-label">背景色</div>
			<div class="is-content">
				<div class="ystdtb-menu__horizontal">
					<ColorPicker
						:name="`ystdtb_heading[${level}][backgroundColor]`"
						v-model="backgroundColor"
					/>
					<button class="is-cancel is-small" type="button" @click="clearBackgroundColor">クリア</button>
				</div>
			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label">背景画像</div>
			<div class="is-content">
				<div class="editor-background__bgc">
					<input type="hidden" :name="`ystdtb_heading[${level}][backgroundImage]`" v-model="imageUrl">
					<div v-if="hasImage">
						<div class="background-image__preview">
							<img :src="imageUrl" alt="">
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
			return {
				mediaUploader: null,
			}
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
			imageUrl: {
				get() {
					return this.getOption( 'backgroundImage' );
				},
				set( newValue ) {
					this.updateOption( 'backgroundImage', newValue );
				}
			},
			hasImage() {
				return '' !== this.imageUrl;
			}
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
			},
			openMediaUploader() {
				console.log( 'aaa' );
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
						self.imageUrl = file.toJSON().url;
					} );
				} );
			},
			clearImage() {
				this.imageUrl = '';
			}
		}
	}
</script>

<style lang="scss">

	.background-image__preview {
		border: 1px solid #eee;
		background-color: #f7f7f7;

		img {
			max-width: 100%;
			height: auto;
		}
	}
</style>
