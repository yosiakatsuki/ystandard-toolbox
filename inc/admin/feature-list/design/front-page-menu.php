<?php
/**
 * Admin Feature List : Design Mobile Menu
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>TOP専用メニュー</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
			<line x1="3" y1="12" x2="21" y2="12"></line>
			<line x1="3" y1="6" x2="21" y2="6"></line>
			<line x1="3" y1="18" x2="21" y2="18"></line>
		</svg>
	</figure>
	<p>フロントページ専用のメニューを表示できる機能</p>
	<div class="ystdtb-menu__manual-link is-horizon">
		<?php
		echo Utility::manual_link( 'manual/ystdtb-only-front-page-menu', 'マニュアル', 'button is-primary is-small' );
		?>
	</div>
</div>
