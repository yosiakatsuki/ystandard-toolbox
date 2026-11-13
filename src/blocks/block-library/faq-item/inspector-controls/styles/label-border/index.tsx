/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';
/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import BorderControl from '@aktk/block-components/wp-controls/border-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
import useThemeColors from '@aktk/block-components/hooks/useThemeColors';
import { normalizeSizeValue } from '@aktk/block-components/utils/size';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';
/* Block Dependencies */
import type { FaqItemEditProps, FaqLabelStyle } from '../../../types';
import { updateFaqItemElement } from '../../../style-utils';

const PANEL_ID = 'ystdtb-faq-item-label-border';
const PREFIX = 'var:preset|color|';

/**
 * ラベルの枠線と角丸を独立して追加・解除する。
 * @param props ブロック編集プロパティ。
 */
export function LabelBorder( props: FaqItemEditProps ) {
	const { attributes, setAttributes } = props;
	const label = attributes.style?.ystdtb?.faqItem?.label;
	const { radius, ...border } = label?.border ?? {};
	const colors = useThemeColors().flatMap( ( group ) => group.colors );
	const color = border.color?.startsWith( PREFIX )
		? colors.find(
				( preset ) =>
					preset.slug === border.color?.slice( PREFIX.length )
		  )?.color ?? border.color
		: border.color;
	// 枠線以外のラベル設定を保持する。
	const update = ( next?: FaqLabelStyle[ 'border' ] ) =>
		setAttributes( {
			style: updateFaqItemElement( attributes.style, 'label', {
				...label,
				border: next,
			} ),
		} );
	// 角丸を保持し、幅・色・線種をまとめて更新する。
	const updateBorder = ( next?: typeof border ) => {
		const slug = colors.find( ( preset ) => preset.color === next?.color )
			?.slug;
		update( {
			...next,
			color: slug ? `${ PREFIX }${ slug }` : next?.color,
			radius,
		} );
	};
	return (
		<ToolsPanel
			label={ __( 'FAQラベル（枠線）', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ () => update() }
		>
			<ToolsPanelItem
				className="single-column"
				panelId={ PANEL_ID }
				label={ __( '枠線', 'ystandard-toolbox' ) }
				isShownByDefault={ false }
				hasValue={ () =>
					Object.values( border ).some(
						( value ) => value !== undefined && value !== ''
					)
				}
				onDeselect={ () => updateBorder() }
			>
				<BaseControl>
					<BorderControl
						label={ __( '枠線', 'ystandard-toolbox' ) }
						value={ { ...border, color } }
						onChange={ updateBorder }
						colors={ colors }
						enableAlpha
					/>
				</BaseControl>
			</ToolsPanelItem>
			<ToolsPanelItem
				className="single-column"
				panelId={ PANEL_ID }
				label={ __( '角丸', 'ystandard-toolbox' ) }
				isShownByDefault={ false }
				hasValue={ () => radius !== undefined && radius !== '' }
				onDeselect={ () => update( border ) }
			>
				<BaseControl>
					<UnitControl
						label={ __( 'ラベル角丸', 'ystandard-toolbox' ) }
						value={ radius }
						min={ 0 }
						onChange={ ( value ) =>
							update( {
								...border,
								radius: normalizeSizeValue( value ),
							} )
						}
					/>
				</BaseControl>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
