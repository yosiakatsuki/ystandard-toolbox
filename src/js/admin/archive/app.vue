<template>
	<div class="ystdtb-menu__form archive">
		<DefaultImage/>
		<Layout/>
		<ImageRatio/>
		<Date/>
		<Order/>
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
	import Order from "./order";
	import ImageRatio from "./image-ratio";
	import Date from "./date";

	export default {
		name: 'app-archive',
		data() {

		},
		components: {
			DefaultImage,
			Layout,
			Order,
			ImageRatio,
			Date,
		},
		beforeCreate() {
			this.$store.commit( 'initOptions' );
		},
	}
</script>

<style lang="scss">

</style>
