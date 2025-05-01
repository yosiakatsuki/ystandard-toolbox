/**
 * WordPress
 */
import { __, _n } from '@wordpress/i18n';
/**
 * aktk Components.
 */
import { IconSelect } from '@aktk/block-components/components/icon-select';
import { getIconSvg } from '@aktk/block-components/utils/icon';
/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import { NoticeWarningText } from '@aktk/block-components/components/notice';

type PseudoElementsIconUpdateValue = {
	icon?: string;
	content?: string;
	[ name: string ]: unknown;
};

interface PseudoElementsIconProps {
	type: 'before' | 'after';
	value: string | undefined;
	hasContent?: boolean;
	onChange: ( newValue: PseudoElementsIconUpdateValue ) => void;
}

export function PseudoElementsIcon( props: PseudoElementsIconProps ) {
	const { value, onChange, type, hasContent = false } = props;

	const handleOnChange = ( newValue: string | undefined ) => {
		const svg = getIconSvg( newValue || '' );

		// 更新する値.
		let _newValue = {
			icon: newValue,
			content: svg || '',
		} as PseudoElementsIconUpdateValue;
		// アイコン設定がある場合は一部の設定をクリア.
		if ( svg ) {
			_newValue = {
				..._newValue,
				color: undefined,
				fontWeight: undefined,
				fontStyle: undefined,
				lineHeight: undefined,
				letterSpacing: undefined,
				backgroundColor: undefined,
				backgroundImage: undefined,
				backgroundRepeat: undefined,
				backgroundPosition: undefined,
				backgroundSize: undefined,
				border: undefined,
				borderRadius: undefined,
				width: undefined,
				height: undefined,
				maxWidth: undefined,
				maxHeight: undefined,
				minWidth: undefined,
				minHeight: undefined,
				display: undefined,
				fontFamily: undefined,
				background: undefined,
				textShadow: undefined,
				boxShadow: undefined,
			};
		} else {
			_newValue = {
				..._newValue,
				iconColor: undefined,
			};
		}

		onChange( _newValue );
	};

	return (
		<PluginSettingsBaseControl
			id={ `${ type }-icon` }
			label={ __( 'アイコン', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<IconSelect
				icon={ value || '' }
				onChange={ handleOnChange }
				disable={ hasContent }
			/>
			{ hasContent && (
				<NoticeWarningText>
					{ __(
						'※contentに入力がある場合、アイコン設定は使用できません。',
						'ystandard-toolbox'
					) }
				</NoticeWarningText>
			) }
			{ value && (
				<NoticeWarningText>
					{ __(
						'※アイコンの設定を使用中はいくつかの設定が無視されます。',
						'ystandard-toolbox'
					) }
					<br />
					{ __(
						'※アイコンの大きさは「文字サイズ」で調整してください。',
						'ystandard-toolbox'
					) }
				</NoticeWarningText>
			) }
		</PluginSettingsBaseControl>
	);
}
