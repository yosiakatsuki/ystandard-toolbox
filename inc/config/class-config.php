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
	const REQUIRE_WORDPRESS_VERSION = '5.5.0';

	/**
	 * 必要なyStandardバージョン
	 */
	const REQUIRE_YSTANDARD_VERSION = '4.31.0-beta-1';

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
	 * Body class.
	 */
	const BODY_CLASS = 'ystdtb';

	/**
	 * ブレークポイント
	 *
	 * @var array
	 */
	const BREAKPOINTS = [
		'sm' => 600,
		'md' => 769,
		'lg' => 1025,
	];

	/**
	 * ブロックカテゴリー スラッグ
	 */
	const BLOCK_CATEGORY = 'ystdtb';

	/**
	 * ブロックカテゴリー名
	 */
	const BLOCK_CATEGORY_NAME = '[ys]yStandard Toolbox';

	/**
	 * ブロックカテゴリー β スラッグ
	 */
	const BLOCK_CATEGORY_BETA = 'ystdtb_beta';

	/**
	 * ブロックカテゴリー名 β
	 */
	const BLOCK_CATEGORY_NAME_BETA = '[ys]Toolbox(beta)';

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
	 * 設定画面メニュープレフィックス
	 */
	const ADMIN_MENU_PAGE_PREFIX = 'ystdtb-menu';

	/**
	 * 設定メニュー追加用フック
	 */
	const ADMIN_MENU_NAV_HOOK = 'ystdtb_nav_menu';
}
