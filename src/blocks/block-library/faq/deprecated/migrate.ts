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
