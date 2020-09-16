<template>
	<div class="ystdtb-menu__form header-design">
		<SubHeader/>
		<div class="ystdtb-menu__section">
			<p class="submit">
				<input type="submit" name="submit" id="submit" class="button button-primary" value="変更を保存">
			</p>
		</div>
	</div>
</template>

<script>
	import SubHeader from "./sub-header";

	export default {
		name: 'app-header-design',
		data() {

		},
		components: {
			SubHeader
		},
		beforeCreate() {
			this.$store.commit( 'initOptions' );
		},
	}
</script>

<style lang="scss">

</style>
