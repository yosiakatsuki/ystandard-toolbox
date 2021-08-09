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

const webpackConfig = require( './webpack.menu.config.js' );
const webpackConfigDev = require( './webpack.menu.config.dev.js' );


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

function buildAdminApp() {
	return plumber()
		.pipe( webpackStream( webpackConfig, webpack ) )
		.pipe( dest( 'js/admin/' ) )
}

function watchBuildAdminApp() {
	return plumber()
		.pipe( webpackStream( webpackConfigDev, webpack ) )
		.pipe( dest( 'js/admin/' ) )
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
	watch( [ './src/sass/**/*.scss', './blocks/**/*.scss' ], sass );
	watch( [ './src/js/admin/**/*.js', './src/js/admin/**/*.vue', './src/js/admin/**/*.json' ], watchBuildAdminApp );
	watch( [ './src/js/admin/**/*.json' ], copyJson );
	watch( [ './src/js/app/*.js' ], buildJs );
}

exports.deployFiles = series( cleanFiles, copyJson, copyProductionFiles, zip, copyUpdateJson );
exports.deployFilesBeta = series( cleanFiles, copyJson, copyProductionFiles, zip, copyUpdateJsonBeta );

exports.sass = series( sass );
exports.watch = series( watchFiles );
exports.clean = series( cleanFiles );
exports.adminApp = series( buildAdminApp );
exports.buildApp = series( buildJs );
exports.copyJson = series( copyJson );
exports.build = series( sass, buildAdminApp, buildJs, copyJson );

exports.default = series( watchFiles );
