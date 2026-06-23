import classnames from 'classnames';
/**
 * Aktk Dependencies.
 */
import { getCustomSpacingValues } from '@aktk/block-components/components/custom-spacing-select';
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';

import type { DlBlockAttributes } from './types';
import { getResponsiveCustomPropName } from '@aktk/block-components/utils/responsive-value';

/**
 * Dlブロックのクラス名を取得.
 * @param attributes
 */
export function getDlClassNames( attributes: DlBlockAttributes ) {
	const { margin, responsiveMargin } = attributes;
	return classnames( 'ystdtb-dl', {
		'has-margin': margin || responsiveMargin,
	} );
}

/**
 * Dlブロックのスタイルを取得.
 * @param attributes
 */
export function getDlStyles( attributes: DlBlockAttributes ) {
	const { margin, responsiveMargin } = attributes;

	const types = [ 'desktop', 'tablet', 'mobile' ] as const;
	const position = [ 'top', 'right', 'bottom', 'left' ] as const;
	// レスポンシブ指定のあるスタイルを生成.
	const responsiveStyles = types.reduce(
		( acc, type ) => {
			// margin.
			const _margin = responsiveMargin?.[ type ];
			position.forEach( ( pos ) => {
				const marginValue = _margin?.[ pos ];
				if ( marginValue ) {
					const customPropName = getResponsiveCustomPropName(
						'ystdtb',
						`dl--margin-${ pos }`,
						type
					);
					acc[ customPropName ] =
						presetTokenToCssVar( marginValue ) || marginValue;
				}
			} );

			return acc;
		},
		{} as Record< string, string >
	);

	return {
		...getCustomSpacingValues( margin, 'margin' ),
		...responsiveStyles,
	};
}
