import { listTypeSelect } from '../../config';
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { getBlockConfig } from '@ystd/helper/blockConfig';

const ListDesign = ( { attributes, setAttributes } ) => {
	const { listType } = attributes;
	const config = getBlockConfig( 'postsDesign', [] );
	let options = listTypeSelect;
	if ( config ) {
		options = [ ...listTypeSelect, ...config ];
	}

	return (
		<>
			<SelectControl
				label={ __( 'デザイン', 'ystandard-toolbox' ) }
				value={ listType }
				options={ options }
				onChange={ ( value ) => {
					setAttributes( { listType: value } );
				} }
			/>
		</>
	);
};

export default ListDesign;
