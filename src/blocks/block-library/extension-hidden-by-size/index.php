<?php
/**
 * ブロック拡張：画面サイズによる非表示機能
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class HiddenBySize.
 *
 * 画面サイズによる非表示機能を提供するクラス.
 *
 * @package ystandard_toolbox
 */
class HiddenBySize {

	/**
	 * 画面サイズ非表示用属性.
	 *
	 * @return array
	 */
	const ATTRIBUTES = [
		'ystdtbIsHiddenMobile'  => [
			'type'    => 'boolean',
			'default' => false,
		],
		'ystdtbIsHiddenTablet'  => [
			'type'    => 'boolean',
			'default' => false,
		],
		'ystdtbIsHiddenDesktop' => [
			'type'    => 'boolean',
			'default' => false,
		],
	];
	/**
	 * コンストラクタ.
	 */
	public function __construct() {
		// 画面サイズ非表示用属性を追加するフィルターを登録.
		add_filter( 'register_block_type_args', [ $this, 'add_attributes' ], 999, 2 );
		// エディター用アセットをエンキュー
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );
		// フロントエンド用アセットをエンキュー
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_assets' ] );
	}

	/**
	 * ブロック登録時に画面サイズ非表示用属性を追加
	 *
	 * @param array  $args ブロック引数
	 * @param string $name ブロック名
	 *
	 * @return array
	 */
	public function add_attributes( $args, $name ) {

		// 対象ブロックかどうかを判定.
		if ( ! $this->is_enable( $name ) ) {
			return $args;
		}

		return Blocks::merge_attributes(
			$args,
			self::ATTRIBUTES
		);
	}

	/**
	 * ブロックが有効かどうかを判定.
	 *
	 * @param string $block_name ブロック名.
	 *
	 * @return bool
	 */
	private function is_enable( $block_name ) {
		$allowed_namespaces = apply_filters(
			'ystdtb_block_extension_hidden_by_size',
			[ 'core', 'ystdb', 'ystdtb' ]
		);

		// ブロック名が許可された名前空間で始まるかチェック.
		foreach ( $allowed_namespaces as $namespace ) {
			if ( strpos( $block_name, $namespace ) === 0 ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * エディター用アセットをエンキュー
	 */
	public function enqueue_editor_assets() {
		$asset_file = YSTDTB_PATH . '/build/blocks/extension-hidden-by-size/index.asset.php';
		$asset      = file_exists( $asset_file ) ? include $asset_file : [
			'dependencies' => [],
			'version'      => YSTDTB_VERSION,
		];

		// JavaScript
		wp_enqueue_script(
			'ystdtb-extension-hidden-by-size-editor',
			YSTDTB_URL . '/build/blocks/extension-hidden-by-size/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		// CSS（エディター用）
		$editor_css = YSTDTB_PATH . '/build/blocks/extension-hidden-by-size.css';
		if ( file_exists( $editor_css ) ) {
			wp_enqueue_style(
				'ystdtb-extension-hidden-by-size-editor',
				YSTDTB_URL . '/build/blocks/extension-hidden-by-size.css',
				[],
				$asset['version']
			);
		}
	}

	/**
	 * フロントエンド用アセットをエンキュー
	 */
	public function enqueue_frontend_assets() {
		// フロントエンド用CSS
		$frontend_css = YSTDTB_PATH . '/build/blocks/style-extension-hidden-by-size.css';
		if ( file_exists( $frontend_css ) ) {
			wp_enqueue_style(
				'ystdtb-extension-hidden-by-size',
				YSTDTB_URL . '/build/blocks/style-extension-hidden-by-size.css',
				[],
				filemtime( $frontend_css )
			);
		}
	}
}

// HiddenBySizeクラスをインスタンス化
new HiddenBySize();
