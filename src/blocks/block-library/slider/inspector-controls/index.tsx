/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { SliderEditProps } from '../types';
// 設定.
import { Basic } from './basic';
import { ZoomAnimation } from './zoom-animation';
import { Autoplay } from './autoplay';
import { Size } from './size';
import { Slide } from './slide';
import { Navigation } from './navigation';
import { Pagination } from './pagination';
import { Advanced } from './advanced';
import { NavigationStyle } from './styles/navigation';
import { ResponsiveNavigationSize } from './styles/responsive-navigation-size';

// @ts-ignore.
export function InspectorControls( props: SliderEditProps ): JSX.Element {
	return (
		<>
			<WPInspectorControls>
				<Basic { ...props } />
				{ /* ズームアニメーションは、フェードで自動再生する場合だけ設定できる */ }
				{ 'fade' === props.attributes.effect &&
					props.attributes.autoplay && (
						<ZoomAnimation { ...props } />
					) }
				<Autoplay { ...props } />
				<Size { ...props } />
				<Slide { ...props } />
				<Navigation { ...props } />
				<Pagination { ...props } />
				<Advanced { ...props } />
			</WPInspectorControls>
			{ /* 矢印のスタイルは、矢印を表示する場合だけ編集できる */ }
			{ props.attributes.hasNavigation && (
				<WPInspectorControls group="styles">
					<NavigationStyle { ...props } />
					<ResponsiveNavigationSize { ...props } />
				</WPInspectorControls>
			) }
		</>
	);
}
