<?php
/**
 * Admin Feature List : Box Block
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>ボックスブロック</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box">
			<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
			<polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
			<line x1="12" y1="22.08" x2="12" y2="12"></line>
		</svg>
	</figure>
	<p>囲み枠を作成できるブロック</p>
	<?php echo Utility::manual_link( 'manual/ystdtb-block-box', '', 'button is-primary is-small' ); ?>
</div>
