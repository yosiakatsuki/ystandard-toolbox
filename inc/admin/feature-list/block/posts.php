<?php
/**
 * Admin Feature List : Posts Block
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>記事一覧ブロック</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive">
			<polyline points="21 8 21 21 3 21 3 8"></polyline>
			<rect x="1" y="3" width="22" height="5"></rect>
			<line x1="10" y1="12" x2="14" y2="12"></line>
		</svg>
	</figure>
	<p>投稿の一覧を様々な条件で絞り込み表示できるブロック</p>
	<?php echo Utility::manual_link( 'manual/ystdtb-block-posts', '', 'button is-primary is-small' ); ?>
</div>
