// rich-text のストアを実際に動かす必要があるため、共通設定のモックを解除する.
jest.unmock( '@wordpress/data' );

/**
 * WordPress Dependencies
 */
import {
	create,
	registerFormatType,
	toHTMLString,
	unregisterFormatType,
} from '@wordpress/rich-text';
import type { RichTextValue } from '@wordpress/rich-text';

/**
 * Block Dependencies
 */
import { FORMAT_TAG_NAME } from '../../config';
import { RESPONSIVE_BREAKS } from '../config';
import { insertResponsiveBreak } from '../utils';

const MOBILE_FORMAT_NAME = 'ystdtb/br-mobile';
const MOBILE_BREAK_HTML = '<span class="ystdtb-br--mobile"><br></span>';

// フォーマットが登録されていないとクラス名が出力されないため、テスト用に登録する.
beforeAll( () => {
	RESPONSIVE_BREAKS.forEach( ( { name, className, title } ) => {
		registerFormatType( name, {
			title,
			tagName: FORMAT_TAG_NAME,
			className,
		} );
	} );
} );

afterAll( () => {
	RESPONSIVE_BREAKS.forEach( ( { name } ) => {
		unregisterFormatType( name );
	} );
} );

// RichTextの値をHTML文字列に戻す
const toHTML = ( value: RichTextValue ) => toHTMLString( { value } );

// 選択範囲を指定したRichTextの値を作る
const createValue = ( html: string, start?: number, end?: number ) => {
	return { ...create( { html } ), start, end } as RichTextValue;
};

describe( 'insertResponsiveBreak', () => {
	it( 'キャレット位置にレスポンシブ改行が挿入される', () => {
		const value = createValue( 'あいうえお', 2, 2 );

		expect(
			toHTML( insertResponsiveBreak( value, MOBILE_FORMAT_NAME ) )
		).toBe( `あい${ MOBILE_BREAK_HTML }うえお` );
	} );

	it( '選択範囲があるときは文字を消さず末尾に挿入される', () => {
		const value = createValue( 'あいうえお', 1, 3 );

		expect(
			toHTML( insertResponsiveBreak( value, MOBILE_FORMAT_NAME ) )
		).toBe( `あいう${ MOBILE_BREAK_HTML }えお` );
	} );

	it( '種類ごとに対応するクラス名で挿入される', () => {
		RESPONSIVE_BREAKS.forEach( ( { name, className } ) => {
			const value = createValue( 'あい', 1, 1 );

			expect( toHTML( insertResponsiveBreak( value, name ) ) ).toBe(
				`あ<span class="${ className }"><br></span>い`
			);
		} );
	} );

	it( '選択範囲がない場合は値を変更しない', () => {
		const value = create( { html: 'あいうえお' } );

		expect( insertResponsiveBreak( value, MOBILE_FORMAT_NAME ) ).toBe(
			value
		);
	} );

	it( '挿入後のHTMLはparse・serializeで往復する', () => {
		const html = `あい${ MOBILE_BREAK_HTML }うえお`;

		expect( toHTML( create( { html } ) ) ).toBe( html );
	} );
} );
