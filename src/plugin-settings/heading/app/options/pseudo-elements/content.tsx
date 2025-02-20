/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import InputControl from '@aktk/block-components/wp-controls/input-control';
import { NoticeWarningText } from '@aktk/block-components/components/notice';

interface PseudoElementsContentProps {
	type: 'before' | 'after';
	value: string | undefined;
	onChange: ( newValue: { content?: string; icon?: string } ) => void;
	hasIcon?: boolean;
}

export function PseudoElementsContent( props: PseudoElementsContentProps ) {
	const { value, onChange, type, hasIcon } = props;

	const handleOnChange = ( newValue: string | undefined ) => {
		onChange( {
			content: newValue,
		} );
	};

	const handleOnClear = () => {
		onChange( {
			content: '',
			icon: undefined,
		} );
	};

	return (
		<BaseControl id={ `${ type }-content` } isFullWidth={ true }>
			<InputControl
				value={ value || '' }
				onChange={ handleOnChange }
				readOnly={ hasIcon }
			/>
			{ hasIcon && (
				<NoticeWarningText>
					{ __(
						'※アイコンの設定を使用中はcontentの編集はできません',
						'ystandard-toolbox'
					) }
				</NoticeWarningText>
			) }
			<div className="flex justify-end">
				<Button
					variant={ 'tertiary' }
					onClick={ handleOnClear }
					size={ 'small' }
				>
					{ __( 'クリア', 'ystandard-toolbox' ) }
				</Button>
			</div>
		</BaseControl>
	);
}
