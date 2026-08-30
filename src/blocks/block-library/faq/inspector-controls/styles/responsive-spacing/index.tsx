/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk dependencies.
 */
import {
	hasResponsiveSpacingValue,
	ResponsiveSpacingControl,
} from '@aktk/block-components/components/responsive-spacing-control';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Plugin dependencies.
 */
import { PanelIcon } from '@aktk/components/ystandard-icon';

/**
 * Block dependencies.
 */
import type { FaqEditProps } from '../../../types';
import { getResponsiveSpacing, updateResponsiveSpacing } from '../../../utils';

const PANEL_ID = 'ystdtb-faq-responsive-spacing';

/**
 * FAQのレスポンシブ余白設定.
 *
 * @param props ブロック編集プロパティ.
 * @return レスポンシブ余白パネル.
 */
export function ResponsiveSpacing( props: FaqEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { margin, padding } = getResponsiveSpacing( attributes ) ?? {};

	// margin設定だけをリセットする.
	const resetMargin = () => {
		setAttributes( {
			style: updateResponsiveSpacing( attributes.style, {
				margin: undefined,
				padding,
			} ),
		} );
	};

	// padding設定だけをリセットする.
	const resetPadding = () => {
		setAttributes( {
			style: updateResponsiveSpacing( attributes.style, {
				margin,
				padding: undefined,
			} ),
		} );
	};

	// レスポンシブ余白をまとめてリセットする.
	const resetAll = () => {
		setAttributes( {
			style: updateResponsiveSpacing( attributes.style, undefined ),
		} );
	};

	return (
		<ToolsPanel
			icon={ <PanelIcon /> }
			label={ __( 'レスポンシブ余白', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ resetAll }
		>
			<ToolsPanelItem
				className="single-column"
				hasValue={ () => hasResponsiveSpacingValue( padding ) }
				label={ __( 'パディング', 'ystandard-toolbox' ) }
				onDeselect={ resetPadding }
				panelId={ PANEL_ID }
				isShownByDefault={ false }
			>
				<ResponsiveSpacingControl
					id="ystdtb-faq-responsive-padding"
					label={ __( 'パディング', 'ystandard-toolbox' ) }
					value={ padding }
					onChange={ ( newPadding ) => {
						setAttributes( {
							style: updateResponsiveSpacing( attributes.style, {
								margin,
								padding: newPadding,
							} ),
						} );
					} }
					allowedSides={ [ 'top', 'right', 'bottom', 'left' ] }
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				className="single-column"
				hasValue={ () => hasResponsiveSpacingValue( margin ) }
				label={ __( 'マージン', 'ystandard-toolbox' ) }
				onDeselect={ resetMargin }
				panelId={ PANEL_ID }
				isShownByDefault={ false }
			>
				<ResponsiveSpacingControl
					id="ystdtb-faq-responsive-margin"
					label={ __( 'マージン', 'ystandard-toolbox' ) }
					value={ margin }
					onChange={ ( newMargin ) => {
						setAttributes( {
							style: updateResponsiveSpacing( attributes.style, {
								margin: newMargin,
								padding,
							} ),
						} );
					} }
					allowedSides={ [ 'top', 'bottom' ] }
					minimumCustomValue={ -9999 }
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
