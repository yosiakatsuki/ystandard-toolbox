import classnames from 'classnames';
import { template, presetLabelTypes } from './config';
import {
	InnerBlocks,
	InspectorControls,
	FontSizePicker,
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
import { useState } from '@wordpress/element';
import { withDispatch, select } from '@wordpress/data';
import { innerMargin } from './item/config';
import { calcContentMarginTop } from './item/function';
import { __ } from '@wordpress/i18n';
import { getColorSlug, getColorCode } from '@ystd/function/_getColorSlug';
import { getFontSize, getFontSlug } from '@ystd/function/_getFontSlug';

function Timeline( props ) {
	const { className, updateChildAttributes, updateLabelType } = props;

	const [ contentMarginTop, setContentMarginTop ] = useState( 0 );
	const [ labelType, setLabelType ] = useState( 'none' );
	const [ labelBold, setLabelBold ] = useState( false );
	const [ labelBorderRadius, setLabelBorderRadius ] = useState( 50 );
	const [ labelFontSize, setLabelFontSize ] = useState( 14 );
	const [ labelBorderSize, setLabelBorderSize ] = useState( 0 );

	const { colors } = select( 'core/block-editor' ).getSettings();

	const classes = classnames( 'ystdtb-timeline', className, {} );

	const selectedMarginTop = calcContentMarginTop(
		labelType,
		contentMarginTop,
		'1'
	);

	const blockProps = useBlockProps( {
		className: classnames( 'ystdtb-timeline-wrap' ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'ラベル一括設定', 'ystandard-toolbox' ) }
				>
					<BaseControl
						id={ 'label-contents' }
						label={ __( '角丸', 'ystandard-toolbox' ) }
						__nextHasNoMarginBottom
					>
						<RangeControl
							value={ labelBorderRadius }
							onChange={ ( value ) => {
								updateChildAttributes( {
									labelBorderRadius: value,
								} );
								setLabelBorderRadius( value );
							} }
							initialPosition={ 50 }
							min={ 0 }
							max={ 100 }
							step={ 1 }
							allowReset={ true }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-contents' }
						label={ __( 'タイプ', 'ystandard-toolbox' ) }
						__nextHasNoMarginBottom
					>
						<div className="ystdtb__horizon-buttons">
							{ presetLabelTypes.map( ( item ) => {
								return (
									<Button
										key={ item.name }
										isSecondary={ true }
										onClick={ () => {
											const margin = calcContentMarginTop(
												item.name,
												undefined,
												'1'
											);
											updateLabelType( item.name );
											updateChildAttributes( {
												contentMarginTop: margin,
											} );
											setLabelType( item.name );
											setContentMarginTop( margin );
											if ( '' === item.name ) {
												updateChildAttributes( {
													labelFontSize: 14,
													customLabelFontSize: 14,
												} );
											}
										} }
									>
										<span>{ item.label }</span>
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
					{ 'text' === labelType && (
						<BaseControl
							id={ 'label-contents-weight' }
							label={ __( '文字の太さ', 'ystandard-toolbox' ) }
							__nextHasNoMarginBottom
						>
							<ToggleControl
								label={ __(
									'太字にする',
									'ystandard-toolbox'
								) }
								onChange={ () => {
									updateChildAttributes( {
										labelBold: ! labelBold,
									} );
									setLabelBold( ! labelBold );
								} }
								checked={ labelBold }
							/>
						</BaseControl>
					) }
					{ undefined !== labelType && '' !== labelType && (
						<>
							<BaseControl
								id={ 'label-contents-size' }
								label={ __(
									'文字・アイコン サイズ',
									'ystandard-toolbox'
								) }
								__nextHasNoMarginBottom
							>
								<FontSizePicker
									label={ __(
										'サイズ',
										'ystandard-toolbox'
									) }
									value={ labelFontSize }
									onChange={ ( font ) => {
										updateChildAttributes( {
											labelFontSize: getFontSlug( font ),
											customLabelFontSize:
												getFontSize( font ),
										} );
										setLabelFontSize( font );
									} }
									__nextHasNoMarginBottom
									__next40pxDefaultSize
								/>
							</BaseControl>
							<BaseControl
								id={ 'label-contents-color' }
								label={ __(
									'文字・アイコン 色',
									'ystandard-toolbox'
								) }
								__nextHasNoMarginBottom
							>
								<ColorPalette
									colors={ colors }
									disableCustomColors={ false }
									onChange={ ( color ) => {
										updateChildAttributes( {
											labelColor: getColorSlug( color ),
											customLabelColor:
												getColorCode( color ),
										} );
									} }
								/>
							</BaseControl>
						</>
					) }
					<BaseControl
						id={ 'label-bg' }
						label={ __( '背景色', 'ystandard-toolbox' ) }
						__nextHasNoMarginBottom
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								updateChildAttributes( {
									labelBackgroundColor: getColorSlug( color ),
									customLabelBackgroundColor:
										getColorCode( color ),
								} );
							} }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-border' }
						label={ __( '枠線の太さ', 'ystandard-toolbox' ) }
						__nextHasNoMarginBottom
					>
						<RangeControl
							value={ labelBorderSize }
							onChange={ ( value ) => {
								updateChildAttributes( {
									labelBorderSize: value,
								} );
								setLabelBorderSize( value );
							} }
							initialPosition={ 0 }
							min={ 0 }
							max={ 100 }
							step={ 1 }
							allowReset={ true }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-border-color' }
						label={ __( '枠線の色', 'ystandard-toolbox' ) }
						__nextHasNoMarginBottom
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								updateChildAttributes( {
									labelBorderColor: getColorSlug( color ),
									customLabelBorderColor:
										getColorCode( color ),
								} );
							} }
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ classes }>
					<InnerBlocks
						allowedBlocks={ [ 'ystdtb/timeline-item' ] }
						template={ template }
						templateLock={ false }
					/>
				</div>
			</div>
		</>
	);
}

const timelineEdit = withDispatch( ( dispatch, ownProps, registry ) => ( {
	updateChildAttributes( attributes ) {
		const { clientId } = ownProps;
		const { updateBlockAttributes } = dispatch( 'core/block-editor' );
		const { getBlockOrder } = registry.select( 'core/block-editor' );
		const innerBlockClientIds = getBlockOrder( clientId );
		innerBlockClientIds.forEach( ( innerBlockClientId ) => {
			updateBlockAttributes( innerBlockClientId, attributes );
		} );
	},
	updateLabelType( type ) {
		const { clientId } = ownProps;
		const { updateBlockAttributes } = dispatch( 'core/block-editor' );
		const { getBlockOrder } = registry.select( 'core/block-editor' );

		let contents = '';
		if ( 'icon' === type ) {
			contents = 'bookmark';
		}

		const innerBlockClientIds = getBlockOrder( clientId );
		let i = 0;
		innerBlockClientIds.forEach( ( innerBlockClientId ) => {
			if ( 'text' === type ) {
				i++;
				contents = i.toString();
			}
			updateBlockAttributes( innerBlockClientId, {
				labelType: type,
				labelContents: contents,
			} );
		} );
	},
} ) )( Timeline );

export default timelineEdit;
