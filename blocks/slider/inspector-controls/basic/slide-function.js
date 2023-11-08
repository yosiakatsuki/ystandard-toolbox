import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import CustomSelectControl from '@aktk/components/custom-select-control';

const SELECT_FUNCTION = [
	{
		name: __( '指定なし', 'ystandard-toolbox' ),
		key: '',
		style: {},
	},
	{
		name: __( 'ease', 'ystandard-toolbox' ),
		key: 'ease',
		style: {},
	},
	{
		name: __( 'linear', 'ystandard-toolbox' ),
		key: 'linear',
		style: {},
	},
	{
		name: __( 'ease-in', 'ystandard-toolbox' ),
		key: 'ease-in',
		style: {},
	},
	{
		name: __( 'ease-out', 'ystandard-toolbox' ),
		key: 'ease-out',
		style: {},
	},
	{
		name: __( 'ease-in-out', 'ystandard-toolbox' ),
		key: 'ease-in-out',
		style: {},
	},
];

const SlideFunction = ( { attributes, setAttributes } ) => {
	const { slideFunction, effect } = attributes;
	const handleOnChange = ( newValue ) => {
		setAttributes( { slideFunction: newValue } );
	};
	const _slideFunction = slideFunction ?? '';
	return (
		<>
			{ ( undefined === effect || 'slide' === effect ) && (
				<BaseControl
					id={ 'slide-function' }
					label={ __( 'スライド効果', 'ystandard-toolbox' ) }
				>
					<CustomSelectControl
						value={ _slideFunction }
						options={ SELECT_FUNCTION }
						onChange={ handleOnChange }
						__nextUnconstrainedWidth
					/>
				</BaseControl>
			) }
		</>
	);
};

export default SlideFunction;
