<?php
/**
 * Admin Feature List : Design Index
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

?>
<div class="ystdtb-menu__section">
	<h2 class="ystdtb-menu__section_title">デザイン機能</h2>
	<div class="ystdtb-menu__column">
		<?php
		include __DIR__ . '/heading.php';
		include __DIR__ . '/web-font.php';
		include __DIR__ . '/overlay.php';
		include __DIR__ . '/archive.php';
		include __DIR__ . '/mobile-menu.php';
		include __DIR__ . '/sub-header-menu.php';
		include __DIR__ . '/cta.php';
		include __DIR__ . '/add-css.php';
		include __DIR__ . '/copyright.php';
		include __DIR__ . '/widget-accordion.php';
		?>
	</div>
</div>
