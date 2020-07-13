<template>
	<div class="heading-editor-container">
		<div class="heading-editor-control">
			<ul class="heading-editor-tabs">
				<li :class="{'is-active':isActive('fontSize')}" @click="setActive('fontSize')">文字</li>
				<li :class="{'is-active':isActive('background')}" @click="setActive('background')">背景</li>
				<li :class="{'is-active':isActive('border')}" @click="setActive('border')">罫線</li>
				<li :class="{'is-active':isActive('margin')}" @click="setActive('margin')">余白</li>
				<li :class="{'is-active':isActive('other')}" @click="setActive('other')">その他</li>
			</ul>
			<div class="heading-editor-tab__content">
				<transition name="fade">
					<EditorFont v-if="isActive('fontSize')" :level="level"/>
				</transition>
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

	export default {
		props: [ 'level' ],
		data() {
			return {
				panel: "fontSize"
			}
		},
		components: {
			Preview,
			EditorFont
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
				border-bottom: 2px solid transparent;
				color: #666;
				font-size: 0.9em;
				text-align: center;
				cursor: pointer;
				transition: border .3s;

				&.is-active {
					border-bottom-color: #07689f;
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
