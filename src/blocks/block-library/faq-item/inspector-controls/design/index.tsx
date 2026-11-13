/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import Button from '@aktk/block-components/wp-controls/button';
import { stripUndefined } from '@aktk/block-components/utils/object';

/**
 * Block Dependencies.
 */
import type { DesignPreset } from '@aktk/blocks/block-library/faq-item/types';

/**
 * デザインプリセット
 */
const designPreset: DesignPreset[] = [
	{
		name: 'default',
		label: __( 'デフォルト', 'ystandard-toolbox' ),
		labelTextColor: undefined,
		itemStyles: {},
		labelStyles: {
			color: '#222222',
			fontWeight: 'bold',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		attributes: {
			backgroundColor: undefined,
			gradient: undefined,
			borderColor: undefined,
			style: {
				ystdtb: {
					faqItem: {
						label: {
							color: { background: undefined },
							border: {
								width: '0',
								radius: '0',
								color: undefined,
							},
						},
					},
				},
			},
		},
	},
	{
		name: 'background-square',
		label: __( '背景あり四角', 'ystandard-toolbox' ),
		labelTextColor: '#222222',
		itemStyles: {},
		labelStyles: {
			fontWeight: 'bold',
			backgroundColor: '#f1f1f3',
			color: '#222222',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		attributes: {
			backgroundColor: undefined,
			gradient: undefined,
			borderColor: undefined,
			style: {
				ystdtb: {
					faqItem: {
						label: {
							color: { background: '#f1f1f3' },
							border: {
								width: '0',
								radius: '0',
								color: undefined,
							},
						},
					},
				},
			},
		},
	},
	{
		name: 'background-circle',
		label: __( '背景あり丸', 'ystandard-toolbox' ),
		labelTextColor: '#222222',
		itemStyles: {},
		labelStyles: {
			fontWeight: 'bold',
			backgroundColor: '#f1f1f3',
			color: '#222222',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '50px',
		},
		attributes: {
			backgroundColor: undefined,
			gradient: undefined,
			borderColor: undefined,
			style: {
				ystdtb: {
					faqItem: {
						label: {
							color: { background: '#f1f1f3' },
							border: {
								width: '0',
								radius: '50px',
								color: undefined,
							},
						},
					},
				},
			},
		},
	},
	{
		name: 'outline-square',
		label: __( '四角アウトライン', 'ystandard-toolbox' ),
		labelTextColor: '#666666',
		itemStyles: {},
		labelStyles: {
			fontWeight: 'bold',
			backgroundColor: '#ffffff',
			color: '#666666',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			border: '2px solid #666666',
		},
		attributes: {
			backgroundColor: undefined,
			gradient: undefined,
			borderColor: undefined,
			style: {
				ystdtb: {
					faqItem: {
						label: {
							color: { background: '#ffffff' },
							border: {
								width: '2px',
								radius: '0',
								color: '#666666',
							},
						},
					},
				},
			},
		},
	},
	{
		name: 'outline-circle',
		label: __( '丸アウトライン', 'ystandard-toolbox' ),
		labelTextColor: '#666666',
		itemStyles: {},
		labelStyles: {
			fontWeight: 'bold',
			backgroundColor: '#ffffff',
			color: '#666666',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			border: '2px solid #666666',
			borderRadius: '50px',
		},
		attributes: {
			backgroundColor: undefined,
			gradient: undefined,
			borderColor: undefined,
			style: {
				ystdtb: {
					faqItem: {
						label: {
							color: { background: '#ffffff' },
							border: {
								width: '2px',
								radius: '50px',
								color: '#666666',
							},
						},
					},
				},
			},
		},
	},
	{
		name: 'bottom-divider',
		label: __( '区切り線あり', 'ystandard-toolbox' ),
		labelTextColor: undefined,
		itemStyles: {
			paddingBottom: '.25em',
			borderBottom: '1px solid #aaaaaa',
		},
		labelStyles: {
			color: '#222222',
			fontWeight: 'bold',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		attributes: {
			backgroundColor: undefined,
			gradient: undefined,
			borderColor: undefined,
			style: {
				border: {
					bottom: { width: '1px', style: 'solid', color: '#aaaaaa' },
				},
				ystdtb: {
					faqItem: {
						label: {
							color: { background: undefined },
							border: {
								width: '0',
								radius: '0',
								color: undefined,
							},
						},
					},
				},
			},
		},
	},
];

/**
 * FAQ Itemにデザインプリセットを適用する.
 *
 * @param props ブロック編集プロパティ.
 */
// @ts-ignore.
export function Design( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { faqType } = attributes;
	// Item背景を解除して枠線をプリセットに合わせ、本文色など他のstyle設定は保持する.
	const applyPreset = ( preset: ( typeof designPreset )[ 0 ] ) => {
		setAttributes( {
			...preset.attributes,
			style: stripUndefined( {
				...attributes.style,
				border: preset.attributes.style?.border,
				color: {
					...attributes.style?.color,
					background: undefined,
					gradient: undefined,
				},
				ystdtb: {
					...attributes.style?.ystdtb,
					faqItem: {
						...attributes.style?.ystdtb?.faqItem,
						arrow: {
							...attributes.style?.ystdtb?.faqItem?.arrow,
							color: {
								...attributes.style?.ystdtb?.faqItem?.arrow
									?.color,
								text: preset.labelTextColor,
							},
						},
						label: {
							...attributes.style?.ystdtb?.faqItem?.label,
							color: {
								...attributes.style?.ystdtb?.faqItem?.label
									?.color,
								text: preset.labelTextColor,
								background:
									preset.attributes.style?.ystdtb?.faqItem
										?.label?.color?.background,
							},
							border: preset.attributes.style?.ystdtb?.faqItem
								?.label?.border,
							typography: undefined,
							responsive: {
								...attributes.style?.ystdtb?.faqItem?.label
									?.responsive,
								typography: undefined,
							},
						},
					},
				},
			} ),
		} );
	};
	return (
		<Panel title={ __( 'デザインサンプル', 'ystandard-toolbox' ) }>
			<BaseControl>
				<div className="grid grid-cols-1 gap-4">
					{ designPreset.map( ( item ) => (
						<Button
							key={ item.name }
							className="!h-auto shadow"
							onClick={ () => applyPreset( item ) }
						>
							<span
								className="flex w-full items-center py-2"
								style={ {
									...item.itemStyles,
								} }
							>
								<span
									className="mr-4 uppercase"
									style={ {
										...item.labelStyles,
									} }
								>
									{ faqType }
								</span>
								<span className="grow text-left text-[#222]">
									FAQ FAQ FAQ...
								</span>
							</span>
						</Button>
					) ) }
				</div>
			</BaseControl>
		</Panel>
	);
}
