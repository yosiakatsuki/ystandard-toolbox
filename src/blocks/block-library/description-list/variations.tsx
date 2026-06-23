import { Columns, Square } from 'react-feather';
/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { COLORS } from '@aktk/block-components/config';

const variations = [
	{
		name: 'dt-and-simple',
		title: __( 'dt + ddシンプル', 'ystandard-toolbox' ),
		description: __(
			'説明(dt)と用語(dd)のシンプル版',
			'ystandard-toolbox'
		),
		isDefault: true,
		icon: (
			// @ts-ignore.
			<Square
				stroke={ COLORS.iconForegroundChild }
				style={ { fill: 'none' } }
			/>
		),
		innerBlocks: [
			[ 'ystdtb/description-list-dt' ],
			[ 'ystdtb/description-list-dd-simple' ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'dt-and-box',
		title: __( 'dt + dd入れ子', 'ystandard-toolbox' ),
		description: __( '説明(dt)と用語(dd)の入れ子版', 'ystandard-toolbox' ),
		icon: (
			// @ts-ignore.
			<Square
				stroke={ COLORS.iconForeground }
				style={ { fill: 'none' } }
			/>
		),
		innerBlocks: [
			[ 'ystdtb/description-list-dt' ],
			[ 'ystdtb/description-list-dd-box' ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'dt-column',
		title: __( '横並び', 'ystandard-toolbox' ),
		description: __( '説明(dt)と用語(dd)の横並び版', 'ystandard-toolbox' ),
		icon: (
			// @ts-ignore.
			<Columns
				stroke={ COLORS.iconForeground }
				style={ { fill: 'none' } }
			/>
		),
		innerBlocks: [ [ 'ystdtb/description-list-column' ] ],
		scope: [ 'block' ],
	},
];
export default variations;
