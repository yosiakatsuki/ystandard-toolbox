/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import {
	type FlatBorder,
	BorderControl,
} from '@aktk/block-components/components/custom-border-select';

/**
 * Block Dependencies.
 */
import type { DlColumnBlockProps } from '../../types';

export function BorderSelect( props: DlColumnBlockProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { border } = attributes;

	const handleOnChange = ( value: FlatBorder | undefined ) => {
		setAttributes( { border: value } );
	};

	return (
		<BaseControl
			id="dl-column-border"
			label={ __( '枠線', 'ystandard-toolbox' ) }
		>
			<div className="ystdtb-dl-column-editor-border">
				<BorderControl
					value={ border }
					onChange={ handleOnChange }
					isCompact={ true }
				/>
			</div>
		</BaseControl>
	);
}
