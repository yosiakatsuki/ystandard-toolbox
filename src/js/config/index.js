import { _x } from '@wordpress/i18n';

export const ystdtbConfig = {
	category: {
		common: 'ystdtb',
		beta: 'ystdtb_beta',
		deprecated: 'ystdtb_deprecated',
	},
	color: {
		iconForeground: '#4190be',
		iconForegroundChild: '#A64276',
		iconDeprecatedForeground: '#be4141',
		iconBeta: '#9CADBC',
	},
	hasClasses: {
		textColor: 'has-text-color',
		fontSize: 'has-font-size',
		background: 'has-background',
		backgroundGradient: 'has-background-gradient',
		padding: 'has-padding',
		margin: 'has-margin',
		border: 'has-border',
		borderColor: 'has-border-color',
	},
	component: {
		headingClearStyle: 'is-clear-style',
		backgroundRepeat: [
			{
				value: 'no-repeat',
				label: _x(
					'繰り返し無し',
					'component-config',
					'ystandard-toolbox'
				),
			},
			{
				value: 'repeat',
				label: _x(
					'繰り返す',
					'component-config',
					'ystandard-toolbox'
				),
			},
		],
		units: [
			{ value: 'px', label: 'px' },
			{ value: 'em', label: 'em' },
			{ value: 'rem', label: 'rem' },
			{ value: '%', label: '%' },
			{ value: 'vw', label: 'vw' },
			{ value: 'vh', label: 'vh' },
		],
		fontSizeUnits: [
			{ value: 'px', label: 'px' },
			{ value: 'em', label: 'em' },
			{ value: 'rem', label: 'rem' },
		],
		borderRadiusUnits: [
			{ value: 'px', label: 'px' },
			{ value: '%', label: '%' },
		],
		borderStyles: [
			{
				value: 'solid',
				label: _x( '直線', 'component-config', 'ystandard-toolbox' ),
			},
			{
				value: 'dotted',
				label: _x( '点線', 'component-config', 'ystandard-toolbox' ),
			},
			{
				value: 'dashed',
				label: _x( '破線', 'component-config', 'ystandard-toolbox' ),
			},
			{
				value: 'double',
				label: _x( '二重線', 'component-config', 'ystandard-toolbox' ),
			},
		],
		boxShadowPreset: [
			{
				label: _x( '小', 'component-config', 'ystandard-toolbox' ),
				value: {
					offsetX: '0',
					offsetY: '2px',
					blurRadius: '8px',
					color: '#bdc3c7',
					opacity: 0.7,
				},
			},
			{
				label: _x( '中', 'component-config', 'ystandard-toolbox' ),
				value: {
					offsetX: '0',
					offsetY: '4px',
					blurRadius: '16px',
					color: '#bdc3c7',
					opacity: 0.7,
				},
			},
			{
				label: _x( '大', 'component-config', 'ystandard-toolbox' ),
				value: {
					offsetX: '0',
					offsetY: '8px',
					blurRadius: '24px',
					color: '#bdc3c7',
					opacity: 0.7,
				},
			},
		],
		ratioOptions: [
			{ value: '1-1', label: '1-1' },
			{ value: '2-1', label: '2-1' },
			{ value: '3-1', label: '3-1' },
			{ value: '3-2', label: '3-2' },
			{ value: '4-3', label: '4-3' },
			{ value: '16-9', label: '16-9' },
		],
	},
};
