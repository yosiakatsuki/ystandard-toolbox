<?php
/**
 * Admin Feature List : SEO
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

?>
<div class="ystdtb-menu__section">
	<h2 class="ystdtb-menu__section_title">SEO関連機能</h2>
	<div class="ystdtb-menu__column">
		<?php
		include __DIR__ . '/post-seo.php';
		include __DIR__ . '/archive-seo.php';
		?>
	</div>
</div>
