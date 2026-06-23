<?php
/**
 * Admin Feature List : Design Heading
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Manual;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>見出しデザイン編集</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
			<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
		</svg>
	</figure>
	<p>コンテンツやページタイトルのデザインをカスタマイズできる機能</p>
	<div class="ystdtb-menu__manual-link is-horizon">
		<?php
		echo Manual::manual_link_a( 'manual/ystdtb-heading', 'マニュアル', 'button is-primary is-small' );
		?>
	</div>
</div>
