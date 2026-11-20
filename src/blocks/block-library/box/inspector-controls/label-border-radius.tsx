/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl, {
	useCustomUnits,
} from '@aktk/block-components/wp-controls/unit-control';

/*
 * Plugin Dependencies
 */
import type { BoxAttributes } from '../types';
import { availableUnits } from '../utils';

interface LabelBorderRadiusProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * ラベル角丸コントロール
 * @param props
 */
const LabelBorderRadius = (
	props: LabelBorderRadiusProps
): React.ReactElement => {
	const { attributes, setAttributes } = props;
	// 単位ごとの刻みをコアに合わせ、em・%で小数を入力できるようにする。
	const units = useCustomUnits( { availableUnits } );

	const { labelBorderRadius } = attributes;

	return (
		<BaseControl>
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
		</BaseControl>
	);
};

export default LabelBorderRadius;
