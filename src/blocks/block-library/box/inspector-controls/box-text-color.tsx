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
import { BoxEditProps } from '../types';

interface BoxTextColorProps {
	boxTextColor: BoxEditProps['boxTextColor'];
	setBoxTextColor: BoxEditProps['setBoxTextColor'];
}

/**
 * ボックス文字色コントロール
 * @param props
 */
const BoxTextColor = ( props: BoxTextColorProps ): React.ReactElement => {
	const { boxTextColor, setBoxTextColor } = props;

	return (
		<BaseControl>
			<ColorPalette
				label={ __( 'ボックス文字色', 'ystandard-toolbox' ) }
				value={ boxTextColor.color || '' }
				onChange={ ( color ) => {
					setBoxTextColor( color );
				} }
				enableCurrentColor={ true }
				enableTransparent={ true }
			/>
		</BaseControl>
	);
};

export default BoxTextColor;
