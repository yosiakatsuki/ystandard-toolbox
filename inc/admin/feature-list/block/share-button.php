<?php
/**
 * Admin Feature List : share Button Block
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>シェアボタンブロック</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2">
			<circle cx="18" cy="5" r="3"></circle>
			<circle cx="6" cy="12" r="3"></circle>
			<circle cx="18" cy="19" r="3"></circle>
			<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
			<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
		</svg>
	</figure>
	<p>SNSシェアボタンを表示できるブロック</p>
	<?php echo Utility::manual_link( 'manual/ystdtb-block-sns-share', '', 'button is-primary is-small' ); ?>
</div>
