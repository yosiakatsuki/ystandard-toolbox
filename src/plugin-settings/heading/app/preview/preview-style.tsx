import { kebabCase, isArray, isNumber } from 'lodash';

/**
 * Aktk dependencies.
 */
import { deleteUndefined, isEmpty } from '@aktk/block-components/utils/object';
import { isResponsiveValue } from '@aktk/components/responsive-values/utils';
import type { CustomFontSize } from '@aktk/block-components/components/custom-font-size-picker';
/**
 * Plugin dependencies.
 */
import { getHeadingOptions } from '@aktk/plugin-settings/heading/util/setting';
import type {
	HeadingPseudoElementsStyle,
	HeadingStyle,
} from '@aktk/plugin-settings/heading/types';

/**
 * Component.
 */
interface PreviewStyleProps {
	style?: HeadingStyle;
	before?: HeadingPseudoElementsStyle;
	after?: HeadingPseudoElementsStyle;
	selector?: string;
}

export default function PreviewStyle( props: PreviewStyleProps ) {
	const css = getStyles( props );
	return <style dangerouslySetInnerHTML={ { __html: css } } />;
}

function getStyles( props: PreviewStyleProps ) {
	const style = parseStyles( props?.style as unknown as object );
	const before = parseStylesPseudoElements( props?.before || {} );
	const after = parseStylesPseudoElements( props?.after || {} );
	const selector = props?.selector || 'ystdtb-setting-heading__preview-text';

	const styleCss = createCSS( style, selector );
	const beforeCss = createCSS( before, `${ selector }::before` );
	const afterCss = createCSS( after, `${ selector }::after` );

	return `${ styleCss }\n${ beforeCss }\n${ afterCss }`;
}

/**
 * スタイルの解析
 * @param styles
 */
function parseStyles( styles: object ) {
	if ( isEmpty( styles ) ) {
		return {};
	}
	let desktop: any[] = [];
	let tablet: any[] = [];
	let mobile: any[] = [];
	Object.keys( styles ).forEach( ( key: string ) => {
		const property = kebabCase( key );
		// @ts-ignore
		let value = styles[ key ];
		// フォントサイズの場合特殊処理.
		if ( isFontSize( property ) ) {
			value = parseFontSizeStyle( value );
		}
		// font-styleの場合、ページのCSSで font-style: normal !importantが効いているので上書きする.
		if ( 'font-style' === property ) {
			value = `${ value } !important`;
		}
		// レスポンシブ値でない場合はデスクトップのみの値として扱う
		if ( ! isResponsiveValue( value ) ) {
			value = { desktop: value };
		}
		// borderの場合.
		if ( isBorder( property ) ) {
			value = parseLongHandStyle( value, property, parseBorderProperty );
		}
		// spacingの場合.
		if ( isSpacing( property ) ) {
			value = parseLongHandStyle( value, property, parseSpacingProperty );
		}

		if ( isArray( value.desktop ) ) {
			desktop = [ ...desktop, ...value.desktop ];
		} else {
			desktop = [ ...desktop, `${ property }: ${ value.desktop };` ];
		}
		if ( value?.tablet ) {
			if ( isArray( value.tablet ) ) {
				tablet = [ ...tablet, ...value.tablet ];
			} else {
				tablet = [ ...tablet, `${ property }: ${ value.tablet };` ];
			}
		}
		if ( value?.mobile ) {
			if ( isArray( value.mobile ) ) {
				mobile = [ ...mobile, ...value.mobile ];
			} else {
				mobile = [ ...mobile, `${ property }: ${ value.mobile };` ];
			}
		}
	} );

	return deleteUndefined( {
		desktop,
		tablet,
		mobile,
	} );
}

function parseStylesPseudoElements( styles: HeadingPseudoElementsStyle ) {
	if ( isEmpty( styles ) ) {
		return {};
	}
	if ( styles?.icon ) {
		delete styles.icon;
	}
	if ( styles?.content ) {
		let styleContent = styles.content.replace( /\\(.)/g, '$1' );
		styleContent = styleContent.replace( /\'/g, '"' );
		styles.content = styleContent;
		if ( -1 < styleContent.indexOf( '<svg' ) ) {
			styleContent = encodeURIComponent( styleContent );
			styles.content = '""';
			styles.backgroundImage = `url('data:image/svg+xml;charset=UTF-8,${ styleContent }')`;
			styles.backgroundSize = 'contain';
		}
	}

	return parseStyles( styles );
}

/**
 * フォントサイズの設定か判定.
 * @param property
 */
function isFontSize( property: string ) {
	return 'font-size' === property;
}

/**
 * フォントサイズの解析.
 * @param value
 */
function parseFontSizeStyle( value: CustomFontSize ) {
	// テーマ設定を使っている場合はプレビュー用にdesktopに値を設定する.
	if ( value?.fontSize?.size ) {
		let fontSize = value.fontSize.size;
		// 数値型の場合、単位を追加する
		if ( isNumber( fontSize ) ) {
			fontSize = `${ fontSize }px`;
		}

		value.desktop = fontSize;
	}
	return value;
}

/**
 * 枠線関連の設定か判定.
 * @param property
 */
function isBorder( property: string ) {
	return 'border' === property;
}

/**
 * top,right,bottom,leftの設定を分解.
 * @param value
 * @param property
 * @param parser
 */
function parseLongHandStyle(
	value: object,
	property: string,
	parser: ( style: object, name: string ) => string[]
) {
	if ( ! isResponsiveValue( value ) ) {
		value = { desktop: value };
	}
	const result = {};
	if ( value.hasOwnProperty( 'desktop' ) ) {
		// @ts-ignore
		result.desktop = parser( value?.desktop, property );
	}
	if ( value.hasOwnProperty( 'tablet' ) ) {
		// @ts-ignore
		result.tablet = parser( value?.tablet, property );
	}
	if ( value.hasOwnProperty( 'mobile' ) ) {
		// @ts-ignore
		result.mobile = parser( value?.mobile, property );
	}

	return result;
}

/**
 * Borderの分解.
 * @param value
 * @param name
 */
function parseBorderProperty( value: object, name: string = 'border' ) {
	let result: string[] = [];
	Object.keys( value ).forEach( ( position: string ) => {
		// @ts-ignore
		const borderValue = value[ position ];
		Object.keys( borderValue ).forEach( ( key: string ) => {
			const cssValue = borderValue[ key ];
			result = [
				...result,
				`${ name }-${ position }-${ key }: ${ cssValue };`,
			];
		} );
	} );
	return result;
}

/**
 * 余白関連の設定か判定.
 * @param property
 */
function isSpacing( property: string ) {
	return 'padding' === property || 'margin' === property;
}

/**
 * 余白設定の分解.
 * @param value
 * @param name
 */
function parseSpacingProperty( value: object, name: string ) {
	let result: string[] = [];

	Object.keys( value ).forEach( ( key: string ) => {
		// @ts-ignore
		result = [ ...result, `${ name }-${ key }: ${ value[ key ] };` ];
	} );
	return result;
}

/**
 * CSSの生成
 * @param styles
 * @param styles.desktop
 * @param selector
 * @param styles.tablet
 * @param styles.mobile
 */
function createCSS(
	styles: { desktop: any[]; tablet: any[]; mobile: any[] },
	selector = 'ystdtb-setting-heading__preview-text'
) {
	let result = '';
	if ( styles?.desktop ) {
		result += `#${ selector } {\n${ styles.desktop.join( '\n' ) }\n}`;
	}
	if ( styles?.tablet ) {
		const tabletCSS = styles.tablet.join( '\n' );
		if ( tabletCSS ) {
			result += `\n${ addTabletMediaQuery(
				`#${ selector } {\n${ tabletCSS }\n}`
			) }`;
		}
	}
	if ( styles?.mobile ) {
		const mobileCSS = styles.mobile.join( '\n' );
		if ( mobileCSS ) {
			result += `\n${ addMobileMediaQuery(
				`#${ selector } {\n${ mobileCSS }\n}`
			) }`;
		}
	}

	return result;
}

function getBreakpoints( type: 'mobile' | 'tablet' | 'desktop' ) {
	const settings = getHeadingOptions();
	const breakpoints = settings?.breakpoints || {};

	return breakpoints[ type ];
}

function addMobileMediaQuery( style: string ) {
	const mobile = getBreakpoints( 'mobile' );
	return addMediaQuery( style, '', mobile );
}

function addTabletMediaQuery( style: string ) {
	const mobile = getBreakpoints( 'mobile' );
	const tablet = getBreakpoints( 'tablet' );
	return addMediaQuery( style, mobile, tablet );
}

function addMediaQuery( style: string, min?: string, max?: string ) {
	// max側の計算が簡易的。実際にPHPで出力されるものと少し違うが、管理画面側だけの話なのでそういう仕様とする。
	if ( min && max ) {
		return `@media (min-width: ${ min }) and (max-width: ${ max }) { ${ style } }`;
	} else if ( min ) {
		return `@media (min-width: ${ min }) { ${ style } }`;
	} else if ( max ) {
		return `@media (max-width: ${ max }) { ${ style } }`;
	}
	return style;
}
