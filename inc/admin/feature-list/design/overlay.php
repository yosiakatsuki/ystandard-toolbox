<?php
/**
 * Admin Feature List : Design Overlay
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>ヘッダーオーバーレイ</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers">
			<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
			<polyline points="2 17 12 22 22 17"></polyline>
			<polyline points="2 12 12 17 22 12"></polyline>
		</svg>
	</figure>
	<p>
		ヘッダーを透明にしてコンテンツに重ねて表示できる機能<br>
		ページ先頭に大きく画像や動画を表示するレイアウトに便利です。
	</p>
	<div class="ystdtb-menu__manual-link is-horizon">
		<?php
		echo Utility::option_link_a( 'header-design', '', 'button is-primary is-small' );
		echo Utility::manual_link( 'manual/ystdtb-header-overlay', 'マニュアル', 'button is-primary is-small' );
		?>
	</div>
</div>
