<template>
	<div class="heading-editor-container">
		<div class="heading-editor-control">
			<EditorFont :level="level"/>
		</div>
		<div class="heading-editor-preview">
			<Preview :level="level"/>
		</div>
	</div>
</template>


<script>
	import Preview from './preview';
	import EditorFont from './editor-font';

	export default {
		props: [ 'level' ],
		data() {
			return {
				data: []
			}
		},
		components: {
			Preview,
			EditorFont
		},
		methods: {},
		created() {
		}
	};
</script>

<style lang="scss">
	.heading-editor-container {
		display: flex;
		width: 100%;
	}

	.heading-editor-control {
		font-size: 1rem;
		width: 50%;

		> * {
			margin-top: 1.5em;

			&:first-child {
				margin-top: 0;
			}
		}

		h3 {
			font-size: 1em;
			margin-top: 1.5em;
			margin-bottom: .5em;

			&:first-child {
				margin-top: 0;
			}
		}
	}
	.heading-editor-preview {
		font-size: 1rem;
		width: 50%;
	}
</style>
