<template>
	<div class="heading-editor-container">
		<div class="heading-editor-control">
			<EditorFont :level="level" />
		</div>

		<Preview/>
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
		methods: {
		},
		created() {
		}
	};
</script>

<style lang="scss">
	.heading-editor-container {
		display: flex;
	}

	.heading-editor-control {
		font-size: 1rem;

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

		label {
			font-size: .9em;

			&.is-block {
				display: block;
				margin-bottom: .5em;
			}
		}

		input[type="number"] {
			padding: .1em .1em .1em .25em;
			line-height: 1.5;
			min-height: auto;
		}
	}
</style>
