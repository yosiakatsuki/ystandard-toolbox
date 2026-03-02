/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import NumberControl from '@aktk/block-components/wp-controls/number-control';
import { toInt } from '@aktk/block-components/utils/number';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';

export function Count( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { count, countMobile } = attributes;

	const handleOnChangePcCount = ( value?: number | string ) => {
		setAttributes( {
			count: toInt( value ),
		} );
	};
	const handleOnChangeMobileCount = ( value?: number | string ) => {
		setAttributes( {
			countMobile: toInt( value ),
		} );
	};
	return (
		<BaseControl
			id={ 'count' }
			label={ __( '表示件数', 'ystandard-toolbox' ) }
		>
			<NumberControl
				label={ __( 'PC 表示件数', 'ystandard-toolbox' ) }
				value={ count }
				onChange={ handleOnChangePcCount }
				min={ 1 }
			/>
			<NumberControl
				label={ __( 'モバイル 表示件数', 'ystandard-toolbox' ) }
				value={ countMobile }
				onChange={ handleOnChangeMobileCount }
			/>
		</BaseControl>
	);
}
