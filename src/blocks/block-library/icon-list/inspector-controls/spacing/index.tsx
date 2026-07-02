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
const MARGIN_SIDES: ( 'top' | 'bottom' )[] = [ 'top', 'bottom' ];
const PADDING_SIDES: ( 'top' | 'right' | 'bottom' | 'left' )[] = [
	'top',
	'right',
	'bottom',
	'left',
];

/**
 * レスポンシブ余白設定があるかチェック.
 *
 * @param value
 */
function hasResponsiveSpacing( value?: ResponsiveSpacing ) {
	return !! ( value?.desktop || value?.tablet || value?.mobile );
}

/**
 * レスポンシブ余白を整理.
 *
 * @param value
 */
function cleanResponsiveSpacing( value: ResponsiveSpacing ) {
	return stripUndefined( value ) as ResponsiveSpacing | undefined;
}

// @ts-ignore.
export function Spacing( props: IconListEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { responsiveMargin, responsivePadding } = attributes;
	const marginLabel = __( '外側余白(マージン)', 'ystandard-toolbox' );
	const paddingLabel = __( '内側余白(パディング)', 'ystandard-toolbox' );

	// デバイスごとのmarginを更新する.
	const handleOnChangeMargin = ( value: ResponsiveSpacing ) => {
		setAttributes( {
			responsiveMargin: cleanResponsiveSpacing( value ),
		} );
	};

	// デバイスごとのpaddingを更新する.
	const handleOnChangePadding = ( value: ResponsiveSpacing ) => {
		setAttributes( {
			responsivePadding: cleanResponsiveSpacing( value ),
		} );
	};

	// margin設定をリセットする.
	const handleOnResetMargin = () => {
		setAttributes( {
			responsiveMargin: undefined,
		} );
	};

	// padding設定をリセットする.
	const handleOnResetPadding = () => {
		setAttributes( {
			responsivePadding: undefined,
		} );
	};

	// 余白設定をリセットする.
	const handleOnResetAll = () => {
		setAttributes( {
			responsiveMargin: undefined,
			responsivePadding: undefined,
		} );
	};

	return (
		<ToolsPanel
			label={ __( 'レスポンシブ余白', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ handleOnResetAll }
		>
			<ToolsPanelItem
				label={ paddingLabel }
				panelId={ PANEL_ID }
				hasValue={ () => hasResponsiveSpacing( responsivePadding ) }
				onDeselect={ handleOnResetPadding }
			>
				<BaseControl id="responsive-padding" label={ paddingLabel }>
					<ResponsiveSpacingSelectControl
						value={ responsivePadding }
						onChange={ handleOnChangePadding }
						sides={ PADDING_SIDES }
						minimumCustomValue={ -9999 }
						showResetButton={ false }
					/>
				</BaseControl>
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ marginLabel }
				panelId={ PANEL_ID }
				hasValue={ () => hasResponsiveSpacing( responsiveMargin ) }
				onDeselect={ handleOnResetMargin }
			>
				<BaseControl id="responsive-margin" label={ marginLabel }>
					<ResponsiveSpacingSelectControl
						value={ responsiveMargin }
						onChange={ handleOnChangeMargin }
						sides={ MARGIN_SIDES }
						minimumCustomValue={ -9999 }
						showResetButton={ false }
					/>
				</BaseControl>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
