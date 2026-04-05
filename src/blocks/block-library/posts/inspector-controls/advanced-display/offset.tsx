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
import { NoticeSecondaryText } from '@aktk/block-components/components/notice';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';

/**
 * 値のサニタイズ
 *
 * 0以下の場合はundefinedを返す
 * @param value
 */
function sanitize( value?: number | string ): number | undefined {
	const num = toInt( value );
	return num > 0 ? num : undefined;
}

export function Offset( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { offset, offsetMobile } = attributes;

	const handleOnChangeDesktop = ( value?: number | string ) => {
		setAttributes( { offset: sanitize( value ) } );
	};

	const handleOnChangeMobile = ( value?: number | string ) => {
		setAttributes( { offsetMobile: sanitize( value ) } );
	};

	return (
		<BaseControl
			id={ 'offset' }
			label={ __( '表示開始位置', 'ystandard-toolbox' ) }
		>
			<DesktopControl>
				<NumberControl
					value={ offset }
					onChange={ handleOnChangeDesktop }
					min={ 0 }
				/>
			</DesktopControl>
			<MobileControl>
				<NumberControl
					value={ offsetMobile }
					onChange={ handleOnChangeMobile }
					min={ 0 }
				/>
			</MobileControl>
			<NoticeSecondaryText>
				{ __(
					'表示する投稿の開始位置をずらすための設定です。例えば「3」を設定すると、3件目以降の投稿から表示されます。',
					'ystandard-toolbox'
				) }
			</NoticeSecondaryText>
		</BaseControl>
	);
}
