<?php
/**
 * Admin Feature List : Block Pattern
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>ブロックスタイル</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag">
			<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
			<line x1="4" y1="22" x2="4" y2="15"></line>
		</svg>
	</figure>
	<p>カラムブロックやテーブルブロックなどの便利なデザインスタイル</p>
	<?php echo Utility::manual_link( 'manual/ystdtb-block-styles', '', 'button is-primary is-small' ); ?>
</div>
