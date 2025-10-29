/*
 * WordPress Dependencies
 */
import { useMemo } from '@wordpress/element';
import { transformStyles } from '@wordpress/block-editor';

/*
 * Aktk Dependencies
 */
import { getBlockConfig } from '@aktk/helper/blockConfig';

/**
 * エディター用スタイルコンポーネント
 * パーツプレビュー用のCSSを動的に読み込み・適用する
 */
export default function EditorStyles() {
	const styles = getBlockConfig( 'partsPreviewStyles', [] );
	const transformedStyles = useMemo(
		() => transformStyles( styles, '.ystdtb-parts' ),
		[ styles ]
	);

	return (
		<>
			{ transformedStyles.map( ( css: string, index: number ) => (
				<style key={ index }>{ css }</style>
			) ) }
		</>
	);
}
