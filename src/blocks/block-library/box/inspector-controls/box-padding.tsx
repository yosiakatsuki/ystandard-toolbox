/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import {
	ResponsiveSpacingSelect,
	type ResponsiveSpacing,
	type ResponsiveSpacingSelectOnChangeProps,
} from '@aktk/block-components/components/custom-spacing-select';
import { stripUndefined } from '@aktk/block-components/utils/object';

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
	// Padding.
	const boxPadding = attributes?.boxPadding as ResponsiveSpacing | undefined;

	const handleBoxPaddingChange = (
		newValue: ResponsiveSpacingSelectOnChangeProps
	): void => {
		let newBoxPadding: ResponsiveSpacing | undefined;
		if ( newValue.responsiveSpacing ) {
			newBoxPadding = stripUndefined(
				newValue.responsiveSpacing
			) as ResponsiveSpacing;
		} else if ( newValue.spacing ) {
			newBoxPadding = stripUndefined( {
				desktop: newValue.spacing,
			} ) as ResponsiveSpacing;
		} else {
			newBoxPadding = undefined;
		}

		setAttributes( {
			// @ts-expect-error
			boxPadding: newBoxPadding,
		} );
	};

	return (
		<BaseControl
			id="box-padding"
			label={ __( '余白設定', 'ystandard-toolbox' ) }
		>
			<ResponsiveSpacingSelect
				value={ boxPadding?.desktop }
				responsiveValue={ boxPadding }
				onChange={ handleBoxPaddingChange }
				responsiveControlStyle="vertical"
				useResponsive={ true }
				showResetButton={ true }
			/>
		</BaseControl>
	);
};

export default BoxPadding;
