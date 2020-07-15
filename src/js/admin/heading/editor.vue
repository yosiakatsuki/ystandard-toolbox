<template>
	<div class="heading-editor-container">
		<div class="heading-editor-control">
			<ul class="heading-editor-tabs">
				<li :class="{'is-active':isActive('font')}" @click="setActive('font')">文字</li>
				<li :class="{'is-active':isActive('background')}" @click="setActive('background')">背景</li>
				<li :class="{'is-active':isActive('border')}" @click="setActive('border')">線</li>
				<li :class="{'is-active':isActive('margin')}" @click="setActive('margin')">余白</li>
				<li :class="{'is-active':isActive('other')}" @click="setActive('other')">その他</li>
			</ul>
			<div class="heading-editor-tab__content">
				<EditorFont v-show="isActive('font')" :level="level"/>
				<EditorBackground v-show="isActive('background')" :level="level"/>
				<EditorBorder v-show="isActive('border')" :level="level"/>
				<EditorMargin v-show="isActive('margin')" :level="level"/>
			</div>
		</div>
		<div class="heading-editor-preview">
			<Preview :level="level"/>
		</div>
	</div>
</template>


<script>
	import Preview from './preview';
	import EditorFont from './editor-font';
	import EditorBackground from './editor-background';
	import EditorBorder from './editor-border';
	import EditorMargin from './editor-margin';

	export default {
		name: 'editor',
		props: [ 'level' ],
		data() {
			return {
				panel: "font"
			}
		},
		components: {
			Preview,
			EditorFont,
			EditorBackground,
			EditorBorder,
			EditorMargin
		},
		computed: {},
		methods: {
			isActive( name ) {
				return name === this.panel;
			},
			setActive( name ) {
				this.panel = name;
			}
		},
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

		.heading-editor-tabs {
			display: flex;

			li {
				width: 100%;
				padding: .5em;
				border-right: 1px solid #fff;
				border-bottom: 2px solid #f7f7f7;
				background-color: #f7f7f7;
				color: #666;
				font-size: 0.9em;
				text-align: center;
				cursor: pointer;
				transition: border .3s;

				&:last-child {
					border-right: 0;
				}

				&.is-active {
					border-bottom: 2px solid #07689f;
				}
			}
		}

		.heading-editor-tab__content {
			margin-top: 0;
			padding: 1em;
			border: 1px solid #eee;
			border-radius: 4px;
		}
	}

	.heading-editor-preview {
		font-size: 1rem;
		width: 50%;
	}
</style>
