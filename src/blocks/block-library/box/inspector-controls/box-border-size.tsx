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
	// 単位ごとの刻みをコアに合わせ、em・%で小数を入力できるようにする。
	const units = useCustomUnits( { availableUnits } );

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
