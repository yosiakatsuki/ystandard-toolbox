/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/* Block Dependencies */
import type { SliderItemEditProps, SliderItemOverflow } from '../../../types';
import { updateSliderItemOverflow } from '../../../utils';

/**
 * アイテムの外枠からはみ出した部分の扱いを編集する。
 * @param props スライダーアイテムの編集プロパティ。
 */
export function Overflow( props: SliderItemEditProps ) {
	const { attributes, setAttributes, clientId } = props;
	const { style } = attributes;
	const overflow = style?.ystdtb?.sliderItem?.overflow;
	const panelId = clientId + '-overflow';

	// はみ出しの扱いだけを更新し、枠線や寸法などのスタイルを保持する。
	const updateOverflow = ( value?: SliderItemOverflow ) =>
		setAttributes( {
			style: updateSliderItemOverflow( style, value ),
		} );

	return (
		<ToolsPanel
			panelId={ panelId }
			label={ __( '表示範囲', 'ystandard-toolbox' ) }
			resetAll={ () => updateOverflow( undefined ) }
		>
			<ToolsPanelItem
				className="single-column"
				panelId={ panelId }
				label={ __( 'はみ出した部分を隠す', 'ystandard-toolbox' ) }
				isShownByDefault={ false }
				hasValue={ () => !! overflow }
				onDeselect={ () => updateOverflow( undefined ) }
			>
				<BaseControl>
					<ToggleControl
						label={ __(
							'はみ出した部分を隠す',
							'ystandard-toolbox'
						) }
						checked={ 'hidden' === overflow }
						// オフは既定の表示に戻すため、値を保存しない。
						onChange={ ( checked: boolean ) =>
							updateOverflow( checked ? 'hidden' : undefined )
						}
					/>
				</BaseControl>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
