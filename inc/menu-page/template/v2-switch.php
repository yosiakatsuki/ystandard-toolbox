<?php
/**
 * V2 Switch Menu
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

$enable = V2_Switch::is_enabled();
?>
<div class="v2-switch ystdtb-menu__component ystdtb-menu__form">
	<h1 class="ystdtb-menu__title is-no-margin"><?php esc_html_e( 'v2切り替え設定', 'ystandard-toolbox' ); ?></h1>
	<div class="ystdtb-menu__section">
		<div class="ystdtb-menu__table">
			<div class="is-label label"><?php esc_html_e( 'v2切り替え', 'ystandard-toolbox' ); ?></div>
			<div class="is-content">
				<input name="<?php echo esc_attr( V2_Switch::OPTION_NAME ); ?>[enable]" type="hidden" value="0">
				<label style="font-weight: normal;">
					<input name="<?php echo esc_attr( V2_Switch::OPTION_NAME ); ?>[enable]" id="v2-switch-enable" type="checkbox" value="1" <?php checked( $enable ); ?>>
					<?php esc_html_e( 'yStandard Toolbox v2への切り替えを有効化する', 'ystandard-toolbox' ); ?>
				</label>
				<p class="ystdtb-menu__subtext">
					<?php esc_html_e( '有効化すると、次回以降のアップデート確認でv2系の更新情報を取得します。', 'ystandard-toolbox' ); ?><br>
					<?php esc_html_e( 'v2は大きな変更を含むため、更新前にバックアップを取得し、必要に応じて検証環境で動作確認してください。', 'ystandard-toolbox' ); ?>
				</p>
			</div>
		</div>
	</div>
	<div class="ystdtb-menu__section">
		<?php submit_button(); ?>
	</div>
</div>
