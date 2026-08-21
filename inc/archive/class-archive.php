<?php
/**
 * Archive
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Device;
use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();

/**
 * Class Archive
 *
 * @package ystandard_toolbox
 */
class Archive {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'archive';

	/**
	 * ターム別の並び順メタキー.
	 */
	const TERM_ORDER_META_KEY = 'ystdtb-archive-order';

	/**
	 * ターム別に保存できる並び順設定.
	 */
	const ALLOWED_ORDER_SETTINGS = [
		'date/DESC',
		'date/ASC',
		'modified/DESC',
		'modified/ASC',
		'title/ASC',
		'title/DESC',
		'rand/ASC',
	];

	/**
	 * 許可する並び順基準.
	 */
	const ALLOWED_ORDERBY = [ 'date', 'modified', 'title', 'rand' ];

	/**
	 * 許可する昇順・降順.
	 */
	const ALLOWED_ORDER = [ 'ASC', 'DESC' ];

	/**
	 * Archive constructor.
	 */
	public function __construct() {
		if ( Version::ystandard_version_compare( '4.13.1' ) ) {
			add_filter( 'ys_get_archive_default_image', [ $this, 'get_archive_default_image' ], 10, 4 );
		}
		if ( Option::get_option( self::OPTION_NAME, 'archiveMobileLayout', '' ) ) {
			add_filter( 'ys_get_archive_type', [ $this, 'mobile_archive_type' ] );
		}
		// 全体設定がなくてもターム個別設定を適用できるよう、常にクエリ変更処理を登録する.
		add_action( 'pre_get_posts', [ $this, 'change_archive_order' ] );
		if ( Option::get_option( self::OPTION_NAME, 'archiveImageRatio', '' ) ) {
			add_filter( 'ys_archive_image_ratio', [ $this, 'archive_image_ratio' ] );
		}
		if ( Version::ystandard_version_compare( '4.13.2' ) ) {
			add_filter( 'ys_get_archive_detail_date', [ $this, 'get_archive_detail_date' ], 10, 4 );
		}
		add_action( 'ystdtb_term_edit_form', [ $this, 'term_archive_order_edit' ], 12, 2 );
		add_action( 'ystdtb_term_edit_save', [ $this, 'term_archive_order_save' ], 12 );
		add_filter( 'ystdtb_plugin_settings', [ $this, 'add_plugin_settings' ] );
	}

	/**
	 * 一覧ページデフォルト画像
	 *
	 * @param string $image          Image.
	 * @param string $class          Css class.
	 * @param string $icon_class     Icon Class.
	 * @param string $thumbnail_size Thumbnail size.
	 *
	 * @return string
	 */
	public function get_archive_default_image( $image, $class, $icon_class, $thumbnail_size ) {
		$default = Option::get_option( self::OPTION_NAME, 'archiveDefaultImage', '' );
		if ( $default ) {
			$id = attachment_url_to_postid( $default );
			if ( $id ) {
				$image = wp_get_attachment_image(
					$id,
					$thumbnail_size,
					false,
					[
						'class' => $class,
						'alt'   => get_the_title(),
					]
				);
			}
		}

		return $image;
	}

	/**
	 * モバイルでの一覧レイアウト
	 *
	 * @param string $type Type.
	 *
	 * @return string
	 */
	public function mobile_archive_type( $type ) {
		$mobile = Option::get_option( self::OPTION_NAME, 'archiveMobileLayout', '' );
		if ( $mobile && Device::is_mobile() ) {
			$type = $mobile;
		}

		return $type;
	}

	/**
	 * アーカイブページの縦横比変更
	 *
	 * @param string $ratio Ratio Class.
	 *
	 * @return string
	 */
	public function archive_image_ratio( $ratio ) {
		$new_ratio = '';

		$ratio_option = Option::get_option( self::OPTION_NAME, 'archiveImageRatio', '' );
		$new_ratio    = ! empty( $ratio_option ) ? $ratio_option : $new_ratio;
		if ( Option::get_option( self::OPTION_NAME, 'archiveMobileLayout', '' ) ) {
			if ( Device::is_mobile() ) {
				$mobile_ratio = Option::get_option( self::OPTION_NAME, 'archiveImageRatioMobile', '' );

				$new_ratio = ! empty( $mobile_ratio ) ? $mobile_ratio : $new_ratio;
			}
		}

		if ( empty( $new_ratio ) ) {
			return $ratio;
		}

		return "is-{$new_ratio}";
	}


	/**
	 * 日付情報の変更
	 *
	 * @param string $date        日付情報.
	 * @param string $format      HTMLフォーマット.
	 * @param string $icon        アイコン.
	 * @param string $date_format 日付フォーマット.
	 *
	 * @return string
	 */
	public function get_archive_detail_date( $date, $format, $icon, $date_format ) {
		if ( 'modified' === Option::get_option( self::OPTION_NAME, 'archiveDisplayDate', '' ) ) {
			return sprintf(
				$format,
				$icon,
				get_the_modified_date( 'Y-m-d' ),
				get_the_modified_date( $date_format )
			);
		}

		return $date;
	}


	/**
	 * アーカイブページの並び順変更
	 *
	 * @param \WP_Query $query query.
	 */
	public function change_archive_order( $query ) {
		// 管理画面とサブクエリへ影響させないため、フロントエンドのメインクエリだけを扱う.
		if ( is_admin() || ! $query->is_main_query() ) {
			return;
		}
		// 従来どおりアーカイブと検索結果だけを並び替え対象にする.
		if ( ! $query->is_archive() && ! $query->is_search() ) {
			return;
		}

		$order = $this->get_archive_order( $query );
		// 個別設定と全体設定がどちらもなければ、WordPressとテーマの既定順を維持する.
		if ( empty( $order ) ) {
			return;
		}

		$query->set( 'orderby', $order['orderby'] );
		// ランダムでは昇順・降順が意味を持たないため、orderは変更しない.
		if ( 'rand' === $order['orderby'] ) {
			return;
		}

		$query->set( 'order', $order['order'] );
	}

	/**
	 * クエリへ適用する並び順設定を取得.
	 *
	 * @param \WP_Query $query Query.
	 *
	 * @return array
	 */
	private function get_archive_order( $query ) {
		// タームアーカイブでは、対象タームの個別設定を全体設定より優先する.
		if ( $query->is_category() || $query->is_tag() || $query->is_tax() ) {
			$term = $query->get_queried_object();
			// タームを特定できた場合だけ個別設定を参照し、取得失敗時は全体設定へ戻す.
			if ( $term instanceof \WP_Term ) {
				$setting = self::parse_archive_order(
					get_term_meta( $term->term_id, self::TERM_ORDER_META_KEY, true )
				);
				// 有効な個別設定があれば、全体設定を上書きする.
				if ( ! empty( $setting ) ) {
					return $setting;
				}
			}
		}

		return self::parse_archive_order(
			Option::get_option( self::OPTION_NAME, 'archiveOrder', '' )
		);
	}

	/**
	 * 全体設定の文字列をクエリ用配列へ変換.
	 *
	 * @param string $value 並び順設定.
	 *
	 * @return array
	 */
	private static function parse_archive_order( $value ) {
		// 未設定ではクエリを上書きしない.
		if ( ! is_string( $value ) || '' === $value ) {
			return [];
		}

		$parts   = explode( '/', $value, 2 );
		$orderby = $parts[0];
		$order   = $parts[1] ?? 'DESC';

		return self::normalize_order( $orderby, $order );
	}

	/**
	 * 並び順設定を許可値だけのクエリ用配列へ正規化.
	 *
	 * @param string $orderby 並び順基準.
	 * @param string $order   昇順・降順.
	 *
	 * @return array
	 */
	private static function normalize_order( $orderby, $order ) {
		// 許可していない並び順基準は、設定なしとしてフォールバックさせる.
		if ( ! in_array( $orderby, self::ALLOWED_ORDERBY, true ) ) {
			return [];
		}

		// ランダムではorderを返さず、クエリの不要な上書きを避ける.
		if ( 'rand' === $orderby ) {
			return [ 'orderby' => 'rand' ];
		}

		// 保存値が壊れていても一覧を安定して表示できるよう、降順へ補正する.
		if ( ! in_array( $order, self::ALLOWED_ORDER, true ) ) {
			$order = 'DESC';
		}

		return [
			'orderby' => $orderby,
			'order'   => $order,
		];
	}

	/**
	 * タームに一覧の並び替え設定を追加.
	 *
	 * @param \WP_Term $tag      Current taxonomy term object.
	 * @param string   $taxonomy Current taxonomy slug.
	 */
	public function term_archive_order_edit( $tag, $taxonomy ) {
		$value = get_term_meta( $tag->term_id, self::TERM_ORDER_META_KEY, true );

		// 不正な保存値はUIへ引き継がず、全体設定に従う表示へ戻す.
		if ( ! in_array( $value, self::ALLOWED_ORDER_SETTINGS, true ) ) {
			$value = '';
		}
		?>
		<div class="ystdtb-option-box__section">
			<h3 class="ystdtb-option-box__title"><?php echo esc_html__( '一覧表示設定', 'ystandard-toolbox' ); ?></h3>
			<table class="form-table" role="presentation">
				<tr class="form-field">
					<th scope="row">
						<label for="ystdtb-archive-order"><?php echo esc_html__( '投稿の並び順', 'ystandard-toolbox' ); ?></label>
					</th>
					<td>
						<select id="ystdtb-archive-order" name="ystdtb-archive-order">
							<option value="" <?php selected( $value, '' ); ?>><?php echo esc_html__( '全体設定に従う', 'ystandard-toolbox' ); ?></option>
							<option value="date/DESC" <?php selected( $value, 'date/DESC' ); ?>><?php echo esc_html__( '公開日/降順', 'ystandard-toolbox' ); ?></option>
							<option value="date/ASC" <?php selected( $value, 'date/ASC' ); ?>><?php echo esc_html__( '公開日/昇順', 'ystandard-toolbox' ); ?></option>
							<option value="modified/DESC" <?php selected( $value, 'modified/DESC' ); ?>><?php echo esc_html__( '更新日/降順', 'ystandard-toolbox' ); ?></option>
							<option value="modified/ASC" <?php selected( $value, 'modified/ASC' ); ?>><?php echo esc_html__( '更新日/昇順', 'ystandard-toolbox' ); ?></option>
							<option value="title/ASC" <?php selected( $value, 'title/ASC' ); ?>><?php echo esc_html__( 'タイトル/A-Z', 'ystandard-toolbox' ); ?></option>
							<option value="title/DESC" <?php selected( $value, 'title/DESC' ); ?>><?php echo esc_html__( 'タイトル/Z-A', 'ystandard-toolbox' ); ?></option>
							<option value="rand/ASC" <?php selected( $value, 'rand/ASC' ); ?>><?php echo esc_html__( 'ランダム', 'ystandard-toolbox' ); ?></option>
						</select>
					</td>
				</tr>
			</table>
		</div>
		<?php
	}

	/**
	 * ターム別の並び替え設定を保存.
	 *
	 * @param int $term_id Term ID.
	 */
	public function term_archive_order_save( $term_id ) {
		$value = isset( $_POST[ self::TERM_ORDER_META_KEY ] )
			? sanitize_text_field( wp_unslash( $_POST[ self::TERM_ORDER_META_KEY ] ) )
			: '';

		// 全体設定に従う場合と不正値の場合は、個別設定を残さない.
		if ( ! in_array( $value, self::ALLOWED_ORDER_SETTINGS, true ) ) {
			delete_term_meta( $term_id, self::TERM_ORDER_META_KEY );
			return;
		}

		update_term_meta( $term_id, self::TERM_ORDER_META_KEY, $value );
	}

	/**
	 * 設定追加
	 *
	 * @param array $settings Settings.
	 *
	 * @return array
	 */
	public function add_plugin_settings( $settings ) {

		$settings['settings']['archive']['theme_ys_archive_type'] = get_option( 'ys_archive_type', 'card' );
		if ( ! Option::get_option( self::OPTION_NAME, 'archiveDefaultImageId' ) ) {
			$image    = Option::get_option( self::OPTION_NAME, 'archiveDefaultImage' );
			$image_id = url_to_postid( $image );
			// 画像id追加.
			$settings['settings']['archive']['archiveDefaultImageId'] = $image_id;
		}

		return $settings;
	}

}

new Archive();
