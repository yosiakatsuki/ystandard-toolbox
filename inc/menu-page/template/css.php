<?php
/**
 * Custom CSS Menu
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\menu\Menu_Custom_CSS;

defined( 'ABSPATH' ) || die();
?>
<div class="custom-css ystdtb-menu__component">
	<h1 class="ystdtb-menu__title is-no-margin">追加CSS編集（大）</h1>
	<?php echo Utility::manual_link_inline( 'custom-css' ); ?>
	<div class="custom-css__code ystdtb-menu__section">
		<textarea name="custom-css" id="custom-css" class="widefat code-input" rows="8"><?php echo esc_textarea( Menu_Custom_CSS::get_custom_css() ); ?></textarea>
	</div>
	<div class="ystdtb-menu__section">
		<?php submit_button(); ?>
	</div>
</div>




















































