<?php
/**
 * Blocks
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Blocks
 *
 * @package ystandard_toolbox
 */
class Blocks {
	/**
	 * ブロックエディター用スクリプトハンドル
	 */
	const BLOCK_EDITOR_SCRIPT_HANDLE = 'ystandard-toolbox-block-editor';

	/**
	 * 有効化するブロックのリスト
	 *
	 * @var array
	 */
	private $register_blocks;

	/**
	 * Blocks constructor.
	 */
	public function __construct() {
		$this->load_files();
		$this->init();
		add_action( 'init', [ $this, 'require_dynamic_block_file' ] );
		add_action( 'init', [ $this, 'register_block' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_dynamic_block_scripts' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_assets' ] );
		if ( Utility::wordpress_version_compare( '5.8-alpha-1' ) ) {
			add_filter( 'block_categories_all', [ __CLASS__, 'add_block_categories' ] );
		} else {
			add_filter( 'block_categories', [ __CLASS__, 'add_block_categories' ] );
		}
		add_action( 'after_setup_theme', [ $this, 'add_block_editor_styles' ] );
		add_action( 'https_ssl_verify', [ $this, 'add_block_editor_styles_ssl_verify' ], 10, 2 );
	}

	/**
	 * ファイルの読み込み
	 */
	private function load_files() {
		require_once __DIR__ . '/class-dynamic-block.php';
		require_once __DIR__ . '/extension/class-section.php';
	}

	/**
	 * 初期化
	 */
	private function init() {
		$this->register_blocks = [
			'normal'  => [],
			'dynamic' => [],
		];

		foreach ( glob( YSTDTB_PATH . '/js/blocks/*.js' ) as $file ) {
			if ( is_file( $file ) ) {
				// ブロックの情報.
				$name = basename( $file, '.js' );
				if ( in_array( $name, [ 'app', 'block' ], true ) ) {
					continue;
				}

				$asset = include( YSTDTB_PATH . "/js/blocks/${name}.asset.php" );
				// ダイナミックブロック判定.
				$render = YSTDTB_PATH . "/blocks/${name}/class-${name}.php";
				$type   = file_exists( $render ) ? 'dynamic' : 'normal';
				// セット.
				$this->register_blocks[ $type ][] = [
					'name'         => $name,
					'url'          => str_replace( YSTDTB_PATH, YSTDTB_URL, $file ),
					'dependencies' => $asset['dependencies'],
					'version'      => $asset['version'],
					'render'       => $render,
				];
			}
		}
	}

	/**
	 * Add block category
	 *
	 * @param array $categories ブロックカテゴリー.
	 *
	 * @return array
	 */
	public static function add_block_categories( $categories ) {
		$categories[] = [
			'slug'  => Config::BLOCK_CATEGORY,
			'title' => Config::BLOCK_CATEGORY_NAME,
		];
		$categories[] = [
			'slug'  => Config::BLOCK_CATEGORY_BETA,
			'title' => Config::BLOCK_CATEGORY_NAME_BETA,
		];

		return $categories;
	}

	/**
	 * Block Assets.
	 */
	public function enqueue_block_assets() {

		wp_enqueue_style(
			Config::BLOCK_CSS_HANDLE,
			YSTDTB_URL . '/css/ystandard-toolbox-blocks.css',
			[],
			filemtime( YSTDTB_PATH . '/css/ystandard-toolbox-blocks.css' )
		);
		if ( ! Utility::ystandard_blocks_version_compare() ) {
			wp_add_inline_style(
				Config::CSS_HANDLE,
				Enqueue::get_color_palette_css( '.editor-styles-wrapper ' )
			);
		}
	}

	/**
	 * ブロックCSSをエディター用に追加する.
	 */
	public function add_block_editor_styles() {
		// パーツブロックのプレビューでブロックのCSSが必要になる.
		$styles = wp_styles();
		if ( isset( $styles->registered['wp-block-library']->src ) ) {
			$path     = $styles->registered['wp-block-library']->src;
			$site_url = site_url();
			add_editor_style( "${site_url}${path}" );
		}
	}

	/**
	 * 自サイトのURLであれば検証をスキップ.
	 *
	 * @param bool   $verify Verify.
	 * @param string $url    URL.
	 *
	 * @return bool
	 */
	public function add_block_editor_styles_ssl_verify( $verify, $url ) {
		if ( false !== strpos( $url, site_url() ) ) {
			return false;
		}

		return $verify;
	}

	/**
	 * ブロックの登録.
	 */
	public function register_block() {
		if ( ! is_admin() ) {
			return;
		}
		$asset_file = include( YSTDTB_PATH . '/js/blocks/block.asset.php' );
		wp_enqueue_script(
			self::BLOCK_EDITOR_SCRIPT_HANDLE,
			YSTDTB_URL . '/js/blocks/block.js',
			$asset_file['dependencies'],
			$asset_file['version']
		);
		wp_localize_script(
			self::BLOCK_EDITOR_SCRIPT_HANDLE,
			'ystdtbBlockEditor',
			$this->create_block_option()
		);

		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations(
				self::BLOCK_EDITOR_SCRIPT_HANDLE,
				'ystandard-toolbox',
				YSTDTB_PATH . '/languages'
			);
		}
		foreach ( $this->register_blocks['normal'] as $block ) {
			$handle = 'ystandard-toolbox-' . $block['name'];
			wp_register_script(
				$handle,
				$block['url'],
				$block['dependencies'],
				$block['version']
			);
			register_block_type(
				Config::BLOCK_CATEGORY . '/' . $block['name'],
				[ 'editor_script' => $handle ]
			);
		}
	}

	/**
	 * ダイナミックブロックの登録
	 */
	public function enqueue_dynamic_block_scripts() {
		foreach ( $this->register_blocks['dynamic'] as $block ) {
			wp_enqueue_script(
				'ystandard-toolbox-' . $block['name'],
				$block['url'],
				$block['dependencies'],
				$block['version']
			);
		}
	}

	/**
	 * ダイナミックブロックの登録
	 */
	public function require_dynamic_block_file() {
		foreach ( $this->register_blocks['dynamic'] as $block ) {
			require_once( $block['render'] );
		}
	}

	/**
	 * ブロックエディター用設定作成
	 *
	 * @return array
	 */
	private function create_block_option() {
		$options = [
			'isEnableSga'       => function_exists( 'sga_ranking_get_date' ),
			'defaultAttributes' => $this->get_block_default_attributes(),
		];

		return apply_filters( Config::BLOCK_EDITOR_OPTION_HOOK, $options );
	}

	/**
	 * ブロック初期値カスタマイズ値取得
	 *
	 * @return array
	 */
	private function get_block_default_attributes() {
		return apply_filters( 'ys_block_default_attributes', [] );
	}
}

new Blocks();
