<template>
	<div class="heading-editor-font-size">
		<h3>文字設定</h3>
		<div>
			<label :for="`font-size--${level}`" class="is-block">文字サイズ</label>
			<div class="is-device-columns">
				<div>
					<MonitorIcon size="20"/>
					<input
						:id="`font-size--${level}`"
						:name="`ystdtb_heading[${level}][fontSizePc]`"
						v-model="fontSizePc"
						type="number"
						min="0"
						max="100"
						:step="fontSizeStep"
					/>
				</div>
				<div>
					<TabletIcon size="20"/>
					<input
						:id="`font-size--${level}`"
						:name="`ystdtb_heading[${level}][font][sizeTablet]`"
						type="number"
						min="0"
						max="100"
						:step="fontSizeStep"
					/>
				</div>
				<div>
					<SmartphoneIcon size="20"/>
					<input
						:id="`font-size--${level}`"
						:name="`ystdtb_heading[${level}][font][sizeSp]`"
						type="number"
						min="0"
						max="100"
						:step="fontSizeStep"
					/>
				</div>
			</div>

		</div>
	</div>
</template>


<script>
	import { MonitorIcon, TabletIcon, SmartphoneIcon } from 'vue-feather-icons'

	export default {
		props: [ 'level' ],
		data() {
			return {
				fontMQ: 'pc',
				fontSizeUnit: 'em',
			}
		},
		components: {
			MonitorIcon,
			TabletIcon,
			SmartphoneIcon
		},
		computed: {
			fontSizePc: {
				get() {
					return this.getOption( 'fontSizePc' );
				},
				set( newValue ) {
					this.updateOption( 'fontSizePc', newValue );
				}
			},
			fontSizeStep: function () {
				if ( 'em' === this.fontSizeUnit ) {
					return 0.1;
				}
				return 1;
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
			}
		},
		created() {
		}
	};
</script>

<style lang="scss">
	.heading-editor-font-size {

		.is-device-columns {
			display: flex;
			align-items: center;

			> div {
				display: flex;
				align-items: center;
				margin-right: .5em;

				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
</style>
