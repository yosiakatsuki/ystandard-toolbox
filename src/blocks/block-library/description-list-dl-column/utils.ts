import classnames from 'classnames';

/**
 * Aktk Dependencies.
 */
import { isObject } from '@aktk/block-components/utils/object';
import type { FlatBorder } from '@aktk/block-components/components/custom-border-select';
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';
import { getResponsiveCustomPropName } from '@aktk/block-components/utils/responsive-value';
import { getCustomSpacingValues } from '@aktk/block-components/components/custom-spacing-select';
/*
 * Block Dependencies
 */
import type { DlColumnBlockAttributes } from './types';

export function getDlColumnClasses( attributes: DlColumnBlockAttributes ) {
	const {
		isStackedOnMobile,
		isStackedOnTablet,
		border,
		margin,
		responsiveMargin,
	} = attributes;

	const borderStyle = getDtColumnBorderProp( border );

	return classnames( 'ystdtb-dl-column', {
		'is-stacked-on-mobile': isStackedOnMobile,
		'is-stacked-on-tablet': isStackedOnTablet,
		'has-border': !! borderStyle,
		'has-margin': margin || responsiveMargin,
	} );
}

export function getDtColumnStyles( attributes: DlColumnBlockAttributes ) {
	const { dtWidth, responsiveDtWidth, border, margin, responsiveMargin } =
		attributes;

	const borderStyle = getDtColumnBorderProp( border );

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
		'--ystdtb--dl-column--width': dtWidth,
		'--ystdtb--dl-column--border': borderStyle,
		...getCustomSpacingValues( margin, 'margin' ),
		...responsiveStyles,
	};
}

/**
 * Borderオブジェクトからborderプロパティの文字列を生成.
 *
 * @param border
 */
function getDtColumnBorderProp( border: FlatBorder | undefined ) {
	if ( ! isObject( border ) ) {
		return undefined;
	}
	const _color = border?.color;
	const _style = border?.style;
	const _width = border?.width;
	if ( ! _color || ! _width ) {
		return undefined;
	}

	return `${ _width } ${ _style || 'solid' } ${ _color }`;
}
