/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies.
 */
import {
	CustomSizeInputPanel,
	type ResponsiveFontSize,
} from '@aktk/block-components/components/custom-font-size-picker';
import { stripUndefined } from '@aktk/block-components/utils/object';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/**
 * Block Dependencies.
 */
import type { IconListEditProps } from '../../types';

const PANEL_ID = 'ystdtb-icon-list-responsive-font-size';

/**
 * レスポンシブフォントサイズ設定があるかチェック.
 *
 * @param value
 */
function hasResponsiveFontSize( value?: ResponsiveFontSize ) {
	return !! ( value?.desktop || value?.tablet || value?.mobile );
}

/**
 * レスポンシブフォントサイズを整理.
 *
 * @param value
 */
function cleanResponsiveFontSize( value: ResponsiveFontSize ) {
	return stripUndefined( value ) as ResponsiveFontSize | undefined;
}

/**
 * レスポンシブ文字設定.
 */
export function Typography( props: IconListEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { responsiveFontSize } = attributes;

	// デバイスごとのフォントサイズを更新する.
	const handleOnChangeFontSize = ( value: ResponsiveFontSize ) => {
		setAttributes( {
			responsiveFontSize: cleanResponsiveFontSize( value ),
		} );
	};

	// フォントサイズ設定をリセットする.
	const handleOnResetFontSize = () => {
		setAttributes( {
			responsiveFontSize: undefined,
		} );
	};

	return (
		<ToolsPanel
			label={ __( 'レスポンシブ文字設定', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ handleOnResetFontSize }
		>
			<ToolsPanelItem
				label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
				panelId={ PANEL_ID }
				hasValue={ () => hasResponsiveFontSize( responsiveFontSize ) }
				onDeselect={ handleOnResetFontSize }
			>
				<BaseControl
					id="responsive-font-size"
					label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
				>
					<CustomSizeInputPanel
						responsiveFontSize={ responsiveFontSize }
						onChange={ handleOnChangeFontSize }
						showResetButton={ false }
					/>
				</BaseControl>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
