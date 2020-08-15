const { series, parallel, watch, src, dest } = require( 'gulp' );
const gulpSass = require( 'gulp-dart-sass' );
const postcss = require( 'gulp-postcss' );
const autoprefixer = require( 'autoprefixer' );
const mqpacker = require( 'css-mqpacker' );
const cssdeclsort = require( 'css-declaration-sorter' );
const cssnano = require( 'cssnano' );
const gulpZip = require( 'gulp-zip' );
const del = require( 'del' );
const webpackStream = require( 'webpack-stream' );
const webpack = require( 'webpack' );
const plumber = require( 'gulp-plumber' );

const webpackConfig = require( './webpack.menu.config.js' );


const postcssPlugins = [
	autoprefixer( {
		grid: 'autoplace'
	} ),
	mqpacker(),
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

function buildAdminApp() {
	return plumber()
		.pipe( webpackStream( webpackConfig, webpack ) )
		.pipe( dest( 'js/admin/' ) )
}

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
			'!webpack.blocks.config.js',
			'!webpack.menu.config.js',
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

function copyUpdateInfo() {
	return src( [ 'ystandard-toolbox.json', 'ystandard-toolbox-beta.json' ] )
		.pipe( dest( 'build' ) );
}


function watchFiles() {
	cleanFiles();
	sass();
	buildAdminApp();
	copyJson();
	watch( [ './src/sass/**/*.scss', './blocks/**/*.scss' ], sass );
	watch( [ './src/js/admin/**/*.js', './src/js/admin/**/*.vue', './src/js/admin/**/*.json' ], buildAdminApp );
	watch( [ './src/js/admin/**/*.json' ], copyJson );
}

exports.createDeployFiles = series( cleanFiles, copyJson, copyProductionFiles, parallel( zip, copyUpdateInfo ) );
exports.sass = series( sass );
exports.watch = series( watchFiles );
exports.clean = series( cleanFiles );
exports.adminApp = series( buildAdminApp );
exports.copyJson = series( copyJson );
exports.build = parallel( sass, buildAdminApp );

exports.default = series( watchFiles );
