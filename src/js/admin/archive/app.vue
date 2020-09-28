<template>
	<div class="ystdtb-menu__form archive">
		<DefaultImage/>
		<Layout/>
		<div class="ystdtb-menu__section">
			<p class="submit">
				<input type="submit" name="submit" id="submit" class="button button-primary" value="変更を保存">
			</p>
		</div>
	</div>
</template>

<script>
	import DefaultImage from "./default-image";
	import Layout from "./layout";

	export default {
		name: 'app-archive',
		data() {

		},
		components: {
			DefaultImage,
			Layout
		},
		beforeCreate() {
			this.$store.commit( 'initOptions' );
		},
	}
</script>

<style lang="scss">

</style>
