/**
 * WordPress
 */
import { ToggleControl } from '@wordpress/components';
import { useContext } from '@wordpress/element';

/**
 * yStandard
 */
import Notice from '@aktk/components/notice';

import { CustomCssContext } from './index';

const WPCustomCss = () => {
	const { settings, updateSettings } = useContext( CustomCssContext );
	if ( ! settings?.hasWPCustomCss || !! settings?.hideNotice ) {
		return <></>;
	}

	const handleOnChange = ( newValue ) => {
		updateSettings( { hideNotice: newValue } );
	};

	return (
		<Notice isWarning style={ { marginBottom: '1.5em' } }>
			<p>
				<strong>「追加CSS」の設定が見つかりました。</strong>
			</p>
			<p>
				カスタムCSS編集機能はWordPressの「追加CSS」とは別でCSSを管理しています。(v1.24.0以降)
			</p>
			<p>
				yStandard
				ToolboxのCSS編集機能のみを使う場合は「追加CSS」からコードをコピーし、カスタムCSS編集機能でCSSを保存した後、「追加CSS」のコードを削除してください。
			</p>
			<div style={ { marginTop: '2em' } }>
				<ToggleControl
					className={
						'ystdtb-settings-custom-css__hide-notice-toggle'
					}
					label={ 'このメッセージを非表示にする' }
					checked={ !! settings?.hideNotice }
					onChange={ handleOnChange }
				/>
			</div>
		</Notice>
	);
};
export default WPCustomCss;
