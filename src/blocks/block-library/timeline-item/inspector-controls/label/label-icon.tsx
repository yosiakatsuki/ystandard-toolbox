/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { IconSelect } from '@aktk/block-components/components/icon-select';

/**
 * Block dependencies.
 */
import type { TimeLineItemProps } from '../../types';

export function LabelIcon( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelType, labelContents } = attributes;

	if ( 'icon' !== labelType ) {
		return <></>;
	}

	const handleOnChange = ( value?: string ) => {
		setAttributes( {
			labelContents: ( value as string ) || undefined,
		} );
	};

	return (
		<BaseControl
			id="label-icon"
			label={ __( 'アイコン', 'ystandard-toolbox' ) }
		>
			<IconSelect
				icon={ labelContents || '' }
				label=""
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
