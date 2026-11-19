/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import { ResponsiveSizeEdit } from '../custom-size-control';
import type { ResponsiveValues } from '../../types';
import { ToolsPanel, ToolsPanelItem } from '../../wp-controls/tools-panel';
import { stripUndefined } from '../../utils/object';

export type ResponsiveGap = {
	row?: ResponsiveValues;
	column?: ResponsiveValues;
};

type ResponsiveSpacingPanelProps = {
	panelId: string;
	title: string;
	gapLabel: string;
	icon?: React.ReactNode;
	value?: ResponsiveGap;
	onChange: ( gap?: ResponsiveGap ) => void;
};

/**
 * 縦横の間隔を端末別に入力し、設定した方向と端末だけを返す。
 * @param props 見出し・間隔の値と更新関数。
 */
export function ResponsiveSpacingPanel( props: ResponsiveSpacingPanelProps ) {
	const { panelId, title, gapLabel, icon, value, onChange } = props;
	const labels = {
		column: __( '横方向', 'ystandard-toolbox' ),
		row: __( '縦方向', 'ystandard-toolbox' ),
	};
	// 空欄に戻した端末を除き、両方向とも未設定なら項目を解除する。
	const update = ( axis: keyof ResponsiveGap, next: ResponsiveValues ) => {
		const values = Object.entries( next ).filter(
			( [ , size ] ) => !! size
		);
		onChange(
			stripUndefined( {
				...value,
				[ axis ]: Object.fromEntries( values ),
			} ) as ResponsiveGap | undefined
		);
	};
	// 解除の対象はこのパネルが受け持つ間隔だけにする。
	const reset = () => onChange( undefined );
	return (
		<ToolsPanel
			panelId={ panelId }
			label={ title }
			icon={ icon }
			resetAll={ reset }
		>
			<ToolsPanelItem
				className="single-column"
				panelId={ panelId }
				label={ gapLabel }
				hasValue={ () =>
					!! value &&
					Object.values( value ).some( ( sizes ) =>
						Object.values( sizes ?? {} ).some( Boolean )
					)
				}
				isShownByDefault={ false }
				onDeselect={ reset }
			>
				<fieldset>
					<legend className="aktk-component__responsive-spacing-panel-label">
						{ gapLabel }
					</legend>
					{ ( [ 'column', 'row' ] as const ).map( ( axis ) => (
						<fieldset
							key={ axis }
							className="aktk-component__responsive-spacing-panel-axis"
						>
							<legend className="aktk-component__responsive-spacing-panel-label">
								{ labels[ axis ] }
							</legend>
							<ResponsiveSizeEdit
								value={ value?.[ axis ] ?? {} }
								onChange={ ( next ) => update( axis, next ) }
								label={ labels[ axis ] }
								min={ 0 }
							/>
						</fieldset>
					) ) }
				</fieldset>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
