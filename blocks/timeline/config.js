import { __ } from '@wordpress/i18n';

export const attributes = {};

export const supports = {
	align: false,
	className: false,
	lightBlockWrapper: true,
};

export const template = [
	[ 'ystdtb/timeline-item', {} ],
	[ 'ystdtb/timeline-item', {} ],
	[ 'ystdtb/timeline-item', {} ],
];

export const presetLabelTypes = [
	{ label: __( 'なし', 'ystandard-toolbox' ), name: '' },
	{ label: __( 'アイコン', 'ystandard-toolbox' ), name: 'icon' },
	{ label: __( '連番', 'ystandard-toolbox' ), name: 'text' },
];
