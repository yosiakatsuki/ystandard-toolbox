import { BaseControl, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { headingTag, textHtmlTag } from "../../config";

const HtmlTag = ( { attributes, setAttributes } ) => {

	const { subTextHtml, subTextStyleClear } = attributes;
	const handleHtmlTagOnChange = ( value ) => {
		setAttributes( {
			subTextHtml: value,
			subTextStyleClear: ! headingTag.includes( value ) ? undefined : subTextStyleClear,
		} );
	}
	const handleStyleClearOnChange = ( value ) => {
		setAttributes( {
			subTextStyleClear: value,
		} );
	}
	return (
		<>
			<BaseControl
				id={ 'subTextHtml' }
				label={ __( 'HTMLタグ', 'ystandard-toolbox' ) }
			>
				<SelectControl
					value={ subTextHtml }
					options={ textHtmlTag }
					onChange={ handleHtmlTagOnChange }
				/>

			</BaseControl>
			{ ( headingTag.includes( subTextHtml ) &&
				<BaseControl>
					<ToggleControl
						label={ __( '見出しスタイル削除', 'ystandard-toolbox' ) }
						onChange={ handleStyleClearOnChange }
						checked={ subTextStyleClear ?? true }
					/>
				</BaseControl>
			) }
		</>
	);
}
export default HtmlTag;
