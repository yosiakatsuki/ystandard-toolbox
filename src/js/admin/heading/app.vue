<template>
	<div class="heading-editor ystdtb-menu__form">
		<div class="heading-editor__row" v-for="heading in headings">
			<h2>{{ heading }}</h2>
			<Editor :level="heading"/>
		</div>
	</div>
</template>

<script>
	import Editor from './editor';

	export default {
		name: 'app-headline',
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
		},
		components: {
			Editor
		},
		beforeCreate() {
			this.$store.commit( 'initOptions' );
		}
	};
</script>

<style lang="scss">
	.heading-editor__row {
		margin-top: 3em;

		&:first-child {
			margin-top: 0;
		}

		h2 {
			margin: 0;
			padding-bottom: .5em;
		}
	}
</style>
