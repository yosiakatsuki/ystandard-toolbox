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
		]
	},
};
