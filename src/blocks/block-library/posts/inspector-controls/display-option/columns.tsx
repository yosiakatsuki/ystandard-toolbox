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
	TabletControl,
	MobileControl,
} from '@aktk/block-components/components/icon-control';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';

export function Columns( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { colPc, colTablet, colMobile } = attributes;

	return (
		<BaseControl
			id={ 'columns' }
			label={ __( '表示列数', 'ystandard-toolbox' ) }
		>
			<DesktopControl>
				<NumberControl
					value={ colPc }
					onChange={ ( value?: number | string ) => {
						setAttributes( {
							colPc: toInt( value ),
						} );
					} }
					min={ 1 }
				/>
			</DesktopControl>
			<TabletControl>
				<NumberControl
					value={ colTablet }
					onChange={ ( value?: number | string ) => {
						setAttributes( {
							colTablet: toInt( value ),
						} );
					} }
					min={ 1 }
				/>
			</TabletControl>
			<MobileControl>
				<NumberControl
					value={ colMobile }
					onChange={ ( value?: number | string ) => {
						setAttributes( {
							colMobile: toInt( value ),
						} );
					} }
					min={ 1 }
				/>
			</MobileControl>
		</BaseControl>
	);
}
