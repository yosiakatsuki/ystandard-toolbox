<?php
/**
 * Admin Feature List : Design CSS
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>LP機能</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file">
			<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
			<polyline points="13 2 13 9 20 9"></polyline>
		</svg>
	</figure>
	<p>LP向けテンプレート機能<br>ヘッダー・フッターが非表示になり、編集画面の内容だけが表示されるページを作成できます。</p>
	<div class="ystdtb-menu__manual-link is-horizon">
		<?php
		echo Utility::manual_link( 'manual/ystdtb-lp', 'マニュアル', 'button is-primary is-small' );
		?>
	</div>
</div>
