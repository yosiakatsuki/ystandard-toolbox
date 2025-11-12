import classnames from 'classnames';
/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Component Dependencies.
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import Button from '@aktk/block-components/wp-controls/button';

/**
 * Plugin Dependencies.
 */
import { getBlockEditorConfig } from '@aktk/utils/config';

/**
 * Block Dependencies.
 */
import type { IconListAttributes, IconListEditProps } from '../../types';

const iconTypes = [
	{ label: __( '右矢印', 'ystandard-toolbox' ), name: 'chevron-right' },
	{ label: __( '右二重矢印', 'ystandard-toolbox' ), name: 'chevrons-right' },
	{ label: __( '右矢印', 'ystandard-toolbox' ), name: 'arrow-right' },
	{
		label: __( '右丸矢印', 'ystandard-toolbox' ),
		name: 'arrow-right-circle',
	},
	{ label: __( 'チェック', 'ystandard-toolbox' ), name: 'check' },
	{ label: __( 'チェック(円)', 'ystandard-toolbox' ), name: 'check-circle' },
	{ label: __( 'いいね', 'ystandard-toolbox' ), name: 'thumbs-up' },
	{ label: __( 'よくないね', 'ystandard-toolbox' ), name: 'thumbs-down' },
	{ label: __( '星', 'ystandard-toolbox' ), name: 'star' },
	{ label: __( 'ハート', 'ystandard-toolbox' ), name: 'heart' },
	{ label: __( 'アワード', 'ystandard-toolbox' ), name: 'award' },
	{ label: __( 'ベル', 'ystandard-toolbox' ), name: 'bell' },
	{ label: __( 'ブックマーク', 'ystandard-toolbox' ), name: 'bookmark' },
	{ label: __( 'アラート(円)', 'ystandard-toolbox' ), name: 'alert-circle' },
	{
		label: __( 'アラート(三角)', 'ystandard-toolbox' ),
		name: 'alert-triangle',
	},
	{ label: __( 'リンク', 'ystandard-toolbox' ), name: 'link' },
	{ label: __( 'メッセージ', 'ystandard-toolbox' ), name: 'message-circle' },
];

type IconOption = {
	label: string;
	name: string;
	class?: string;
};

// @ts-ignore.
export function ListIcon( props: IconListEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { iconType } = attributes as IconListAttributes;

	const config = getBlockEditorConfig( 'listIcons', [] );

	let options = iconTypes;
	if ( config ) {
		options = [ ...iconTypes, ...config ];
	}

	return (
		<BaseControl
			id={ 'list-icon' }
			label={ __( 'リストアイコン', 'ystandard-toolbox' ) }
		>
			<div className=" grid grid-cols-3 gap-2 md:grid-cols-5">
				{ options.map( ( option: IconOption ) => {
					const handleOnClick = () => {
						setAttributes( {
							iconType: option.name,
							customIconClass: option?.class,
						} );
					};
					const variant =
						iconType === option.name ? 'primary' : 'secondary';
					return (
						<Button
							key={ option.name }
							variant={ variant }
							onClick={ handleOnClick }
						>
							<ul
								className={ classnames(
									'ystdtb-icon-list',
									'ystdtb-icon-list-edit',
									`icon--${ option.name }`,
									{
										[ option.class || '' ]: option?.class,
									}
								) }
							>
								<li />
							</ul>
						</Button>
					);
				} ) }
			</div>
		</BaseControl>
	);
}
