export const attributes = {
	count: {
		type: 'number',
		default: 3,
	},
	countMobile: {
		type: 'number',
	},
	orderby: {
		type: 'string',
		default: 'date',
	},
	order: {
		type: 'string',
		default: 'DESC',
	},
	listType: {
		type: 'string',
		default: 'card',
	},
	listTypeMobile: {
		type: 'string',
	},
	colMobile: {
		type: 'number',
		default: 1,
	},
	colTablet: {
		type: 'number',
		default: 3,
	},
	colPc: {
		type: 'number',
		default: 3,
	},
	taxonomy: {
		type: 'string',
	},
	termSlug: {
		type: 'string',
	},
	showImg: {
		type: 'bool',
		default: true,
	},
	showDate: {
		type: 'bool',
		default: true,
	},
	showCategory: {
		type: 'bool',
		default: true,
	},
	showExcerpt: {
		type: 'bool',
		default: false,
	},
	excerptLength: {
		type: 'number',
	},
	thumbnailSize: {
		type: 'string',
		default: 'full',
	},
	thumbnailRatio: {
		type: 'string',
		default: '16-9',
	},
	postType: {
		type: 'string',
		default: 'post',
	},
	postIn: {
		type: 'string',
	},
	postNameIn: {
		type: 'string',
	},
	postParent: {
		type: 'string',
	},
	offset: {
		type: 'number',
	},
	offsetMobile: {
		type: 'number',
	},
	align: {
		type: 'string',
		default: '',
	},
};
export const supports = {
	className: false,
	html: false,
	align: [ 'full' ],
};
