<?php
/**
 * Admin Feature List : Other : Script
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>head,footerコード追加</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code">
			<polyline points="16 18 22 12 16 6"></polyline>
			<polyline points="8 6 2 12 8 18"></polyline>
		</svg>
	</figure>
	<p>&lt;head&gt;内や&lt;/body&gt;直前などにJavaScriptなどを追加できる機能</p>
	<div class="ystdtb-menu__manual-link is-horizon">
		<?php
		echo Utility::option_link_a( 'code', '', 'button is-primary is-small' );
		echo Utility::manual_link( 'manual/ystdtb-add-code', 'マニュアル', 'button is-primary is-small' );
		?>
	</div>
</div>
