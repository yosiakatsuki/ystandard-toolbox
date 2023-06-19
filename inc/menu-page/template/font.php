<?php
/**
 * Font Menu.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\AMP;

defined( 'ABSPATH' ) || die();

$sample_font = Font::get_sample_font_family();
$font_family = Font::get_font_family();
?>
<div class="font ystdtb-menu__component ystdtb-menu__form">
	<h1 class="ystdtb-menu__title is-no-margin">Webフォント設定</h1>
	<?php echo Utility::manual_link_inline( 'manual/ystdtb-add-font' ); ?>
	<div class="ystdtb-menu__section">
		<label for="font-html" class="is-block">Webフォント追加用HTML</label>
		<textarea name="<?php echo Font::OPTION_NAME; ?>[html]" id="font-html" class="widefat code-input" rows="4"><?php echo esc_textarea( wp_unslash( Option::get_option( Font::OPTION_NAME, 'html' ) ) ); ?></textarea>
		<div class="ystdtb-menu__subtext">
			<a href="https://fonts.google.com/" target="_blank" rel="noreferrer nofollow noopener">Google Fonts</a>などで発行したフォント読み込み用のHTMLを貼り付けてください。
		</div>
		<?php if ( AMP::is_amp_enable() ) : ?>
			<div class="ystdtb-menu__subtext">
				※入力したコードはAMPページでも出力されます。<br>
				※AMPページと分けたい場合は「コード追加」設定を使用してください。
			</div>
		<?php endif; ?>
	</div>
	<div class="ystdtb-menu__section">
		<label for="font-family" class="is-block">フォント指定の編集</label>
		<div class="ystdtb-menu__horizontal">
			<span class="label is-small is-nowrap">font-family :</span>
			<input id="font-family" type="text" name="<?php echo Font::OPTION_NAME; ?>[family]" class="widefat font-family" value="<?php echo esc_textarea( $font_family ); ?>" placeholder="<?php echo $sample_font; ?>">
		</div>
		<div class="ystdtb-menu__subtext ystdtb-menu__section is-small">
			※追加したWebフォントを含めた font-family を入力してください。
			<?php if ( empty( $font_family ) ) : ?>
				<br>
				※現在の設定では<code id="font-family-option"><?php echo esc_html( $sample_font ); ?></code>が有効になっています。<br>
				※font-family の指定をコピーして、追加したフォントの指定を追記してください。
				<div style="margin-top: .5em;">
					<button id="font-family-copy">現在の設定をfont-family欄にセットする</button>
				</div>
				<script>
					document.getElementById( 'font-family-copy' ).addEventListener( 'click', function ( e ) {
						e.preventDefault();
						var input = document.getElementById( 'font-family' );
						input.value = document.getElementById( 'font-family-option' ).textContent;
						input.focus();
						input.select();
					} );
				</script>
			<?php endif; ?>
		</div>
	</div>
	<div class="ystdtb-menu__section">
		<?php submit_button(); ?>
	</div>
</div>




















































