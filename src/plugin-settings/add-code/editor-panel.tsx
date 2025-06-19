/**
 * WordPress Dependencies
 */
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { CodeInput } from '@aktk/components/code-input';
import { NoticeSecondaryText } from '@aktk/block-components/components/notice';

/**
 * Plugin Dependencies
 */
import { AddCodeContext } from './index';
import { getAdminConfig } from '@aktk/plugin-settings/utils/config';

/**
 * コード追加タブの型定義
 */
interface CodeTab {
	name: string;
	title: string;
}

/**
 * コード追加エディターパネルのプロパティ型定義
 */
interface EditorPanelProps {
	tab: CodeTab;
}

/**
 * コード追加エディターパネルコンポーネント
 * ヘッダー、フッター、その他のコード編集エリアとAMP対応コードを提供
 */
export default function EditorPanel( { tab }: EditorPanelProps ): JSX.Element {
	// コード追加設定のコンテキストから必要な値と関数を取得
	const { settings, setSettings } = useContext( AddCodeContext );
	// 設定キーの定義
	const settingKey = tab.name;
	const settingKeyAmp = `${ tab.name }_amp`;
	// 現在のコード値を取得
	const code = settings?.[ settingKey ] ?? '';
	const codeAmp = settings?.[ settingKeyAmp ] ?? '';
	/**
	 * メインコード変更時の処理
	 * @param newValue - 新しいコード値
	 */
	const handleCodeOnChange = ( newValue: string ) => {
		setSettings( {
			...settings,
			...{
				[ settingKey ]: newValue,
			},
		} );
	};
	/**
	 * AMP用コード変更時の処理
	 * @param newValue - 新しいAMP用コード値
	 */
	const handleCodeAmpOnChange = ( newValue: string ) => {
		setSettings( {
			...settings,
			...{
				[ settingKeyAmp ]: newValue,
			},
		} );
	};
	// AMP機能が有効かどうかをチェック
	const useAmp = getAdminConfig( 'isAmpEnable', false );

	return (
		<div className="aktk-settings-add-code__editor-panel">
			<div className="space-y-4">
				<CodeInput
					value={ code }
					onChange={ handleCodeOnChange }
					language="html"
					minHeight="50vh"
				/>
				{ useAmp && (
					<NoticeSecondaryText>
						{ __(
							'入力したコードはAMPページでは出力されません。',
							'ystandard-toolbox'
						) }
						<br />
						{ __(
							'AMPページに出力したい内容は「AMP用コード追加」に追記してください。',
							'ystandard-toolbox'
						) }
					</NoticeSecondaryText>
				) }
			</div>
			{ useAmp && (
				<div className="mt-4 space-y-4">
					<label className="text-aktk-text-blue font-bold text-lg">
						{ __( 'AMP用コード追加', 'ystandard-toolbox' ) }
					</label>
					<CodeInput
						value={ codeAmp }
						onChange={ handleCodeAmpOnChange }
						language="html"
						minHeight="200px"
					/>
				</div>
			) }
		</div>
	);
}
