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
	blockClasses: 'ystdtb-dd-simple',
	responsiveStyleClassPrefix: 'dd-simple',
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
			let newMargin;
			if ( isResponsiveObject( margin ) ) {
				newMargin = undefined;
			} else {
				newMargin = margin?.desktop || margin;
			}
			// Padding変換.
			let newPadding;
			if ( isResponsiveObject( padding ) ) {
				newPadding = undefined;
			} else {
				newPadding = padding?.desktop || padding;
			}

			return {
				...rest,
				margin: newMargin,
				responsiveMargin: isResponsiveObject( margin )
					? margin
					: undefined,
				padding: newPadding,
				responsivePadding: isResponsiveObject( padding )
					? padding
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
