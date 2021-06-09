<?php
/**
 * Admin Feature List : Timeline Block
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>タイムラインブロック</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock">
			<circle cx="12" cy="12" r="10"></circle>
			<polyline points="12 6 12 12 16 14"></polyline>
		</svg>
	</figure>
	<p>時系列に略歴を表示したり、手順の説明などに便利なタイムライン（ステップ）ブロック</p>
	<?php echo Utility::manual_link( 'manual/ystdtb-block-timeline', '', 'button is-primary is-small' ); ?>
</div>
