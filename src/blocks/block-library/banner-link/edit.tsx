/*
 * External Dependencies
 */
import classnames from 'classnames';

/*
 * WordPress Dependencies
 */
import {
	RichText,
	withColors,
	useBlockProps,
	__experimentalUseGradient,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';

/*
 * Plugin Dependencies
 */
import { blockClassName, blockClasses } from './utils';
import './style-editor.scss';
import { BannerLinkInspectorControls as InspectorControls } from './inspector-controls';
import { BannerLinkBlockControls as BlockControls } from './block-controls';
import { getBoxShadowStyle } from '@ystd/components/box-shadow-control';
import {
	getBackgroundImage,
	getBackgroundPosition,
	getBlockPositionStyle,
	getContentPositionStyle,
	getCustomProperty,
	getFontSizeStyle,
	getOverlayBackGround,
	getPaddingStyle,
	isClearStyle,
} from './function/style';
import { getRatioClassName, getRatioInnerClassName } from '@ystd/helper/ratio';
import {
	getBorderColorClass,
	getBorderStyle,
} from '@ystd/controls/border-control';
import { getFontSizeClassByObject } from '@ystd/helper/fontSize';
import { getComponentConfig } from '@ystd/helper/config';

const BannerLink = ( props ) => {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		mainTextColor,
		subTextColor,
	} = props;

	const {
		className,
		backgroundImage,
		backgroundImageFocalPoint,
		backgroundOpacity,
		ratio,
		size,
		borderRadius,
		border,
		mainText,
		mainTextFontSize,
		mainTextLineHeight,
		mainTextLetterSpacing,
		mainTextHtml,
		mainTextStyleClear,
		subText,
		subTextFontSize,
		subTextLineHeight,
		subTextLetterSpacing,
		subTextHtml,
		subTextStyleClear,
		subTextMargin,
		boxShadow,
		padding,
		contentPosition,
		blockPosition,
	} = attributes;

	const { gradientClass, gradientValue } = __experimentalUseGradient();
	const clearStyle = getComponentConfig( 'headingClearStyle' );

	const fontSizeClasses = {
		mainText: getFontSizeClassByObject( mainTextFontSize?.desktop ),
		subText: getFontSizeClassByObject( subTextFontSize?.desktop ),
	};

	const wrapProps = useBlockProps( {} );
	wrapProps.className = wrapProps.className.replace( className, '' );

	/**
	 * Block
	 */
	const blockProps = {
		className: classnames( blockClassName, getRatioClassName( ratio ), {} ),
		style: {
			backgroundImage: getBackgroundImage( backgroundImage ),
			backgroundPosition: getBackgroundPosition(
				backgroundImageFocalPoint
			),
			...getBoxShadowStyle( boxShadow ),
			...getCustomProperty( 'max-width', size?.maxWidth ),
			...getCustomProperty( 'min-height', size?.minHeight ),
			borderRadius: borderRadius || undefined,
			...getBlockPositionStyle( blockPosition ),
		},
	};

	/**
	 * Container
	 */
	const containerProps = {
		className: classnames(
			blockClasses.container,
			getRatioInnerClassName( ratio ),
			{
				'has-padding': getPaddingStyle( padding ),
			}
		),
		style: {
			...getPaddingStyle( padding ),
			...getContentPositionStyle( contentPosition ),
		},
	};
	/**
	 * Overlay
	 */
	const hasOverlayBackground =
		backgroundImage || backgroundColor || gradientClass || gradientValue;
	const overlayBackgroundProps = {
		className: classnames( blockClasses.overlayBackground, {
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
			'has-background-gradient': gradientValue,
			[ gradientClass ]: gradientClass,
		} ),
		style: {
			background: getOverlayBackGround(
				backgroundColor.color,
				gradientValue
			),
			opacity: backgroundOpacity,
			borderRadius: borderRadius || undefined,
		},
		'aria-hidden': true,
	};
	const borderColorClass = getBorderColorClass( border?.color );
	const hasOverlayBorder = borderColorClass || border;
	const overlayBorderProps = {
		className: classnames( blockClasses.overlayBorder, {
			'has-border': hasOverlayBorder,
			[ borderColorClass ]: borderColorClass,
		} ),
		style: {
			borderRadius: borderRadius || undefined,
			...getBorderStyle( border ),
		},
		'aria-hidden': true,
	};
	/**
	 * Text
	 */
	const textWrapProps = {
		className: classnames( blockClasses.text, {} ),
	};
	/**
	 * Main Text
	 */
	const mainTextClass = classnames( blockClasses.mainText, {
		'has-font-size': mainTextFontSize,
		[ fontSizeClasses.mainText ]: fontSizeClasses.mainText,
		[ clearStyle ]: isClearStyle( mainTextHtml, mainTextStyleClear ),
	} );
	const mainTextStyles = {
		color: mainTextColor.color,
		...getFontSizeStyle( mainTextFontSize, fontSizeClasses.mainText ),
		lineHeight: mainTextLineHeight,
		letterSpacing: mainTextLetterSpacing,
	};
	/**
	 * Sub Text
	 */
	const subTextClass = classnames( blockClasses.subText, {
		'has-margin-top': getCustomProperty( 'margin-top', subTextMargin ),
		'has-font-size': subTextFontSize,
		[ fontSizeClasses.subText ]: fontSizeClasses.subText,
		[ clearStyle ]: isClearStyle( subTextHtml, subTextStyleClear ),
	} );
	const subTextStyles = {
		color: subTextColor.color,
		...getFontSizeStyle( subTextFontSize, fontSizeClasses.subText ),
		lineHeight: subTextLineHeight,
		letterSpacing: subTextLetterSpacing,
		...getCustomProperty( 'margin-top', subTextMargin ),
	};

	return (
		<>
			<BlockControls
				{ ...{
					anchorRef: blockProps.ref,
					...props,
				} }
			/>
			<InspectorControls { ...props } />

			<div { ...wrapProps }>
				<div { ...blockProps }>
					{ hasOverlayBackground && (
						<div { ...overlayBackgroundProps } />
					) }
					{ hasOverlayBorder && <div { ...overlayBorderProps } /> }
					<div { ...containerProps }>
						<div { ...textWrapProps }>
							<RichText
								tagName={ mainTextHtml }
								className={ mainTextClass }
								style={ mainTextStyles }
								value={ mainText }
								onChange={ ( value ) =>
									setAttributes( { mainText: value } )
								}
								identifier="mainText"
								placeholder={ __(
									'メインテキスト',
									'ystandard-toolbox'
								) }
								withoutInteractiveFormatting
							/>
							<RichText
								tagName={ subTextHtml }
								className={ subTextClass }
								style={ subTextStyles }
								value={ subText }
								onChange={ ( value ) =>
									setAttributes( { subText: value } )
								}
								identifier="subText"
								placeholder={ __(
									'サブテキスト',
									'ystandard-toolbox'
								) }
								withoutInteractiveFormatting
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default compose( [
	withColors( {
		backgroundColor: 'background-color',
		mainTextColor: 'color',
		subTextColor: 'color',
	} ),
] )( BannerLink );
