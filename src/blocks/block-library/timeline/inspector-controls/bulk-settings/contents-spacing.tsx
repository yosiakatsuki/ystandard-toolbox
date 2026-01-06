/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/**
 * Block dependencies.
 */
import type { TimeLineInspectorProps } from '../../types';
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';

const OPTIONS = [
	{ label: __( '小', 'ystandard-toolbox' ), value: 'small' },
	{ label: __( '通常', 'ystandard-toolbox' ), value: 'normal' },
	{ label: __( '大', 'ystandard-toolbox' ), value: 'large' },
];

export function ContentsSpacing( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes } = props;
	const handleOnChange = ( value: string | number | boolean ) => {
		updateChildAttributes( {
			contentsInnerMargin: value,
		} );
	};
	return (
		<BaseControl
			id="contents-spacing"
			label={ __( 'コンテンツ間の余白', 'ystandard-toolbox' ) }
		>
			<HorizonButtonSelect
				value={ '' }
				options={ OPTIONS }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
