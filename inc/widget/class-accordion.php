<?php
/**
 * Widget - Accordion
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Accordion
 *
 * @package ystandard_toolbox
 */
class Accordion {

	/**
	 * 設定ID.
	 */
	const FIELD_ID = 'ystdtb-accordion';

	/**
	 * Accordion constructor.
	 */
	public function __construct() {
		add_action( 'in_widget_form', [ $this, 'add_accordion_option' ], 10, 3 );
		add_filter( 'widget_update_callback', [ $this, 'update_accordion_option' ], 10, 4 );
		add_filter( 'dynamic_sidebar_params', [ $this, 'sidebar_params' ] );
	}

	/**
	 * アコーディオン処理を追加するウィジェットの種類
	 *
	 * @param \WP_Widget $widget The widget instance (passed by reference).
	 *
	 * @return bool
	 */
	private function is_add_accordion( $widget ) {
		$accordion_widgets = apply_filters(
			'ystdtb_widget_accordion_id',
			[
				'categories',
				'pages',
				'nav_menu',
			]
		);

		return in_array( $widget->id_base, $accordion_widgets, true );
	}

	/**
	 * アコーディオン設定を追加
	 *
	 * @param \WP_Widget $widget   The widget instance (passed by reference).
	 * @param null       $return   Return null if new fields are added.
	 * @param array      $instance An array of the widget's settings.
	 */
	public function add_accordion_option( $widget, $return, $instance ) {
		if ( ! $this->is_add_accordion( $widget ) ) {
			return;
		}
		$check = isset( $instance[ self::FIELD_ID ] ) ? $instance[ self::FIELD_ID ] : false;
		?>
		<div class="ystdtb-option-box ystdtb-widget-option">
			<div class="ystdtb-option-box__label"><?php _e( '[Toolbox]子階層の折りたたみ設定', 'ystandard-toolbox' ); ?></div>
			<div class="ystdtb-option-box__manual"><?php echo Utility::manual_link_inline( 'manual/ystdtb-widget' ); ?></div>
			<div class="ystdtb-option-box__section">
				<label for="<?php echo esc_attr( $widget->get_field_id( self::FIELD_ID ) ); ?>">
					<input value="1" id="<?php echo esc_attr( $widget->get_field_id( self::FIELD_ID ) ); ?>" name="<?php echo esc_attr( $widget->get_field_name( self::FIELD_ID ) ); ?>" type="checkbox" <?php checked( $check ); ?>/><?php _e( '2階層目以降を折りたたみ式にする', 'ystandard-toolbox' ); ?>
					<div class="ystdtb-option-box__notes">
						<?php _e( '一覧の2階層目以降を親メニュー・カテゴリーをクリックしたら表示する方式にします。', 'ystandard-toolbox' ); ?>
					</div>
				</label>
			</div>
		</div>
		<?php
	}

	/**
	 * アコーディオン設定の保存.
	 *
	 * @param array      $instance     The current widget instance's settings.
	 * @param array      $new_instance Array of new widget settings.
	 * @param array      $old_instance Array of old widget settings.
	 * @param \WP_Widget $widget       The current widget instance.
	 *
	 * @return array
	 */
	public function update_accordion_option( $instance, $new_instance, $old_instance, $widget ) {
		if ( ! $this->is_add_accordion( $widget ) ) {
			return $instance;
		}
		if ( isset( $new_instance[ self::FIELD_ID ] ) ) {
			$instance[ self::FIELD_ID ] = Utility::to_bool( $new_instance[ self::FIELD_ID ] );
		} else {
			if ( isset( $instance[ self::FIELD_ID ] ) ) {
				unset( $instance[ self::FIELD_ID ] );
			}
		}

		return $instance;
	}

	/**
	 * ウィジェットにクラス追加
	 *
	 * @param array $params Params.
	 *
	 * @return array
	 */
	public function sidebar_params( $params ) {
		global $wp_registered_widgets;

		if ( Utility::is_amp() ) {
			return $params;
		}

		if ( ! isset( $params[0] ) || ! isset( $params[0]['widget_id'] ) ) {
			return $params;
		}

		$widget_id  = $params[0]['widget_id'];
		$widget_obj = $wp_registered_widgets[ $widget_id ];

		if ( ! isset( $widget_obj['params'][0]['number'] ) ) {
			return $params;
		}
		$widget_num = $widget_obj['params'][0]['number'];

		if ( ! isset( $widget_obj['callback'][0]->option_name ) ) {
			return $params;
		}

		$widget_option = get_option( $widget_obj['callback'][0]->option_name );

		$accordion = false;
		if ( isset( $widget_option[ $widget_num ]['ystdtb-accordion'] ) ) {
			$accordion = Utility::to_bool( $widget_option[ $widget_num ]['ystdtb-accordion'] );
		}

		if ( $accordion ) {
			$params[0]['before_widget'] = preg_replace(
				'/class="([^"]*)/',
				'class="$1 ystdtb-is-accordion',
				$params[0]['before_widget'],
				1
			);
		}

		return $params;
	}
}

new Accordion();
