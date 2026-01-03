import classnames from 'classnames';
/**
 * WordPress
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import {
	getResponsiveMarginStyle,
	getBorderCustomProperty,
	getResponsiveWidthStyle,
} from './utils';

const config = {
	blockClasses: 'ystdtb-dl-column',
	responsiveStyleClassPrefix: 'dl-column',
};

function isResponsiveObject( value: any ): boolean {
	return (
		typeof value === 'object' && ( 'tablet' in value || 'mobile' in value )
	);
}

const isResponsive = ( values: object ) => {
	if ( ! values || 'object' !== typeof values ) {
		return false;
	}
	return (
		values.hasOwnProperty( 'tablet' ) || values.hasOwnProperty( 'mobile' )
	);
};

// @ts-ignore.
export const deprecated1341 = [
	{
		attributes: {
			isStackedOnMobile: {
				type: 'boolean',
				default: true,
			},
			isStackedOnTablet: {
				type: 'boolean',
				default: false,
			},
			dtWidth: {
				type: 'object',
			},
			border: {
				type: 'object',
			},
			margin: {
				type: 'object',
			},
		},
		supports: {
			anchor: false,
			align: false,
			className: false,
		},
		migrate: ( attributes: any ) => {
			const { margin, padding, dtWidth, ...rest } = attributes;

			// Margin変換.
			let newMargin;
			if ( isResponsiveObject( margin ) ) {
				newMargin = undefined;
			} else {
				newMargin = margin?.desktop || margin;
			}
			let newWidth;
			if ( isResponsiveObject( dtWidth ) ) {
				newWidth = undefined;
			} else {
				newWidth = dtWidth?.desktop;
			}

			return {
				...rest,
				margin: ! isResponsiveObject( margin ) ? newMargin : undefined,
				responsiveMargin: isResponsiveObject( margin )
					: undefined,
				dtWidth: newWidth,
				responsiveDtWidth: isResponsiveObject( dtWidth )
					? dtWidth
					: undefined,
			};
		},
		save( { attributes }: { attributes: any } ) {
			const hasClasses = {
				textColor: 'has-text-color',
				fontSize: 'has-font-size',
				background: 'has-background',
				backgroundGradient: 'has-background-gradient',
				padding: 'has-padding',
				margin: 'has-margin',
				border: 'has-border',
				borderColor: 'has-border-color',
			};
			console.log( { attributes } );
			const {
				isStackedOnMobile,
				isStackedOnTablet,
				dtWidth,
				border,
				margin,
			} = attributes;
			const borderProperty = getBorderCustomProperty(
				border,
				'dl-column'
			);
			const dtWidthStyles = isResponsive( dtWidth )
				? dtWidth
				: {
						desktop: dtWidth?.desktop,
						tablet: dtWidth?.desktop,
						mobile: dtWidth?.desktop,
				  };
			const blockProps = useBlockProps.save( {
				className: classnames( config.blockClasses, {
					'is-not-stacked-on-mobile': ! ( isStackedOnMobile ?? true ),
					'is-not-stacked-on-tablet': ! isStackedOnTablet,
					'has-border': !! borderProperty,
					[ hasClasses.margin ]: getResponsiveMarginStyle( margin ),
				} ),
				style: {
					...getResponsiveWidthStyle(
						dtWidthStyles,
						config.responsiveStyleClassPrefix
					),
					...getResponsiveMarginStyle( margin ),
					...borderProperty,
				},
			} );

			return (
				<div { ...blockProps }>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];
