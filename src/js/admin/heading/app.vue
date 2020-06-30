<template>
	<div class="heading-editor">
		<div v-for="heading in headings">
			{{ heading }}
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				headings: [
					"h1",
					"h2",
					"h3",
					"h4",
					"h5",
					"h6",
				]
			}
		}
	};
</script>

<style lang="scss">

</style>
