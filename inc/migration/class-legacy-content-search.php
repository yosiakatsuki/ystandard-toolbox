<?php
/**
 * 旧仕様のブロック・クラスを使用している投稿の検索
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Legacy_Content_Search.
 *
 * v2 で破壊的変更があったブロック・クラスを含む投稿を検索し、編集画面へのリンクを一覧表示する。
 * パターンの追加は $patterns 配列、もしくは `ystdtb_legacy_content_search_patterns` フィルターで行う。
 */
class Legacy_Content_Search {

	/**
	 * Menu Slug.
	 */
	const MENU_SLUG = 'ystdtb-legacy-content-search';

	/**
	 * Menu Position.
	 */
	const MENU_POSITION = 30;

	/**
	 * ページへのアクセスに必要な権限.
	 */
	const CAPABILITY = 'edit_others_posts';

	/**
	 * 検索結果キャッシュ.
	 *
	 * @var array|null
	 */
	private $cached_results = null;

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'add_menu' ], 100 + self::MENU_POSITION );
	}

	/**
	 * デフォルトの検索パターン定義.
	 *
	 * 翻訳関数を使用するため静的プロパティではなくメソッドで定義する。
	 *
	 * 配列のキーは各パターンの一意な ID。
	 * - name           : 表示名（必須）
	 * - description    : 説明文（オプション）
	 * - block_name     : 絞り込み対象ブロック名（オプション、`wp:` プレフィックスなし）
	 * - block_label    : 「使用ブロック」列に表示するブロックのユーザー向け名称（必須）
	 * - target_strings : 検索対象文字列の配列（必須、OR 検索）
	 *
	 * @return array
	 */
	private static function get_default_patterns() {
		return [
			'description-list-dl-column-legacy-class' => [
				'name'           => __( '定義リスト（横並び）：v2.0.0で変更されたクラスを使用している投稿', 'ystandard-toolbox' ),
				'description'    => __( 'v2.0.0 で動作が変更されたクラスを含んでいます。エディターで開いて再保存することで最新の構造に更新されます。うまく更新されない場合は「縦に並べるタイミング」を何度か操作するなど、何かしらの変更を加えると変換が反映される場合があります。', 'ystandard-toolbox' ),
				'block_name'     => 'ystdtb/description-list-column',
				'block_label'    => __( '定義リスト（横並び）', 'ystandard-toolbox' ),
				'target_strings' => [
					'is-not-stacked-on-tablet',
					'is-not-stacked-on-mobile',
				],
			],
			'posts-legacy-excerpt-length'             => [
				'name'           => __( '記事一覧：v2.0.0で削除された概要文字数設定を使用している投稿', 'ystandard-toolbox' ),
				'description'    => __( 'v2.0.0で概要文の設定が「概要文字数」から「概要文の最大行数」に変更されました。エディターで開いて「概要文の最大行数」を設定し直して保存してください。', 'ystandard-toolbox' ),
				'block_name'     => 'ystdtb/posts',
				'block_label'    => __( '記事一覧', 'ystandard-toolbox' ),
				'target_strings' => [
					'excerptLength',
				],
			],
		];
	}

	/**
	 * パターン定義取得.
	 *
	 * @return array
	 */
	public static function get_patterns() {
		/**
		 * 検索パターンをフィルターで拡張可能にする
		 *
		 * @param array $patterns 検索パターン定義の配列.
		 */
		return apply_filters( 'ystdtb_legacy_content_search_patterns', self::get_default_patterns() );
	}

	/**
	 * メニュー追加.
	 *
	 * 該当投稿が1件もない場合はメニューを表示しない。
	 */
	public function add_menu() {
		if ( ! $this->has_any_matches() ) {
			return;
		}
		add_submenu_page(
			Config::ADMIN_MENU_SLUG_V2,
			__( '移行が必要なブロック一覧', 'ystandard-toolbox' ),
			__( '移行が必要なブロック一覧', 'ystandard-toolbox' ),
			self::CAPABILITY,
			self::MENU_SLUG,
			[ $this, 'render_page' ],
			self::MENU_POSITION
		);
	}

	/**
	 * 該当投稿が1件でも存在するか.
	 *
	 * @return bool
	 */
	private function has_any_matches() {
		foreach ( $this->get_results() as $entry ) {
			if ( ! empty( $entry['posts'] ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * 全パターンの検索結果を取得（リクエスト中はキャッシュ）.
	 *
	 * @return array
	 */
	private function get_results() {
		if ( null !== $this->cached_results ) {
			return $this->cached_results;
		}
		$results  = [];
		$patterns = self::get_patterns();
		foreach ( $patterns as $key => $pattern ) {
			$results[ $key ] = [
				'pattern' => $pattern,
				'posts'   => $this->search_pattern( $pattern ),
			];
		}
		$this->cached_results = $results;

		return $results;
	}

	/**
	 * 1パターンを検索.
	 *
	 * @param array $pattern パターン定義.
	 *
	 * @return array
	 */
	private function search_pattern( $pattern ) {
		global $wpdb;

		$target_strings = isset( $pattern['target_strings'] ) ? $pattern['target_strings'] : [];
		if ( empty( $target_strings ) ) {
			return [];
		}

		$post_types = $this->get_searchable_post_types();
		if ( empty( $post_types ) ) {
			return [];
		}

		// target_strings: OR 検索の LIKE 句を組み立て.
		$like_clauses = [];
		$values       = [];
		foreach ( $target_strings as $string ) {
			$like_clauses[] = 'post_content LIKE %s';
			$values[]       = '%' . $wpdb->esc_like( $string ) . '%';
		}
		$or_clause = '(' . implode( ' OR ', $like_clauses ) . ')';

		// block_name による絞り込み（false positive 抑制）.
		$block_clause = '';
		if ( ! empty( $pattern['block_name'] ) ) {
			$block_clause = 'AND post_content LIKE %s';
			$values[]     = '%' . $wpdb->esc_like( 'wp:' . $pattern['block_name'] ) . '%';
		}

		// 投稿タイプ条件のプレースホルダー.
		$type_placeholders = implode( ',', array_fill( 0, count( $post_types ), '%s' ) );
		$values            = array_merge( $values, $post_types );

		// 複数 LIKE 句の OR 検索は WP_Query では実装が著しく複雑になるため $wpdb を直接利用.
		// $or_clause / $block_clause / $type_placeholders は事前に組み立てた静的な SQL 片で、
		// すべての値は $values 経由で $wpdb->prepare() に渡してエスケープしている。.
		// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQLPlaceholders.ReplacementsWrongNumber, WordPress.DB.PreparedSQLPlaceholders.UnfinishedPrepare
		$rows = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT ID, post_title, post_type FROM {$wpdb->posts}
				WHERE {$or_clause}
				{$block_clause}
				AND post_type IN ({$type_placeholders})
				AND post_status IN ('publish', 'draft', 'pending', 'private', 'future')
				ORDER BY post_type, post_title",
				$values
			)
		);
		// phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQLPlaceholders.ReplacementsWrongNumber, WordPress.DB.PreparedSQLPlaceholders.UnfinishedPrepare

		if ( empty( $rows ) ) {
			return [];
		}

		$posts = [];
		foreach ( $rows as $row ) {
			$posts[] = [
				'post_id'    => (int) $row->ID,
				'post_title' => $row->post_title,
				'post_type'  => $row->post_type,
				'edit_link'  => get_edit_post_link( $row->ID, 'raw' ),
			];
		}

		return $posts;
	}

	/**
	 * 検索対象の投稿タイプ取得.
	 *
	 * ブロックエディター対応の投稿タイプ（show_in_rest = true）を対象とする。
	 * show_ui で判定すると show_ui=false / show_in_rest=true で登録された投稿タイプ（マニュアル等）が漏れるため。
	 *
	 * @return array
	 */
	private function get_searchable_post_types() {
		$post_types = get_post_types( [ 'show_ui' => true ], 'names' );
		// 添付ファイルは除外（ブロックを含まないため）.
		unset( $post_types['attachment'] );
		/**
		 * 検索対象の投稿タイプをフィルターで拡張可能にする
		 *
		 * @param array $post_types 投稿タイプスラッグの配列.
		 */
		return apply_filters( 'ystdtb_legacy_content_search_post_types', array_values( $post_types ) );
	}

	/**
	 * ページ表示.
	 */
	public function render_page() {
		if ( ! current_user_can( self::CAPABILITY ) ) {
			wp_die( esc_html__( 'You do not have sufficient permissions to access this page.', 'ystandard-toolbox' ) );
		}
		$results = $this->get_results();
		?>
		<div class="wrap">
			<h1><?php esc_html_e( '移行が必要なブロック一覧', 'ystandard-toolbox' ); ?></h1>

			<?php foreach ( $results as $key => $entry ) : ?>
				<?php $this->render_pattern_section( $key, $entry ); ?>
			<?php endforeach; ?>
		</div>
		<?php
	}

	/**
	 * パターンごとのセクションを描画.
	 *
	 * @param string $key   パターン ID.
	 * @param array  $entry パターン定義 + 検索結果.
	 */
	private function render_pattern_section( $key, $entry ) {
		$pattern = $entry['pattern'];
		$posts   = $entry['posts'];

		if ( empty( $posts ) ) {
			return;
		}
		?>
		<div style="margin-top: 2em;" data-pattern="<?php echo esc_attr( $key ); ?>">
			<h2><?php echo esc_html( $pattern['name'] ); ?></h2>
			<?php if ( ! empty( $pattern['description'] ) ) : ?>
				<p><?php echo esc_html( $pattern['description'] ); ?></p>
			<?php endif; ?>
			<p style="color: #d63638; font-weight: 600;">
				<?php
				printf(
					/* translators: %d: 検索結果の件数 */
					esc_html__( '%d件の投稿で該当パターンが検出されました。', 'ystandard-toolbox' ),
					count( $posts )
				);
				?>
			</p>
			<table class="widefat striped" style="margin-top: 1em;">
				<thead style="white-space: nowrap;">
					<tr>
						<th><?php esc_html_e( '投稿タイトル', 'ystandard-toolbox' ); ?></th>
						<th><?php esc_html_e( '投稿タイプ', 'ystandard-toolbox' ); ?></th>
						<th><?php esc_html_e( '使用ブロック', 'ystandard-toolbox' ); ?></th>
						<th><?php esc_html_e( '操作', 'ystandard-toolbox' ); ?></th>
					</tr>
				</thead>
				<tbody>
					<?php foreach ( $posts as $post ) : ?>
						<tr>
							<td>
								<?php
								$title = ! empty( $post['post_title'] )
									? $post['post_title']
									: __( '（タイトルなし）', 'ystandard-toolbox' );
								echo esc_html( $title );
								?>
							</td>
							<td><?php echo esc_html( $this->get_post_type_label( $post['post_type'] ) ); ?></td>
							<td><?php echo esc_html( $pattern['block_label'] ); ?></td>
							<td>
								<?php if ( ! empty( $post['edit_link'] ) ) : ?>
									<a href="<?php echo esc_url( $post['edit_link'] ); ?>" target="_blank">
										<?php esc_html_e( '編集', 'ystandard-toolbox' ); ?>
									</a>
								<?php else : ?>
									-
								<?php endif; ?>
							</td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
		<?php
	}

	/**
	 * 投稿タイプのラベル取得.
	 *
	 * @param string $post_type 投稿タイプスラッグ.
	 *
	 * @return string
	 */
	private function get_post_type_label( $post_type ) {
		$obj = get_post_type_object( $post_type );
		if ( $obj && isset( $obj->labels->singular_name ) ) {
			return $obj->labels->singular_name;
		}

		return $post_type;
	}
}

new Legacy_Content_Search();
