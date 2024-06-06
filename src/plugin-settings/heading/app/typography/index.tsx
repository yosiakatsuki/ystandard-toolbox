/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Akatsuki
 */
import { OpenPanel } from '@aktk/block-components/components/panel';

/**
 * Controls
 */
import FontSize from './font-size';

/**
 * 文字サイズ設定
 */
export default function Typography() {
	return (
		<OpenPanel title={ __( '文字設定', 'ystandard-toolbox' ) }>
			<FontSize />
			<div>作成中</div>
		</OpenPanel>
	);
}
