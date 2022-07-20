import './_font-family.scss';
/**
 * WordPress
 */
import { useContext } from '@wordpress/element';
import { PanelBody, Button } from '@wordpress/components';

/**
 * yStandard
 */
import InputControls from '@aktk/components/input-controls';
import Notice from '@aktk/components/notice';
import BaseControl from '@aktk/plugin-settings/components/base-control';
import Stack from '@aktk/plugin-settings/components/stack';
import { FontContext } from './index';

const FontFamily = () => {
	const { settings, updateSettings } = useContext( FontContext );
	const placeholder = !! settings?.family ? '' : settings?.themeFontSetting;
	const handleOnChange = ( newValue ) => {
		updateSettings( {
			family: newValue,
		} );
	};
	const handleOnClickCopyFontFamily = () => {
		updateSettings( {
			family: settings?.themeFontSetting,
		} );
	};
	return (
		<PanelBody title={ 'フォント指定の編集' }>
			<div className="ystdtb-setting-font-family__input">
				<InputControls
					label={ 'font-family :' }
					labelPosition={ 'side' }
					value={ settings?.family }
					onChange={ handleOnChange }
					placeholder={ placeholder }
				/>
				<Notice isHelp isTextSmall>
					※追加したWebフォント等を含めた font-family
					を入力してください。
				</Notice>
			</div>
			{ ! settings?.family && (
				<BaseControl
					label={ 'フォント設定のコピー' }
					id={ 'copy-font-family' }
					isFullWidth
				>
					<Stack>
						<Notice isHelp isTextSmall>
							※現在の設定では
							<code style={ { fontSize: '1em' } }>
								{ settings?.themeFontSetting }
							</code>
							が有効になっています。
							<br />
							※現在のフォント設定をコピーして、追加したフォントの指定を追記してください。
						</Notice>
						<div>
							<Button
								isSmall
								isSecondary
								onClick={ handleOnClickCopyFontFamily }
							>
								現在のフォント設定をコピーする
							</Button>
						</div>
					</Stack>
				</BaseControl>
			) }
		</PanelBody>
	);
};
export default FontFamily;
