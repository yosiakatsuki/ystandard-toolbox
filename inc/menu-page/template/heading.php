<?php
/**
 * Heading Menu.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Manual;

defined( 'ABSPATH' ) || die();
?>
<div class="heading ystdtb-menu__component">
	<h1 class="ystdtb-menu__title is-no-margin">見出しデザイン編集</h1>
	<?php echo Manual::manual_link_inline( 'manual/ystdtb-heading' ); ?>
	<div id="app" class="ystdtb-menu__section">
		<App/><!-- vue app -->
		<div class="ystdtb-menu__loading"></div>
	</div>
</div>




















































