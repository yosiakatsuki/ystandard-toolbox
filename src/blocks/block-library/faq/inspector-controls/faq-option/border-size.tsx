/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';

// @ts-ignore.
export function BorderSize( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { borderSize, borderType } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( { borderSize: value || undefined } );
	};

	if ( ! borderType ) {
		return <></>;
	}

	return (
		<BaseControl
			id="faq-border-size"
			label={ __( '枠線サイズ', 'ystandard-toolbox' ) }
		>
			<UnitControl value={ borderSize } onChange={ handleOnChange } />
		</BaseControl>
	);
}
