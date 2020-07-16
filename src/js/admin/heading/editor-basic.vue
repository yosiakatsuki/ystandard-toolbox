<template>
	<div class="heading-editor-basic">
		<label class="is-block">デザインテンプレート</label>
		<div style="margin-top: .5em;">
			<presetSelect :level="level"/>
		</div>

		<div class="ystdtb-menu__section">
			<label class="is-block">有効・無効</label>
			<div class="ystdtb-menu__table">
				<div class="is-label">有効化</div>
				<div class="is-content">
					<div class="ystdtb-menu__horizontal">
						<div>
							<input
								:name="`ystdtb_heading[${level}][useCustomStyle]`"
								type="hidden"
								value="false"
							>
							<input
								:id="`use-custom-style--${level}`"
								:name="`ystdtb_heading[${level}][useCustomStyle]`"
								class="toggle-button"
								type="checkbox"
								value="true"
								v-model="useCustomStyle"
							>
							<label :for="`use-custom-style--${level}`"></label>
						</div>
						<span class="ystdtb-menu__subtext">この見出しデザインを有効化する</span>
					</div>
				</div>
			</div>
			<div class="ystdtb-menu__card" style="margin-top: .5em;">
				<label class="is-block" style="font-size: 0.9em;">エリア別設定</label>
				<div class="ystdtb-menu__table">
					<div class="is-label">コンテンツ</div>
					<div class="is-content">
						<div class="ystdtb-menu__horizontal">
							<div>
								<input
									:name="`ystdtb_heading[${level}][useContent]`"
									type="hidden"
									value="false"
								>
								<input
									:id="`use-content--${level}`"
									:name="`ystdtb_heading[${level}][useContent]`"
									class="toggle-button"
									type="checkbox"
									value="true"
									:disabled="! useCustomStyle"
									v-model="useContent"
								>
								<label :for="`use-content--${level}`"></label>
							</div>
							<span class="ystdtb-menu__subtext">コンテンツ部分に適用する</span>
						</div>
					</div>
				</div>
				<div class="ystdtb-menu__table">
					<div class="is-label">サイドバー</div>
					<div class="is-content">
						<div class="ystdtb-menu__horizontal">
							<div>
								<input
									:name="`ystdtb_heading[${level}][useSidebar]`"
									type="hidden"
									value="false"
								>
								<input
									:id="`use-sidebar--${level}`"
									:name="`ystdtb_heading[${level}][useSidebar]`"
									class="toggle-button"
									type="checkbox"
									value="true"
									:disabled="! useCustomStyle"
									v-model="useSidebar"
								>
								<label :for="`use-sidebar--${level}`"></label>
							</div>
							<span class="ystdtb-menu__subtext">サイドバー部分に適用する</span>
						</div>
					</div>
				</div>
				<div class="ystdtb-menu__table">
					<div class="is-label">フッター</div>
					<div class="is-content">
						<div class="ystdtb-menu__horizontal">
							<div>
								<input
									:name="`ystdtb_heading[${level}][useFooter]`"
									type="hidden"
									value="false"
								>
								<input
									:id="`use-footer--${level}`"
									:name="`ystdtb_heading[${level}][useFooter]`"
									class="toggle-button"
									type="checkbox"
									value="true"
									:disabled="! useCustomStyle"
									v-model="useFooter"
								>
								<label :for="`use-footer--${level}`"></label>
							</div>
							<span class="ystdtb-menu__subtext">フッター部分に適用する</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import presetSelect from './preset-select';
	import _toBool from '../function/_toBool';

	export default {
		name: 'editor-basic',
		props: [ 'level' ],
		components: {
			presetSelect
		},
		data() {
			return {
				showPresetSelect: false,
			}
		},
		computed: {
			useCustomStyle: {
				get() {
					return _toBool( this.getOption( 'useCustomStyle' ) );
				},
				set( newValue ) {
					this.updateOption( 'useCustomStyle', newValue );
				}
			},
			useContent: {
				get() {
					return _toBool( this.getOption( 'useContent' ) );
				},
				set( newValue ) {
					this.updateOption( 'useContent', newValue );
				}
			},
			useSidebar: {
				get() {
					return _toBool( this.getOption( 'useSidebar' ) );
				},
				set( newValue ) {
					this.updateOption( 'useSidebar', newValue );
				}
			},
			useFooter: {
				get() {
					return _toBool( this.getOption( 'useFooter' ) );
				},
				set( newValue ) {
					this.updateOption( 'useFooter', newValue );
				}
			},
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
		}
	}
</script>

<style lang="scss">

</style>
