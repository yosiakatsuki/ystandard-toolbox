<?php
/**
 * CTA.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\CTA;
use ystandard_toolbox\CTA_Sort;
use ystandard_toolbox\Option;
use ystandard_toolbox\Utility;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_CTA
 *
 * @package ystandard_toolbox\menu
 */
class Menu_CTA extends Menu_Page_Base {

	const OLD_OPTION_NAME = 'ctaSort';

	/**
	 * Menu_CTA constructor.
	 */
	public function __construct() {
		if ( ! Utility::ystandard_version_compare( '4.23.0-beta-1' ) ) {
			return;
		}
		parent::__construct();
		$this->menu_slug     = 'cta';
		$this->menu_title    = '投稿詳細ページ拡張';
		$this->menu_label    = '投稿詳細ページ拡張';
		$this->template_name = 'cta';
		$this->option_name   = CTA::OPTION_NAME;
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_app' ] );
		add_action( $this->get_ajax_action_hook(), [ $this, 'save_ajax' ] );
	}

	/**
	 * Ajax処理
	 */
	public function save_ajax() {
		$data = self::get_ajax_save_data();
		if ( is_null( $data ) ) {
			self::response_ajax( self::response_ajax_not_found() );

			return;
		}
		if ( $this->save( $data ) ) {
			self::response_ajax( self::response_ajax_success() );
		} else {
			self::response_ajax( self::response_ajax_error() );
		}
		wp_die();
	}

	/**
	 * 管理画面-スクリプトの読み込み
	 *
	 * @param string $hook_suffix suffix.
	 *
	 * @return void
	 */
	public function enqueue_app( $hook_suffix ) {
		if ( ! $this->is_toolbox_menu_page( $hook_suffix ) ) {
			return;
		}
		wp_enqueue_media();
		$post_types = [];
		$types      = Utility::get_post_types(
			[ 'capability_type' => 'post' ],
			[ 'ys-parts' ]
		);
		foreach ( $types as $key => $value ) {
			$post_types[] = [
				'id'   => $key,
				'name' => $value,
			];
		}

		$this->enqueue_admin_script( 'cta' );
		$this->enqueue_admin_localize_script_ajax(
			'cta',
			'ystdtbCtaData',
			CTA::OPTION_NAME,
			$this->get_cta_options(),
			[
				'postTypes' => $post_types,
				'priority'  => $this->create_priority_schema(),
			]
		);
	}

	/**
	 * CTA設定取得
	 *
	 * @return array
	 */
	private function get_cta_options() {
		$options = Option::get_option( CTA::OPTION_NAME, '', [] );

		return $options;
	}

	/**
	 * 優先順位の初期値取得
	 *
	 * @return array
	 */
	private function create_priority_schema() {
		return [
			'header' => CTA::get_header_priority(),
			'footer' => CTA::get_footer_priority(),
		];
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 *
	 * @return boolean
	 */
	public function save( $_post ) {

		if ( ! isset( $_post[ CTA::OPTION_NAME ] ) ) {
			return false;
		}
		$input  = $_post[ CTA::OPTION_NAME ];
		$result = Option::get_option( CTA::OPTION_NAME, '', [] );

		/**
		 * CTA 変更確認
		 */
		if ( ! $this->check_change( self::OLD_OPTION_NAME, $input ) ) {
			return true;
		}
		$result = $this->create_data_cta_sort( $input, $result );
		if ( is_null( $result ) ) {
			return false;
		}

		$update_result = Option::update_plugin_option( CTA::OPTION_NAME, $result );

		if ( isset( $input[ self::OLD_OPTION_NAME ]['header'] ) && empty( $input[ self::OLD_OPTION_NAME ]['header'] ) ) {
			return true;
		}

		return $update_result;
	}

	/**
	 * CTA 並び替えの反映
	 *
	 * @param array $input   Input.
	 * @param array $options Options.
	 *
	 * @return array
	 */
	private function create_data_cta_sort( $input, $options ) {
		if ( ! isset( $input[ self::OLD_OPTION_NAME ] ) ) {
			return $options;
		}
		$input = $input[ self::OLD_OPTION_NAME ];
		if ( ! isset( $input['postType'] ) || ! isset( $input['header'] ) || ! isset( $input['footer'] ) ) {
			return null;
		}
		$new = [];
		if ( isset( $options[ self::OLD_OPTION_NAME ] ) ) {
			$new = $options[ self::OLD_OPTION_NAME ];
		}
		$post_type = $input['postType'];
		$header    = $input['header'];
		$footer    = $input['footer'];
		// 空データが来たら削除.
		if ( empty( $header ) || empty( $footer ) ) {
			if ( isset( $new[ $post_type ] ) ) {
				unset( $new[ $post_type ] );
				$options[ self::OLD_OPTION_NAME ] = $new;
			}

			return $options;
		}
		// 設定追加・更新.
		$new[ $post_type ] = [
			'header' => $header,
			'footer' => $footer,
		];

		$options[ self::OLD_OPTION_NAME ] = $new;

		return $options;
	}

	/**
	 * 設定が変わっているか確認する
	 *
	 * @param string $option_name Option Name.
	 * @param array  $input       Data.
	 *
	 * @return bool
	 */
	private function check_change( $option_name, $input ) {
		$old = Option::get_option( CTA::OPTION_NAME, '', [] );
		if ( ! isset( $input[ $option_name ] ) && ! isset( $old[ $option_name ] ) ) {
			return false;
		}
		if ( ! isset( $input[ $option_name ] ) ) {
			return true;
		}
		if ( ! isset( $old[ $option_name ] ) ) {
			return true;
		}
		$new_values = $input[ $option_name ];
		$old_values = $old[ $option_name ];
		if ( $new_values === $old_values ) {
			return false;
		}

		return true;
	}

}

new Menu_CTA();
