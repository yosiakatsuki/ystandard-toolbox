/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

/*
 * Plugin Dependencies
 */
import type { BoxAttributes } from '../types';
import { borderStyles } from '../utils';

interface BoxBorderStyleProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * ボックス枠線スタイルコントロール
 * @param props
 */
const BoxBorderStyle = ( props: BoxBorderStyleProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;

	const { boxBorderStyle } = attributes;

	// CustomSelectControl用にオプションを変換
	const selectOptions = borderStyles.map( ( style ) => ( {
		key: style.value,
		name: style.label,
	} ) );

	return (
		<BaseControl>
			<CustomSelectControl
				label={ __( '枠線スタイル', 'ystandard-toolbox' ) }
				value={ boxBorderStyle }
				options={ selectOptions }
				onChange={ ( value ) => {
					setAttributes( {
						boxBorderStyle: value as BoxAttributes[ 'boxBorderStyle' ],
					} );
				} }
				useEmptyValue={ false }
			/>
		</BaseControl>
	);
};

export default BoxBorderStyle;
