const { series, parallel, watch, src, dest } = require( 'gulp' );
const gulpSass = require( 'gulp-sass' );
const postcss = require( 'gulp-postcss' );
const autoprefixer = require( 'autoprefixer' );
const mqpacker = require( 'css-mqpacker' );
const cssdeclsort = require( 'css-declaration-sorter' );
const cssnano = require( 'cssnano' );
const gulpZip = require( 'gulp-zip' );
const del = require( 'del' );

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
		.pipe( gulpSass() )
		.pipe( postcss( postcssPlugins ) )
		.pipe( dest( './css' ) );
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
			'!webpack.config.js',
			'!ystandard-toolbox-webpack-config.js',
			'!ystandard-toolbox.json',
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

function copyJson() {
	return src( [ 'ystandard-toolbox.json', 'ystandard-toolbox-beta.json' ] )
		.pipe( dest( 'build' ) );
}



function watchFiles() {
	cleanFiles();
	sass();
	watch( './src/sass/**/*.scss', sass );
}

exports.createDeployFiles = series( cleanFiles, copyProductionFiles, parallel( zip, copyJson ) );
exports.sass = series( sass );
exports.watch = series( watchFiles );
exports.clean = series( cleanFiles );

exports.default = series( watchFiles );
