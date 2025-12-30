import classnames from 'classnames';

/**
 * Aktk Dependencies.
 */
import { getFlatBorderStyle } from '@aktk/block-components/components/custom-border-select/utils';
import { getCustomSpacingValues } from '@aktk/block-components/components/custom-spacing-select';
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';
import { getResponsiveCustomPropName } from '@aktk/block-components/utils/responsive-value';
/*
 * Block Dependencies
 */
import type { DlColumnBlockAttributes } from './types';

export function getDlColumnClassNames( attributes: DlColumnBlockAttributes ) {
	const {
		isStackedOnMobile,
		isStackedOnTablet,
		border,
		margin,
		responsiveMargin,
	} = attributes;

	const borderStyle = getFlatBorderStyle( '', border );

	return classnames( 'ystdtb-dl-column', {
		'is-not-stacked-on-mobile': ! isStackedOnMobile,
		'is-not-stacked-on-tablet': ! isStackedOnTablet,
		'has-border': !! borderStyle,
		'has-margin': margin || responsiveMargin,
	} );
}

export function getDtColumnStyles( attributes: DlColumnBlockAttributes ) {
	const { dtWidth, responsiveDtWidth, border, margin, responsiveMargin } =
		attributes;

	const borderStyle = getFlatBorderStyle( '', border );

	const types = [ 'desktop', 'tablet', 'mobile' ] as const;
	const position = [ 'top', 'right', 'bottom', 'left' ] as const;

	// レスポンシブ指定のあるスタイルを生成.
	const responsiveStyles = types.reduce(
		( acc, type ) => {
			// dt width.
			const _dtWidth = responsiveDtWidth?.[ type ];
			if ( _dtWidth ) {
				acc[ `--ystdtb--dl-column--width--${ type }` ] = _dtWidth;
			}
			// margin.
			const _margin = responsiveMargin?.[ type ];
			position.forEach( ( pos ) => {
				const marginValue = _margin?.[ pos ];
				if ( marginValue ) {
					const customPropName = getResponsiveCustomPropName(
						'ystdtb',
						`dl-column--margin-${ pos }`,
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
		margin,
		'--ystdtb--dl-column--width': dtWidth,
		...borderStyle,
		...responsiveStyles,
	};
}
