/**
 * fixture-based test 用のブロック登録ヘルパー
 *
 * 各ブロックの index.tsx 経由ではなく、`block.json` + `save` + `deprecated` を
 * 直接 registerBlockType に渡すことで、edit.tsx の依存（@wordpress/editor 等）を
 * 引き込まないようにする。テスト環境で edit 関数自体は呼ばれないため、ダミーで足りる。
 */
import { registerBlockType, getBlockType } from '@wordpress/blocks';

// Slider.
// block.json は babel-plugin-inline-json-import の制約でエイリアス解決できないため
// 相対パスで読み込む.
import sliderMetadata from '../../../src/blocks/block-library/slider/block.json';
import sliderSave from '@aktk/blocks/block-library/slider/save';
import sliderDeprecated from '@aktk/blocks/block-library/slider/deprecated';

// Slider item.
import sliderItemMetadata from '../../../src/blocks/block-library/slider-item/block.json';
import sliderItemSave from '@aktk/blocks/block-library/slider-item/save';

// Timeline.
import timelineMetadata from '../../../src/blocks/block-library/timeline/block.json';
import timelineSave from '@aktk/blocks/block-library/timeline/save';

// Timeline item.
import timelineItemMetadata from '../../../src/blocks/block-library/timeline-item/block.json';
import timelineItemSave from '@aktk/blocks/block-library/timeline-item/save';
import timelineItemDeprecated from '@aktk/blocks/block-library/timeline-item/deprecated';

const NoopEdit = () => null;

function registerOnce( metadata, settings ) {
	if ( getBlockType( metadata.name ) ) {
		return;
	}
	registerBlockType( metadata.name, {
		...metadata,
		edit: NoopEdit,
		...settings,
	} );
}

export function registerSliderTestBlocks() {
	registerOnce( sliderMetadata, {
		save: sliderSave,
		deprecated: sliderDeprecated,
	} );
	registerOnce( sliderItemMetadata, {
		save: sliderItemSave,
	} );
}

export function registerTimelineTestBlocks() {
	registerOnce( timelineMetadata, {
		save: timelineSave,
	} );
	registerOnce( timelineItemMetadata, {
		save: timelineItemSave,
		deprecated: timelineItemDeprecated,
	} );
}
