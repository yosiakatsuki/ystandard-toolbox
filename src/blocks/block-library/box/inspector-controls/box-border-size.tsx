/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import UnitControl from '@aktk/block-components/wp-controls/unit-control';

/*
 * Plugin Dependencies
 */
import { BoxAttributes } from '../types';
import { units } from '../utils';

interface BoxBorderSizeProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial<BoxAttributes> ) => void;
}

/**
 * ボックス枠線サイズコントロール
 */
const BoxBorderSize = ( props: BoxBorderSizeProps ) => {
	const { attributes, setAttributes } = props;

	const { boxBorderSize } = attributes;

	return (
		<UnitControl
			label={ __( '枠線サイズ', 'ystandard-toolbox' ) }
			value={ boxBorderSize }
			onChange={ ( value ) => {
				setAttributes( {
					boxBorderSize: value,
				} );
			} }
			units={ units }
		/>
	);
};

export default BoxBorderSize;
