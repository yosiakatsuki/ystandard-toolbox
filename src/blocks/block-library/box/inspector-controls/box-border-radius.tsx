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
import { BoxAttributes } from '../types';
import { availableUnits } from '../utils';

interface BoxBorderRadiusProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * ボックス枠線角丸コントロール
 * @param props
 */
const BoxBorderRadius = ( props: BoxBorderRadiusProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;
	// 単位ごとの刻みをコアに合わせ、em・%で小数を入力できるようにする。
	const units = useCustomUnits( { availableUnits } );

	const { boxBorderRadius } = attributes;

	return (
		<BaseControl>
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
		</BaseControl>
	);
};

export default BoxBorderRadius;
