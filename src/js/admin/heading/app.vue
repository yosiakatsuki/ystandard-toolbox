<template>
	<div class="heading-editor ystdtb-menu__form">
		<ul class="heading-editor__level-tabs">
			<li v-for="heading in headings">
				<button type="button" :class="{'is-selected':heading === selected}" @click="changeLevel(heading)">{{ heading }}</button>
			</li>
		</ul>
		<div class="heading-editor__row">
			<div v-for="heading in headings">
				<Editor v-if="heading === selected" :level="heading"/>
			</div>
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
				],
				selected: 'h2'
			}
		},
		components: {
			Editor
		},
		methods: {
			changeLevel( level ) {
				this.selected = level;
			}
		},
		beforeCreate() {
			this.$store.commit( 'initOptions' );
		}
	};
</script>

<style lang="scss">
	.heading-editor__level-tabs {
		display: flex;
		width: 100%;
		list-style: none;
		padding: 0;
		margin: 0 0 .5em;

		li {
			width: 100%;

			button {
				display: block;
				width: 100%;
				padding: .5em;
				border-top: 2px solid #f7f7f7;
				border-right: 2px solid #fff;
				border-bottom: 2px solid #f7f7f7;
				border-left: 0;
				background-color: #f7f7f7;
				font-weight: bold;
				color: #07689f;
				font-size: 1rem;
				text-align: center;
				box-shadow: none;
				cursor: pointer;

				&.is-selected {
					border-bottom: 2px solid #07689f;
				}
			}

			&:last-child {
				button {
					border-right: 0;
				}
			}
		}
	}

	.heading-editor__row {
		position: relative;
		margin-top: 1em;
	}
</style>
