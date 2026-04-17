/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';

/*
 * Plugin Dependencies
 */
import type { BoxAttributes } from '../types';
import { fontWeightList } from '../utils';

interface LabelFontWeightProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * ラベル文字の太さコントロール
 * @param props
 */
const LabelFontWeight = ( props: LabelFontWeightProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;

	const { labelWeight } = attributes;

	return (
		<BaseControl
			id="label-font-weight"
			label={ __( '文字の太さ', 'ystandard-toolbox' ) }
		>
			<HorizonButtonSelect
				value={ labelWeight }
				options={ fontWeightList }
				onChange={ ( value ) =>
					setAttributes( {
						labelWeight: value as BoxAttributes[ 'labelWeight' ],
					} )
				}
			/>
		</BaseControl>
	);
};

export default LabelFontWeight;
