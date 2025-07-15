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

interface BoxBorderRadiusProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial<BoxAttributes> ) => void;
}

/**
 * ボックス枠線角丸コントロール
 */
const BoxBorderRadius = ( props: BoxBorderRadiusProps ) => {
	const { attributes, setAttributes } = props;

	const { boxBorderRadius } = attributes;

	return (
		<UnitControl
			label={ __( '枠線角丸', 'ystandard-toolbox' ) }
			value={ boxBorderRadius }
			onChange={ ( value ) => {
				setAttributes( {
					boxBorderRadius: value,
				} );
			} }
			units={ units }
		/>
	);
};

export default BoxBorderRadius;
