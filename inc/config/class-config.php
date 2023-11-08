<?php
/**
 * Config
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Config
 *
 * @package ystandard_toolbox
 */
class Config {
	/**
	 * Text Domain.
	 *
	 * @var string
	 */
	const TEXT_DOMAIN = 'ystandard-toolbox';

	/**
	 * 必要なWordPressバージョン
	 */
	const REQUIRE_WORDPRESS_VERSION = '5.7.0';

	/**
	 * 必要なyStandardバージョン
	 */
	const REQUIRE_YSTANDARD_VERSION = '4.36.0-beta-1';

	/**
	 * 必要なyStandard Blocksバージョン
	 */
	const REQUIRE_YSTANDARD_BLOCKS_VERSION = '2.5.0';

	/**
	 * CSS Handle
	 */
	const CSS_HANDLE = 'ystdtb-css';

	/**
	 * Script App Handle
	 */
	const JS_FRONT_APP_HANDLE = 'ystdtb-app';

	/**
	 * Script Block App Handle
	 */
	const JS_BLOCK_APP_HANDLE = 'ystdtb-block-app';

	/**
	 * CSS Hook
	 */
	const AFTER_ENQUEUE_CSS_HOOK = 'ystdtb_enqueue_css';
	/**
	 * CSS Hook
	 */
	const AFTER_ENQUEUE_BLOCK_ASSETS_CSS_HOOK = 'ystdtb_enqueue_block_assets_css';

	/**
	 * Body class.
	 */
	const BODY_CLASS = 'ystdtb';

	/**
	 * ブレークポイント
	 * (1/16 = 0.0625)
	 *
	 * @var array
	 */
	const BREAKPOINTS = [
		'sm'      => 600,
		'mobile'  => '37.5em',
		'md'      => 768,
		'tablet'  => '48em',
		'lg'      => 1024,
		'desktop' => '64em',
	];

	/**
	 * レスポンシブタイプ名.
	 */
	const RESPONSIVE_TYPE = [
		'desktop' => 'desktop',
		'tablet'  => 'tablet',
		'mobile'  => 'mobile',
	];

	/**
	 * Block Namespace.
	 */
	const BLOCK_NAMESPACE = 'ystdtb';

	/**
	 * ブロックカテゴリー スラッグ
	 */
	const BLOCK_CATEGORIES = [
		'layout' => [
			'slug'  => 'ystdtb-layout',
			'title' => '[Toolbox]レイアウト',
		],
		'main'   => [
			'slug'  => 'ystdtb',
			'title' => '[Toolbox]yStandard Toolbox',
		],
		'beta'   => [
			'slug'  => 'ystdtb_beta',
			'title' => '[Toolbox]ベータ版 ブロック',
		],
	];

	/**
	 * Block CSS Handle
	 */
	const BLOCK_CSS_HANDLE = 'ystdtb-block-css';

	/**
	 * ブロックエディタースタイル用ラッパークラス
	 */
	const EDITOR_STYLES_WRAPPER = '.editor-styles-wrapper';

	/**
	 * ブロックエディターにわたすオプション作成フック名
	 */
	const BLOCK_EDITOR_OPTION_HOOK = 'ystdtb_block_editor_option';

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'ystdtb-option';

	/**
	 * カスタムテンプレートフォルダ
	 *
	 * @var string
	 */
	const CUSTOM_TEMPLATE_DIR = 'toolbox-template-dir';

	/**
	 * 設定画面親スラッグ
	 */
	const ADMIN_MENU_PARENT_SLUG = 'ystandard-toolbox';
	/**
	 * 設定画面親スラッグ v2
	 */
	const ADMIN_MENU_SLUG_V2 = 'ystdtb-settings-v2';

	/**
	 * 設定画面メニュープレフィックス
	 */
	const ADMIN_MENU_PAGE_PREFIX = 'ystdtb-menu';

	/**
	 * 設定画面メニュープレフィックス v2
	 */
	const ADMIN_MENU_PREFIX_V2 = 'ystdtb-settings-v2';

	/**
	 * 設定メニュー追加用フック
	 */
	const ADMIN_MENU_NAV_HOOK = 'ystdtb_nav_menu';
}
