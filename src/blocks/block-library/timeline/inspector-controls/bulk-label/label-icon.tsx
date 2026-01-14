/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { IconSelect } from '@aktk/block-components/components/icon-select';

/**
 * Block dependencies.
 */
import type { TimeLineInspectorProps } from '../../types';

export function LabelIcon( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	const getDefaultIcon = () => {
		return 'icon' === firstChildAttributes?.labelType
			? firstChildAttributes?.labelContents
			: 'bookmark';
	};
	const [ icon, setIcon ] = useState< string | undefined >(
		getDefaultIcon()
	);
	useEffect( () => {
		setIcon( getDefaultIcon() );
	}, [ firstChildAttributes?.labelType ] );

	if ( 'icon' !== firstChildAttributes?.labelType ) {
		return <></>;
	}

	const handleOnChange = ( value?: string ) => {
		updateChildAttributes( {
			labelContents: ( value as string ) || undefined,
		} );
		setIcon( value );
	};

	return (
		<BaseControl
			id="label-icon"
			label={ __( 'アイコン', 'ystandard-toolbox' ) }
		>
			<IconSelect
				icon={ icon || '' }
				label=""
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
