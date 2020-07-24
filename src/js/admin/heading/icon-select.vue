<template>
	<div class="icon-select">
		<div class="ystdtb-menu__horizontal" style="align-items: center">
			<div class="icon-select__preview" v-html="iconPreview"></div>
			<input type="hidden" :name="`ystdtb_heading[${level}][${type}Icon]`" v-model="selectedIcon">
			<input type="hidden" :name="`ystdtb_heading[${level}][${type}Content]`" v-model="selectedContent">
			<button
				type="button"
				class="is-nowrap"
				:disabled="isDisable"
				@click="showIconSelect = true"
			>
				選択
			</button>
			<button
				type="button"
				class="is-cancel"
				:disabled="isDisable"
				@click="clearIcon()"
			>
				クリア
			</button>
		</div>
		<transition name="fade">
			<div v-show="showIconSelect" class="ystdtb-menu__modal preset-select__modal has-cover">
				<div class="ystdtb-menu__modal-cover" @click="showIconSelect = false"></div>
				<div class="ystdtb-menu__modal-content is-large preset-select__modal-content ystdtb-menu__card">
					<h3>アイコン選択</h3>
					<div class="icon-select__container">
						<div class="icon-select__list">
							<button type="button" class="is-white" v-for="icon in icons" @click="selectIcon(icon)" v-html="getSelectIcon(icon)">
							</button>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import iconNames from './icons.json';
	import presets from './preset.json';
	import _getFeatherIcon from "../function/_getFeatherIcon";

	export default {
		name: 'icon-select',
		props: [ 'level', 'type' ],
		components: {},
		data() {
			return {
				showIconSelect: false,
				icons: iconNames[ 'icons' ],
				presetList: presets,
			}
		},
		computed: {
			selectedIcon: {
				get() {
					return this.getOption( `${ this.type }Icon` );
				},
				set( newValue ) {
					this.updateOption( `${ this.type }Icon`, newValue );
				}
			},
			selectedContent() {
				return this.getIconSvg( this.selectedIcon );
			},
			iconPreview() {
				return '' === this.selectedIcon ? '<span>-</span>' : _getFeatherIcon( this.selectedIcon, {} );
			},
			isDisable() {
				const preset = this.getOption( 'preset' );
				if ( undefined === this.presetList[ preset ] ) {
					return true;
				}
				if ( undefined === this.presetList[ preset ][ 'enablePseudoElements' ] ) {
					return true;
				}
				return ! this.presetList[ preset ].enablePseudoElements.includes( `${ this.type }Icon` );
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
			selectIcon( icon ) {
				this.selectedIcon = icon;
				this.updateOption( `${ this.type }Content`, this.getIconSvg( icon ) );
				this.showIconSelect = false;
			},
			clearIcon() {
				this.updateOption( `${ this.type }Icon`, '' );
				this.updateOption( `${ this.type }Content`, '' );
			},
			getIconSvg( name ) {
				const size = this.getOption( `${ this.type }Size` );
				const color = this.getOption( `${ this.type }Color` );
				return _getFeatherIcon(
					name,
					{
						style: `width:${ size }em;height:${ size }em;`,
						stroke: color
					}
				);
			},
			getSelectIcon( name ) {
				return _getFeatherIcon( name );
			}
		}
	}
</script>

<style lang="scss">
	.icon-select__preview {
		display: flex;

		> * {
			margin: auto;
		}

		> span {
			display: block;
			padding: .5em 1em;
		}
	}

	.icon-select__container {
		height: 90%;
		overflow-y: scroll;
	}

	.icon-select__list {
		display: flex;
		flex-wrap: wrap;

		> button {
			width: calc(10% - 1em);
			margin-right: 1em;
			margin-bottom: 1em;
			font-size: 1.2rem;

			&.is-selected {
				border: 2px solid #07689f;
			}
		}
	}
</style>
