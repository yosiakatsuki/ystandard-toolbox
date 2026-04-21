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

// FAQ.
import faqMetadata from '../../../src/blocks/block-library/faq/block.json';
import faqSave from '@aktk/blocks/block-library/faq/save';
import faqDeprecated from '@aktk/blocks/block-library/faq/deprecated';

// FAQ item.
import faqItemMetadata from '../../../src/blocks/block-library/faq-item/block.json';
import faqItemSave from '@aktk/blocks/block-library/faq-item/save';
import faqItemDeprecated from '@aktk/blocks/block-library/faq-item/deprecated';

// Description list.
import dlMetadata from '../../../src/blocks/block-library/description-list/block.json';
import dlSave from '@aktk/blocks/block-library/description-list/save';
import dlDeprecated from '@aktk/blocks/block-library/description-list/deprecated';

// Description list dt.
import dtMetadata from '../../../src/blocks/block-library/description-list-dt/block.json';
import dtSave from '@aktk/blocks/block-library/description-list-dt/save';
import dtDeprecated from '@aktk/blocks/block-library/description-list-dt/deprecated';

// Description list dd-simple.
import ddSimpleMetadata from '../../../src/blocks/block-library/description-list-dd-simple/block.json';
import ddSimpleSave from '@aktk/blocks/block-library/description-list-dd-simple/save';
import ddSimpleDeprecated from '@aktk/blocks/block-library/description-list-dd-simple/deprecated';

// Description list dd-box.
import ddBoxMetadata from '../../../src/blocks/block-library/description-list-dd-box/block.json';
import ddBoxSave from '@aktk/blocks/block-library/description-list-dd-box/save';
import ddBoxDeprecated from '@aktk/blocks/block-library/description-list-dd-box/deprecated';

// Description list dl-column.
import dlColumnMetadata from '../../../src/blocks/block-library/description-list-dl-column/block.json';
import dlColumnSave from '@aktk/blocks/block-library/description-list-dl-column/save';
import dlColumnDeprecated from '@aktk/blocks/block-library/description-list-dl-column/deprecated';

// Banner Link.
import bannerLinkMetadata from '../../../src/blocks/block-library/banner-link/block.json';
import bannerLinkSave from '@aktk/blocks/block-library/banner-link/save';

// SNS Share (動的ブロック: save は null).
import snsShareMetadata from '../../../src/blocks/block-library/sns-share/block.json';

const NoopEdit = () => null;
const NoopSave = () => null;

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

export function registerFaqTestBlocks() {
	registerOnce( faqMetadata, {
		save: faqSave,
		deprecated: faqDeprecated,
	} );
	registerOnce( faqItemMetadata, {
		save: faqItemSave,
		deprecated: faqItemDeprecated,
	} );
}

export function registerDescriptionListTestBlocks() {
	registerOnce( dlMetadata, {
		save: dlSave,
		deprecated: dlDeprecated,
	} );
	registerOnce( dtMetadata, {
		save: dtSave,
		deprecated: dtDeprecated,
	} );
	registerOnce( ddSimpleMetadata, {
		save: ddSimpleSave,
		deprecated: ddSimpleDeprecated,
	} );
	registerOnce( ddBoxMetadata, {
		save: ddBoxSave,
		deprecated: ddBoxDeprecated,
	} );
	registerOnce( dlColumnMetadata, {
		save: dlColumnSave,
		deprecated: dlColumnDeprecated,
	} );
}

export function registerBannerLinkTestBlocks() {
	registerOnce( bannerLinkMetadata, {
		save: bannerLinkSave,
	} );
}

export function registerSnsShareTestBlocks() {
	registerOnce( snsShareMetadata, {
		save: NoopSave,
	} );
}
