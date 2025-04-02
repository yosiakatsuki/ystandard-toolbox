import { render } from '@testing-library/react';
import PreviewStyle, {
	parseStyles,
	parseStylesPseudoElements,
	isFontSize,
	parseFontSizeStyle,
	isBorder,
	parseLongHandStyle,
} from './preview-style';
import type {
	HeadingPseudoElementsStyle,
	HeadingStyle,
} from '@aktk/plugin-settings/heading/types';

/**
 * PreviewStyleのテスト
 */
describe( 'PreviewStyle', () => {
	it( 'スタイル要素が正しいCSSでレンダリングされること', () => {
		const props = {
			style: {
				fontSize: { desktop: '24px' },
				color: '#000000',
			} as HeadingStyle,
			selector: 'test-selector',
		};

		const { container } = render( PreviewStyle( props ) );
		const styleElement = container.querySelector( 'style' );
		expect( styleElement ).toBeTruthy();
		expect( styleElement?.textContent ).toContain( 'test-selector' );
		expect( styleElement?.textContent ).toContain( 'font-size: 24px' );
		expect( styleElement?.textContent ).toContain( 'color: #000000' );
	} );

	it( 'selectorの指定がない場合', () => {
		const props = {
			style: {
				fontSize: { desktop: '24px' },
				color: '#000000',
			} as HeadingStyle,
		};

		const { container } = render( PreviewStyle( props ) );
		const styleElement = container.querySelector( 'style' );
		expect( styleElement ).toBeTruthy();
		expect( styleElement?.textContent ).toContain(
			'ystdtb-setting-heading__preview-text'
		);
	} );
} );

/**
 * parseStylesのテスト
 */
describe( 'parseStyles', () => {
	it( '空のスタイルオブジェクトを正しく解析すること', () => {
		const result = parseStyles( {} );
		expect( result ).toEqual( {} );
	} );

	it( 'レスポンシブスタイルを正しく解析すること', () => {
		const styles = {
			fontSize: {
				desktop: '24px',
				tablet: '20px',
				mobile: '18px',
			},
		};
		const result = parseStyles( styles );
		expect( result.desktop ).toContain( 'font-size: 24px;' );
		expect( result.tablet ).toContain( 'font-size: 20px;' );
		expect( result.mobile ).toContain( 'font-size: 18px;' );
	} );
	it( 'fontSizeの場合はフォントサイズの値を正しく解析すること', () => {
		const styles = {
			fontSize: {
				desktop: '24px',
			},
		};
		const result = parseStyles( styles );
		expect( result.desktop ).toContain( 'font-size: 24px;' );
		expect( result.tablet ).not.toContain( 'font-size:' );
		expect( result.mobile ).not.toContain( 'font-size:' );
	} );
	it( 'fontSizeの値がレスポンシブ指定の場合', () => {
		const styles = {
			fontSize: {
				desktop: '24px',
				tablet: '20px',
				mobile: '18px',
			},
		};
		const result = parseStyles( styles );
		expect( result.desktop ).toContain( 'font-size: 24px;' );
		expect( result.tablet ).toContain( 'font-size: 20px;' );
		expect( result.mobile ).toContain( 'font-size: 18px;' );
	} );
	it( 'fontSizeの値がタブレットのみ指定の場合', () => {
		const styles = {
			fontSize: {
				tablet: '20px',
			},
		};
		const result = parseStyles( styles );
		expect( result.desktop ).not.toContain( 'font-size:' );
		expect( result.tablet ).toContain( 'font-size: 20px;' );
		expect( result.mobile ).not.toContain( 'font-size:' );
	} );
	it( 'fontSizeの値がモバイルのみ指定の場合', () => {
		const styles = {
			fontSize: {
				mobile: '18px',
			},
		};
		const result = parseStyles( styles );
		expect( result.desktop ).not.toContain( 'font-size:' );
		expect( result.tablet ).not.toContain( 'font-size:' );
		expect( result.mobile ).toContain( 'font-size: 18px;' );
	} );
} );

/**
 * parseStylesPseudoElementsのテスト
 */
describe( 'parseStylesPseudoElements', () => {
	it( '空のスタイルオブジェクトの場合は空のオブジェクトを返すこと', () => {
		const result = parseStylesPseudoElements(
			{} as HeadingPseudoElementsStyle
		);
		expect( result ).toEqual( {} );
	} );

	it( 'enableがfalseの場合は空のオブジェクトを返すこと', () => {
		const result = parseStylesPseudoElements( {
			enable: false,
		} as HeadingPseudoElementsStyle );
		expect( result ).toEqual( {} );
	} );

	it( 'コンテンツを含む疑似要素のスタイルを正しく解析すること', () => {
		const styles: HeadingPseudoElementsStyle = {
			enable: true,
			content: 'test',
			color: '#000000',
		};
		const result = parseStylesPseudoElements( styles );
		expect( result.desktop ).toContain( 'content: "test";' );
	} );
} );

/**
 * ユーティリティ関数のテスト
 */
describe( 'ユーティリティ関数', () => {
	it( 'フォントサイズプロパティを正しく識別すること', () => {
		expect( isFontSize( 'font-size' ) ).toBe( true );
		expect( isFontSize( 'color' ) ).toBe( false );
	} );

	it( 'ボーダープロパティを正しく識別すること', () => {
		expect( isBorder( 'border' ) ).toBe( true );
		expect( isBorder( 'margin' ) ).toBe( false );
	} );

	it( 'フォントサイズスタイルを正しく解析すること', () => {
		const value = {
			fontSize: { size: 24 },
		};
		const result = parseFontSizeStyle( value );
		expect( result.desktop ).toBe( '24px' );
	} );
} );
