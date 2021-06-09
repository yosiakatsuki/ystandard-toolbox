<?php
/**
 * Admin Feature List : SEO : Post
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>投稿のtitle,description設定</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
			<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
			<polyline points="22 4 12 14.01 9 11.01"></polyline>
		</svg>
	</figure>
	<p>投稿タイトルとは別の&lt;title&gt;設定、メタデスクリプションを設定できる機能</p>
	<?php echo Utility::manual_link( 'manual/ystdtb-title-dscr', '', 'button is-primary is-small' ); ?>
</div>
