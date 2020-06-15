const { series, parallel, watch, src, dest } = require( 'gulp' );
const gulpSass = require( 'gulp-sass' );
const postcss = require( 'gulp-postcss' );
const autoprefixer = require( 'autoprefixer' );
const mqpacker = require( 'css-mqpacker' );
const cssdeclsort = require( 'css-declaration-sorter' );
const cssnano = require( 'cssnano' );

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

function watchFiles() {
	sass();
	watch( './src/sass/**/*.scss', sass );
}
exports.sass = series( sass );
exports.watch = series( watchFiles );

exports.default = series( watchFiles );
