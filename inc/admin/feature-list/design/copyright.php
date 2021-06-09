<?php
/**
 * Admin Feature List : Design Copyright
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>Copyright編集</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award">
			<circle cx="12" cy="8" r="7"></circle>
			<polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
		</svg>
	</figure>
	<p>サイトフッターに表示されるCopyright表記の編集、「yStandard Theme by yosiakatsuki Powered by WordPress」の削除機能</p>

	<div class="ystdtb-menu__manual-link is-horizon">
		<?php
		echo Utility::option_link_a( 'copyright', '', 'button is-primary is-small' );
		echo Utility::manual_link( 'manual/ystdtb-copyright', 'マニュアル', 'button is-primary is-small' );
		?>
	</div>
</div>
