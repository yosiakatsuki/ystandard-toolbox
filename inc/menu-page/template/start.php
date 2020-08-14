<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="start ystdtb-menu__component">
	<h1 class="ystdtb-menu__title">yStandard Toolbox</h1>
	<div class="ystdtb-menu__column">
		<div class="ystdtb-menu__column-item">
			<h2>見出しデザイン編集</h2>
			<figure class="ystdtb-menu__column-icon">
				<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
				</svg>
			</figure>
			<p>コンテンツやページタイトルのデザインをカスタマイズできる機能</p>
			<?php echo Utility::manual_link( 'heading', '', 'button' ) ?>
		</div>
		<div class="ystdtb-menu__column-item">
			<h2>コード追加</h2>
			<figure class="ystdtb-menu__column-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
			</figure>
			<p>&lt;head&gt;内や&lt;/body&gt;直前などにJavaScriptなどを追加できる機能</p>
			<?php echo Utility::manual_link( 'add-code', '', 'button' ) ?>
		</div>
		<div class="ystdtb-menu__column-item">
			<h2>Webフォント追加</h2>
			<figure class="ystdtb-menu__column-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
			</figure>
			<p>Google Fontsなどを使ってWebフォントを追加する機能</p>
			<?php echo Utility::manual_link( 'add-font', '', 'button' ) ?>
		</div>
		<div class="ystdtb-menu__column-item">
			<h2>追加CSS編集</h2>
			<figure class="ystdtb-menu__column-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-droplet"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
			</figure>
			<p>「外観」→「カスタマイズ」→「追加CSS」で編集できるCSSを大きい入力欄で編集する機能</p>
			<?php echo Utility::manual_link( 'custom-css', '', 'button' ) ?>
		</div>
		<div class="ystdtb-menu__column-item">
			<h2>記事一覧ブロック</h2>
			<figure class="ystdtb-menu__column-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
			</figure>
			<p>投稿の一覧を様々な条件で絞り込み表示できるブロック</p>
			<?php echo Utility::manual_link( 'block-posts', '', 'button' ) ?>
		</div>
	</div>
</div>




















































