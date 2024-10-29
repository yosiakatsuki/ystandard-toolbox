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
	onChange: ( newValue: { icon?: string; content?: string } ) => void;
}

export function PseudoElementsIcon( props: PseudoElementsIconProps ) {
	const { value, onChange, type, hasContent = false } = props;

	const handleOnChange = ( newValue: string | undefined ) => {
		const svg = getIconSvg( newValue || '' );
		onChange( {
			icon: newValue,
			content: svg || '',
		} );
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
		</BaseControl>
	);
}
