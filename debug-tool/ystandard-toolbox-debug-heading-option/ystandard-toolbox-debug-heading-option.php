<?php
/**
 * Plugin Name: yStandard Toolbox Debug: 見出し設定
 * Description: yStandard Toolbox の見出しデザイン設定（v1 / v2）の確認・削除・エクスポート・インポート用デバッグツール。開発環境専用。
 * Version:     0.1.0
 * Author:      yosiakatsuki
 *
 * @package ystandard-toolbox-debug
 */

defined( 'ABSPATH' ) || die();

// 共通定数.
define( 'YSTDTB_DEBUG_HEADING_OPTION_PARENT_SLUG', 'tools.php' );
define( 'YSTDTB_DEBUG_HEADING_OPTION_PAGE_SLUG', 'ystdtb-debug-heading-option' );
define( 'YSTDTB_DEBUG_HEADING_OPTION_MENU_TITLE', '[ys]見出し編集機能デバッグ' );
define( 'YSTDTB_DEBUG_HEADING_OPTION_NONCE_ACTION', 'ystdtb_debug_heading_option_action' );
define( 'YSTDTB_DEBUG_HEADING_OPTION_NONCE_NAME', 'ystdtb_debug_nonce' );

// 対象 option / transient.
define( 'YSTDTB_DEBUG_HEADING_OPTION_KEY_V1', 'ystdtb_heading' );
define( 'YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_MAIN', 'ystdtb_heading_v2' );
define( 'YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_LEVEL', 'ystdtb_heading_level' );
define( 'YSTDTB_DEBUG_HEADING_OPTION_TRANSIENT_CSS', 'ystdtb_heading_v2_css' );

require_once __DIR__ . '/handler.php';

/**
 * サブメニュー登録.
 *
 * @return void
 */
function ystdtb_debug_heading_option_register_menu() {
	add_submenu_page(
		YSTDTB_DEBUG_HEADING_OPTION_PARENT_SLUG,
		YSTDTB_DEBUG_HEADING_OPTION_MENU_TITLE,
		YSTDTB_DEBUG_HEADING_OPTION_MENU_TITLE,
		'manage_options',
		YSTDTB_DEBUG_HEADING_OPTION_PAGE_SLUG,
		'ystdtb_debug_heading_option_render_page',
		999
	);
}
add_action( 'admin_menu', 'ystdtb_debug_heading_option_register_menu', 999 );

/**
 * 管理画面通知の表示.
 *
 * リダイレクト後に notice クエリを読み取って表示する.
 *
 * @return void
 */
function ystdtb_debug_heading_option_render_notice() {
	if ( ! isset( $_GET['page'] ) || YSTDTB_DEBUG_HEADING_OPTION_PAGE_SLUG !== $_GET['page'] ) {
		return;
	}
	if ( ! isset( $_GET['notice'] ) ) {
		return;
	}

	$notice = sanitize_key( wp_unslash( $_GET['notice'] ) );

	$messages = [
		'deleted_v1'                 => [ 'success', 'v1 設定（ystdtb_heading）を削除しました。' ],
		'deleted_v2_main'            => [ 'success', 'v2 メイン設定（ystdtb_heading_v2）を削除しました。' ],
		'deleted_v2_level'           => [ 'success', 'v2 レベル設定（ystdtb_heading_level）を削除しました。' ],
		'deleted_all'                => [ 'success', 'すべての見出し設定を削除しました。' ],
		'imported'                   => [ 'success', '設定をインポートしました。' ],
		'import_error_no_file'       => [ 'error', 'ファイルが選択されていません。' ],
		'import_error_invalid_json'  => [ 'error', 'JSON の解析に失敗しました。' ],
		'import_error_invalid_format' => [ 'error', 'JSON 構造が正しくありません（options キーが必要）。' ],
		'import_error_upload'        => [ 'error', 'ファイルのアップロードに失敗しました。' ],
	];

	if ( ! isset( $messages[ $notice ] ) ) {
		return;
	}

	[ $type, $message ] = $messages[ $notice ];
	printf(
		'<div class="notice notice-%1$s is-dismissible"><p>%2$s</p></div>',
		esc_attr( $type ),
		esc_html( $message )
	);
}
add_action( 'admin_notices', 'ystdtb_debug_heading_option_render_notice' );

/**
 * ページ描画.
 *
 * @return void
 */
function ystdtb_debug_heading_option_render_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'You do not have sufficient permissions to access this page.' ) );
	}

	$v1       = get_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V1, null );
	$v2_main  = get_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_MAIN, null );
	$v2_level = get_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_LEVEL, null );

	$is_compatible = ( empty( $v2_main ) && ! is_null( $v1 ) );

	$action_url = admin_url( 'admin-post.php' );
	?>
	<div class="wrap">
		<h1><?php echo esc_html( YSTDTB_DEBUG_HEADING_OPTION_MENU_TITLE ); ?></h1>
		<p>yStandard Toolbox の見出しデザイン設定（v1 / v2）の確認・削除・エクスポート・インポートを行います。</p>

		<h2>設定値の確認</h2>
		<p>
			互換モード（v1 を使う状態）:
			<strong><?php echo $is_compatible ? 'true' : 'false'; ?></strong>
		</p>

		<h3><code>ystdtb_heading</code>（v1）</h3>
		<?php ystdtb_debug_heading_option_render_value( $v1, 'v1' ); ?>

		<h3><code>ystdtb_heading_v2</code>（v2 メイン）</h3>
		<?php ystdtb_debug_heading_option_render_value( $v2_main, 'v2-main' ); ?>

		<h3><code>ystdtb_heading_level</code>（v2 レベル別）</h3>
		<?php ystdtb_debug_heading_option_render_value( $v2_level, 'v2-level' ); ?>

		<hr />

		<h2>削除</h2>
		<p>削除前に CSS キャッシュ（transient <code><?php echo esc_html( YSTDTB_DEBUG_HEADING_OPTION_TRANSIENT_CSS ); ?></code>）も合わせてクリアされます。</p>
		<form method="post" action="<?php echo esc_url( $action_url ); ?>" style="display:inline-block;margin-right:8px;">
			<?php wp_nonce_field( YSTDTB_DEBUG_HEADING_OPTION_NONCE_ACTION, YSTDTB_DEBUG_HEADING_OPTION_NONCE_NAME ); ?>
			<input type="hidden" name="action" value="ystdtb_debug_heading_option_delete" />
			<input type="hidden" name="target" value="v1" />
			<button type="submit" class="button" onclick="return confirm('v1 設定を削除します。よろしいですか？');">v1 設定を削除</button>
		</form>
		<form method="post" action="<?php echo esc_url( $action_url ); ?>" style="display:inline-block;margin-right:8px;">
			<?php wp_nonce_field( YSTDTB_DEBUG_HEADING_OPTION_NONCE_ACTION, YSTDTB_DEBUG_HEADING_OPTION_NONCE_NAME ); ?>
			<input type="hidden" name="action" value="ystdtb_debug_heading_option_delete" />
			<input type="hidden" name="target" value="v2_main" />
			<button type="submit" class="button" onclick="return confirm('v2 メイン設定を削除します。よろしいですか？');">v2 メイン設定を削除</button>
		</form>
		<form method="post" action="<?php echo esc_url( $action_url ); ?>" style="display:inline-block;margin-right:8px;">
			<?php wp_nonce_field( YSTDTB_DEBUG_HEADING_OPTION_NONCE_ACTION, YSTDTB_DEBUG_HEADING_OPTION_NONCE_NAME ); ?>
			<input type="hidden" name="action" value="ystdtb_debug_heading_option_delete" />
			<input type="hidden" name="target" value="v2_level" />
			<button type="submit" class="button" onclick="return confirm('v2 レベル設定を削除します。よろしいですか？');">v2 レベル設定を削除</button>
		</form>
		<form method="post" action="<?php echo esc_url( $action_url ); ?>" style="display:inline-block;">
			<?php wp_nonce_field( YSTDTB_DEBUG_HEADING_OPTION_NONCE_ACTION, YSTDTB_DEBUG_HEADING_OPTION_NONCE_NAME ); ?>
			<input type="hidden" name="action" value="ystdtb_debug_heading_option_delete" />
			<input type="hidden" name="target" value="all" />
			<button type="submit" class="button button-secondary" onclick="return confirm('すべての見出し設定（v1 / v2 メイン / v2 レベル）を削除します。よろしいですか？');">すべて削除</button>
		</form>

		<hr />

		<h2>エクスポート</h2>
		<p>現在保存されている見出し設定を JSON ファイルとしてダウンロードします。</p>
		<form method="post" action="<?php echo esc_url( $action_url ); ?>">
			<?php wp_nonce_field( YSTDTB_DEBUG_HEADING_OPTION_NONCE_ACTION, YSTDTB_DEBUG_HEADING_OPTION_NONCE_NAME ); ?>
			<input type="hidden" name="action" value="ystdtb_debug_heading_option_export" />
			<button type="submit" class="button button-primary">JSON をダウンロード</button>
		</form>

		<hr />

		<h2>インポート</h2>
		<p>JSON ファイルをアップロードして見出し設定を書き戻します。<code>options</code> キー内の以下のキーのみ反映されます: <code>ystdtb_heading</code> / <code>ystdtb_heading_v2</code> / <code>ystdtb_heading_level</code>。値が <code>null</code> の場合は削除されます。</p>
		<form method="post" action="<?php echo esc_url( $action_url ); ?>" enctype="multipart/form-data">
			<?php wp_nonce_field( YSTDTB_DEBUG_HEADING_OPTION_NONCE_ACTION, YSTDTB_DEBUG_HEADING_OPTION_NONCE_NAME ); ?>
			<input type="hidden" name="action" value="ystdtb_debug_heading_option_import" />
			<p>
				<input type="file" name="import_file" accept="application/json,.json" required />
			</p>
			<p>
				<button type="submit" class="button button-primary" onclick="return confirm('現在の設定を上書きします。よろしいですか？');">インポート</button>
			</p>
		</form>
	</div>
	<script>
		( function () {
			document.addEventListener( 'click', function ( event ) {
				var button = event.target.closest( '.ystdtb-debug-copy-button' );
				if ( ! button ) {
					return;
				}
				var targetId = button.getAttribute( 'data-target-id' );
				var pre      = document.getElementById( targetId );
				if ( ! pre ) {
					return;
				}
				var text     = pre.textContent;
				var original = button.textContent;
				var restore  = function ( label ) {
					button.textContent = label;
					setTimeout( function () { button.textContent = original; }, 1500 );
				};
				if ( navigator.clipboard && navigator.clipboard.writeText ) {
					navigator.clipboard.writeText( text ).then(
						function () { restore( 'コピーしました' ); },
						function () { restore( 'コピー失敗' ); }
					);
					return;
				}
				// Clipboard API 非対応環境向けフォールバック.
				var textarea = document.createElement( 'textarea' );
				textarea.value         = text;
				textarea.style.position = 'fixed';
				textarea.style.opacity  = '0';
				document.body.appendChild( textarea );
				textarea.select();
				try {
					document.execCommand( 'copy' );
					restore( 'コピーしました' );
				} catch ( e ) {
					restore( 'コピー失敗' );
				}
				document.body.removeChild( textarea );
			} );
		} )();
	</script>
	<?php
}

/**
 * 値を整形して表示するヘルパ.
 *
 * @param mixed  $value     表示する値.
 * @param string $id_suffix DOM ID のサフィックス（コピー対象指定用）.
 *
 * @return void
 */
function ystdtb_debug_heading_option_render_value( $value, $id_suffix ) {
	if ( is_null( $value ) || '' === $value || ( is_array( $value ) && empty( $value ) ) ) {
		echo '<p><em>(未設定)</em></p>';
		return;
	}
	$json       = wp_json_encode( $value, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
	$element_id = 'ystdtb-debug-value-' . $id_suffix;
	?>
	<p>
		<button
			type="button"
			class="button ystdtb-debug-copy-button"
			data-target-id="<?php echo esc_attr( $element_id ); ?>"
		>クリップボードにコピー</button>
	</p>
	<pre id="<?php echo esc_attr( $element_id ); ?>" style="background:#f6f7f7;padding:12px;max-height:400px;overflow:auto;"><?php echo esc_html( $json ); ?></pre>
	<?php
}

/**
 * CSS キャッシュ削除.
 *
 * @return void
 */
function ystdtb_debug_heading_option_clear_cache() {
	delete_transient( YSTDTB_DEBUG_HEADING_OPTION_TRANSIENT_CSS );
}

/**
 * 通知付きでページにリダイレクト.
 *
 * @param string $notice 通知キー.
 *
 * @return void
 */
function ystdtb_debug_heading_option_redirect_with_notice( $notice ) {
	$url = add_query_arg(
		[
			'page'   => YSTDTB_DEBUG_HEADING_OPTION_PAGE_SLUG,
			'notice' => $notice,
		],
		admin_url( YSTDTB_DEBUG_HEADING_OPTION_PARENT_SLUG )
	);
	wp_safe_redirect( $url );
	exit;
}
