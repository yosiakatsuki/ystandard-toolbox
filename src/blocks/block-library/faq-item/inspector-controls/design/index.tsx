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
			faqBackgroundColor: undefined,
			faqBorderType: '',
			faqBorderSize: 0,
			faqBorderColor: undefined,
			labelSize: undefined,
			labelColor: undefined,
			labelBold: true,
			labelBackgroundColor: undefined,
			labelBorderSize: 0,
			labelBorderRadius: 0,
			labelBorderColor: undefined,
		},
	},
	{
		name: 'background-square',
		label: __( '背景あり四角', 'ystandard-toolbox' ),
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
			faqBackgroundColor: undefined,
			faqBorderType: '',
			faqBorderSize: 0,
			faqBorderColor: undefined,
			labelSize: undefined,
			labelColor: '#222222',
			labelBold: true,
			labelBackgroundColor: '#f1f1f3',
			labelBorderSize: 0,
			labelBorderRadius: 0,
			labelBorderColor: undefined,
		},
	},
	{
		name: 'background-circle',
		label: __( '背景あり丸', 'ystandard-toolbox' ),
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
			faqBackgroundColor: undefined,
			faqBorderType: '',
			faqBorderSize: 0,
			faqBorderColor: undefined,
			labelSize: undefined,
			labelColor: '#222222',
			labelBold: true,
			labelBackgroundColor: '#f1f1f3',
			labelBorderSize: 0,
			labelBorderRadius: 50,
			labelBorderColor: undefined,
		},
	},
	{
		name: 'outline-square',
		label: __( '四角アウトライン', 'ystandard-toolbox' ),
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
			faqBackgroundColor: undefined,
			faqBorderType: '',
			faqBorderSize: 0,
			faqBorderColor: undefined,
			labelSize: undefined,
			labelColor: '#666666',
			labelBold: true,
			labelBackgroundColor: '#ffffff',
			labelBorderSize: 2,
			labelBorderRadius: 0,
			labelBorderColor: '#666666',
		},
	},
	{
		name: 'outline-circle',
		label: __( '丸アウトライン', 'ystandard-toolbox' ),
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
			faqBackgroundColor: undefined,
			faqBorderType: '',
			faqBorderSize: 0,
			faqBorderColor: undefined,
			labelSize: undefined,
			labelColor: '#666666',
			labelBold: true,
			labelBackgroundColor: '#ffffff',
			labelBorderSize: 2,
			labelBorderRadius: 50,
			labelBorderColor: '#666666',
		},
	},
	{
		name: 'bottom-divider',
		label: __( '区切り線あり', 'ystandard-toolbox' ),
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
			faqBackgroundColor: undefined,
			faqBorderType: 'bottom',
			faqBorderSize: 1,
			faqBorderColor: '#aaaaaa',
			labelSize: undefined,
			labelColor: undefined,
			labelBold: true,
			labelBackgroundColor: undefined,
			labelBorderSize: 0,
			labelBorderRadius: 0,
			labelBorderColor: undefined,
		},
	},
];

// @ts-ignore.
export function Design( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { faqType } = attributes;
	const applyPreset = ( preset: ( typeof designPreset )[ 0 ] ) => {
		setAttributes( {
			...preset.attributes,
			accordionArrowColor: preset.attributes.labelColor,
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
