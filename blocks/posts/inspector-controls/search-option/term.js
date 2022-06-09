/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';
import TermSelect from '@aktk/components/term-select';

const Term = ( { attributes, setAttributes } ) => {
	const { taxonomy, termSlug } = attributes;
	const handleOnChange = ( newValue ) => {
		setAttributes( {
			termSlug: newValue,
			postIn: undefined,
			postNameIn: undefined,
			postParent: undefined,
		} );
	};
	return (
		<>
			{ !! taxonomy && (
				<BaseControl>
					<TermSelect
						label={ __( 'カテゴリー・タグ', 'ystandard-toolbox' ) }
						value={ termSlug }
						taxonomy={ taxonomy }
						onChange={ handleOnChange }
					/>
				</BaseControl>
			) }
		</>
	);
};
export default Term;
