<template>
	<div class="preset-select">
		<div class="ystdtb-menu__horizontal">
			<button type="button" class="select" @click="openPresetSelect()">
				{{ presetName }}
			</button>
			<input
				:name="`ystdtb_heading[${level}][preset]`"
				type="hidden"
				v-model="preset"
			/>
			<button
				type="button"
				class="is-nowrap"
				style="font-size: 0.8em;"
				@click="openPresetSelect()"
			>
				変更
			</button>
		</div>
		<transition name="fade">
			<div v-show="showPresetSelect" class="ystdtb-menu__modal preset-select__modal has-cover">
				<div class="ystdtb-menu__modal-cover" @click="closePresetSelect"></div>
				<div class="ystdtb-menu__modal-content is-large preset-select__modal-content ystdtb-menu__card">
					<h3>サンプルデザイン選択</h3>
					<ul class="preset-select__list">
						<li v-for="(value, name) in presetList">
							<button
								type="button"
								class="is-nowrap preset-select__button"
								@click="changePreset(name,value.default)"
							>
								<span class="preset-select__button-content" :style="parseStyle(value.default)">{{ value.name }}</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>

</template>

<script>
	import presets from './preset.json';
	import _parseStyle from "../function/_parseStyle";

	export default {
		name: 'preset-select',
		props: [ 'level' ],
		components: {},
		data() {
			return {
				showPresetSelect: false,
				presetList: presets
			}
		},
		computed: {
			preset: {
				get() {
					return this.getOption( 'preset' );
				},
				set( newValue ) {
					this.updateOption( 'preset', newValue );
				}
			},
			presetName() {
				if ( this.presetList[ this.preset ] ) {
					return this.presetList[ this.preset ].name;
				}
				return '選択してください';
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
			changePreset( value, style ) {
				this.updateOption( 'preset', value );
				this.setDefaultStyle( style );
				this.closePresetSelect();
			},
			openPresetSelect() {
				this.showPresetSelect = true;
			},
			closePresetSelect() {
				this.showPresetSelect = false;
			},
			parseStyle( style ) {
				return _parseStyle( style );
			},
			setDefaultStyle( style ) {
				console.log( style );
				for ( const key in style ) {
					this.updateOption( key, style[ key ] );
				}
			}
		}
	}
</script>

<style lang="scss">
	.preset-select__modal {

		.preset-select__modal-content {
			h3 {
				margin: 0 0 1em;
				text-align: center;
				font-size: 1.5em;
				color: #07689f;
			}
		}

		.preset-select__list {
			display: flex;
			flex-wrap: wrap;

			> li {
				margin: 0 0 1.5em;
				padding: 0 1em;
				width: 25%;
			}
		}

		.preset-select__button {
			width: 100%;
			min-height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.preset-select__button-content {
			display: block;
			width: 100%;
			text-align: left;
		}
	}
</style>
