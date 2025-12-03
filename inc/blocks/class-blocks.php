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
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_assets' ] );
		if ( Utility::wordpress_version_compare( '5.8-alpha-1' ) ) {
			add_filter( 'block_categories_all', [ __CLASS__, 'add_block_categories' ] );
		} else {
			add_filter( 'block_categories', [ __CLASS__, 'add_block_categories' ] );
		}
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

		foreach ( glob( YSTDTB_PATH . '/dist/blocks/*.js' ) as $file ) {
			if ( is_file( $file ) ) {
				// ブロックの情報.
				$name = basename( $file, '.js' );
				if ( in_array( $name, [ 'app', 'block' ], true ) ) {
					continue;
				}
				// 依存関係.
				$asset = include( YSTDTB_PATH . "/dist/blocks/{$name}.asset.php" );
				// ダイナミックブロック判定.
				$render = YSTDTB_PATH . "/blocks/{$name}/class-{$name}-block.php";
				$type   = file_exists( $render ) ? 'dynamic' : 'normal';
				// ブロック固有の処理読み込み.
				$block_php = YSTDTB_PATH . "/blocks/{$name}/class-{$name}.php";
				if ( is_file( $block_php ) ) {
					require_once $block_php;
				}
				if ( 'normal' === $type ) {
					// スクリプト関連.
					$style      = null;
					$style_path = YSTDTB_PATH . "/css/blocks/{$name}/block.css";
					if ( is_file( $style_path ) ) {
						$style = [
							'handle' => "ystdtb-block-style-{$name}",
							'src'    => $this->replace_path_to_url( $style_path ),
							'var'    => filemtime( $style_path ),
						];
					}
					$editor_style      = null;
					$editor_style_path = YSTDTB_PATH . "/css/blocks/{$name}/edit.css";
					if ( is_file( $editor_style_path ) ) {
						$editor_style = [
							'handle' => "ystdtb-block-editor-style-{$name}",
							'src'    => $this->replace_path_to_url( $editor_style_path ),
							'var'    => filemtime( $editor_style_path ),
						];
					}
				}
				// セット.
				$this->register_blocks[ $type ][] = [
					'name'         => $name,
					'url'          => $this->replace_path_to_url( $file ),
					'dependencies' => $asset['dependencies'],
					'version'      => $asset['version'],
					'render'       => $render,
					'style'        => $style,
					'editor_style' => $editor_style,
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
		$toolbox_categories   = [];
		$toolbox_categories[] = [
			'slug'  => Config::BLOCK_CATEGORY,
			'title' => Config::BLOCK_CATEGORY_NAME,
		];
		$toolbox_categories[] = [
			'slug'  => Config::BLOCK_CATEGORY_BETA,
			'title' => Config::BLOCK_CATEGORY_NAME_BETA,
		];

		if ( apply_filters( 'ystdtb_block_category_top', false ) ) {
			return array_merge( $toolbox_categories, $categories );
		}

		return array_merge( $categories, $toolbox_categories );
	}

	/**
	 * Block Assets.
	 */
	public function enqueue_block_assets() {

		wp_enqueue_style(
			Config::BLOCK_CSS_HANDLE,
			YSTDTB_URL . '/css/ystandard-toolbox-block-editor.css',
			[],
			filemtime( YSTDTB_PATH . '/css/ystandard-toolbox-block-editor.css' )
		);
		if ( ! Utility::ystandard_blocks_version_compare() ) {
			wp_add_inline_style(
				Config::CSS_HANDLE,
				Enqueue::get_color_palette_css( '.editor-styles-wrapper ' )
			);
		}
	}

	/**
	 * ブロックの登録.
	 */
	public function register_block() {
		if ( is_admin() ) {

			$asset_file = include( YSTDTB_PATH . '/dist/blocks/block.asset.php' );
			wp_enqueue_script(
				self::BLOCK_EDITOR_SCRIPT_HANDLE,
				YSTDTB_URL . '/dist/blocks/block.js',
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
		}

		foreach ( $this->register_blocks['normal'] as $block ) {
			$handle              = 'ystandard-toolbox-' . $block['name'];
			$block_type          = Config::BLOCK_CATEGORY . '/' . $block['name'];
			$register_block_args = [ 'editor_script' => $handle ];
			wp_register_script(
				$handle,
				$block['url'],
				$block['dependencies'],
				$block['version']
			);
			if ( ! is_null( $block['style'] ) && ! is_admin() ) {
				wp_register_style(
					$block['style']['handle'],
					$block['style']['src'],
					[],
					$block['style']['var']
				);
				$register_block_args['style'] = $block['style']['handle'];

				if ( 'ystdtb/extension' === $block_type ) {
					wp_enqueue_style(
						$block['style']['handle'],
						$block['style']['src'],
						[],
						$block['style']['var']
					);
				}
			}
			if ( ! is_null( $block['editor_style'] ) ) {
				wp_register_style(
					$block['editor_style']['handle'],
					$block['editor_style']['src'],
					[],
					$block['editor_style']['var']
				);
				$register_block_args['editor_style'] = $block['editor_style']['handle'];
			}
			register_block_type( $block_type, $register_block_args );
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

	/**
	 * パス文字列をURLに変換する.
	 *
	 * @param string $path Path.
	 *
	 * @return string
	 */
	private function replace_path_to_url( $path ) {
		return str_replace( YSTDTB_PATH, YSTDTB_URL, $path );
	}
}

new Blocks();
