import classnames from 'classnames';
import { template, faqBorderTypes, designPreset } from './config';
import {
	InnerBlocks,
	InspectorControls,
	withColors,
	FontSizePicker,
	withFontSizes,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	RangeControl,
	Button,
	ToggleControl,
	ColorPalette,
} from '@wordpress/components';
import { withSelect, select } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

function faqItem( props ) {
	const {
		className,
		attributes,
		setAttributes,
		hasChildBlocks,
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
		labelBold,
		labelBorderSize,
		labelBorderRadius,
	} = attributes;

	const { colors } = select( 'core/block-editor' ).getSettings();

	const itemClasses = classnames(
		'ystdtb-faq-item', className,
		{
			[ `is-faq--${ faqType }` ]: faqType,
			[ `has-border-${ faqBorderType }` ]: '' !== faqBorderType,
			'has-background': faqBackgroundColor.color,
		}
	);
	const itemStyles = {
		backgroundColor: faqBackgroundColor.color,
		borderColor: faqBorderColor.color,
		borderWidth: faqBorderSize,
	};

	const labelClasses = classnames(
		'ystdtb-faq-item__label',
		{
			'has-padding': labelBackgroundColor.color || labelBorderColor.color || labelBorderSize,
		}
	);
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

	const contentsClasses = classnames( 'ystdtb-faq-item__contents', {} );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'デザインサンプル', 'ystandard-toolbox' ) }
					initialOpen={ false }
				>
					<BaseControl
						id={ 'sample-design' }
						label={ __( 'デザインサンプル', 'ystandard-toolbox' ) }
					>
						<div className={ 'ystdtb__preset-select-buttons' }>
							{ designPreset.map( ( item ) => {
								return (
									<Button
										key={ item.name }
										isSecondary={ true }
										onClick={ () => {
											setAttributes( {
												...item.attributes,
												...{
													faqBackgroundColor: setFaqBackgroundColor( item.attributes.faqBackgroundColor ),
													faqBorderColor: setFaqBorderColor( item.attributes.faqBorderColor ),
													labelSize: setLabelSize( item.attributes.labelSize ),
													labelColor: setLabelColor( item.attributes.labelColor ),
													labelBackgroundColor: setLabelBackgroundColor( item.attributes.labelBackgroundColor ),
													labelBorderColor: setLabelBorderColor( item.attributes.labelBorderColor ),
												}
											} );
										} }
									>
									<span
										className={ 'is-flex' }
										style={ {
											width: '100%',
											alignItems: 'center',
											...item.itemStyles,
										} }
									>
										<span style={ {
											textTransform: 'uppercase',
											marginRight: '1em',
											...item.labelStyles,
										} }>
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
				<PanelBody
					title={ __( 'FAQラベル', 'ystandard-toolbox' ) }
				>
					<BaseControl
						id={ 'label-size' }
						label={ __( 'ラベルサイズ', 'ystandard-toolbox' ) }
					>
						<FontSizePicker
							value={ labelSize.size }
							onChange={ ( font ) => {
								setLabelSize( font );
							} }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-contents-weight' }
						label={ __( '文字の太さ', 'ystandard-toolbox' ) }
					>
						<ToggleControl
							label={ __( '太字にする', 'ystandard-toolbox' ) }
							onChange={ () => {
								updateChildAttributes( {
									labelBold: ! labelBold,
								} );
								setState( {
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
							value={ undefined === labelBorderRadius ? 0 : labelBorderRadius }
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
							value={ undefined === labelBorderSize ? 0 : labelBorderSize }
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
				<PanelBody
					title={ __( 'FAQコンテンツ', 'ystandard-toolbox' ) }
				>
					<BaseControl
						id={ 'basic-background-color' }
						label={ __( '項目の背景色', 'ystandard-toolbox' ) }
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
						label={ __( '項目の枠線タイプ', 'ystandard-toolbox' ) }
					>
						<div className="ystdtb__horizon-buttons">
							{ faqBorderTypes.map( ( item ) => {
								return (
									<Button
										key={ item.name }
										isSecondary={
											faqBorderType !==
											item.name
										}
										isPrimary={
											faqBorderType ===
											item.name
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
					{ ( '' !== faqBorderType &&
						<>
							<BaseControl
								id={ 'basic-border-size' }
								label={ __( '枠線サイズ', 'ystandard-toolbox' ) }
							>
								<RangeControl
									value={ undefined === faqBorderSize ? 0 : faqBorderSize }
									onChange={ ( value ) =>
										setAttributes( { faqBorderSize: value } )
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

			<Block.div className={
				classnames(
					'ystdtb-faq-item-wrap',
					{
						[ `is-faq--${ faqType }` ]: faqType,
					}
				)
			}>
				<dl className={ itemClasses } style={ itemStyles }>
					<dt className={ labelClasses } style={ labelStyles }>
						<span className={ labelTextClasses }>
							{ faqType }
						</span>
					</dt>
					<dd className={ contentsClasses }>
						<InnerBlocks
							templateLock={ false }
							template={ template }
							renderAppender={
								hasChildBlocks
									? undefined
									: () => <InnerBlocks.ButtonBlockAppender/>
							}
						/>
					</dd>
				</dl>
			</Block.div>
		</Fragment>
	);
}

export default compose( [
	withColors( {
		faqBackgroundColor: 'backgroundColor',
		faqBorderColor: 'borderColor',
		labelColor: 'color',
		labelBackgroundColor: 'backgroundColor',
		labelBorderColor: 'borderColor',
	} ),
	withFontSizes( 'labelSize' ),
	withSelect( ( ownSelect, ownProps ) => {
		const { clientId } = ownProps;
		const { getBlockOrder } = ownSelect( 'core/block-editor' );

		return {
			hasChildBlocks: getBlockOrder( clientId ).length > 0,
		};
	} ),
] )( faqItem );
