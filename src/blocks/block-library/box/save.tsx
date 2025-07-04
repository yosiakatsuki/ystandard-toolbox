import classnames from 'classnames';

/*
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	getColorClassName,
	getFontSizeClass,
	useBlockProps,
} from '@wordpress/block-editor';

/*
 * Aktk Dependencies
 */
import SVGIcon from '@aktk/components/svg-icon';
import { getSpacing } from '@aktk/helper/spacing';
import getDataFallbackProperty from '@aktk/helper/fallback';

/*
 * Plugin Dependencies
 */
import { blockClassName } from './utils';
import {
	getBoxBorderRadius,
	isLabelOutside,
	getLabelBorderRadius,
} from './function';
import { BoxSaveProps } from './types';

/**
 * ボックスブロック保存コンポーネント
 */
export default function save( { attributes }: BoxSaveProps ) {
	const {
		boxStyle,
		boxBackgroundColor,
		customBoxBackgroundColor,
		boxTextColor,
		customBoxTextColor,
		boxBorderColor,
		customBoxBorderColor,
		boxBorderSize,
		boxBorderStyle,
		boxBorderRadius,
		boxPadding,
		label,
		labelIcon,
		labelFontSize,
		labelWeight,
		customLabelFontSize,
		labelBackgroundColor,
		customLabelBackgroundColor,
		labelTextColor,
		customLabelTextColor,
		labelBorderRadius,
		backgroundImage,
		backgroundImageCoverOpacity,
		backgroundImageRepeat,
	} = attributes;

	const hasBackgroundImage = !! backgroundImage?.url;

	const colorClass = {
		boxBackgroundColor: getColorClassName(
			'background-color',
			boxBackgroundColor
		),
		boxTextColor: getColorClassName( 'color', boxTextColor ),
		boxBorderColor: getColorClassName( 'border-color', boxBorderColor ),
		labelBackgroundColor: getColorClassName(
			'background-color',
			labelBackgroundColor
		),
		labelTextColor: getColorClassName( 'color', labelTextColor ),
	};

	let hasLabel = label || labelIcon;
	if ( 'label-none' === boxStyle ) {
		hasLabel = false;
	}
	const labelFontSizeClass = getFontSizeClass( labelFontSize );

	const labelFontSizeValue =
		undefined === customLabelFontSize ? '0.9em' : customLabelFontSize;

	const blockProps = useBlockProps.save( {
		className: classnames( blockClassName, `is-box-style--${ boxStyle }` ),
		style: {
			'--ystdtb-box-border-width': boxBorderSize || undefined,
			'--ystdtb-box-padding-top': getSpacing(
				boxPadding,
				'top',
				'desktop'
			),
			'--ystdtb-box-padding-right': getSpacing(
				boxPadding,
				'right',
				'desktop'
			),
			'--ystdtb-box-padding-bottom': getSpacing(
				boxPadding,
				'bottom',
				'desktop'
			),
			'--ystdtb-box-padding-left': getSpacing(
				boxPadding,
				'left',
				'desktop'
			),
			'--ystdtb-box-padding-top-tablet': getSpacing(
				boxPadding,
				'top',
				'tablet'
			),
			'--ystdtb-box-padding-right-tablet': getSpacing(
				boxPadding,
				'right',
				'tablet'
			),
			'--ystdtb-box-padding-bottom-tablet': getSpacing(
				boxPadding,
				'bottom',
				'tablet'
			),
			'--ystdtb-box-padding-left-tablet': getSpacing(
				boxPadding,
				'left',
				'tablet'
			),
			'--ystdtb-box-padding-top-mobile': getSpacing(
				boxPadding,
				'top',
				'mobile'
			),
			'--ystdtb-box-padding-right-mobile': getSpacing(
				boxPadding,
				'right',
				'mobile'
			),
			'--ystdtb-box-padding-bottom-mobile': getSpacing(
				boxPadding,
				'bottom',
				'mobile'
			),
			'--ystdtb-box-padding-left-mobile': getSpacing(
				boxPadding,
				'left',
				'mobile'
			),
			'--ystdtb-box-label-font-size':
				! labelFontSizeClass && labelFontSizeValue
					? labelFontSizeValue
					: undefined,
		},
	} );

	const boxContainerClass = classnames( 'ystdtb-box__inner-container', {
		[ colorClass.boxBackgroundColor ]: colorClass.boxBackgroundColor,
		'has-background':
			colorClass.boxBackgroundColor || customBoxBackgroundColor,
		[ colorClass.boxBorderColor ]: colorClass.boxBorderColor,
		'has-border': colorClass.boxBorderColor || customBoxBorderColor,
		'has-border-color': colorClass.boxBorderColor || customBoxBorderColor,
		'show-default-border':
			! ( colorClass.boxBackgroundColor || customBoxBackgroundColor ) &&
			! ( colorClass.boxBorderColor || customBoxBorderColor ),
	} );

	const boxBorderColorStyle = colorClass.boxBorderColor
		? undefined
		: customBoxBorderColor;

	const boxContainerStyle = {
		backgroundColor: colorClass.boxBackgroundColor
			? undefined
			: customBoxBackgroundColor,
		borderColor: boxBorderColorStyle,
		borderStyle: boxBorderStyle,
		borderTopLeftRadius: getBoxBorderRadius(
			boxStyle,
			'topLeft',
			boxBorderRadius,
			hasLabel
		),
		borderTopRightRadius: getBoxBorderRadius(
			boxStyle,
			'topRight',
			boxBorderRadius,
			hasLabel
		),
		borderBottomRightRadius: getBoxBorderRadius(
			boxStyle,
			'bottomRight',
			boxBorderRadius,
			hasLabel
		),
		borderBottomLeftRadius: getBoxBorderRadius(
			boxStyle,
			'bottomLeft',
			boxBorderRadius,
			hasLabel
		),
	};
	const boxContainerData = {
		...getDataFallbackProperty( {
			'border-width': '' === boxBorderSize ? 0 : boxBorderSize,
		} ),
	};

	const boxContentClass = classnames( 'ystdtb-box__content', {
		[ colorClass.boxTextColor ]: colorClass.boxTextColor,
		'has-text-color': colorClass.boxTextColor || customBoxTextColor,
	} );
	const boxContentStyle = {
		color: colorClass.boxTextColor ? undefined : customBoxTextColor,
	};
	const boxContentData = {
		...getDataFallbackProperty( {
			'border-width': '' === boxBorderSize ? 0 : boxBorderSize,
			'padding-top': getSpacing( boxPadding, 'top', 'desktop' ),
			'padding-right': getSpacing( boxPadding, 'right', 'desktop' ),
			'padding-bottom': getSpacing( boxPadding, 'bottom', 'desktop' ),
			'padding-left': getSpacing( boxPadding, 'left', 'desktop' ),
		} ),
	};

	const getLabelContents = () => {
		if ( ! hasLabel ) {
			return;
		}
		const labelClass = classnames( 'ystdtb-box__label', {
			[ labelFontSizeClass ]: labelFontSizeClass,
			'has-font-size-class': labelFontSizeClass,
			[ colorClass.labelBackgroundColor ]:
				colorClass.labelBackgroundColor,
			'has-background':
				colorClass.labelBackgroundColor || customLabelBackgroundColor,
			[ colorClass.labelTextColor ]: colorClass.labelTextColor,
			'has-text-color': colorClass.labelTextColor || customLabelTextColor,
			'has-font-size': false,
			[ `is-label-${ labelWeight }` ]: labelWeight,
		} );
		const labelStyle = {
			borderTopLeftRadius: getLabelBorderRadius(
				boxStyle,
				'topLeft',
				labelBorderRadius
			),
			borderTopRightRadius: getLabelBorderRadius(
				boxStyle,
				'topRight',
				labelBorderRadius
			),
			borderBottomRightRadius: getLabelBorderRadius(
				boxStyle,
				'bottomRight',
				labelBorderRadius
			),
			backgroundColor: colorClass.labelBackgroundColor
				? undefined
				: customLabelBackgroundColor,
			color: colorClass.labelTextColor ? undefined : customLabelTextColor,
		};
		return (
			<div className={ labelClass } style={ labelStyle }>
				<div className="ystdtb-box__label-contents">
					{ labelIcon && (
						<span className="ystdtb-box__label-icon">
							<SVGIcon name={ labelIcon } />
						</span>
					) }
					{ label && (
						<span className="ystdtb-box__label-text">
							{ label }
						</span>
					) }
				</div>
			</div>
		);
	};

	const backgroundClass = classnames( 'ystdtb-box__background' );

	const backgroundStyle = {
		backgroundImage: backgroundImage?.url
			? `url('${ backgroundImage.url }')`
			: undefined,
		backgroundRepeat: backgroundImageRepeat,
		backgroundSize:
			'no-repeat' === backgroundImageRepeat ? undefined : 'auto',
	};

	const backgroundCoverClass = classnames( 'ystdtb-box__background-cover', {
		[ colorClass.boxBackgroundColor ]:
			hasBackgroundImage && colorClass.boxBackgroundColor,
		'has-background':
			hasBackgroundImage &&
			( colorClass.boxBackgroundColor || customBoxBackgroundColor ),
	} );
	const backgroundCoverStyle = {
		backgroundColor:
			hasBackgroundImage && colorClass.boxBackgroundColor
				? undefined
				: customBoxBackgroundColor,
		opacity: backgroundImageCoverOpacity,
	};

	return (
		<div { ...blockProps }>
			{ isLabelOutside( boxStyle ) && getLabelContents() }
			<div
				className={ boxContainerClass }
				style={ boxContainerStyle }
				{ ...boxContainerData }
			>
				{ hasBackgroundImage && (
					<div
						className={ backgroundClass }
						style={ backgroundStyle }
						aria-hidden="true"
					>
						<div
							className={ backgroundCoverClass }
							style={ backgroundCoverStyle }
						/>
					</div>
				) }
				{ ! isLabelOutside( boxStyle ) && getLabelContents() }
				<div
					className={ boxContentClass }
					style={ boxContentStyle }
					{ ...boxContentData }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
