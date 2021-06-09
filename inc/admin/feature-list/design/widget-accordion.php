<?php
/**
 * Admin Feature List : Design Widget Accordion
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>ウィジェット子階層折りたたみ</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize-2">
			<polyline points="4 14 10 14 10 20"></polyline>
			<polyline points="20 10 14 10 14 4"></polyline>
			<line x1="14" y1="10" x2="21" y2="3"></line>
			<line x1="3" y1="21" x2="10" y2="14"></line>
		</svg>
	</figure>
	<p>カテゴリー・ナビゲーションメニュー・固定ページウィジェットで子階層を折りたたみ表示する機能</p>
	<div class="ystdtb-menu__manual-link is-horizon">
		<?php
		echo Utility::manual_link( 'manual/ystdtb-widget-accordion', 'マニュアル', 'button is-primary is-small' );
		?>
	</div>
</div>
