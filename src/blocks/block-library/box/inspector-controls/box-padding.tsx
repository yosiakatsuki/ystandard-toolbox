/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ResponsiveSpacingSelect } from '@aktk/block-components/components/custom-spacing-select';

/*
 * Plugin Dependencies
 */
import type { BoxAttributes } from '../types';

interface BoxPaddingProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * ボックス内側余白コントロール
 * @param props
 */
const BoxPadding = ( props: BoxPaddingProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;

	const { boxPadding } = attributes;

	return (
		<BaseControl
			id="box-padding"
			label={ __( '余白設定', 'ystandard-toolbox' ) }
		>
			<ResponsiveSpacingSelect
				value={ boxPadding }
				onChange={ ( newValue ) => {
					setAttributes( { boxPadding: newValue } );
				} }
				responsiveControlStyle="vertical"
				useResponsive={ true }
				showResetButton={ true }
				sides={ [ 'top', 'right', 'bottom', 'left' ] }
				minimumCustomValue={ 0 }
			/>
		</BaseControl>
	);
};

export default BoxPadding;
