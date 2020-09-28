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
						<option value=""> -</option>
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
						<option value=""> -</option>
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
					<div class="ystdtb-menu__horizontal" style="margin-bottom: .5em;">
						<div>
							<input
								:id="`bg-size-manual-toggle--${level}`"
								class="toggle-button"
								type="checkbox"
								value="true"
								v-model="isManualBgSize"
							>
							<label :for="`bg-size-manual-toggle--${level}`"></label>
						</div>
						<span style="font-size: .8em;">直接入力モード</span>
					</div>
					<select
						v-if="!isManualBgSize"
						:name="`ystdtb_heading[${level}][backgroundSize]`"
						v-model="backgroundSize"
					>
						<option value="">-</option>
						<option value="contain">contain</option>
						<option value="cover">cover</option>
					</select>
					<div v-if="isManualBgSize">
						<div class="ystdtb-menu__horizontal">
							<label :for="`bg-size-manual--${level}`" class="is-block is-small is-nowrap">直接入力</label>
							<input
								:id="`bg-size-manual--${level}`"
								:name="`ystdtb_heading[${level}][backgroundSize]`"
								type="text"
								v-model="backgroundSize"
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../component/color-picker';
	import presets from './preset.json';

	export default {
		name: 'editor-background',
		props: [ 'level' ],
		components: {
			ColorPicker
		},
		data() {
			return {
				mediaUploader: null,
				isManualBgSize: false,
				presetList: presets,
			}
		},
		computed: {
			backgroundColor: {
				get() {
					return this.getOption( 'backgroundColor' );
				},
				set( newValue ) {
					this.updateOption( 'backgroundColor', newValue );
					const preset = this.getOption( 'preset' );
					if ( this.presetList.hasOwnProperty( preset ) ) {
						if ( this.presetList[ preset ].hasOwnProperty( 'syncBackgroundColor' ) ) {
							const sync = this.presetList[ preset ].syncBackgroundColor;
							sync.forEach( ( value ) => {
								this.updateOption( value, newValue );
							} );
						}
					}
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
			changeManualSize() {
				this.isManualBgSize = ! this.isManualBgSize;
			},
			clearImage() {
				this.backgroundImage = '';
				this.backgroundPosition = '';
				this.backgroundRepeat = '';
				this.backgroundSize = '';
			}
		},
		created() {
			this.isManualBgSize = ! [ '', 'contain', 'cover' ].includes( this.backgroundSize );
		}
	}
</script>

<style lang="scss">

	.background-image__preview {
		display: flex;
		border: 1px solid #eee;
		background-color: #f7f7f7;
		padding: .5em;

		img {
			display: block;
			max-width: 100%;
			height: auto;
			margin: auto;
		}
	}
</style>
