<?php
/**
 * CTA拡張.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="heading ystdtb-menu__component">
	<h1 class="ystdtb-menu__title is-no-margin">投稿詳細ページ 上・下 拡張</h1>
	<?php echo Utility::manual_link_inline( 'manual/ystdtb-cta' ); ?>
	<div id="app" class="ystdtb-menu__section">
		<App/><!-- vue app -->
	</div>
</div>
