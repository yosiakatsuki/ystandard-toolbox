/**
 * SVGアイコンのリストを作成するスクリプト
 */
const fs = require( 'fs' );
const feather = require( 'feather-icons' );
const outputPath = './library/svg-icons/svg-icons.php';
const icons = [];
const {
	siFacebook,
	siHatenabookmark,
	siLine,
	siFeedly,
	siRss,
	siWordpress,
	siPinterest,
	siInstagram,
	siYoutube,
	siTwitch,
	siDribbble,
	siGithub,
	siTumblr,
	siDiscord,
	siTiktok,
	siX,
	siBluesky,
} = require( 'simple-icons' );
const snsIcons = [
	siFacebook,
	siHatenabookmark,
	siLine,
	siFeedly,
	siRss,
	siWordpress,
	siPinterest,
	siInstagram,
	siYoutube,
	siTwitch,
	siDribbble,
	siGithub,
	siTumblr,
	siDiscord,
	siTiktok,
	siX,
	siBluesky,
];
for ( const icon in feather.icons ) {
	icons.push( {
		name: icon,
		icon: feather.icons[ icon ].toSvg(),
		category: 'feather',
	} );
	if ( 'twitter' === icon ) {
		icons.push( {
			name: 'sns-' + icon,
			icon: feather.icons[ icon ].toSvg(),
			category: 'sns',
		} );
	}
}
for ( const icon of snsIcons ) {
	icons.push( {
		name: 'sns-' + icon.slug,
		icon: icon.svg,
		category: 'sns',
	} );
}

/**
 * JSONファイルの作成
 */
const content = "<?php return json_decode('" + JSON.stringify( icons ) + "');";
fs.writeFile( outputPath, content, ( err ) => {
	/* eslint-disable no-console */
	if ( err ) {
		console.log( err );
	} else {
		console.log( 'write end' );
	}
	/* eslint-enable */
} );
