<?php
/**
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
	 * CSS Handle
	 */
	const CSS_HANDLE = 'ystdtb-css';
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
	const BLOCK_CATEGORY_NAME = '[ys] Toolbox';
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
}
