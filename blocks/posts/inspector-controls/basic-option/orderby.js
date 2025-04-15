/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, SelectControl } from '@wordpress/components';

const orderbySelect = [
	{
		label: __( '公開日 / 新しい順', 'ystandard-toolbox' ),
		value: 'date/DESC',
	},
	{ label: __( '公開日 / 古い順', 'ystandard-toolbox' ), value: 'date/ASC' },
	{
		label: __( '更新日 / 新しい順', 'ystandard-toolbox' ),
		value: 'modified/DESC',
	},
	{
		label: __( '更新日 / 古い順', 'ystandard-toolbox' ),
		value: 'modified/ASC',
	},
	{ label: __( 'タイトル / A→Z', 'ystandard-toolbox' ), value: 'title/ASC' },
	{ label: __( 'タイトル / Z→A', 'ystandard-toolbox' ), value: 'title/DESC' },
	{ label: __( 'ランダム', 'ystandard-toolbox' ), value: 'rand/DESC' },
];

const Orderby = ( { attributes, setAttributes } ) => {
	const { orderby, order } = attributes;
	const orderSelected = `${ orderby }/${ order }`;
	return (
		<BaseControl __nextHasNoMarginBottom>
			<SelectControl
				label={ __( '並び順', 'ystandard-toolbox' ) }
				value={ orderSelected }
				options={ orderbySelect }
				onChange={ ( value ) => {
					const _order = value.split( '/' );
					setAttributes( {
						orderby: _order[ 0 ],
						order: _order[ 1 ],
					} );
				} }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};
export default Orderby;
