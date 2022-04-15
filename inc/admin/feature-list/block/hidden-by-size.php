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
	<h3>画面サイズ別非表示機能</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smartphone">
			<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
			<line x1="12" y1="18" x2="12.01" y2="18"></line>
		</svg>
	</figure>
	<p>PC・タブレット・モバイル画面サイズでブロックを非表示にできる機能</p>
	<?php echo Utility::manual_link( 'manual/ystdtb-block-option-hidden-by-size', '', 'button is-primary is-small' ); ?>
</div>
