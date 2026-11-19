/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import { ResponsiveSizeEdit } from '../custom-size-control';
import type { ResponsiveValues } from '../../types';
import { ToolsPanel, ToolsPanelItem } from '../../wp-controls/tools-panel';
import type { UnitType } from '../../wp-controls/unit-control';

const dimensions = [
	'width',
	'minWidth',
	'maxWidth',
	'height',
	'minHeight',
	'maxHeight',
] as const;
type Dimension = ( typeof dimensions )[ number ];
export type ResponsiveDimensions = Partial<
	Record< Dimension, ResponsiveValues >
>;
export type ResponsiveSizeSettings = Partial< Record< Dimension, boolean > >;

type ResponsiveSizePanelProps = {
	panelId: string;
	title: string;
	icon?: React.ReactNode;
	settings: ResponsiveSizeSettings;
	labels?: Partial< Record< Dimension, string > >;
	units?: UnitType[];
	value?: ResponsiveDimensions;
	onChange: ( changes: ResponsiveDimensions ) => void;
};

/**
 * ブロックが有効にした寸法をパネル項目として表示し、変更した項目だけを返す。
 * @param props ブロックが使う寸法と端末別の値。
 */
export function ResponsiveSizePanel( props: ResponsiveSizePanelProps ) {
	const { panelId, title, icon, settings, units, value, onChange } = props;
	const enabled = dimensions.filter( ( key ) => settings[ key ] );
	// ブロックが項目名を渡した寸法だけ、既定の名称を差し替える。
	const labels = {
		width: __( '幅', 'ystandard-toolbox' ),
		minWidth: __( '最小幅', 'ystandard-toolbox' ),
		maxWidth: __( '最大幅', 'ystandard-toolbox' ),
		height: __( '高さ', 'ystandard-toolbox' ),
		minHeight: __( '最小高さ', 'ystandard-toolbox' ),
		maxHeight: __( '最大高さ', 'ystandard-toolbox' ),
		...props.labels,
	};
	// 全解除でも、このブロックで表示している項目だけをまとめて更新する。
	const resetAll = () =>
		onChange(
			Object.fromEntries( enabled.map( ( key ) => [ key, undefined ] ) )
		);
	// 空欄の端末を除き、最後の端末を解除したら項目自体を消す。
	const update = ( key: Dimension, next: ResponsiveValues ) => {
		const entries = Object.entries( next ).filter(
			( [ , size ] ) => !! size
		);
		onChange( {
			[ key ]: entries.length ? Object.fromEntries( entries ) : undefined,
		} );
	};
	if ( ! enabled.length ) {
		return null;
	}
	return (
		<ToolsPanel
			panelId={ panelId }
			label={ title }
			icon={ icon }
			resetAll={ resetAll }
		>
			{ enabled.map( ( key ) => (
				<ToolsPanelItem
					key={ key }
					className="single-column"
					panelId={ panelId }
					label={ labels[ key ] }
					isShownByDefault={ false }
					hasValue={ () =>
						Object.values( value?.[ key ] ?? {} ).some( Boolean )
					}
					onDeselect={ () => onChange( { [ key ]: undefined } ) }
				>
					<fieldset>
						<legend className="aktk-component__responsive-size-panel-label">
							{ labels[ key ] }
						</legend>
						<ResponsiveSizeEdit
							value={ value?.[ key ] ?? {} }
							onChange={ ( next ) => update( key, next ) }
							units={ units }
							label={ labels[ key ] }
							min={ 0 }
						/>
					</fieldset>
				</ToolsPanelItem>
			) ) }
		</ToolsPanel>
	);
}
