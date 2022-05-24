import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { getBlockConfig } from '@ystd/helper/blockConfig';

const listTypes = [
	{ label: __( 'カード', 'ystandard-toolbox' ), value: 'card' },
	{ label: __( 'リスト', 'ystandard-toolbox' ), value: 'list' },
	{ label: __( 'シンプル', 'ystandard-toolbox' ), value: 'simple' },
];

const ListDesign = ( { attributes, setAttributes } ) => {
	const { listType } = attributes;
	const config = getBlockConfig( 'postsDesign', [] );
	let options = listTypes;
	if ( config ) {
		options = [ ...listTypes, ...config ];
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
