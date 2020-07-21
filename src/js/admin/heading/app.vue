<template>
	<div class="heading-editor ystdtb-menu__form">
		<ul class="heading-editor__level-tabs">
			<li :class="`is-level-${ heading.level }`" v-for="heading in headings">
				<button type="button" :class="{'is-selected': heading.level === selected}" @click="changeLevel(heading.level)">{{ heading.label }}</button>
			</li>
		</ul>
		<div class="heading-editor__row">
			<div v-for="heading in headings">
				<Editor
					v-show="heading.level === selected"
					:level="heading.level"
					:label="heading.label"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import Editor from './editor';
	import _getHeadingTypes from "./_getHeadingTypes";

	export default {
		name: 'app-headline',
		data() {
			return {
				headings: [],
				selected: 'h2'
			}
		},
		components: {
			Editor
		},
		methods: {
			changeLevel( level ) {
				this.selected = level;
			},
		},
		beforeCreate() {
			this.$store.commit( 'initOptions' );
		},
		created() {
			this.headings = _getHeadingTypes();
		}
	};
</script>

<style lang="scss">
	.heading-editor__level-tabs {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		list-style: none;
		padding: 0;
		margin: 0 0 .5em;

		li {
			flex-grow: 1;
			margin-bottom: 2px;

			&.is-level-h1,
			&.is-level-h2,
			&.is-level-h3,
			&.is-level-h4,
			&.is-level-h5,
			&.is-level-h6 {
				width: #{(1 / 6 * 100)}#{"%"};
			}

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
				font-size: .9rem;
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
		margin-top: 3em;
	}
</style>
