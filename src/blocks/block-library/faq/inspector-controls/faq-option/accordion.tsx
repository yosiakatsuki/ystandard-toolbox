/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import {
	ToggleGroupControl,
	ToggleGroupControlOption,
} from '@aktk/block-components/wp-controls/toggle-group-control';

/* Block Dependencies */
import type { FaqEditProps } from '../../types';

/**
 * 通常表示と開閉式を横並びの選択肢で切り替える.
 *
 * @param props ブロック編集プロパティ.
 */
export function Accordion( props: FaqEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { isAccordion } = attributes;

	// 選択肢の文字列を既存のboolean属性に変換する.
	const handleOnChange = ( value?: string | number ) => {
		setAttributes( {
			isAccordion: 'accordion' === value,
		} );
	};

	return (
		<BaseControl>
			<ToggleGroupControl
				label={ __( '開閉式', 'ystandard-toolbox' ) }
				value={ isAccordion ? 'accordion' : 'normal' }
				onChange={ handleOnChange }
				isBlock
			>
				<ToggleGroupControlOption
					label={ __( '通常', 'ystandard-toolbox' ) }
					value="normal"
				/>
				<ToggleGroupControlOption
					label={ __( '開閉式', 'ystandard-toolbox' ) }
					value="accordion"
				/>
			</ToggleGroupControl>
		</BaseControl>
	);
}
