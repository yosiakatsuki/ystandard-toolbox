/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Akatsuki
 */
import { OpenPanel } from '@aktk/block-components/components/panel';

export default function Typography() {
	return (
		<OpenPanel title={ __( '文字設定', 'ystandard-toolbox' ) }>
			<div>作成中</div>
		</OpenPanel>
	);
}
