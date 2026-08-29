/* Aktk Dependencies */
import { stripUndefined } from '@aktk/block-components/utils/object';

/**
 * 旧FAQ属性のカスタム背景色をBlock Supportsのstyle属性へ移行する.
 *
 * @param attributes 旧FAQ属性.
 * @return 現行FAQ属性.
 */
export function migrateFaqBackgroundColor( attributes: Record< string, any > ) {
	const { customBackgroundColor, ...currentAttributes } = attributes;
	const style = currentAttributes.style;
	const background =
		style?.color?.background ??
		( currentAttributes.backgroundColor
			? undefined
			: customBackgroundColor );

	return stripUndefined( {
		...currentAttributes,
		style: {
			...style,
			color: {
				...style?.color,
				background,
			},
		},
	} ) as Record< string, any >;
}

/**
 * 旧FAQ枠線幅を現行のCSS値へ正規化する.
 *
 * @param borderSize 旧枠線幅.
 * @return 現行の枠線幅.
 */
function normalizeFaqBorderSize( borderSize: unknown ) {
	// 数値属性だった世代はpx単位を補って現行表示を維持する.
	if ( 'number' === typeof borderSize ) {
		return 0 < borderSize ? `${ borderSize }px` : undefined;
	}

	// 文字列以外は枠線幅として解釈せず破棄する.
	if ( 'string' !== typeof borderSize ) {
		return undefined;
	}

	const normalizedSize = borderSize.trim();

	return normalizedSize || undefined;
}

/**
 * 旧FAQ枠線幅が表示上0か判定する.
 *
 * @param borderSize 旧枠線幅.
 * @return 幅0の設定か.
 */
function isZeroFaqBorderSize( borderSize: unknown ) {
	return (
		0 === borderSize ||
		( 'string' === typeof borderSize &&
			/^0(?:[a-z%]+)?$/i.test( borderSize.trim() ) )
	);
}

/**
 * 旧FAQ枠線属性をstyle.borderへ変換する.
 *
 * @param attributes 旧FAQ属性.
 * @return 現行FAQ属性.
 */
export function migrateFaqBorder( attributes: Record< string, any > ) {
	const {
		borderType,
		borderSize,
		borderColor,
		customBorderColor,
		...currentAttributes
	} = attributes;
	const style = currentAttributes.style;

	// すでに現行の枠線設定がある場合は旧属性で上書きしない.
	if ( undefined !== style?.border ) {
		const hasSplitBorder = [ 'top', 'right', 'bottom', 'left' ].some(
			( side ) => undefined !== style.border[ side ]
		);

		return ( stripUndefined( {
			...currentAttributes,
			borderColor: hasSplitBorder ? undefined : borderColor,
		} ) || {} ) as Record< string, any >;
	}

	// 旧表示で無効だった枠線タイプは現行設定へ持ち込まない.
	if ( 'all' !== borderType && 'bottom' !== borderType ) {
		return ( stripUndefined( currentAttributes ) || {} ) as Record<
			string,
			any
		>;
	}

	// 幅0の枠線をsolidの既定幅へ変えてしまわないよう設定を破棄する.
	if ( isZeroFaqBorderSize( borderSize ) ) {
		return ( stripUndefined( currentAttributes ) || {} ) as Record<
			string,
			any
		>;
	}

	const usePresetAttribute = 'all' === borderType && !! borderColor;
	let color = customBorderColor;

	// プリセット色は全周と辺別でWordPress標準の保存先を使い分ける.
	if ( borderColor ) {
		color = usePresetAttribute
			? undefined
			: `var:preset|color|${ borderColor }`;
	}
	const border = stripUndefined( {
		color,
		style: 'solid',
		width: normalizeFaqBorderSize( borderSize ),
	} );
	const migratedBorder =
		'bottom' === borderType ? { bottom: border } : border;

	return stripUndefined( {
		...currentAttributes,
		borderColor: usePresetAttribute ? borderColor : undefined,
		style: {
			...style,
			border: migratedBorder,
		},
	} ) as Record< string, any >;
}

/**
 * 背景色と枠線の旧FAQ属性を現行形式へ直接移行する.
 *
 * @param attributes 旧FAQ属性.
 * @return 現行FAQ属性.
 */
export function migrateFaqAttributes( attributes: Record< string, any > ) {
	return migrateFaqBorder( migrateFaqBackgroundColor( attributes ) );
}
