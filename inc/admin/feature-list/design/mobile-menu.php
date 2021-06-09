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
	<h3>モバイルメニュー拡張</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smartphone">
			<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
			<line x1="12" y1="18" x2="12.01" y2="18"></line>
		</svg>
	</figure>
	<p>ウィジェットを使ってモバイルメニュー内にボタンや記事一覧などを配置できる機能</p>
	<div class="ystdtb-menu__manual-link is-horizon">
		<?php
		echo Utility::option_link_a( 'navigation', '', 'button is-primary is-small' );
		echo Utility::manual_link( 'manual/ystdtb-mobile-menu-widget', 'マニュアル', 'button is-primary is-small' );
		?>
	</div>
</div>
