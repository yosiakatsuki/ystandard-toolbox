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

interface BoxBackgroundColorProps {
	boxBackgroundColor: BoxEditProps['boxBackgroundColor'];
	setBoxBackgroundColor: BoxEditProps['setBoxBackgroundColor'];
}

/**
 * ボックス背景色コントロール
 * @param props
 */
const BoxBackgroundColor = ( props: BoxBackgroundColorProps ): React.ReactElement => {
	const { boxBackgroundColor, setBoxBackgroundColor } = props;

	return (
		<BaseControl label={ __( 'ボックス背景色', 'ystandard-toolbox' ) }>
			<ColorPalette
				label={ __( 'ボックス背景色', 'ystandard-toolbox' ) }
				value={ boxBackgroundColor.color || '' }
				onChange={ ( color ) => {
					setBoxBackgroundColor( color );
				} }
				enableCurrentColor={ true }
				enableTransparent={ true }
			/>
		</BaseControl>
	);
};

export default BoxBackgroundColor;
