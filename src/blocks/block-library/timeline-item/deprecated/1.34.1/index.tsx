import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	getFontSizeClass,
	useBlockProps,
} from '@wordpress/block-editor';

// @ts-ignore.
export const deprecated1341 = [
	{
		attributes: {
			labelType: {
				type: 'string',
				default: '',
			},
			labelContents: {
				type: 'string',
				default: '',
			},
			labelBold: {
				type: 'bool',
				default: false,
			},
			labelColor: {
				type: 'string',
			},
			customLabelColor: {
				type: 'string',
			},
			labelBackgroundColor: {
				type: 'string',
			},
			customLabelBackgroundColor: {
				type: 'string',
			},
			labelFontSize: {
				type: 'string',
			},
			customLabelFontSize: {
				type: 'string',
			},
			labelBorderSize: {
				type: 'number',
				default: 0,
			},
			labelBorderRadius: {
				type: 'number',
				default: 50,
			},
			labelBorderColor: {
				type: 'string',
			},
			customLabelBorderColor: {
				type: 'string',
			},
			contentsInnerMargin: {
				type: 'string',
				default: 'normal',
			},
			contentMarginTop: {
				type: 'number',
			},
			contentsBorderColor: {
				type: 'string',
			},
			customContentsBorderColor: {
				type: 'string',
			},
			// v1 互換: アイコン SVG はアイコンライブラリ差し替えで再現不能なため、
			// 保存済み HTML から直接吸い出して deprecated save() に戻す。
			legacyLabelIconInnerHtml: {
				type: 'string',
				source: 'html',
				selector: '.ystdtb-timeline__label-icon',
			},
		},
		supports: {
			align: false,
			className: false,
		},
		migrate: ( attributes: any ) => {
			const {
				labelBorderSize,
				labelBorderRadius,
				contentMarginTop,
				// v1 互換用属性は v2 へ持ち越さない.
				legacyLabelIconInnerHtml: _legacyLabelIconInnerHtml,
				...rest
			} = attributes;

			const newLabelBorderSize = labelBorderSize
				? `${ labelBorderSize }px`
				: undefined;
			const newLabelBorderRadius = labelBorderRadius
				? `${ labelBorderRadius }px`
				: undefined;
			const newContentMarginTop = contentMarginTop
				? `${ -28 + contentMarginTop }px`
				: undefined;

			return {
				labelBorderSize: newLabelBorderSize,
				labelBorderRadius: newLabelBorderRadius,
				contentMarginTop: newContentMarginTop,
				...rest,
			};
		},
		save( { attributes }: { attributes: any } ) {
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
			} = attributes;

			const selectLabelType = undefined === labelType ? '' : labelType;
			const selectContentsInnerMargin =
				undefined === contentsInnerMargin
					? 'normal'
					: contentsInnerMargin;

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

			const classes = classnames( 'ystdtb-timeline-item', {
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
				'has-background':
					labelBackgroundColor || customLabelBackgroundColor,
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
				borderColor: labelBorderColorClass
					? undefined
					: customLabelBorderColor,
				borderRadius: labelBorderRadius
					? labelBorderRadius + 'px'
					: undefined,
				borderWidth: labelBorderSize
					? labelBorderSize + 'px'
					: undefined,
				borderStyle: labelBorderSize ? 'solid' : undefined,
			};

			const contentsClass = classnames( 'ystdtb-timeline__contents', {
				[ `is-margin-${ selectContentsInnerMargin }` ]:
					selectContentsInnerMargin,
			} );
			const contentMarginTopCalc = 0 > contentMarginTop ? '-' : '+';
			const contentsStyle = {
				marginTop: contentMarginTop
					? `calc(-1.3em ${ contentMarginTopCalc } ${ Math.abs(
							contentMarginTop
					  ) }px)`
					: undefined,
			};

			const { legacyLabelIconInnerHtml } = attributes;
			const getLabelContents = () => {
				if ( 'text' === selectLabelType ) {
					return (
						<span className="ystdtb-timeline__label-text">
							{ labelContents }
						</span>
					);
				}
				if ( 'icon' === selectLabelType ) {
					// アイコン SVG は v1/v2 でライブラリが異なるため、
					// 保存済み HTML をそのまま戻して 1 バイト差を防ぐ.
					return (
						<span
							className="ystdtb-timeline__label-icon"
							dangerouslySetInnerHTML={ {
								__html: legacyLabelIconInnerHtml || '',
							} }
						/>
					);
				}
				return <></>;
			};

			const blockProps = useBlockProps.save( {
				className: classes,
				style: timelineStyle,
			} );

			return (
				<div { ...blockProps }>
					<div className={ labelClasses } style={ labelStyles }>
						{ getLabelContents() }
					</div>
					<div className={ contentsClass } style={ contentsStyle }>
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];
