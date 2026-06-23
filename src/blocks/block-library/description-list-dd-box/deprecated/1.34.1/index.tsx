import classnames from 'classnames';
/**
 * WordPress
 */
import {
	InnerBlocks,
	getColorClassName,
	// @ts-ignore.
	__experimentalGetGradientClass,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	getResponsivePaddingStyle,
	getResponsiveMarginStyle,
	getBackGroundStyle,
} from './utils';

const config = {
	blockClasses: 'ystdtb-dd-box',
	responsiveStyleClassPrefix: 'dd-box',
};

function isResponsiveObject( value: any ): boolean {
	return (
		typeof value === 'object' && ( 'tablet' in value || 'mobile' in value )
	);
}

// @ts-ignore.
export const deprecated1341 = [
	{
		attributes: {
			backgroundColor: {
				type: 'string',
			},
			customBackgroundColor: {
				type: 'string',
			},
			gradient: {
				type: 'string',
			},
			customGradient: {
				type: 'string',
			},
			textColor: {
				type: 'string',
			},
			customTextColor: {
				type: 'string',
			},
			padding: {
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
			reusable: false,
		},
		migrate: ( attributes: any ) => {
			const { margin, padding, ...rest } = attributes;

			// Margin変換.
			let newMargin = {};
			if ( isResponsiveObject( margin ) ) {
				newMargin = {
					desktop: {
						top: margin.desktop?.top,
						bottom: margin.desktop?.bottom,
					},
					tablet: {
						top: margin.tablet?.top,
						bottom: margin.tablet?.bottom,
					},
					mobile: {
						top: margin.mobile?.top,
						bottom: margin.mobile?.bottom,
					},
				};
			} else {
				newMargin = {
					top: margin?.desktop?.top,
					bottom: margin?.desktop?.bottom,
				};
			}
			// Padding変換.
			let newPadding = {};
			if ( isResponsiveObject( padding ) ) {
				newPadding = {
					desktop: {
						top: padding.desktop?.top,
						bottom: padding.desktop?.bottom,
					},
					tablet: {
						top: padding.tablet?.top,
						bottom: padding.tablet?.bottom,
					},
					mobile: {
						top: padding.mobile?.top,
						bottom: padding.mobile?.bottom,
					},
				};
			} else {
				newPadding = {
					top: padding?.desktop?.top,
					bottom: padding?.desktop?.bottom,
				};
			}

			return {
				...rest,
				margin: ! isResponsiveObject( margin ) ? newMargin : undefined,
				responsiveMargin: isResponsiveObject( margin )
					? newMargin
					: undefined,
				padding: ! isResponsiveObject( padding )
					? newPadding
					: undefined,
				responsivePadding: isResponsiveObject( padding )
					? newPadding
					: undefined,
			};
		},
		save( { attributes }: { attributes: any } ) {
			const {
				padding,
				margin,
				backgroundColor,
				customBackgroundColor,
				gradient,
				customGradient,
				textColor,
				customTextColor,
			} = attributes;

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
			const colorClasses = {
				backgroundColor:
					getColorClassName( 'background-color', backgroundColor ) ??
					'',
				gradient: __experimentalGetGradientClass( gradient ) ?? '',
				text: getColorClassName( 'color', textColor ) ?? '',
			};

			const blockProps = useBlockProps.save( {
				className: classnames( config.blockClasses, {
					[ hasClasses.background ]:
						backgroundColor ||
						customBackgroundColor ||
						gradient ||
						customGradient,
					[ colorClasses.backgroundColor ]:
						colorClasses.backgroundColor,
					[ hasClasses.textColor ]: textColor || customTextColor,
					[ colorClasses.text ]: colorClasses.text,
					[ hasClasses.backgroundGradient ]:
						gradient || customGradient,
					[ colorClasses.gradient ]: colorClasses.gradient,
					[ hasClasses.padding ]:
						getResponsivePaddingStyle( padding ),
					[ hasClasses.margin ]: getResponsiveMarginStyle( margin ),
				} ),
				style: {
					background: getBackGroundStyle(
						customBackgroundColor,
						customGradient
					),
					color: customTextColor,
					...getResponsivePaddingStyle( padding ),
					...getResponsiveMarginStyle( margin ),
				},
			} );

			return (
				<dd { ...blockProps }>
					<InnerBlocks.Content />
				</dd>
			);
		},
	},
];
