import classnames from 'classnames';
import { labelTypes, innerMargin, template } from './config';
import {
	InnerBlocks,
	InspectorControls,
	withColors,
	FontSizePicker,
	withFontSizes,
	PlainText,
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
import { withSelect, select } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import SVGIconSelect from '@ystdtb/components/icon-picker';
import SVGIcon from '@ystdtb/components/svg-icon';
import { calcContentMarginTop } from './function';

function TimelineItem( props ) {
	const {
		attributes,
		setAttributes,
		labelColor,
		setLabelColor,
		labelBackgroundColor,
		setLabelBackgroundColor,
		labelBorderColor,
		setLabelBorderColor,
		contentsBorderColor,
		setContentsBorderColor,
		labelFontSize,
		setLabelFontSize,
		hasChildBlocks,
		className,
	} = props;
	const {
		labelType,
		labelContents,
		labelBold,
		labelBorderSize,
		labelBorderRadius,
		contentMarginTop,
		contentsInnerMargin,
	} = attributes;

	const { colors } = select( 'core/block-editor' ).getSettings();
	const selectLabelType = undefined === labelType ? '' : labelType;
	const selectContentsInnerMargin =
		undefined === contentsInnerMargin ? 'normal' : contentsInnerMargin;
	const selectedLabelType = labelType;

	if ( undefined === contentMarginTop ) {
		setAttributes( {
			contentMarginTop: calcContentMarginTop(
				selectLabelType,
				contentMarginTop,
				labelContents
			),
		} );
	}

	const classes = classnames( 'ystdtb-timeline-item', className, {
		[ `is-margin-${ selectContentsInnerMargin }` ]:
			'normal' !== selectContentsInnerMargin,
		[ `has-${ selectLabelType }` ]: '' !== selectLabelType,
		[ contentsBorderColor.class ]: contentsBorderColor.class,
	} );
	const timelineStyle = {
		borderColor: contentsBorderColor.color,
	};
	const labelClasses = classnames( 'ystdtb-timeline__label', {
		[ `has-${ selectLabelType }` ]: '' !== selectLabelType,
		'has-long-text':
			'text' === selectLabelType &&
			undefined !== labelContents &&
			1 < labelContents.length,
		[ labelFontSize.class ]: labelFontSize.class,
		[ labelColor.class ]: labelColor.class,
		[ labelBackgroundColor.class ]: labelBackgroundColor.class,
		[ labelBorderColor.class ]: labelBorderColor.class,
	} );
	const labelStyles = {
		fontSize: labelFontSize.size ? labelFontSize.size + 'px' : '14px',
		fontWeight: labelBold ? 700 : undefined,
		color: labelColor.color,
		backgroundColor: labelBackgroundColor.color,
		borderColor: labelBorderColor.color,
		borderRadius:
			undefined !== labelBorderRadius
				? labelBorderRadius + 'px'
				: undefined,
		borderWidth: labelBorderSize ? labelBorderSize + 'px' : undefined,
		borderStyle: labelBorderSize ? 'solid' : undefined,
	};

	const contentsClass = classnames( 'ystdtb-timeline__contents', {
		'is-no-child': ! hasChildBlocks,
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

	const blockProps = useBlockProps( {
		className: classes,
		style: timelineStyle,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'タイムライン', 'ystandard-toolbox' ) }>
					<BaseControl
						id={ 'contents-margin' }
						label={ __(
							'コンテンツ内の余白',
							'ystandard-toolbox'
						) }
					>
						<div className="ystdtb__horizon-buttons">
							{ innerMargin.map( ( item ) => {
								return (
									<Button
										key={ item.name }
										isSecondary={
											selectContentsInnerMargin !==
											item.name
										}
										isPrimary={
											selectContentsInnerMargin ===
											item.name
										}
										onClick={ () => {
											setAttributes( {
												contentsInnerMargin: item.name,
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
						id={ 'contents-border-color' }
						label={ __( '線の色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setContentsBorderColor( color );
							} }
							value={ contentsBorderColor.color }
						/>
					</BaseControl>
					<BaseControl
						id={ 'contents-border-color' }
						label={ __(
							'コンテンツ上部余白',
							'ystandard-toolbox'
						) }
					>
						<RangeControl
							value={ () => {
								return undefined === contentMarginTop
									? 0
									: contentMarginTop;
							} }
							onChange={ ( value ) =>
								setAttributes( { contentMarginTop: value } )
							}
							initialPosition={
								undefined === contentMarginTop
									? 0
									: contentMarginTop
							}
							min={ -100 }
							max={ 100 }
							step={ 1 }
							help={ __(
								'ラベルにアイコンやテキストを使ったときにコンテンツの開始位置がずれる場合、余白を調整してください。',
								'ystandard-toolbox'
							) }
							allowReset={ true }
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={ __( 'ラベル', 'ystandard-toolbox' ) }
					initialOpen={ false }
				>
					<BaseControl
						id={ 'label-contents' }
						label={ __( '角丸', 'ystandard-toolbox' ) }
					>
						<RangeControl
							value={ () => {
								return undefined === labelBorderRadius
									? 50
									: labelBorderRadius;
							} }
							onChange={ ( value ) =>
								setAttributes( { labelBorderRadius: value } )
							}
							initialPosition={
								undefined === labelBorderRadius
									? 50
									: labelBorderRadius
							}
							min={ 0 }
							max={ 100 }
							step={ 1 }
							allowReset={ true }
						/>
					</BaseControl>
					<BaseControl
						id={ 'label-contents' }
						label={ __( 'タイプ', 'ystandard-toolbox' ) }
					>
						<div className="ystdtb__horizon-buttons">
							{ labelTypes.map( ( item ) => {
								return (
									<Button
										key={ item.name }
										isSecondary={
											selectLabelType !== item.name
										}
										isPrimary={
											selectLabelType === item.name
										}
										onClick={ () => {
											const contents =
												'icon' === item.name &&
												selectedLabelType !== item.name
													? 'bookmark'
													: '';
											setAttributes( {
												labelType: item.name,
												labelContents: contents,
											} );
										} }
									>
										<span>{ item.label }</span>
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
					{ 'icon' === selectLabelType && (
						<BaseControl
							id={ 'label-contents-icon' }
							label={ __( 'アイコン', 'ystandard-toolbox' ) }
						>
							<SVGIconSelect
								panelTitle={ __(
									'アイコン選択',
									'ystandard-toolbox'
								) }
								iconControlTitle={ '' }
								selectedIcon={ labelContents }
								onClickIcon={ ( value ) => {
									setAttributes( { labelContents: value } );
								} }
							/>
						</BaseControl>
					) }
					{ 'text' === selectLabelType && (
						<>
							<BaseControl
								id={ 'label-contents-text' }
								label={ __( 'テキスト', 'ystandard-toolbox' ) }
							>
								<PlainText
									value={ labelContents }
									style={ {
										border: '1px solid #ccc',
										padding: '.25em',
									} }
									onChange={ ( value ) => {
										setAttributes( {
											labelContents: value,
										} );
									} }
									placeholder={ __(
										'テキスト',
										'ystandard-toolbox'
									) }
									aria-label={ __(
										'テキスト',
										'ystandard-toolbox'
									) }
								/>
							</BaseControl>
							<BaseControl
								id={ 'label-contents-weight' }
								label={ __(
									'文字の太さ',
									'ystandard-toolbox'
								) }
							>
								<ToggleControl
									label={ __(
										'太字にする',
										'ystandard-toolbox'
									) }
									onChange={ () => {
										setAttributes( {
											labelBold: ! labelBold,
										} );
									} }
									checked={ labelBold }
								/>
							</BaseControl>
						</>
					) }

					{ '' !== selectLabelType && (
						<>
							<BaseControl
								id={ 'label-contents-size' }
								label={ __(
									'文字・アイコン サイズ',
									'ystandard-toolbox'
								) }
							>
								<FontSizePicker
									label={ __(
										'サイズ',
										'ystandard-toolbox'
									) }
									value={ labelFontSize.size }
									onChange={ ( font ) => {
										setLabelFontSize( font );
									} }
								/>
							</BaseControl>
							<BaseControl
								id={ 'label-contents-color' }
								label={ __(
									'文字・アイコン 色',
									'ystandard-toolbox'
								) }
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
						</>
					) }
					<BaseControl
						id={ 'label-bg' }
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
						id={ 'label-border' }
						label={ __( '枠線の太さ', 'ystandard-toolbox' ) }
					>
						<RangeControl
							value={ labelBorderSize }
							onChange={ ( value ) =>
								setAttributes( { labelBorderSize: value } )
							}
							initialPosition={
								undefined === labelBorderSize
									? 0
									: labelBorderSize
							}
							min={ 0 }
							max={ 100 }
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
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ labelClasses } style={ labelStyles }>
					{ getLabelContents() }
				</div>
				<div className={ contentsClass } style={ contentsStyle }>
					<InnerBlocks
						templateLock={ false }
						template={ template }
						renderAppender={
							hasChildBlocks
								? undefined
								: () => <InnerBlocks.ButtonBlockAppender />
						}
					/>
				</div>
			</div>
		</>
	);
}

export default compose( [
	withColors( {
		labelColor: 'color',
		labelBackgroundColor: 'backgroundColor',
		labelBorderColor: 'borderColor',
		contentsBorderColor: 'borderColor',
	} ),
	withFontSizes( 'labelFontSize' ),
	withSelect( ( ownSelect, ownProps ) => {
		const { clientId } = ownProps;
		const { getBlockOrder } = ownSelect( 'core/block-editor' );

		return {
			hasChildBlocks: getBlockOrder( clientId ).length > 0,
		};
	} ),
] )( TimelineItem );
