/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * aktk Components.
 */
import { IconSelect } from '@aktk/block-components/components/icon-select';
import { getIconSvg } from '@aktk/block-components/utils/icon';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import { NoticeWarningText } from '@aktk/block-components/components/notice';

interface PseudoElementsIconProps {
	type: 'before' | 'after';
	value: string | undefined;
	hasContent?: boolean;
	onChange: ( newValue: {
		icon?: string;
		content?: string;
		[ name: string ]: unknown;
	} ) => void;
}

export function PseudoElementsIcon( props: PseudoElementsIconProps ) {
	const { value, onChange, type, hasContent = false } = props;

	const handleOnChange = ( newValue: string | undefined ) => {
		const svg = getIconSvg( newValue || '' );
		onChange( {
			icon: newValue,
			content: svg || '',
		} );

		// アイコン設定によって削除する設定.
		if ( svg ) {
			onChange( {
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
			} );
		} else {
			// アイコン設定がなくなったら削除する設定.
			onChange( {
				iconColor: undefined,
			} );
		}
	};

	return (
		<BaseControl
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
		</BaseControl>
	);
}
