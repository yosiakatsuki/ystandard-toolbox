/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
/**
 * Block Dependencies.
 */
import type { DlColumnBlockProps } from '../../types';

export function StackOnToggle( props: DlColumnBlockProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { isStackedOnMobile, isStackedOnTablet } = attributes;

	const handleOnChangeMobile = ( value: boolean ) => {
		setAttributes( { isStackedOnMobile: value } );
	};
	const handleOnChangeTablet = ( value: boolean ) => {
		setAttributes( { isStackedOnTablet: value } );
	};

	return (
		<BaseControl
			id="dl-column-stack-on"
			label={ __( '縦に並べるタイミング', 'ystandard-toolbox' ) }
		>
			<ToggleControl
				label={ __( 'モバイルで縦に並べる', 'ystandard-toolbox' ) }
				checked={ isStackedOnMobile }
				onChange={ handleOnChangeMobile }
			/>
			<ToggleControl
				label={ __( 'タブレットで縦に並べる', 'ystandard-toolbox' ) }
				checked={ isStackedOnTablet }
				onChange={ handleOnChangeTablet }
			/>
		</BaseControl>
	);
}
