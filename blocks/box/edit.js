import classnames from 'classnames';
import {
	InnerBlocks,
	InspectorControls,
	withColors,
	withFontSizes,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { blockClassName } from './config';
import SVGIcon from '@ystdtb/components/svg-icon';
import {
	getBoxBorderRadius,
	isLabelOutside,
	getLabelBorderRadius,
} from './function';
import { getSpacing } from '@ystdtb/helper/spacing';
import * as BlockOption from './inspector-controls';
import StretchTextControl from "@ystdtb/components/stretch-text-control";

function Box( props ) {
	const {
		attributes,
		setAttributes,
		boxBackgroundColor,
		boxTextColor,
		boxBorderColor,
		labelBackgroundColor,
		labelTextColor,
		labelFontSize,
		isSelected,
	} = props;
	const {
		boxStyle,
		boxBorderSize,
		boxBorderStyle,
		boxBorderRadius,
		boxPadding,
		label,
		labelIcon,
		labelWeight,
		labelBorderRadius,
		backgroundImage,
		backgroundImageCoverOpacity,
		backgroundImageRepeat,
	} = attributes;

	let hasLabel = label || labelIcon || isSelected;
	if ( 'label-none' === boxStyle ) {
		hasLabel = false;
	}
	const hasBackgroundImage = !! backgroundImage?.url;

	const blockProps = useBlockProps( {
		className: classnames( blockClassName, `is-box-style--${ boxStyle }` ),
		style: {
			'--ystdtb-box-border-width': boxBorderSize,
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
			'--ystdtb-box-label-font-size': labelFontSize.size,
		},
	} );

	const boxContainerClass = classnames( 'ystdtb-box__inner-container', {
		'has-background': ! hasBackgroundImage && boxBackgroundColor.color,
		'has-border': boxBorderColor.color,
		'show-default-border':
			! boxBorderColor.color && ! boxBackgroundColor.color,
	} );

	const boxContainerStyle = {
		backgroundColor: ! hasBackgroundImage && boxBackgroundColor.color,
		borderColor: boxBorderColor.color,
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

	const boxContentStyle = {
		color: boxTextColor.color,
	};
	const boxContentClass = classnames( 'ystdtb-box__content', {
		'has-text-color': boxTextColor.color,
	} );

	const getLabelContents = () => {
		if ( ! hasLabel ) {
			return;
		}
		const labelClass = classnames( 'ystdtb-box__label', {
			[ `is-label-${ labelWeight }` ]: labelWeight,
			'has-background': labelBackgroundColor.color,
			'has-text-color': labelTextColor.color,
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
			borderBottomLeftRadius: getLabelBorderRadius(
				boxStyle,
				'bottomLeft',
				labelBorderRadius
			),
			borderBottomRightRadius: getLabelBorderRadius(
				boxStyle,
				'bottomRight',
				labelBorderRadius
			),
			backgroundColor: labelBackgroundColor.color,
			color: labelTextColor.color,
		};
		return (
			<div className={ labelClass } style={ labelStyle }>
				<div className="ystdtb-box__label-contents">
					{ labelIcon && (
						<span className="ystdtb-box__label-icon">
							<SVGIcon name={ labelIcon }/>
						</span>
					) }
					{ ( label || isSelected ) && (
						<StretchTextControl
							className="ystdtb-box__label-text"
							value={ label }
							onChange={ ( value ) => {
								setAttributes( { label: value } );
							} }
							placeholder={ __( 'ラベルテキスト...', 'ystandard-toolbox' ) }
						/>
					) }
				</div>
			</div>
		);
	};

	const backgroundClass = classnames( 'ystdtb-box__background' );

	const backgroundStyle = {
		backgroundImage: backgroundImage?.url ? `url('${ backgroundImage.url }')` : undefined,
		backgroundRepeat: backgroundImageRepeat,
		backgroundSize: 'no-repeat' === backgroundImageRepeat ? undefined : 'auto',
	};

	const backgroundCoverClass = classnames(
		'ystdtb-box__background-cover',
		{
			'has-background': hasBackgroundImage && boxBackgroundColor.color,
		}
	);
	const backgroundCoverStyle = {
		backgroundColor: hasBackgroundImage && boxBackgroundColor.color ? boxBackgroundColor.color : undefined,
		opacity: backgroundImageCoverOpacity
	};


	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'タイプ', 'ystandard-toolbox' ) }>
					<BlockOption.BoxType { ...props } />
				</PanelBody>
				<PanelBody title={ __( 'ボックス設定', 'ystandard-toolbox' ) }>
					<BlockOption.BoxBackgroundColor { ...props } />
					<BlockOption.BoxTextColor { ...props } />
					<BlockOption.BoxBorderColor { ...props } />
					<BlockOption.BoxBorderSize { ...props } />
					<BlockOption.BoxBorderStyle { ...props } />
					<BlockOption.BoxBorderRadius { ...props } />
					<BlockOption.BoxPadding { ...props } />
				</PanelBody>
				<PanelBody title={ __( 'ラベル設定', 'ystandard-toolbox' ) }>
					<BlockOption.LabelText { ...props } />
					<BlockOption.LabelIcon { ...props } />
					<BlockOption.LabelSize { ...props } />
					<BlockOption.LabelFontWeight { ...props } />
					<BlockOption.LabelBackgroundColor { ...props } />
					<BlockOption.LabelTextColor { ...props } />
					<BlockOption.LabelBorderRadius { ...props } />
				</PanelBody>
				<PanelBody title={ __( '背景画像', 'ystandard-toolbox' ) }>
					<BlockOption.BackgroundImage { ...props } />
					<BlockOption.BackgroundOpacity { ...props } />
					<BlockOption.BackgroundRepeat { ...props } />
				</PanelBody>
			</InspectorControls>

			<>
				<div { ...blockProps }>
					{ isLabelOutside( boxStyle ) && getLabelContents() }
					<div
						className={ boxContainerClass }
						style={ boxContainerStyle }
					>
						{ ( hasBackgroundImage &&
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
						>
							<InnerBlocks/>
						</div>
					</div>
				</div>
			</>
		</>
	);
}

export default compose( [
	withColors( {
		labelBackgroundColor: 'backgroundColor',
		labelTextColor: 'color',
		boxBackgroundColor: 'backgroundColor',
		boxTextColor: 'color',
		boxBorderColor: 'borderColor',
	} ),
	withFontSizes( 'labelFontSize' ),
] )( Box );
