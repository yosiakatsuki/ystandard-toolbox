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
	const { subTextHtml, subTextStyleClear } = attributes;
	const handleHtmlTagOnChange = ( value ) => {
		setAttributes( {
			subTextHtml: value,
			subTextStyleClear: ! headingTag.includes( value )
				? undefined
				: subTextStyleClear,
		} );
	};
	const handleStyleClearOnChange = ( value ) => {
		setAttributes( {
			subTextStyleClear: value,
		} );
	};
	return (
		<>
			<BaseControl
				id={ 'subTextHtml' }
			>
				<CustomSelectControl
					label={ __( 'HTMLタグ', 'ystandard-toolbox' ) }
					value={ subTextHtml }
					options={ textHtmlTag }
					onChange={ handleHtmlTagOnChange }
				/>
			</BaseControl>
			{ headingTag.includes( subTextHtml ) && (
				<BaseControl id="sub-text-style-clear">
					<ToggleControl
						label={ __(
							'見出しスタイル削除',
							'ystandard-toolbox'
						) }
						onChange={ handleStyleClearOnChange }
						checked={ subTextStyleClear ?? true }
					/>
				</BaseControl>
			) }
		</>
	);
};
export default HtmlTag;
