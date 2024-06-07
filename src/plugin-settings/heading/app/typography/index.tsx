/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Akatsuki
 */
import { OpenPanel } from '@aktk/block-components/components/panel';
/**
 * CSS
 */
import './style-editor.scss';
/**
 * Controls
 */
import FontSize from './font-size';
import TextColor from './text-color';
import TextAlign from './text-align';
import FontWeight from './font-weight';

/**
 * 文字設定
 */
export default function Typography() {
	return (
		<OpenPanel title={ __( '文字設定', 'ystandard-toolbox' ) }>
			<div className={ 'flex flex-col gap-8' }>
				<FontSize />
				<TextColor />
				<TextAlign />
				<FontWeight />
			</div>
		</OpenPanel>
	);
}
