import {
	InnerBlocks,
	getColorClassName,
	getFontSizeClass,
	useBlockProps,
} from '@wordpress/block-editor';
import SVGIcon from '@ystdtb/components/svg-icon';
import {
	getBoxBorderRadius,
	isLabelOutside,
	getLabelBorderRadius,
	getPadding,
} from './function';
import classnames from 'classnames';
import { blockClassName } from './config';

export default function save( { attributes } ) {
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
		customLabelFontSize,
		labelBackgroundColor,
		customLabelBackgroundColor,
		labelTextColor,
		customLabelTextColor,
		labelBorderRadius,
	} = attributes;

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

	const hasLabel = label || labelIcon;
	const hasBoxBorder =
		( colorClass.boxBorderColor || customBoxBorderColor ) &&
		boxBorderSize &&
		boxBorderStyle;
	const labelFontSizeClass = getFontSizeClass( labelFontSize );

	const labelFontSizeValue =
		undefined === customLabelFontSize ? '0.9em' : customLabelFontSize;

	const blockProps = useBlockProps.save( {
		className: classnames( blockClassName, `is-box-style--${ boxStyle }` ),
		style: {
			'--ystdtb-box-border-width': hasBoxBorder
				? boxBorderSize
				: undefined,
			'--ystdtb-box-padding-top': getPadding(
				boxPadding,
				'desktop',
				'top'
			),
			'--ystdtb-box-padding-right': getPadding(
				boxPadding,
				'desktop',
				'right'
			),
			'--ystdtb-box-padding-bottom': getPadding(
				boxPadding,
				'desktop',
				'bottom'
			),
			'--ystdtb-box-padding-left': getPadding(
				boxPadding,
				'desktop',
				'left'
			),
			'--ystdtb-box-padding-top-tablet': getPadding(
				boxPadding,
				'tablet',
				'top'
			),
			'--ystdtb-box-padding-right-tablet': getPadding(
				boxPadding,
				'tablet',
				'right'
			),
			'--ystdtb-box-padding-bottom-tablet': getPadding(
				boxPadding,
				'tablet',
				'bottom'
			),
			'--ystdtb-box-padding-left-tablet': getPadding(
				boxPadding,
				'tablet',
				'left'
			),
			'--ystdtb-box-padding-top-mobile': getPadding(
				boxPadding,
				'mobile',
				'top'
			),
			'--ystdtb-box-padding-right-mobile': getPadding(
				boxPadding,
				'mobile',
				'right'
			),
			'--ystdtb-box-padding-bottom-mobile': getPadding(
				boxPadding,
				'mobile',
				'bottom'
			),
			'--ystdtb-box-padding-left-mobile': getPadding(
				boxPadding,
				'mobile',
				'left'
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
		'has-box-border': hasBoxBorder,
	} );

	const boxBorderColorStyle = colorClass.boxBorderColor
		? undefined
		: customBoxBorderColor;

	const boxContainerStyle = {
		backgroundColor: colorClass.boxBackgroundColor
			? undefined
			: customBoxBackgroundColor,
		borderColor: hasBoxBorder ? boxBorderColorStyle : undefined,
		borderStyle: hasBoxBorder ? boxBorderStyle : undefined,
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

	const boxContentClass = classnames( 'ystdtb-box__content', {
		[ colorClass.boxTextColor ]: colorClass.boxTextColor,
		'has-text-color': colorClass.boxTextColor || customBoxTextColor,
	} );
	const boxContentStyle = {
		color: colorClass.boxTextColor ? undefined : customBoxTextColor,
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

	return (
		<div { ...blockProps }>
			{ isLabelOutside( boxStyle ) && getLabelContents() }
			<div className={ boxContainerClass } style={ boxContainerStyle }>
				{ ! isLabelOutside( boxStyle ) && getLabelContents() }
				<div className={ boxContentClass } style={ boxContentStyle }>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
