const productionConfig = require( "./webpack.blocks.config.js" );

module.exports = {
	...productionConfig,
	mode: 'development',
};
