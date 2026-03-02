/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

/**
 * Block dependencies.
 */
import type { PostsEditProps, OrderBy, Order } from '../../types';

const ORDER_BY = [
	{
		name: __( '公開日 / 新しい順', 'ystandard-toolbox' ),
		key: 'date/DESC',
	},
	{ name: __( '公開日 / 古い順', 'ystandard-toolbox' ), key: 'date/ASC' },
	{
		name: __( '更新日 / 新しい順', 'ystandard-toolbox' ),
		key: 'modified/DESC',
	},
	{
		name: __( '更新日 / 古い順', 'ystandard-toolbox' ),
		key: 'modified/ASC',
	},
	{ name: __( 'タイトル / A→Z', 'ystandard-toolbox' ), key: 'title/ASC' },
	{ name: __( 'タイトル / Z→A', 'ystandard-toolbox' ), key: 'title/DESC' },
	{ name: __( 'ランダム', 'ystandard-toolbox' ), key: 'rand/DESC' },
];

export function OrderBy( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { orderby, order } = attributes;

	const handleOnChangeOrderBy = ( value: string ) => {
		const [ newOrderBy, newOrder ] = value.split( '/' ) as [
			string,
			string,
		];
		setAttributes( {
			orderby: newOrderBy as OrderBy,
			order: newOrder as Order,
		} );
	};
	return (
		<BaseControl
			id={ 'orderby' }
			label={ __( '並び順の基準', 'ystandard-toolbox' ) }
		>
			<CustomSelectControl
				value={ `${ orderby }/${ order }` }
				options={ ORDER_BY }
				onChange={ handleOnChangeOrderBy }
			/>
		</BaseControl>
	);
}
