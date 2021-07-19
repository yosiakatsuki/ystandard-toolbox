const defaultConfig = require( "@wordpress/scripts/config/.eslintrc.js" );

module.exports = {
	...defaultConfig,
	globals: {
		...defaultConfig.globals,
		ystdtbBlockEditor: true,
		ystdtbIconList: true,
	},
};
