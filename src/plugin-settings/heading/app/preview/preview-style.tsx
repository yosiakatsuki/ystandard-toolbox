import { kebabCase, isArray, isNumber } from 'lodash';

/**
 * Aktk dependencies.
 */
import {
	deleteUndefined,
	isEmpty,
	isObject,
} from '@aktk/block-components/utils/object';
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
import { isSplit } from '@aktk/block-components/components/custom-border-select/utils';

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
	const styleProps = { ...props };
	const style = parseStyles( styleProps?.style as unknown as object );
	const before = parseStylesPseudoElements( styleProps?.before || {} );
	const after = parseStylesPseudoElements( styleProps?.after || {} );
	const selector =
		styleProps?.selector || 'ystdtb-setting-heading__preview-text';

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
		// background-imageの場合、url()を追加.
		if ( 'background-image' === property ) {
			value = `url("${ value }")`;
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
		} else if (
			! isObject( value.desktop ) ||
			! isEmpty( value.desktop )
		) {
			desktop = [ ...desktop, `${ property }: ${ value.desktop };` ];
		}
		if ( value?.tablet ) {
			if ( isArray( value.tablet ) ) {
				tablet = [ ...tablet, ...value.tablet ];
			} else if (
				! isObject( value.desktop ) ||
				! isEmpty( value.desktop )
			) {
				tablet = [ ...tablet, `${ property }: ${ value.tablet };` ];
			}
		}
		if ( value?.mobile ) {
			if ( isArray( value.mobile ) ) {
				mobile = [ ...mobile, ...value.mobile ];
			} else if (
				! isObject( value.desktop ) ||
				! isEmpty( value.desktop )
			) {
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
	// 有効化の確認.
	if ( ! styles?.enable ) {
		return {};
	}
	delete styles.enable;

	// アイコン設定の削除.
	if ( styles?.icon ) {
		delete styles.icon;
	}
	if ( styles?.content ) {
		let styleContent = styles.content.replace( /\\(.)/g, '$1' );
		styleContent = styleContent.replace( /\'/g, '"' );
		styles.content = styleContent;
		if ( styleContent.includes( '<svg' ) ) {
			styleContent = encodeURIComponent( styleContent );
			// アイコン使用時の調整.
			styles.content = '""';
			// 背景色を現在の文字色に設定.
			styles.backgroundColor = styles?.iconColor || 'currentColor';
			// マスク関連.
			const iconContent = `url('data:image/svg+xml;charset=UTF-8,${ styleContent }')`;
			styles[ '-webkit-mask-image' ] = iconContent;
			styles.maskImage = iconContent;
			styles.maskPosition = 'center';
			styles.maskRepeat = 'no-repeat';
			styles.maskSize = 'contain';

			// background関連の設定調整.
			delete styles.backgroundImage;
			styles.backgroundSize = 'contain';
			styles.backgroundRepeat = 'no-repeat';
			styles.backgroundPosition = 'center';
			// 位置調整.
			styles.verticalAlign = '-0.15em';
			// Display調整・サイズ調整
			styles.display = styles?.display || { desktop: 'inline-flex' };
			styles.width = styles?.fontSize || { desktop: '1em' };
			styles.height = styles?.fontSize || { desktop: '1em' };
			// 位置調整.
			styles.verticalAlign = '-0.125em';
			// 使わない値を削除.
			delete styles.color;
		} else if ( ! styleContent.includes( '"' ) ) {
			styles.content = `"${ styleContent }"`;
		}
		// 絶対に不要になる値を削除.
		delete styles.iconColor;
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
	// レスポンシブではない場合
	if ( ! isResponsiveValue( value ) ) {
		value = { desktop: value };
	}
	// レスポンシブは未実装。desktopで処理される.
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

	if ( ! isObject( value ) ) {
		return [];
	}

	if ( isSplit( value ) ) {
		// Splitの場合.
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
	} else {
		Object.keys( value ).forEach( ( key: string ) => {
			// @ts-ignore
			const cssValue = value[ key ];
			result = [ ...result, `${ name }-${ key }: ${ cssValue };` ];
		} );
	}

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

	if ( ! isObject( value ) ) {
		return [];
	}

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
