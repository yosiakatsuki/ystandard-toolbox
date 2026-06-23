/**
 * WordPress
 */
import { useState } from '@wordpress/element';

/**
 * Plugin
 */
import { apiPost, getEndpoint, SUCCESS } from '@aktk/api';
import Buttons from '@aktk/plugin-settings/components/buttons';
import {
	PluginSettingsPanel,
	PanelInner,
} from '@aktk/plugin-settings/components/panel';
import {
	notifyError,
	notifySuccess,
} from '@aktk/block-components/components/toast-message';

export default function Migration() {
	const [ isButtonDisable, setIsButtonDisable ] = useState( false );
	const [ isCompletedMigration, setIsCompletedMigration ] = useState( false );

	const handleOnClick = () => {
		setIsButtonDisable( true );
		apiPost( {
			endpoint: getEndpoint( 'migration_heading_v1_v2' ),
			data: { migration: true },
			callback: ( response ) => {
				if ( SUCCESS === response.status ) {
					setIsCompletedMigration( true );
				}
				setIsButtonDisable( false );
			},
			// @ts-ignore
			messageSuccess: notifySuccess,
			// @ts-ignore
			messageError: notifyError,
		} );
	};

	return (
		<>
			{ /* @ts-ignore */ }
			<PluginSettingsPanel title={ '旧設定から新設定への移行' }>
				<PanelInner>
					{ isCompletedMigration ? (
						<div>
							<p>設定移行が完了しました。</p>
							<p>ページ再読み込みをしてください。</p>
							<p>
								<a href={ location.href }>
									» ページを再読み込みする «
								</a>
							</p>
						</div>
					) : (
						<div>
							<p>見出し設定は旧バージョンで動作しています。</p>
							<p>
								設定を変更するためには新バージョンへ設定を変換する必要があります。
							</p>
							<p>
								下記ボタンをクリックして設定を変換した後、表示の確認・調整をしてください。
							</p>
							<div style={ { height: '2em' } } />
							<Buttons
								onClickUpdate={ handleOnClick }
								text={ '設定変換を実行する' }
								isDisabled={ isButtonDisable }
							/>
						</div>
					) }
				</PanelInner>
			</PluginSettingsPanel>
		</>
	);
}
