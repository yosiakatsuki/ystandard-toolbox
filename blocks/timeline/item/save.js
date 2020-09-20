import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	getFontSizeClass,
} from '@wordpress/block-editor';
import SVGIcon from '../../../src/js/blocks/component/svg-icon';

export default function ( { attributes } ) {
	const {
		labelType,
		labelContents,
		labelBold,
		labelBorderSize,
		labelBorderRadius,
		contentsInnerMargin,
		contentMarginTop,
		labelColor,
		customLabelColor,
		labelBackgroundColor,
		customLabelBackgroundColor,
		labelBorderColor,
		customLabelBorderColor,
		contentsBorderColor,
		customContentsBorderColor,
		labelFontSize,
		customLabelFontSize,
		className,
	} = attributes;

	const selectLabelType = undefined === labelType ? '' : labelType;
	const selectContentsInnerMargin =
		undefined === contentsInnerMargin ? 'normal' : contentsInnerMargin;

	const labelColorClass = getColorClassName( 'color', labelColor );
	const labelBackgroundColorClass = getColorClassName(
		'background-color',
		labelBackgroundColor
	);
	const labelBorderColorClass = getColorClassName(
		'border-color',
		labelBorderColor
	);
	const contentsBorderColorClass = getColorClassName(
		'border-color',
		contentsBorderColor
	);
	const labelFontSizeClass = getFontSizeClass( labelFontSize );

	const classes = classnames( 'ystdtb-timeline-item', className, {
		[ `is-margin-${ selectContentsInnerMargin }` ]:
			'normal' !== selectContentsInnerMargin,
		[ `has-${ selectLabelType }` ]: '' !== selectLabelType,
		'has-border': contentsBorderColor || customContentsBorderColor,
		[ contentsBorderColorClass ]: contentsBorderColorClass,
	} );
	const timelineStyle = {
		borderColor: contentsBorderColorClass
			? undefined
			: customContentsBorderColor,
	};

	const labelClasses = classnames( 'ystdtb-timeline__label', {
		[ `has-${ selectLabelType }` ]: '' !== selectLabelType,
		'has-long-text':
			'text' === selectLabelType &&
			undefined !== labelContents &&
			1 < labelContents.length,
		[ labelFontSizeClass ]: labelFontSizeClass,
		'has-text-color': labelColor || customLabelColor,
		[ labelColorClass ]: labelColorClass,
		'has-background': labelBackgroundColor || customLabelBackgroundColor,
		[ labelBackgroundColorClass ]: labelBackgroundColorClass,
		'has-border': labelBorderColor || customLabelBorderColor,
		[ labelBorderColorClass ]: labelBorderColorClass,
	} );
	const labelStyles = {
		fontSize: labelFontSizeClass ? undefined : customLabelFontSize,
		fontWeight: labelBold ? 700 : undefined,
		color: labelColorClass ? undefined : customLabelColor,
		backgroundColor: labelBackgroundColorClass
			? undefined
			: customLabelBackgroundColor,
		borderColor: labelBorderColorClass ? undefined : customLabelBorderColor,
		borderRadius: labelBorderRadius ? labelBorderRadius + 'px' : undefined,
		borderWidth: labelBorderSize ? labelBorderSize + 'px' : undefined,
		borderStyle: labelBorderSize ? 'solid' : undefined,
	};

	const contentsClass = classnames( 'ystdtb-timeline__contents', {
		[ `is-margin-${ selectContentsInnerMargin }` ]: selectContentsInnerMargin,
	} );
	const contentMarginTopCalc = 0 > contentMarginTop ? '-' : '+';
	const contentsStyle = {
		marginTop: contentMarginTop
			? `calc(-1.3em ${ contentMarginTopCalc } ${ Math.abs(
					contentMarginTop
			  ) }px)`
			: undefined,
	};

	const getLabelContents = () => {
		const labelContentsClasses = classnames( {
			'ystdtb-timeline__label-text': 'text' === selectLabelType,
			'ystdtb-timeline__label-icon': 'icon' === selectLabelType,
		} );
		if ( 'text' === selectLabelType ) {
			return (
				<span className={ labelContentsClasses }>
					{ labelContents }
				</span>
			);
		}
		if ( 'icon' === selectLabelType ) {
			return (
				<span className={ labelContentsClasses }>
					<SVGIcon name={ labelContents } />
				</span>
			);
		}
	};

	return (
		<div className={ classes } style={ timelineStyle }>
			<div className={ labelClasses } style={ labelStyles }>
				{ getLabelContents() }
			</div>
			<div className={ contentsClass } style={ contentsStyle }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
