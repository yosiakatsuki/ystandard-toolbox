import { __ } from '@wordpress/i18n';
import { Columns, Square } from 'react-feather';
import { ystdtbConfig } from "@ystd/config";
const variations = [
	{
		name: 'dt-and-simple',
		title: __( 'dt + ddシンプル', 'ystandard-toolbox' ),
		description: __( '説明(dt)と用語(dd)のシンプル版', 'ystandard-toolbox'  ),
		isDefault: true,
		icon: (
			<Square
				stroke={ ystdtbConfig.color.iconForegroundChild }
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
		description: __( '説明(dt)と用語(dd)の入れ子版', 'ystandard-toolbox'  ),
		icon: (
			<Square
				stroke={ ystdtbConfig.color.iconForeground }
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
		description: __( '説明(dt)と用語(dd)の横並び版', 'ystandard-toolbox'  ),
		icon: (
			<Columns
				stroke={ ystdtbConfig.color.iconForeground }
				style={ { fill: 'none' } }
			/>
		),
		innerBlocks: [
			[ 'ystdtb/description-list-column' ],
		],
		scope: [ 'block' ],
	},
];
export default variations;
