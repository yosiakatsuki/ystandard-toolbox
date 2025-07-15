/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';

/*
 * Plugin Dependencies
 */
import { BoxAttributes } from '../types';
import { units } from '../utils';

interface BoxBorderSizeProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * ボックス枠線サイズコントロール
 * @param props
 */
const BoxBorderSize = ( props: BoxBorderSizeProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;

	const { boxBorderSize } = attributes;

	return (
		<BaseControl>
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
		</BaseControl>
	);
};

export default BoxBorderSize;
