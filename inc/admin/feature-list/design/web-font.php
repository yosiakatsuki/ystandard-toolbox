<?php
/**
 * Admin Feature List : Design Web Font
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>Webフォント追加</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type">
			<polyline points="4 7 4 4 20 4 20 7"></polyline>
			<line x1="9" y1="20" x2="15" y2="20"></line>
			<line x1="12" y1="4" x2="12" y2="20"></line>
		</svg>
	</figure>
	<p>Google Fontsなどを使ってWebフォントを追加する機能</p>
	<div class="ystdtb-menu__manual-link is-horizon">
		<?php
		echo Utility::option_link_a( 'font', '', 'button is-primary is-small' );
		echo Utility::manual_link_a( 'manual/ystdtb-add-font', 'マニュアル', 'button is-primary is-small' );
		?>
	</div>
</div>
