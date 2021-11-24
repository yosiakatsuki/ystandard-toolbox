<?php
/**
 * Admin Feature List : Block
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

?>
<div class="ystdtb-menu__section">
	<h2 class="ystdtb-menu__section_title">ブロック機能</h2>
	<div class="ystdtb-menu__column">
		<?php
		include __DIR__ . '/block-pattern.php';
		include __DIR__ . '/slider.php';
		include __DIR__ . '/box.php';
		include __DIR__ . '/icon-list.php';
		include __DIR__ . '/timeline.php';
		include __DIR__ . '/faq.php';
		include __DIR__ . '/posts.php';
		include __DIR__ . '/parts.php';
		include __DIR__ . '/share-button.php';
		include __DIR__ . '/block-style.php';
		include __DIR__ . '/banner-link.php';
		?>
	</div>
</div>
