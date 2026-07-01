/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies.
 */
import {
	type ResponsiveSpacing,
	type Spacing as SpacingValue,
	CustomSpacingSelectControl,
} from '@aktk/block-components/components/custom-spacing-select';
import {
	MobileControl,
	TabletControl,
} from '@aktk/block-components/components/icon-control';
import { stripUndefined } from '@aktk/block-components/utils/object';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Block Dependencies.
 */
import type { IconListEditProps } from '../../types';

const PANEL_ID = 'ystdtb-icon-list-responsive-spacing';
const SIDES: ( 'top' | 'right' | 'bottom' | 'left' )[] = [
	'top',
	'right',
	'bottom',
	'left',
];

type ResponsiveMarginType = 'tablet' | 'mobile';

/**
 * レスポンシブmargin設定があるかチェック.
 *
 * @param value
 */
function hasResponsiveMargin( value?: ResponsiveSpacing ) {
	return !! ( value?.tablet || value?.mobile );
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
	const labelClassName = 'text-fz-xs max-w-[calc(100%-24px)] -mb-[1.4em]';

	// デバイスごとのmarginを更新する.
	const handleOnChange = (
		type: ResponsiveMarginType,
		value?: SpacingValue
	) => {
		setAttributes( {
			responsiveMargin: cleanResponsiveMargin( {
				...responsiveMargin,
				[ type ]: value,
			} ),
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
				<div className="grid grid-cols-1 gap-4">
					<div>
						<TabletControl className={ labelClassName }>
							{ __( 'タブレット', 'ystandard-toolbox' ) }
						</TabletControl>
						<CustomSpacingSelectControl
							sides={ SIDES }
							values={ responsiveMargin?.tablet }
							onChange={ ( value ) =>
								handleOnChange( 'tablet', value )
							}
							minimumCustomValue={ -9999 }
						/>
					</div>
					<div>
						<MobileControl className={ labelClassName }>
							{ __( 'モバイル', 'ystandard-toolbox' ) }
						</MobileControl>
						<CustomSpacingSelectControl
							sides={ SIDES }
							values={ responsiveMargin?.mobile }
							onChange={ ( value ) =>
								handleOnChange( 'mobile', value )
							}
							minimumCustomValue={ -9999 }
						/>
					</div>
				</div>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
