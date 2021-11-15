import { BaseControl, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { headingTag, textHtmlTag } from "../../config";

const HtmlTag = ( { attributes, setAttributes } ) => {

	const { mainTextHtml, mainTextStyleClear } = attributes;
	const handleHtmlTagOnChange = ( value ) => {
		setAttributes( {
			mainTextHtml: value,
			mainTextStyleClear: ! headingTag.includes( value ) ? undefined : mainTextStyleClear,
		} );
	}
	const handleStyleClearOnChange = ( value ) => {
		setAttributes( {
			mainTextStyleClear: value,
		} );
	}
	return (
		<>
			<BaseControl
				id={ 'mainTextHtml' }
				label={ __( 'HTMLタグ', 'ystandard-toolbox' ) }
			>
				<SelectControl
					value={ mainTextHtml }
					options={ textHtmlTag }
					onChange={ handleHtmlTagOnChange }
				/>

			</BaseControl>
			{ ( headingTag.includes( mainTextHtml ) &&
				<BaseControl>
					<ToggleControl
						label={ __( '見出しスタイル削除', 'ystandard-toolbox' ) }
						onChange={ handleStyleClearOnChange }
						checked={ mainTextStyleClear ?? true }
					/>
				</BaseControl>
			) }
		</>
	);
}
export default HtmlTag;
