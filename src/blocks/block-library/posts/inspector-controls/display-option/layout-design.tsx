/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { IconSelectControl } from '@aktk/block-components/components/icon-control';

/**
 * Block dependencies.
 */
import type { PostsEditProps, ListType } from '../../types';

const listTypes = [
	{ name: __( 'カード', 'ystandard-toolbox' ), key: 'card' },
	{ name: __( 'リスト', 'ystandard-toolbox' ), key: 'list' },
	{ name: __( 'シンプル', 'ystandard-toolbox' ), key: 'simple' },
];

export function LayoutDesign( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { listType, listTypeMobile } = attributes;

	return (
		<BaseControl
			id={ 'layout-design' }
			label={ __( 'デザイン', 'ystandard-toolbox' ) }
		>
			<IconSelectControl.Desktop
				options={ listTypes }
				value={ listType }
				onChange={ ( value?: string ) =>
					setAttributes( { listType: value as ListType } )
				}
				useEmptyValue={ false }
			/>
			<IconSelectControl.Mobile
				options={ listTypes }
				value={ listTypeMobile || '' }
				onChange={ ( value?: string ) =>
					setAttributes( {
						listTypeMobile: ( value as ListType ) || undefined,
					} )
				}
			/>
		</BaseControl>
	);
}
