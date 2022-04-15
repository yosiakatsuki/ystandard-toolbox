<?php
/**
 * Admin Feature List : Icon List Block
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>定義リストブロック</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square">
			<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
		</svg>
	</figure>
	<p>用語(dt)と説明(dd)を組み合わせて作るリストブロック</p>
	<?php echo Utility::manual_link( 'manual/ystdtb-block-description-list', '', 'button is-primary is-small' ); ?>
</div>
