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
	type Spacing,
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

const hasResponsiveSpacing = ( value?: ResponsiveSpacing ) => {
	return !! value?.tablet || !! value?.mobile;
};

const getDefaultSpacing = (
	value?: ResponsiveSpacing
): Spacing | undefined => {
	return value?.desktop;
};

const getResponsiveSpacing = (
	value?: ResponsiveSpacing
): ResponsiveSpacing | undefined => {
	if ( ! hasResponsiveSpacing( value ) ) {
		return undefined;
	}
	return value;
};

const toLegacyBoxPadding = (
	value: ResponsiveSpacingSelectOnChangeProps
): ResponsiveSpacing | undefined => {
	if ( value.responsiveSpacing ) {
		return stripUndefined( value.responsiveSpacing ) as ResponsiveSpacing;
	}
	if ( value.spacing ) {
		return stripUndefined( {
			desktop: value.spacing,
		} ) as ResponsiveSpacing;
	}
	return undefined;
};

/**
 * ボックス内側余白コントロール
 * @param props
 */
const BoxPadding = ( props: BoxPaddingProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;

	const boxPadding = attributes.boxPadding as ResponsiveSpacing | undefined;

	return (
		<BaseControl
			id="box-padding"
			label={ __( '余白設定', 'ystandard-toolbox' ) }
		>
			<ResponsiveSpacingSelect
				value={ getDefaultSpacing( boxPadding ) }
				responsiveValue={ getResponsiveSpacing( boxPadding ) }
				onChange={ ( newValue ) => {
					setAttributes( {
						boxPadding: toLegacyBoxPadding(
							newValue
						) as BoxAttributes[ 'boxPadding' ],
					} );
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
