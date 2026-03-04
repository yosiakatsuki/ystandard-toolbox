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
import {
	DesktopControl,
	MobileControl,
} from '@aktk/block-components/components/icon-control';

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
			<DesktopControl>
				<NumberControl
					value={ count }
					onChange={ handleOnChangePcCount }
					min={ 1 }
				/>
			</DesktopControl>
			<MobileControl>
				<NumberControl
					value={ countMobile }
					onChange={ handleOnChangeMobileCount }
				/>
			</MobileControl>
		</BaseControl>
	);
}
