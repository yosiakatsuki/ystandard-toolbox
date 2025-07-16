/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

/*
 * Plugin Dependencies
 */
import type { BoxEditProps } from '../types';

interface BoxBorderColorProps {
	boxBorderColor: BoxEditProps['boxBorderColor'];
	setBoxBorderColor: BoxEditProps['setBoxBorderColor'];
}

/**
 * ボックス枠線色コントロール
 * @param props
 */
const BoxBorderColor = ( props: BoxBorderColorProps ): React.ReactElement => {
	const { boxBorderColor, setBoxBorderColor } = props;

	return (
		<BaseControl label={ __( 'ボックス枠線色', 'ystandard-toolbox' ) }>
			<ColorPalette
				label={ __( 'ボックス枠線色', 'ystandard-toolbox' ) }
				value={ boxBorderColor.color || '' }
				onChange={ ( color ) => {
					setBoxBorderColor( color );
				} }
				enableCurrentColor={ true }
				enableTransparent={ true }
			/>
		</BaseControl>
	);
};

export default BoxBorderColor;
