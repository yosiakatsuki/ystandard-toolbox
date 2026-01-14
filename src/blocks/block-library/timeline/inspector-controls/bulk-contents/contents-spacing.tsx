/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';

/**
 * Block dependencies.
 */
import type { TimeLineInspectorProps } from '../../types';

const OPTIONS = [
	{ label: __( '小', 'ystandard-toolbox' ), value: 'small' },
	{ label: __( '通常', 'ystandard-toolbox' ), value: 'normal' },
	{ label: __( '大', 'ystandard-toolbox' ), value: 'large' },
];

export function ContentsSpacing( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	const [ innerMargin, setInnerMargin ] = useState< string | undefined >(
		firstChildAttributes?.contentsInnerMargin
	);
	const handleOnChange = ( value: string | number | boolean ) => {
		updateChildAttributes( {
			contentsInnerMargin: value,
		} );
		setInnerMargin( value as string );
	};
	return (
		<BaseControl
			id="contents-spacing"
			label={ __( 'コンテンツ間の余白', 'ystandard-toolbox' ) }
		>
			<HorizonButtonSelect
				value={ innerMargin }
				options={ OPTIONS }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
