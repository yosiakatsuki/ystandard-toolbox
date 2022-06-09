const productionConfig = require( './webpack.menu.config.js' );

module.exports = {
	...productionConfig,
	mode: 'development',
};
