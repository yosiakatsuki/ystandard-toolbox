import { BaseControl, RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { paginationOptions } from "../../config";

const Pagination = ( { attributes, setAttributes } ) => {
	const { paginationType } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { paginationType: value } );
	}
	return (
		<BaseControl
			id={ 'paginationType' }
			label={ __( 'ページネーションタイプ', 'ystandard-toolbox' ) }
		>
			<RadioControl
				selected={ paginationType ?? '' }
				onChange={ handleOnChange }
				options={ paginationOptions }
			/>
		</BaseControl>
	);
}

export default Pagination;
