<?php
/**
 * Admin Feature List : Design CSS
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="ystdtb-menu__column-item">
	<h3>追加CSS編集</h3>
	<figure class="ystdtb-menu__column-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-droplet">
			<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
		</svg>
	</figure>
	<p>「外観」→「カスタマイズ」→「追加CSS」で編集できるCSSを大きい入力欄で編集する機能</p>
	<div class="ystdtb-menu__manual-link is-horizon">
		<?php
		echo Utility::option_link_a( 'css', '', 'button is-primary is-small' );
		echo Utility::manual_link( 'manual/ystdtb-custom-css', 'マニュアル', 'button is-primary is-small' );
		?>
	</div>
</div>
