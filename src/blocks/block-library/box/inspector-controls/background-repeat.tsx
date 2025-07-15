/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';
import { getComponentConfig } from '@aktk/helper/config';

/*
 * Plugin Dependencies
 */
import type { BoxAttributes } from '../types';

interface BackgroundRepeatProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * 背景画像繰り返しコントロール
 * @param props
 */
const BackgroundRepeat = ( props: BackgroundRepeatProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;

	const { backgroundImageRepeat } = attributes;

	const repeatOptions = getComponentConfig( 'backgroundRepeat' );

	// CustomSelectControl用にオプションを変換
	const selectOptions = repeatOptions.map( ( option: any ) => ( {
		key: option.value,
		name: option.label,
	} ) );

	const handleOnChange = ( value: string ) => {
		setAttributes( { backgroundImageRepeat: value as BoxAttributes['backgroundImageRepeat'] } );
	};

	return (
		<CustomSelectControl
			label={ __( '背景画像繰り返し', 'ystandard-toolbox' ) }
			value={ backgroundImageRepeat }
			options={ selectOptions }
			onChange={ handleOnChange }
			useEmptyValue={ false }
		/>
	);
};

export default BackgroundRepeat;
