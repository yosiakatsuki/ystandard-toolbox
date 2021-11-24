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
	<h3>スライダーブロック</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sidebar">
			<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
			<line x1="9" y1="3" x2="9" y2="21"></line>
		</svg>
	</figure>
	<p>シンプルなスライドショーを作成できるブロック</p>
	<?php echo Utility::manual_link( 'manual/ystdtb-slider', '', 'button is-primary is-small' ); ?>
</div>
