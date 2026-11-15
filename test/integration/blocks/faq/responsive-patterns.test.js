/* WordPress Dependencies */
import { createBlock, parse, serialize } from '@wordpress/blocks';

/* Test Dependencies */
import { registerFaqTestBlocks } from '../../helpers/register-blocks';
import configuration from './fixtures/responsive-patterns.json';

registerFaqTestBlocks();

/**
 * テスト対象の保存先へ値を設定する。
 *
 * @param {Object} attributes ブロック属性。
 * @param {string} path       保存先のパス。
 * @param {*}      value      設定値。
 */
function setValue( attributes, path, value ) {
	const keys = path.split( '.' );
	const key = keys.pop();
	const target = keys.reduce( ( current, name ) => {
		current[ name ] ??= {};
		return current[ name ];
	}, attributes );
	target[ key ] = JSON.parse( JSON.stringify( value ) );
}

/**
 * 保存先から値を読み取る。
 *
 * @param {Object} attributes ブロック属性。
 * @param {string} path       保存先のパス。
 * @return {*} 保存値。
 */
function getValue( attributes, path ) {
	return path
		.split( '.' )
		.reduce( ( current, key ) => current?.[ key ], attributes );
}

/**
 * 値を出力する要素を取得する。
 *
 * @param {HTMLElement} container 保存HTMLのコンテナ。
 * @param {Object}      setting   設定の定義。
 * @return {HTMLElement|null} 設定値を持つ要素。
 */
function getTarget( container, setting ) {
	const root = container.querySelector(
		setting.blockName === 'ystdtb/faq' ? '.ystdtb-faq' : '.ystdtb-faq-item'
	);
	return setting.element === 'root'
		? root
		: root.querySelector( `.ystdtb-faq-item__${ setting.element }` );
}

describe.each( configuration.settings )(
	'$labelのレスポンシブ保存',
	( setting ) => {
		it.each( configuration.patterns )( '$label', ( pattern ) => {
			const attributes =
				setting.blockName === 'ystdtb/faq'
					? { isAccordion: false }
					: { faqType: 'q' };
			const responsive = Object.fromEntries(
				pattern.devices.map( ( device ) => [
					device,
					setting.values[ device ],
				] )
			);
			setValue( attributes, setting.normalPath, setting.normal );
			setValue( attributes, setting.responsivePath, responsive );

			const html = serialize(
				createBlock( setting.blockName, attributes )
			);
			const [ block ] = parse( html );
			expect( block.isValid ).toBe( true );
			expect( getValue( block.attributes, setting.normalPath ) ).toEqual(
				setting.normal
			);
			expect(
				getValue( block.attributes, setting.responsivePath )
			).toEqual( responsive );
			expect( serialize( block ) ).toBe( html );

			const container = document.createElement( 'div' );
			container.innerHTML = html;
			const target = getTarget( container, setting );
			const variables = new Map(
				Object.entries( setting.variables ).map(
					( [ property, name ] ) => [ name, property ]
				)
			);
			for ( const device of [ 'desktop', 'tablet', 'mobile' ] ) {
				for ( const [ name, property ] of variables ) {
					const value = responsive[ device ];
					const expected =
						typeof value === 'object'
							? value[ property.split( '-' ).pop() ]
							: value;
					expect(
						target.style.getPropertyValue(
							`--ystdtb--${ device }--${ name }`
						)
					).toBe( expected ?? '' );
				}
			}
		} );
	}
);
