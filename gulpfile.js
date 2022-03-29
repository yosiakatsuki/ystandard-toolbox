const { series, parallel, watch, src, dest } = require( 'gulp' );
const gulpSass = require( 'gulp-dart-sass' );
const postcss = require( 'gulp-postcss' );
const autoprefixer = require( 'autoprefixer' );
const cssdeclsort = require( 'css-declaration-sorter' );
const cssnano = require( 'cssnano' );
const gulpZip = require( 'gulp-zip' );
const del = require( 'del' );
const webpackStream = require( 'webpack-stream' );
const webpack = require( 'webpack' );
const plumber = require( 'gulp-plumber' );
const babel = require( 'gulp-babel' );
const rename = require( 'gulp-rename' );

const webpackMenuConfig = require( './webpack.menu.config.js' );
const webpackMenuConfigDev = require( './webpack.menu.config.dev.js' );
const webpackAppConfig = require( './webpack.block-app.config.js' );
const webpackAppConfigDev = require( './webpack.block-app.config.dev.js' );


const postcssPlugins = [
	autoprefixer( {
		grid: 'autoplace'
	} ),
	cssnano( {
			preset: [
				'default',
				{ minifyFontValues: { removeQuotes: false } }
			]
		}
	),
	cssdeclsort( { order: 'smacss' } )
];

function sass() {
	return src( './src/sass/*.scss' )
		.pipe( gulpSass( { outputStyle: 'compressed' } ) )
		.pipe( postcss( postcssPlugins ) )
		.pipe( dest( './css' ) );
}

function sassBlocks() {
	return src( './blocks/**/*.scss' )
		.pipe( gulpSass( { outputStyle: 'compressed' } ) )
		.pipe( postcss( postcssPlugins ) )
		.pipe( dest( './css/blocks/' ) );
}

function buildAdminApp() {
	return plumber()
		.pipe( webpackStream( webpackMenuConfig, webpack ) )
		.pipe( dest( 'js/admin/' ) )
}

function watchBuildAdminApp() {
	return plumber()
		.pipe( webpackStream( webpackMenuConfigDev, webpack ) )
		.pipe( dest( 'js/admin/' ) )
}

function buildApp() {
	return plumber()
		.pipe( webpackStream( webpackAppConfig, webpack ) )
		.pipe( dest( 'js/app/' ) )
}

function BuildAppDev() {
	return plumber()
		.pipe( webpackStream( webpackAppConfigDev, webpack ) )
		.pipe( dest( 'js/app/' ) )
}

const buildJs = () => {
	return src( './src/js/app/*.js' )
		.pipe( babel( {
			presets: [ '@babel/env' ],
			targets: {
				ie: '11',
			},
			minified: true,
			comments: false,
		} ) )
		.pipe( dest( './js/app' ) );
};

function copyJson() {
	return src( './src/js/**/*.json' )
		.pipe( dest( 'js/' ) )
}

function cleanFiles( cb ) {
	return del(
		[
			'./ystandard-toolbox',
			'./build'
		],
		cb );
}

function cleanTemp( cb ) {
	return del(
		[
			'./ystandard-toolbox',
		],
		cb );
}

function deleteVendor( cb ) {
	return del(
		[
			'./ystandard-toolbox/vendor',
		],
		cb );
}

/**
 * 必要ファイルのコピー
 */
function copyProductionFiles() {
	return src(
		[
			'**',
			'!.gitignore',
			'!.travis.yml',
			'!node_modules',
			'!node_modules/**',
			'!gulpfile.js',
			'!package.json',
			'!package-lock.json',
			'!composer.json',
			'!composer.lock',
			'!webpack.blocks.config.js',
			'!webpack.blocks.config.dev.js',
			'!webpack.menu.config.js',
			'!webpack.menu.config.dev.js',
			'!ystandard-toolbox-webpack-config.js',
			'!ystandard-toolbox.json',
			'!ystandard-toolbox-beta.json',
			'!phpcs.ruleset.dist',
			'!phpcs.ruleset.xml',
			'!phpunit.xml.dist',
			'!tests',
			'!tests/**',
			'!bin',
			'!bin/**',
			'!src',
			'!src/**',
			'!blocks/**/*.js',
			'!blocks/**/*.scss',
			'!.github',
			'!.github/**',
			'!build',
			'!build/**',
			'!vendor',
			'!vendor/**',
			'!*.zip',
			'!ystandard-toolbox',
			'!ystandard-toolbox/**',
		],
		{ base: './' }
	)
		.pipe( dest( './ystandard-toolbox' ) );
}

/**
 * Zip
 */
function zip() {
	return src( 'ystandard-toolbox/**', { base: '.' } )
		.pipe( gulpZip( 'ystandard-toolbox.zip' ) )
		.pipe( dest( 'build' ) );
}

function copyUpdateJson() {
	return src( 'ystandard-toolbox.json' )
		.pipe( dest( 'build' ) );
}

function copyUpdateJsonBeta() {
	return src( 'ystandard-toolbox-beta.json' )
		.pipe( rename( 'ystandard-toolbox.json' ) )
		.pipe( dest( 'build' ) );
}


function watchFiles() {
	cleanFiles();
	sass();
	series( watchBuildAdminApp, copyJson, buildJs );
	watch(
		[
			'./src/sass/**/*.scss',
			'./src/js/**/*.scss',
			'./blocks/**/*.scss',
		],
		series( sass, sassBlocks )
	);
	watch( [ './src/js/admin/**/*.js', './src/js/admin/**/*.vue', './src/js/admin/**/*.json' ], watchBuildAdminApp );
	watch(
		[
			'./src/js/blocks/app.js',
			'./blocks/**/app.js',
		],
		BuildAppDev
	);
	watch( [ './src/js/admin/**/*.json' ], copyJson );
	watch( [ './src/js/app/*.js' ], buildJs );
}

exports.deployFiles = series(
	cleanFiles,
	copyJson,
	copyProductionFiles,
	zip,
	copyUpdateJson,
	cleanTemp
);
exports.deployFilesBeta = series(
	cleanFiles,
	copyJson,
	copyProductionFiles,
	zip,
	copyUpdateJsonBeta,
	cleanTemp
);
exports.manualProduction = series(
	cleanFiles,
	copyJson,
	copyProductionFiles,
	deleteVendor,
	zip,
	copyUpdateJsonBeta,
	cleanTemp
);

exports.sass = series( sass );
exports.watch = series( watchFiles );
exports.clean = series( cleanFiles );
exports.adminApp = series( buildAdminApp );
exports.buildApp = series( buildJs );
exports.copyJson = series( copyJson );
exports.build = series( sass, sassBlocks, buildApp, buildAdminApp, buildJs, copyJson );

exports.default = series( watchFiles );
