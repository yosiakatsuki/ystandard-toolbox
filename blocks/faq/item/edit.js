import classnames from 'classnames';
import {
	template,
	faqBorderTypes,
	designPreset,
	labelPositions,
} from './config';
import {
	InnerBlocks,
	InspectorControls,
	withColors,
	FontSizePicker,
	withFontSizes,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	RangeControl,
	Button,
	ToggleControl,
	ColorPalette,
} from '@wordpress/components';
import { select } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { ChevronDown } from 'react-feather';

function FAQItem( props ) {
	const {
		className,
		isSelected,
		attributes,
		setAttributes,
		faqTextColor,
		setFaqTextColor,
		faqBackgroundColor,
		setFaqBackgroundColor,
		faqBorderColor,
		setFaqBorderColor,
		labelSize,
		setLabelSize,
		labelColor,
		setLabelColor,
		labelBackgroundColor,
		setLabelBackgroundColor,
		labelBorderColor,
		setLabelBorderColor,
	} = props;

	const {
		faqType,
		faqBorderType,
		faqBorderSize,
		labelPosition,
		labelBold,
		labelBorderSize,
		labelBorderRadius,
		accordionArrowColor,
		customAccordionArrowColor,
	} = attributes;

	const { colors } = select( 'core/block-editor' ).getSettings();

	const itemClasses = classnames( 'ystdtb-faq-item', className, {
		[ `is-faq--${ faqType }` ]: faqType,
		[ `has-border-${ faqBorderType }` ]: '' !== faqBorderType,
		'has-background': faqBackgroundColor.color,
	} );
	const itemStyles = {
		backgroundColor: faqBackgroundColor.color,
		borderColor: faqBorderColor.color,
		borderWidth: faqBorderSize,
		alignItems: labelPosition,
	};

	const labelClasses = classnames( 'ystdtb-faq-item__label', {
		'has-padding':
			labelBackgroundColor.color ||
			labelBorderColor.color ||
			labelBorderSize,
	} );
	const labelStyles = {
		fontSize: labelSize.size,
		fontWeight: labelBold ? undefined : 400,
		color: labelColor.color,
		backgroundColor: labelBackgroundColor.color,
		borderColor: labelBorderColor.color,
		borderWidth: labelBorderSize,
		borderRadius: labelBorderRadius,
	};

	const labelTextClasses = classnames( 'ystdtb-faq-item__label-text', {} );

	const contentsClasses = classnames( 'ystdtb-faq-item__contents', {
		'has-text-color': faqTextColor.color,
	} );

	const contentsStyles = {
		color: faqTextColor.color,
	};

	const accordionArrowColorClass = getColorClassName(
		'color',
		accordionArrowColor
	);
	const accordionArrowClass = classnames( 'ystdtb-faq-item__arrow', {
		'has-text-color': accordionArrowColorClass || customAccordionArrowColor,
		[ accordionArrowColorClass ]: accordionArrowColorClass,
	} );
	const accordionArrowStyle = {
		color: accordionArrowColorClass ? undefined : customAccordionArrowColor,
	};

	const blockProps = useBlockProps( {
		className: classnames( 'ystdtb-faq-item-wrap', {
			[ `is-faq--${ faqType }` ]: faqType,
		} ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'デザインサンプル', 'ystandard-toolbox' ) }
					initialOpen={ false }
				>
					<BaseControl id={ 'sample-design' }>
						<div>
							{ designPreset.map( ( item ) => {
								return (
									<Button
										className={ 'ystdtb__shadow-button' }
										key={ item.name }
										onClick={ () => {
											setAttributes( {
												...item.attributes,
												...{
													faqBackgroundColor:
														setFaqBackgroundColor(
															item.attributes
																.faqBackgroundColor
														),
													faqBorderColor:
														setFaqBorderColor(
															item.attributes
																.faqBorderColor
														),
													labelSize: setLabelSize(
														item.attributes
															.labelSize
													),
													labelColor: setLabelColor(
														item.attributes
															.labelColor
													),
													labelBackgroundColor:
														setLabelBackgroundColor(
															item.attributes
																.labelBackgroundColor
														),
													labelBorderColor:
														setLabelBorderColor(
															item.attributes
																.labelBorderColor
														),
													accordionArrowColor:
														item.attributes
															.labelColor,
												},
											} );
										} }
									>
										<span
											className={
												'ystdtb-faq__design-sample-content'
											}
											style={ {
												width: '100%',
												alignItems: 'center',
												...item.itemStyles,
											} }
										>
											<span
												style={ {
													textTransform: 'uppercase',
													marginRight: '1em',
													...item.labelStyles,
												} }
											>
												{ faqType }
											</span>
											<span
												style={ {
													flexGrow: 1,
													textAlign: 'left',
													color: '#222222',
												} }
											>
												FAQ FAQ FAQ...
											</span>
										</span>
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
				</PanelBody>
				<PanelBody title={ __( 'FAQラベル', 'ystandard-toolbox' ) }>
					<BaseControl
						id={ 'label-position' }
						label={ __( 'ラベル表示位置', 'ystandard-toolbox' ) }
					>
						<div className="ystdtb__horizon-buttons">
							{ labelPositions.map( ( item ) => {
								return (
									<Button
										key={ item.name }
										isSecondary={
											labelPosition !== item.name
										}
										isPrimary={
											labelPosition === item.name
										}
										onClick={ () => {
											setAttributes( {
												labelPosition: item.name,
											} );
										} }
									>
										<span>{ item.label }</span>
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
					<BaseControl
						id={ 'label-size' }
						label={ __( 'ラベルサイズ', 'ystandard-toolbox' ) }
					>
						<FontSizePicker
							value={ labelSize.size }
							onChange={ ( font ) => {
								setLabelSize( font );
							} }
							__nextHasNoMarginBottom
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-contents-weight' }
						label={ __( '文字の太さ', 'ystandard-toolbox' ) }
					>
						<ToggleControl
							label={ __( '太字にする', 'ystandard-toolbox' ) }
							onChange={ () => {
								setAttributes( {
									labelBold: ! labelBold,
								} );
							} }
							checked={ labelBold }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-color' }
						label={ __( '文字色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setLabelColor( color );
							} }
							value={ labelColor.color }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-color' }
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
						id={ 'label-border-radius' }
						label={ __( '角丸', 'ystandard-toolbox' ) }
					>
						<RangeControl
							value={
								undefined === labelBorderRadius
									? 0
									: labelBorderRadius
							}
							onChange={ ( value ) =>
								setAttributes( { labelBorderRadius: value } )
							}
							min={ 0 }
							max={ 100 }
							step={ 1 }
							allowReset={ true }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-border-size' }
						label={ __( '枠線サイズ', 'ystandard-toolbox' ) }
					>
						<RangeControl
							value={
								undefined === labelBorderSize
									? 0
									: labelBorderSize
							}
							onChange={ ( value ) =>
								setAttributes( { labelBorderSize: value } )
							}
							min={ 0 }
							max={ 10 }
							step={ 1 }
							allowReset={ true }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-border-color' }
						label={ __( '枠線の色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setLabelBorderColor( color );
							} }
							value={ labelBorderColor.color }
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={ __( 'FAQコンテンツ', 'ystandard-toolbox' ) }>
					<BaseControl
						id={ 'basic-background-color' }
						label={ __( '文字色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setFaqTextColor( color );
							} }
							value={ faqTextColor.color }
						/>
					</BaseControl>
					<BaseControl
						id={ 'basic-background-color' }
						label={ __( '背景色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setFaqBackgroundColor( color );
							} }
							value={ faqBackgroundColor.color }
						/>
					</BaseControl>
					<BaseControl
						id={ 'basic-border-type' }
						label={ __( '枠線タイプ', 'ystandard-toolbox' ) }
					>
						<div className="ystdtb__horizon-buttons">
							{ faqBorderTypes.map( ( item ) => {
								return (
									<Button
										key={ item.name }
										isSecondary={
											faqBorderType !== item.name
										}
										isPrimary={
											faqBorderType === item.name
										}
										onClick={ () => {
											setAttributes( {
												faqBorderType: item.name,
											} );
											if ( '' !== item.name ) {
												setAttributes( {
													faqBorderSize: 0,
												} );
												setFaqBorderColor( undefined );
											} else {
												setAttributes( {
													faqBorderSize: 1,
												} );
												setFaqBorderColor( '#eeeeee' );
											}
										} }
									>
										<span>{ item.label }</span>
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
					{ '' !== faqBorderType && (
						<>
							<BaseControl
								id={ 'basic-border-size' }
								label={ __(
									'枠線サイズ',
									'ystandard-toolbox'
								) }
							>
								<RangeControl
									value={
										undefined === faqBorderSize
											? 0
											: faqBorderSize
									}
									onChange={ ( value ) =>
										setAttributes( {
											faqBorderSize: value,
										} )
									}
									min={ 0 }
									max={ 10 }
									step={ 1 }
									allowReset={ true }
								/>
							</BaseControl>
							<BaseControl
								id={ 'basic-border-color' }
								label={ __( '枠線の色', 'ystandard-toolbox' ) }
							>
								<ColorPalette
									colors={ colors }
									disableCustomColors={ false }
									onChange={ ( color ) => {
										setFaqBorderColor( color );
									} }
									value={ faqBorderColor.color }
								/>
							</BaseControl>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ itemClasses } style={ itemStyles }>
					<div className={ labelClasses } style={ labelStyles }>
						<span className={ labelTextClasses }>{ faqType }</span>
					</div>
					<div className={ contentsClasses } style={ contentsStyles }>
						<InnerBlocks
							templateLock={ false }
							template={ template }
							renderAppender={
								isSelected
									? InnerBlocks.ButtonBlockAppender
									: false
							}
						/>
					</div>
					{ 'q' === faqType && (
						<div
							className={ accordionArrowClass }
							style={ accordionArrowStyle }
						>
							<ChevronDown />
						</div>
					) }
				</div>
			</div>
		</>
	);
}

export default compose( [
	withColors( {
		faqTextColor: 'color',
		faqBackgroundColor: 'backgroundColor',
		faqBorderColor: 'borderColor',
		labelColor: 'color',
		labelBackgroundColor: 'backgroundColor',
		labelBorderColor: 'borderColor',
	} ),
	withFontSizes( 'labelSize' ),
] )( FAQItem );
