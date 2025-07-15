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
import type { BoxAttributes } from '../types';
import { units } from '../utils';

interface LabelBorderRadiusProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * ラベル角丸コントロール
 * @param props
 */
const LabelBorderRadius = ( props: LabelBorderRadiusProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;

	const { labelBorderRadius } = attributes;

	return (
		<UnitControl
			label={ __( '角丸', 'ystandard-toolbox' ) }
			value={ labelBorderRadius }
			onChange={ ( value ) => {
				setAttributes( {
					labelBorderRadius: value,
				} );
			} }
			units={ units }
		/>
	);
};

export default LabelBorderRadius;
