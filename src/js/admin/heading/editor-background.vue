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
					<input type="hidden" :name="`ystdtb_heading[${level}][backgroundImage]`" v-model="backgroundImage">
					<div v-if="hasImage">
						<div class="background-image__preview">
							<img :src="backgroundImage" alt="">
						</div>
						<button type="button" class="is-small is-cancel is-small" @click="clearImage" style="margin-top: .5em;">画像をクリア</button>
					</div>
					<div v-else>
						<button type="button" class="" @click="openMediaUploader">画像を選択</button>
					</div>
				</div>
			</div>
		</div>
		<div class="ystdtb-menu__card" style="margin-top: 1em;" v-show="hasImage">
			<div class="label">背景画像詳細設定</div>
			<div class="ystdtb-menu__table">
				<div class="is-label">位置</div>
				<div class="is-content">
					<select
						:name="`ystdtb_heading[${level}][backgroundPosition]`"
						v-model="backgroundPosition"
					>
						<option value=""> - </option>
						<option value="top">上</option>
						<option value="center">中央</option>
						<option value="bottom">下</option>
						<optgroup label="詳細設定">
							<option value="top-left">top left</option>
							<option value="top-center">top center</option>
							<option value="top-right">top right</option>
							<option value="center-left">center left</option>
							<option value="center-center">center center</option>
							<option value="center-right">center right</option>
							<option value="bottom-left">bottom left</option>
							<option value="bottom-center">bottom center</option>
							<option value="bottom-right">bottom right</option>
						</optgroup>
					</select>
				</div>
			</div>
			<div class="ystdtb-menu__table">
				<div class="is-label">繰り返し</div>
				<div class="is-content">
					<select
						:name="`ystdtb_heading[${level}][backgroundRepeat]`"
						v-model="backgroundRepeat"
					>
						<option value=""> - </option>
						<option value="no-repeat">no-repeat</option>
						<option value="repeat">repeat</option>
						<option value="repeat-x">repeat-x</option>
						<option value="repeat-y">repeat-y</option>
						<option value="space">space</option>
						<option value="round">round</option>
					</select>
				</div>
			</div>
			<div class="ystdtb-menu__table">
				<div class="is-label">サイズ</div>
				<div class="is-content">
					<select
						:name="`ystdtb_heading[${level}][backgroundSize]`"
						v-model="backgroundSize"
					>
						<option value=""> - </option>
						<option value="contain">contain</option>
						<option value="cover">cover</option>
						<option value="50%">50%</option>
					</select>
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
			backgroundImage: {
				get() {
					return this.getOption( 'backgroundImage' );
				},
				set( newValue ) {
					this.updateOption( 'backgroundImage', newValue );
				}
			},
			backgroundPosition: {
				get() {
					return this.getOption( 'backgroundPosition' );
				},
				set( newValue ) {
					this.updateOption( 'backgroundPosition', newValue );
				}
			},
			backgroundRepeat: {
				get() {
					return this.getOption( 'backgroundRepeat' );
				},
				set( newValue ) {
					this.updateOption( 'backgroundRepeat', newValue );
				}
			},
			backgroundSize: {
				get() {
					return this.getOption( 'backgroundSize' );
				},
				set( newValue ) {
					this.updateOption( 'backgroundSize', newValue );
				}
			},
			hasImage() {
				return '' !== this.backgroundImage;
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
						self.backgroundImage = file.toJSON().url;
					} );
				} );
			},
			clearImage() {
				this.backgroundImage = '';
				this.backgroundPosition = '';
				this.backgroundRepeat = '';
				this.backgroundSize = '';
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
