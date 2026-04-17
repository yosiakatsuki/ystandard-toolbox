/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';
import { headingTag, textHtmlTag } from '../../config';

const HtmlTag = ( { attributes, setAttributes } ) => {
	const { mainTextHtml, mainTextStyleClear } = attributes;
	const handleHtmlTagOnChange = ( value ) => {
		// 「-- 選択してください --」を選んだ時は空文字が渡ってくるため undefined に揃える。
		// 空文字をそのまま保持すると RichText の tagName="" で createElement が失敗する。
		const nextValue = value || undefined;
		setAttributes( {
			mainTextHtml: nextValue,
			mainTextStyleClear: ! headingTag.includes( nextValue )
				? undefined
				: mainTextStyleClear,
		} );
	};
	const handleStyleClearOnChange = ( value ) => {
		setAttributes( {
			mainTextStyleClear: value,
		} );
	};
	return (
		<>
			<BaseControl
				id={ 'mainTextHtml' }
			>
				<CustomSelectControl
					label={ __( 'HTMLタグ', 'ystandard-toolbox' ) }
					value={ mainTextHtml }
					options={ textHtmlTag }
					onChange={ handleHtmlTagOnChange }
					useEmptyValue={ false }
				/>
			</BaseControl>
			{ headingTag.includes( mainTextHtml ) && (
				<BaseControl id="main-text-style-clear">
					<ToggleControl
						label={ __(
							'見出しスタイル削除',
							'ystandard-toolbox'
						) }
						onChange={ handleStyleClearOnChange }
						checked={ mainTextStyleClear ?? true }
					/>
				</BaseControl>
			) }
		</>
	);
};
export default HtmlTag;
