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
		include __DIR__ . '/lp.php';
		include __DIR__ . '/web-font.php';
		include __DIR__ . '/archive.php';
		include __DIR__ . '/front-page-menu.php';
		include __DIR__ . '/cta.php';
		include __DIR__ . '/add-css.php';
		include __DIR__ . '/widget-accordion.php';
		?>
	</div>
</div>
