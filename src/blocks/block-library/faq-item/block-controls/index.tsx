/* WordPress Dependencies */
import {
	BlockControls as WPBlockControls,
	BlockVerticalAlignmentToolbar,
	useBlockEditingMode,
} from '@wordpress/block-editor';

/* Block Dependencies */
import type { FaqItemEditProps } from '../types';
import { updateFaqItemElement } from '../style-utils';

type ToolbarPosition = 'top' | 'center' | 'bottom';

const TOOLBAR_POSITION_MAP: Record< ToolbarPosition, string > = {
	top: 'flex-start',
	center: 'center',
	bottom: 'flex-end',
};

const LABEL_POSITION_MAP: Record< string, ToolbarPosition > = {
	'flex-start': 'top',
	center: 'center',
	'flex-end': 'bottom',
};

/**
 * FAQラベルの表示位置をブロックツールバーで変更する.
 *
 * @param props               FAQ Item編集プロパティ.
 * @param props.attributes    FAQ Item属性.
 * @param props.setAttributes FAQ Item属性の更新関数.
 * @return ブロックツールバー.
 */
export function FaqItemBlockControls( {
	attributes,
	setAttributes,
}: FaqItemEditProps ): JSX.Element | null {
	const blockEditingMode = useBlockEditingMode();

	// コンテンツだけを編集するモードではデザイン変更を許可しない.
	if ( 'contentOnly' === blockEditingMode ) {
		return null;
	}

	// 選択解除時は既定の中央位置へ戻す.
	const handlePositionChange = ( position?: ToolbarPosition ) => {
		setAttributes( {
			style: updateFaqItemElement( attributes.style, 'item', {
				...attributes.style?.ystdtb?.faqItem?.item,
				layout: {
					alignItems:
						position && position !== 'center'
							? TOOLBAR_POSITION_MAP[ position ]
							: undefined,
				},
			} ),
		} );
	};

	return (
		<WPBlockControls>
			<BlockVerticalAlignmentToolbar
				value={
					LABEL_POSITION_MAP[
						attributes.style?.ystdtb?.faqItem?.item?.layout
							?.alignItems ?? 'center'
					] ?? 'center'
				}
				onChange={ handlePositionChange }
			/>
		</WPBlockControls>
	);
}
