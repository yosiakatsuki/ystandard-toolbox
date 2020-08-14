<template>
	<div class="heading-editor-container">
		<div class="heading-editor-control">
			<ul class="heading-editor-tabs">
				<li :class="{'is-active':isActive('basic')}" @click="setActive('basic')">基本</li>
				<li :class="{'is-active':isActive('font')}" @click="setActive('font')">文字</li>
				<li :class="{'is-active':isActive('background')}" @click="setActive('background')">背景</li>
				<li :class="{'is-active':isActive('border')}" @click="setActive('border')">線</li>
				<li :class="{'is-active':isActive('margin')}" @click="setActive('margin')">余白</li>
				<li :class="{'is-active':isActive('other')}" @click="setActive('other')">その他</li>
			</ul>
			<div class="heading-editor-tab__content">
				<EditorBasic v-show="isActive('basic')" :level="level" :description="description"/>
				<EditorFont v-show="isActive('font')" :level="level"/>
				<EditorBackground v-show="isActive('background')" :level="level"/>
				<EditorBorder v-show="isActive('border')" :level="level"/>
				<EditorMargin v-show="isActive('margin')" :level="level"/>
				<EditorOther v-show="isActive('other')" :level="level" :label="label"/>
			</div>
		</div>
		<div class="heading-editor-preview">
			<Preview :level="level" :label="label"/>
		</div>
	</div>
</template>


<script>
	import Preview from './preview';
	import EditorBasic from './editor-basic';
	import EditorFont from './editor-font';
	import EditorBackground from './editor-background';
	import EditorBorder from './editor-border';
	import EditorMargin from './editor-margin';
	import EditorOther from './editor-other';

	export default {
		name: 'editor',
		props: [ 'level', 'label', 'description' ],
		data() {
			return {
				panel: "basic"
			}
		},
		components: {
			Preview,
			EditorBasic,
			EditorFont,
			EditorBackground,
			EditorBorder,
			EditorMargin,
			EditorOther
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

		@media (min-width: 769px) {
			display: flex;
			width: 100%;
		}
	}

	.heading-editor-control {
		font-size: 1rem;
		@media (min-width: 769px) {
			width: 50%;
		}

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
				font-size: 0.8em;
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
		@media (min-width: 769px) {
			width: 50%;
		}
	}
</style>
