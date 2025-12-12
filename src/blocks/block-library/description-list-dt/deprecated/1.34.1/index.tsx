import classnames from 'classnames';
/**
 * WordPress
 */
import {
	RichText,
	getColorClassName,
	__experimentalGetGradientClass,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	getResponsiveFontSizeStyle,
	getFontSizeClassByObject,
	getResponsivePaddingStyle,
	getResponsiveMarginStyle,
	getBackGroundStyle,
} from './utils';

const config = {
	blockClasses: 'ystdtb-dt',
	responsiveStyleClassPrefix: 'dt',
};
// @ts-ignore.
export const deprecated1341 = [
	{
		attributes: {
			text: {
				type: 'string',
				source: 'html',
				selector: 'dt',
			},
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
			textSize: {
				type: 'object',
			},
			fontWeight: {
				type: 'string',
			},
			fontStyle: {
				type: 'string',
			},
			lineHeight: {
				type: 'number',
			},
			letterSpacing: {
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
			return {
				...attributes,
			};
		},
		save( { attributes }: { attributes: any } ) {
			const {
				text,
				padding,
				margin,
				backgroundColor,
				customBackgroundColor,
				gradient,
				customGradient,
				textColor,
				customTextColor,
				textSize,
				fontWeight,
				fontStyle,
				lineHeight,
				letterSpacing,
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
			const fontSizeClass = getFontSizeClassByObject( textSize?.desktop );

			const blockProps = useBlockProps.save( {
				className: classnames( config.blockClasses, {
					[ hasClasses.fontSize ]: fontSizeClass,
					[ fontSizeClass ]: fontSizeClass,
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
					...getResponsiveFontSizeStyle( textSize, fontSizeClass ),
					fontWeight: fontWeight || undefined,
					fontStyle: fontStyle || undefined,
					lineHeight: lineHeight || undefined,
					letterSpacing: letterSpacing || undefined,
				},
			} );

			return (
				<dt { ...blockProps }>
					<RichText.Content value={ text } />
				</dt>
			);
		},
	},
];
