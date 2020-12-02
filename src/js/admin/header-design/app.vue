<template>
	<div class="ystdtb-menu__form header-design">
		<SubHeader/>
		<HeaderOverlay/>
		<div class="ystdtb-menu__section">
			<p class="submit">
				<input type="submit" name="submit" id="submit" class="button button-primary" value="変更を保存">
			</p>
		</div>
	</div>
</template>

<script>
	import SubHeader from "./sub-header";
	import HeaderOverlay from "./header-overlay";

	export default {
		name: 'app-header-design',
		components: {
			SubHeader,
			HeaderOverlay,
		},
		beforeCreate() {
			this.$store.commit( 'initOptions' );
		},
	}
</script>

<style lang="scss">

</style>
