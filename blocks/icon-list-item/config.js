export const attributes = {
	content: {
		type: 'string',
		source: 'html',
		selector: 'li',
		default: '',
	},
};

export const supports = {
	align: false,
	className: false,
	lightBlockWrapper: true,
	fontSize: false,
	color: false,
	splitting:true,
};

export const blockClassName = 'ystdtb-icon-list-item';
