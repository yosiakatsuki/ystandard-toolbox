import { _x } from '@wordpress/i18n';

export const hasClasses = {
	textColor: 'has-text-color',
	fontSize: 'has-font-size',
	background: 'has-background',
	backgroundGradient: 'has-background-gradient',
	padding: 'has-padding',
	margin: 'has-margin',
	border: 'has-border',
	borderColor: 'has-border-color',
};

export const category = {
	common: 'ystdtb',
	beta: 'ystdtb_beta',
	deprecated: 'ystdtb_deprecated',
};

export const color = {
	iconForeground: '#4190be',
	iconForegroundChild: '#A64276',
	iconDeprecatedForeground: '#be4141',
	iconBeta: '#9CADBC',
};

export const customPropertyPrefix = '--ystdtb';

export const ystdtbConfig = {
	category,
	color,
	hasClasses,
	customPropertyPrefix,
	component: {
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
			{ value: '%', label: '%' },
			{ value: 'vw', label: 'vw' },
			{ value: 'vh', label: 'vh' },
		],
		letterSpacingUnits: [
			{ value: 'em', label: 'em', step: 0.1 },
			{ value: 'px', label: 'px' },
			{ value: 'rem', label: 'rem', step: 0.1 },
			{ value: '%', label: '%' },
			{ value: 'vw', label: 'vw' },
			{ value: 'vh', label: 'vh' },
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
	},
};
