/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';
import { getBlockConfig } from '@aktk/helper/blockConfig';

/*
 * Plugin Dependencies
 */
import type { PartsEditProps, PartsOption } from '../types';

/**
 * パーツ選択コントロール
 *
 * @param {PartsEditProps} props - コンポーネントプロパティ
 */
const PartsId = ( props: PartsEditProps ) => {
	const { attributes, setAttributes } = props;
	const { partsId } = attributes;

	const defaultSelectLabel = __( '選択してください', 'ystandard-toolbox' );
	const partsList: PartsOption[] = getBlockConfig( 'partsList', [] );

	const options = [
		{ key: '', name: `-- ${ defaultSelectLabel } --` },
		...partsList.map( ( item ) => ( {
			key: String( item.value ),
			name: item.label,
		} ) ),
	];

	return (
		<BaseControl
			id={ 'parts' }
			label={ __( 'パーツ', 'ystandard-toolbox' ) }
		>
			<CustomSelectControl
				value={ partsId }
				options={ options }
				onChange={ ( value ) => {
					setAttributes( { partsId: value } );
				} }
				useEmptyValue={ false }
			/>
		</BaseControl>
	);
};

export default PartsId;
