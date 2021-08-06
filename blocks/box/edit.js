import classnames from 'classnames';
import {
	InnerBlocks,
	PlainText,
	InspectorControls,
	withColors,
	FontSizePicker,
	withFontSizes,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	ToggleControl,
	Button,
	ColorPalette,
	SelectControl,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { units, blockClassName, boxStyleList, borderStyles } from './config';
import {
	getResponsiveProperty,
	addResponsiveProperty,
	deleteResponsiveProperty,
} from '@ystdtb/helper/responsive';
import SVGIconSelect from '@ystdtb/components/icon-picker';
import SVGIcon from '@ystdtb/components/svg-icon';
import {
	getBoxBorderRadius,
	isLabelOutside,
	getLabelBorderRadius,
	getPadding,
} from './function';

function Box( props ) {
	const {
		attributes,
		setAttributes,
		boxBackgroundColor,
		setBoxBackgroundColor,
		boxTextColor,
		setBoxTextColor,
		boxBorderColor,
		setBoxBorderColor,
		labelBackgroundColor,
		setLabelBackgroundColor,
		labelTextColor,
		setLabelTextColor,
		labelFontSize,
		setLabelFontSize,
	} = props;
	const {
		boxStyle,
		boxBorderSize,
		boxBorderStyle,
		boxBorderRadius,
		boxPadding,
		isResponsiveBoxPadding,
		label,
		labelIcon,
		labelBorderRadius,
	} = attributes;

	const { colors } = select( 'core/block-editor' ).getSettings();

	const hasLabel = label || labelIcon;
	const hasBorder =
		boxBorderColor.color && '' !== boxBorderSize && boxBorderStyle;

	const blockProps = useBlockProps( {
		className: classnames( blockClassName, `is-box-style--${ boxStyle }` ),
		style: {
			'--ystdtb-box-border-width': hasBorder ? boxBorderSize : undefined,
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
			'--ystdtb-box-label-font-size': labelFontSize.size,
		},
	} );

	const boxContainerClass = classnames( 'ystdtb-box__inner-container', {
		'has-box-border': hasBorder,
	} );

	const boxContainerStyle = {
		backgroundColor: boxBackgroundColor.color,
		borderColor: hasBorder ? boxBorderColor.color : undefined,
		borderStyle: hasBorder ? boxBorderStyle : undefined,
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

	const getLabelContents = () => {
		if ( ! hasLabel ) {
			return;
		}
		const labelClass = classnames( 'ystdtb-box__label' );
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
			backgroundColor: labelBackgroundColor.color,
			color: labelTextColor.color,
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
		<>
			<InspectorControls>
				<PanelBody title={ __( 'タイプ', 'ystandard-toolbox' ) }>
					<div className="ystdtb-box__type-select">
						{ boxStyleList.map( ( item ) => {
							return (
								<Button
									className={ classnames(
										'ystdtb-box__type-button',
										'ystdtb__shadow-button',
										{
											'is-selected':
												boxStyle === item.value,
										}
									) }
									key={ item.value }
									isPrimary={ boxStyle === item.value }
									onClick={ () => {
										setAttributes( {
											boxStyle: item.value,
										} );
									} }
								>
									<span
										className={ classnames(
											'ystdtb-box__type-wrap',
											`is-${ item.value }`
										) }
									>
										<span
											className="ystdtb-box__type-label"
											aria-hidden="true"
										>
											　
										</span>
										<span className="ystdtb-box__type-box">
											<span className="ystdtb-box__type-name">
												{ item.label }
											</span>
										</span>
									</span>
								</Button>
							);
						} ) }
					</div>
				</PanelBody>
				<PanelBody title={ __( 'ボックス設定', 'ystandard-toolbox' ) }>
					<BaseControl
						id={ 'box-background-color' }
						label={ __( '背景色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setBoxBackgroundColor( color );
							} }
							value={ boxBackgroundColor.color }
						/>
					</BaseControl>
					<BaseControl
						id={ 'box-background-color' }
						label={ __( '文字色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setBoxTextColor( color );
							} }
							value={ boxTextColor.color }
						/>
					</BaseControl>
					<BaseControl
						id={ 'box-background-color' }
						label={ __( '枠線色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setBoxBorderColor( color );
							} }
							value={ boxBorderColor.color }
						/>
					</BaseControl>
					<BaseControl>
						<UnitControl
							label={ __( '枠線サイズ', 'ystandard-toolbox' ) }
							value={ boxBorderSize }
							onChange={ ( value ) => {
								setAttributes( {
									boxBorderSize: value,
								} );
							} }
							units={ units }
						/>
					</BaseControl>
					<BaseControl>
						<SelectControl
							label={ __( '枠線スタイル', 'ystandard-toolbox' ) }
							value={ boxBorderStyle }
							options={ borderStyles }
							onChange={ ( value ) => {
								setAttributes( {
									boxBorderStyle: value,
								} );
							} }
						/>
					</BaseControl>
					<BaseControl>
						<UnitControl
							label={ __( '枠線角丸', 'ystandard-toolbox' ) }
							value={ boxBorderRadius }
							onChange={ ( value ) => {
								setAttributes( {
									boxBorderRadius: value,
								} );
							} }
							units={ units }
						/>
					</BaseControl>
					<BaseControl
						id={ 'box-padding' }
						label={ __( '余白設定', 'ystandard-toolbox' ) }
					>
						<BaseControl>
							<BoxControl
								label={ __(
									'ボックス内側余白',
									'ystandard-toolbox'
								) }
								values={ getResponsiveProperty(
									boxPadding,
									'desktop'
								) }
								onChange={ ( nextValues ) => {
									setAttributes( {
										boxPadding: {
											...boxPadding,
											desktop: nextValues,
										},
									} );
								} }
								units={ units }
							/>
							<ToggleControl
								label={ __(
									'タブレット・モバイル設定',
									'ystandard-toolbox'
								) }
								onChange={ ( value ) => {
									let newBoxPadding;
									if ( value ) {
										newBoxPadding = addResponsiveProperty(
											boxPadding
										);
									} else {
										newBoxPadding = deleteResponsiveProperty(
											boxPadding
										);
									}
									setAttributes( {
										isResponsiveBoxPadding: value,
										boxPadding: newBoxPadding,
									} );
								} }
								checked={ isResponsiveBoxPadding }
							/>
						</BaseControl>
						{ isResponsiveBoxPadding && (
							<BaseControl>
								<BoxControl
									label={ __(
										'タブレット',
										'ystandard-toolbox'
									) }
									values={ getResponsiveProperty(
										boxPadding,
										'tablet'
									) }
									onChange={ ( nextValues ) => {
										setAttributes( {
											boxPadding: {
												...boxPadding,
												tablet: nextValues,
											},
										} );
									} }
									units={ units }
								/>
								<BoxControl
									label={ __(
										'モバイル',
										'ystandard-toolbox'
									) }
									values={ getResponsiveProperty(
										boxPadding,
										'mobile'
									) }
									onChange={ ( nextValues ) => {
										setAttributes( {
											boxPadding: {
												...boxPadding,
												mobile: nextValues,
											},
										} );
									} }
									units={ units }
								/>
							</BaseControl>
						) }
					</BaseControl>
				</PanelBody>
				<PanelBody title={ __( 'ラベル設定', 'ystandard-toolbox' ) }>
					<BaseControl
						id={ 'label' }
						label={ __( 'テキスト', 'ystandard-toolbox' ) }
					>
						<PlainText
							value={ label }
							onChange={ ( value ) => {
								setAttributes( {
									label: value,
								} );
							} }
							placeholder={ 'ラベル' }
							aria-label={ 'ラベル' }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-size' }
						label={ __( '文字サイズ', 'ystandard-toolbox' ) }
					>
						<FontSizePicker
							value={ labelFontSize.size }
							onChange={ ( font ) => {
								setLabelFontSize( font );
							} }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-icon' }
						label={ __( 'アイコン', 'ystandard-toolbox' ) }
					>
						<SVGIconSelect
							iconControlTitle={ '' }
							selectedIcon={ labelIcon }
							onClickIcon={ ( value ) => {
								setAttributes( { labelIcon: value } );
							} }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label' }
						label={ __( '背景色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setLabelBackgroundColor( color );
							} }
							value={ labelBackgroundColor.color }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label' }
						label={ __( '文字色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setLabelTextColor( color );
							} }
							value={ labelTextColor.color }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-border-radius' }
						label={ __( '角丸', 'ystandard-toolbox' ) }
					>
						<UnitControl
							value={ labelBorderRadius }
							onChange={ ( value ) => {
								setAttributes( {
									labelBorderRadius: value,
								} );
							} }
							units={ units }
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<>
				<div { ...blockProps }>
					{ isLabelOutside( boxStyle ) && getLabelContents() }
					<div
						className={ boxContainerClass }
						style={ boxContainerStyle }
					>
						{ ! isLabelOutside( boxStyle ) && getLabelContents() }
						<div
							className="ystdtb-box__content"
							style={ boxContentStyle }
						>
							<InnerBlocks />
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
