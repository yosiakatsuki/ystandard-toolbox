import { __ } from '@wordpress/i18n';
import { BaseControl, SelectControl } from '@wordpress/components';
import { getBlockConfig } from '@ystd/helper/blockConfig';

const PartsId = ( props ) => {
	const { attributes, setAttributes } = props;
	const { partsId } = attributes;
	const defaultSelectLabel = __( '選択してください', 'ystandard-toolbox' );
	const defaultSelect = [
		{
			label: `-- ${ defaultSelectLabel } --`,
			value: '',
		},
	];
	const partsIdList = [
		...defaultSelect,
		...getBlockConfig( 'partsList', [] ),
	];
	return (
		<>
			<BaseControl __nextHasNoMarginBottom>
				<SelectControl
					label={ __( 'パーツ', 'ystandard-toolbox' ) }
					value={ partsId }
					options={ partsIdList }
					onChange={ ( value ) => {
						setAttributes( { partsId: value } );
					} }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			</BaseControl>
		</>
	);
};

export default PartsId;
