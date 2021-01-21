<?php
/**
 * Copyright Menu
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
$copyright          = Copyright::get_copyright_option();
$disable_theme_info = Copyright::get_disable_theme_info();
?>
<div class="copyright ystdtb-menu__component ystdtb-menu__form">
	<h1 class="ystdtb-menu__title is-no-margin">Copyright編集</h1>
	<?php echo Utility::manual_link_inline( 'manual/ystdtb-copyright' ); ?>
	<div class="ystdtb-menu__section">
		<div class="ystdtb-menu__table">
			<label for="copyright" class="is-label">Copyright</label>
			<div class="is-content">
				<textarea name="<?php echo Copyright::OPTION_NAME; ?>[copyright]" id="copyright" class="widefat code-input" rows="4"><?php echo esc_textarea( wp_unslash( $copyright ) ); ?></textarea>
				<p class="ystdtb-menu__subtext">
					※次のHTMLタグが使用できます。<code>a</code>,<code>strong</code>,<code>span</code>,<code>br</code><br>
					※本文内に以下の文字を入力すると、表示時にそれぞれ変換されます。<br>
					・{year}: 現在の年<br>
					・{site}: サイト名<br>
					・{url}: サイトURL
				</p>
			</div>
		</div>
		<div class="ystdtb-menu__table">
			<div class="is-label label">Powered by の削除</div>
			<div class="is-content">
				<label style="font-weight: normal;">
					<input name="<?php echo Copyright::OPTION_NAME; ?>[disable_theme_info]" id="poweredby" type="checkbox" value="1" <?php checked( $disable_theme_info ); ?>>Powered by の表示を削除する
				</label>
				<p class="ystdtb-menu__subtext">
					「yStandard Theme by yosiakatsuki Powered by WordPress」の表示を削除します。
				</p>
			</div>
		</div>
	</div>
	<div class="ystdtb-menu__section">
		<?php submit_button(); ?>
	</div>
</div>




















































