/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies.
 */
import {
	type ResponsiveSpacing,
	ResponsiveSpacingSelectControl,
} from '@aktk/block-components/components/custom-spacing-select';
import { stripUndefined } from '@aktk/block-components/utils/object';
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Block Dependencies.
 */
import type { IconListEditProps } from '../../types';

const PANEL_ID = 'ystdtb-icon-list-responsive-spacing';
const SIDES: ( 'top' | 'bottom' )[] = [ 'top', 'bottom' ];

/**
 * レスポンシブmargin設定があるかチェック.
 *
 * @param value
 */
function hasResponsiveMargin( value?: ResponsiveSpacing ) {
	return !! ( value?.desktop || value?.tablet || value?.mobile );
}

/**
 * レスポンシブmarginを整理.
 *
 * @param value
 */
function cleanResponsiveMargin( value: ResponsiveSpacing ) {
	return stripUndefined( value ) as ResponsiveSpacing | undefined;
}

// @ts-ignore.
export function Spacing( props: IconListEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { responsiveMargin } = attributes;
	const marginLabel = __( '外側余白(margin)', 'ystandard-toolbox' );

	// デバイスごとのmarginを更新する.
	const handleOnChange = ( value: ResponsiveSpacing ) => {
		setAttributes( {
			responsiveMargin: cleanResponsiveMargin( value ),
		} );
	};

	// margin設定をリセットする.
	const handleOnReset = () => {
		setAttributes( {
			responsiveMargin: undefined,
		} );
	};

	return (
		<ToolsPanel
			label={ __( 'レスポンシブ余白', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ handleOnReset }
		>
			<ToolsPanelItem
				label={ marginLabel }
				panelId={ PANEL_ID }
				hasValue={ () => hasResponsiveMargin( responsiveMargin ) }
				onDeselect={ handleOnReset }
			>
				<BaseControl id="responsive-margin" label={ marginLabel }>
					<ResponsiveSpacingSelectControl
						value={ responsiveMargin }
						onChange={ handleOnChange }
						sides={ SIDES }
						minimumCustomValue={ -9999 }
						showResetButton={ false }
					/>
				</BaseControl>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
