/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
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
				label={ __( 'HTMLタグ', 'ystandard-toolbox' ) }
			>
				<SelectControl
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
