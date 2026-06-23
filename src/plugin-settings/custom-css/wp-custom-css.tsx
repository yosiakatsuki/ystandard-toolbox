/**
 * WordPress Dependencies
 */
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
import { NoticeWarning } from '@aktk/block-components/components/notice';

/**
 * Plugin Dependencies
 */
import { CustomCssContext } from './index';

/**
 * WordPress標準のカスタムCSS警告コンポーネント
 * WordPressの「追加CSS」が検出された場合に警告メッセージを表示
 */
export default function WPCustomCss(): JSX.Element | null {
	// カスタムCSS設定のコンテキストから必要な値と関数を取得
	const { settings, updateSettings } = useContext( CustomCssContext );

	// WordPressのカスタムCSSがないか、通知を非表示にしている場合は何も表示しない
	if ( ! settings?.hasWPCustomCss || !! settings?.hideNotice ) {
		return null;
	}

	/**
	 * 通知非表示トグル変更時の処理
	 * @param newValue - 通知を非表示にするかどうか
	 */
	const handleOnChange = ( newValue: boolean ) => {
		updateSettings( { hideNotice: newValue } );
	};

	return (
		<NoticeWarning className="mb-6 pb-4">
			<p>
				<strong>
					{ __(
						'「追加CSS」の設定が見つかりました。',
						'ystandard-toolbox'
					) }
				</strong>
			</p>
			<p>
				{ __(
					'カスタムCSS編集機能はWordPressの「追加CSS」とは別でCSSを管理しています。(v2.0.0以降)',
					'ystandard-toolbox'
				) }
			</p>
			<p>
				{ __(
					'yStandard ToolboxのCSS編集機能のみを使う場合は「追加CSS」からコードをコピーし、カスタムCSS編集機能でCSSを保存した後、「追加CSS」のコードを削除してください。',
					'ystandard-toolbox'
				) }
			</p>
			<div className="mt-4">
				<ToggleControl
					className="ystdtb-settings-custom-css__hide-notice-toggle"
					label={ __(
						'このメッセージを非表示にする',
						'ystandard-toolbox'
					) }
					checked={ !! settings?.hideNotice }
					onChange={ handleOnChange }
				/>
			</div>
		</NoticeWarning>
	);
}
