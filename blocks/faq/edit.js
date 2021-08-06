import classnames from 'classnames';
import { template, faqBorderTypes } from './config';
import {
	InnerBlocks,
	InspectorControls,
	withColors,
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
import { compose } from '@wordpress/compose';
import { withDispatch, select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { getColorCode, getColorSlug } from '@ystdtb/function/_getColorSlug';

function FAQ( props ) {
	const {
		className,
		attributes,
		setAttributes,
		backgroundColor,
		setBackgroundColor,
		borderColor,
		setBorderColor,
		accordionArrowColor,
		setAccordionArrowColor,
		updateChildAttributes,
	} = props;

	const { isAccordion, borderType, borderSize } = attributes;

	const { colors } = select( 'core/block-editor' ).getSettings();

	const faqClasses = classnames( 'ystdtb-faq', className, {
		'has-padding': 'all' === borderType || backgroundColor.color,
		[ `border-type--${ borderType }` ]: '' !== borderType,
		'is-accordion': isAccordion,
	} );

	const faqStyles = {
		backgroundColor: backgroundColor.color,
		borderColor: borderColor.color,
		borderWidth: 'all' === borderType ? borderSize : undefined,
		borderBottomWidth:
			'bottom' === borderType || 'all' === borderType
				? borderSize
				: undefined,
	};

	const blockProps = useBlockProps( {
		className: classnames( 'ystdtb-faq-wrap' ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'FAQ', 'ystandard-toolbox' ) }>
					<BaseControl
						id={ 'accordion' }
						label={ __( '開閉設定', 'ystandard-toolbox' ) }
					>
						<ToggleControl
							label={ __( '開閉式にする', 'ystandard-toolbox' ) }
							onChange={ () => {
								setAttributes( {
									isAccordion: ! isAccordion,
								} );
							} }
							checked={ isAccordion }
						/>
					</BaseControl>
					{ isAccordion && (
						<BaseControl
							id={ 'accordion-arrow-color' }
							label={ __(
								'開閉ボタンの色',
								'ystandard-toolbox'
							) }
						>
							<ColorPalette
								colors={ colors }
								disableCustomColors={ false }
								onChange={ ( color ) => {
									setAccordionArrowColor( color );
									updateChildAttributes( {
										accordionArrowColor: getColorSlug(
											color
										),
										customAccordionArrowColor: getColorCode(
											color
										),
									} );
								} }
								value={ accordionArrowColor.color }
							/>
						</BaseControl>
					) }
					<BaseControl
						id={ 'background-color' }
						label={ __( '背景色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setBackgroundColor( color );
							} }
							value={ backgroundColor.color }
						/>
					</BaseControl>
					<BaseControl
						id={ 'border-type' }
						label={ __( '枠線タイプ', 'ystandard-toolbox' ) }
					>
						<div className="ystdtb__horizon-buttons">
							{ faqBorderTypes.map( ( item ) => {
								return (
									<Button
										key={ item.name }
										isSecondary={ borderType !== item.name }
										isPrimary={ borderType === item.name }
										onClick={ () => {
											setAttributes( {
												borderType: item.name,
											} );
											if ( '' === item.name ) {
												setAttributes( {
													borderSize: 0,
												} );
												setBorderColor( undefined );
											}
										} }
									>
										<span>{ item.label }</span>
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
					{ '' !== borderType && (
						<>
							<BaseControl
								id={ 'border-size' }
								label={ __(
									'枠線サイズ',
									'ystandard-toolbox'
								) }
							>
								<RangeControl
									value={
										undefined === borderSize
											? 0
											: borderSize
									}
									onChange={ ( value ) =>
										setAttributes( { borderSize: value } )
									}
									min={ 0 }
									max={ 10 }
									step={ 1 }
									allowReset={ true }
								/>
							</BaseControl>
							<BaseControl
								id={ 'border-color' }
								label={ __( '枠線の色', 'ystandard-toolbox' ) }
							>
								<ColorPalette
									colors={ colors }
									disableCustomColors={ false }
									onChange={ ( color ) => {
										setBorderColor( color );
									} }
									value={ borderColor.color }
								/>
							</BaseControl>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ faqClasses } style={ faqStyles }>
					<InnerBlocks
						allowedBlocks={ [ 'ystdtb/faq-item' ] }
						template={ template }
						templateLock={ 'all' }
					/>
				</div>
			</div>
		</>
	);
}

const faqEdit = withDispatch( ( dispatch, ownProps, registry ) => ( {
	updateChildAttributes( attributes ) {
		const { clientId } = ownProps;
		const { updateBlockAttributes } = dispatch( 'core/block-editor' );
		const { getBlockOrder } = registry.select( 'core/block-editor' );
		const innerBlockClientIds = getBlockOrder( clientId );
		innerBlockClientIds.forEach( ( innerBlockClientId ) => {
			updateBlockAttributes( innerBlockClientId, attributes );
		} );
	},
} ) )( FAQ );

export default compose( [
	withColors( {
		backgroundColor: 'backgroundColor',
		borderColor: 'borderColor',
		accordionArrowColor: 'color',
	} ),
] )( faqEdit );
