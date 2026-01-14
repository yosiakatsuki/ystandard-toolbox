/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';

/**
 * Block dependencies.
 */
import type { TimeLineItemProps } from '../../types';

const OPTIONS = [
	{ label: __( '小', 'ystandard-toolbox' ), value: 'small' },
	{ label: __( '通常', 'ystandard-toolbox' ), value: 'normal' },
	{ label: __( '大', 'ystandard-toolbox' ), value: 'large' },
];

export function ContentsSpacing( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { contentsInnerMargin } = attributes;
	const handleOnChange = ( value: string | number | boolean ) => {
		setAttributes( {
			contentsInnerMargin: value as string,
		} );
	};
	return (
		<BaseControl
			id="contents-spacing"
			label={ __( 'コンテンツ間の余白', 'ystandard-toolbox' ) }
		>
			<HorizonButtonSelect
				value={ contentsInnerMargin }
				options={ OPTIONS }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
