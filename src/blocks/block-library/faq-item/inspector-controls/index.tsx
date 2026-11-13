/* WordPress Dependencies */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';
/* Block Dependencies */
import type { FaqItemEditProps } from '../types';
import { Design } from './design';
import { LabelBackground } from './styles/label-background';
import { LabelBorder } from './styles/label-border';
import { LabelSizePanel } from './styles/label-size';
import { LabelTypography } from './styles/label-typography';
import { LabelSpacing } from './styles/label-spacing';
import { ResponsiveTypography } from './styles/responsive-typography';
import { ResponsiveSpacing } from './styles/responsive-spacing';
import { ResponsiveLabelTypography } from './styles/responsive-label-typography';
import { ResponsiveLabelSpacing } from './styles/responsive-label-spacing';
import { ResponsiveSize } from './styles/responsive-size';

/**
 * 通常設定を先、端末別設定を後に配置する。
 * @param props ブロック編集プロパティ。
 */
export function InspectorControls( props: FaqItemEditProps ): JSX.Element {
	return (
		<>
			<WPInspectorControls>
				<Design { ...props } />
			</WPInspectorControls>
			<WPInspectorControls group="styles">
				<LabelTypography { ...props } />
				<LabelBackground { ...props } />
				<LabelBorder { ...props } />
				<LabelSpacing { ...props } />
				<LabelSizePanel { ...props } />
				<ResponsiveTypography { ...props } />
				<ResponsiveSpacing { ...props } />
				<ResponsiveLabelTypography { ...props } />
				<ResponsiveLabelSpacing { ...props } />
				<ResponsiveSize { ...props } />
			</WPInspectorControls>
		</>
	);
}
