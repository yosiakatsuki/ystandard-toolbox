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
$disable_core_pattern = Option::get_option_by_bool( Block_Patterns::OPTION_NAME, 'disable_core_pattern', false );
?>
<div class="copyright ystdtb-menu__component ystdtb-menu__form">
	<h1 class="ystdtb-menu__title is-no-margin">ブロックパターン設定</h1>
	<?php echo Utility::manual_link_inline( 'block-patterns' ); ?>
	<div class="ystdtb-menu__section">
		<div class="ystdtb-menu__table">
			<div class="is-label label">WordPress標準パターン</div>
			<div class="is-content">
				<input name="<?php echo Block_Patterns::OPTION_NAME; ?>[disable_core_pattern]" type="hidden" value="0">
				<label style="font-weight: normal;">
					<input name="<?php echo Block_Patterns::OPTION_NAME; ?>[disable_core_pattern]" id="disable_core_pattern" type="checkbox" value="1" <?php checked( $disable_core_pattern ); ?>>WordPress本体のブロックパターンを無効にする
				</label>
			</div>
		</div>
	</div>
	<div class="ystdtb-menu__section">
		<?php submit_button(); ?>
	</div>
</div>




















































