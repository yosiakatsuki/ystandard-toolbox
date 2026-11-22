/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Block dependencies.
 */
import type { SliderEditProps } from '../../types';
// 設定.
import { ZoomType } from './zoom-type';
import { ZoomScale } from './zoom-scale';
import { ZoomEasing } from './zoom-easing';

/**
 * ズームアニメーションの種類・拡大率・動き方を設定するパネル.
 *
 * @param props スライダーの編集プロパティ.
 */
export function ZoomAnimation( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes, clientId } = props;
	const { zoomAnimation, zoomAnimationScale, zoomAnimationEasing } =
		attributes;
	const panelId = clientId + '-zoom-animation';

	// 拡大率・動き方は種類がないと効かないため、種類と一緒に消す.
	const resetZoomAnimation = () => {
		setAttributes( {
			zoomAnimation: undefined,
			zoomAnimationScale: undefined,
			zoomAnimationEasing: undefined,
		} );
	};

	return (
		<ToolsPanel
			label={ __( 'ズームアニメーション', 'ystandard-toolbox' ) }
			panelId={ panelId }
			resetAll={ resetZoomAnimation }
		>
			<ToolsPanelItem
				className="single-column"
				label={ __( '種類', 'ystandard-toolbox' ) }
				panelId={ panelId }
				hasValue={ () => !! zoomAnimation }
				onDeselect={ resetZoomAnimation }
				isShownByDefault
			>
				<ZoomType { ...props } />
			</ToolsPanelItem>
			{ /* 拡大率・動き方は、ズームする種類を選んだときだけ設定できる */ }
			{ zoomAnimation && (
				<>
					<ToolsPanelItem
						className="single-column"
						label={ __( '拡大率', 'ystandard-toolbox' ) }
						panelId={ panelId }
						hasValue={ () => undefined !== zoomAnimationScale }
						onDeselect={ () =>
							setAttributes( { zoomAnimationScale: undefined } )
						}
						isShownByDefault
					>
						<ZoomScale { ...props } />
					</ToolsPanelItem>
					<ToolsPanelItem
						className="single-column"
						label={ __( '動き方', 'ystandard-toolbox' ) }
						panelId={ panelId }
						hasValue={ () => !! zoomAnimationEasing }
						onDeselect={ () =>
							setAttributes( { zoomAnimationEasing: undefined } )
						}
						isShownByDefault
					>
						<ZoomEasing { ...props } />
					</ToolsPanelItem>
				</>
			) }
		</ToolsPanel>
	);
}
