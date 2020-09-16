<?php
/**
 * Start Page
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="start ystdtb-menu__start ystdtb-menu__component ystdtb-menu__form">
	<h1 class="ystdtb-menu__title">yStandard Toolbox</h1>
	<div class="ystdtb-menu__section">
		<h2 class="ystdtb-menu__section_title">デザイン機能</h2>
		<div class="ystdtb-menu__column">
			<div class="ystdtb-menu__column-item">
				<h3>見出しデザイン編集</h3>
				<figure class="ystdtb-menu__column-icon">
					<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
					</svg>
				</figure>
				<p>コンテンツやページタイトルのデザインをカスタマイズできる機能</p>
				<?php echo Utility::manual_link( 'heading', '', 'button is-primary is-small' ); ?>
			</div>
			<div class="ystdtb-menu__column-item">
				<h3>Webフォント追加</h3>
				<figure class="ystdtb-menu__column-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type">
						<polyline points="4 7 4 4 20 4 20 7"></polyline>
						<line x1="9" y1="20" x2="15" y2="20"></line>
						<line x1="12" y1="4" x2="12" y2="20"></line>
					</svg>
				</figure>
				<p>Google Fontsなどを使ってWebフォントを追加する機能</p>
				<?php echo Utility::manual_link( 'add-font', '', 'button is-primary is-small' ); ?>
			</div>
			<div class="ystdtb-menu__column-item">
				<h3>ヘッダーデザイン拡張</h3>
				<figure class="ystdtb-menu__column-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders">
						<line x1="4" y1="21" x2="4" y2="14"></line>
						<line x1="4" y1="10" x2="4" y2="3"></line>
						<line x1="12" y1="21" x2="12" y2="12"></line>
						<line x1="12" y1="8" x2="12" y2="3"></line>
						<line x1="20" y1="21" x2="20" y2="16"></line>
						<line x1="20" y1="12" x2="20" y2="3"></line>
						<line x1="1" y1="14" x2="7" y2="14"></line>
						<line x1="9" y1="8" x2="15" y2="8"></line>
						<line x1="17" y1="16" x2="23" y2="16"></line>
					</svg>
				</figure>
				<p>サイトヘッダー関連の機能拡張</p>
				<?php echo Utility::manual_link( 'header-design', '', 'button is-primary is-small' ); ?>
			</div>
			<div class="ystdtb-menu__column-item">
				<h3>追加CSS編集</h3>
				<figure class="ystdtb-menu__column-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-droplet">
						<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
					</svg>
				</figure>
				<p>「外観」→「カスタマイズ」→「追加CSS」で編集できるCSSを大きい入力欄で編集する機能</p>
				<?php echo Utility::manual_link( 'custom-css', '', 'button is-primary is-small' ); ?>
			</div>
			<div class="ystdtb-menu__column-item">
				<h3>Copyright編集</h3>
				<figure class="ystdtb-menu__column-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award">
						<circle cx="12" cy="8" r="7"></circle>
						<polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
					</svg>
				</figure>
				<p>サイトフッターに表示されるCopyright表記の編集、「yStandard Theme by yosiakatsuki Powered by WordPress」の削除機能</p>
				<?php echo Utility::manual_link( 'copyright', '', 'button is-primary is-small' ); ?>
			</div>
		</div>
	</div>
	<div class="ystdtb-menu__section">
		<h2 class="ystdtb-menu__section_title">ブロック機能</h2>
		<div class="ystdtb-menu__column">
			<div class="ystdtb-menu__column-item">
				<h3>ブロックパターン</h3>
				<figure class="ystdtb-menu__column-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid">
						<rect x="3" y="3" width="7" height="7"></rect>
						<rect x="14" y="3" width="7" height="7"></rect>
						<rect x="14" y="14" width="7" height="7"></rect>
						<rect x="3" y="14" width="7" height="7"></rect>
					</svg>
				</figure>
				<p>よく使う定型文などを登録してブロックエディターで簡単に利用できる機能</p>
				<?php echo Utility::manual_link( 'block-patterns', '', 'button is-primary is-small' ); ?>
			</div>
			<div class="ystdtb-menu__column-item">
				<h3>ブロックスタイル</h3>
				<figure class="ystdtb-menu__column-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag">
						<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
						<line x1="4" y1="22" x2="4" y2="15"></line>
					</svg>
				</figure>
				<p>カラムブロックやテーブルブロックなどの便利なデザインスタイル</p>
				<?php echo Utility::manual_link( 'block-styles', '', 'button is-primary is-small' ); ?>
			</div>
			<div class="ystdtb-menu__column-item">
				<h3>タイムラインブロック</h3>
				<figure class="ystdtb-menu__column-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock">
						<circle cx="12" cy="12" r="10"></circle>
						<polyline points="12 6 12 12 16 14"></polyline>
					</svg>
				</figure>
				<p>時系列に略歴を表示したり、手順の説明などに便利なタイムライン（ステップ）ブロック</p>
				<?php echo Utility::manual_link( 'block-timeline', '', 'button is-primary is-small' ); ?>
			</div>
			<div class="ystdtb-menu__column-item">
				<h3>Q&Aブロック</h3>
				<figure class="ystdtb-menu__column-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle">
						<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
					</svg>
				</figure>
				<p>「よくある質問」ページの制作に便利なブロック</p>
				<?php echo Utility::manual_link( 'block-faq', '', 'button is-primary is-small' ); ?>
			</div>
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
				<?php echo Utility::manual_link( 'block-posts', '', 'button is-primary is-small' ); ?>
			</div>
		</div>
	</div>
	<div class="ystdtb-menu__section">
		<h2 class="ystdtb-menu__section_title">SEO関連機能</h2>
		<div class="ystdtb-menu__column">
			<div class="ystdtb-menu__column-item">
				<h3>title,description設定</h3>
				<figure class="ystdtb-menu__column-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
						<polyline points="22 4 12 14.01 9 11.01"></polyline>
					</svg>
				</figure>
				<p>投稿タイトルとは別の&lt;title&gt;設定、メタデスクリプションを設定できる機能</p>
				<?php echo Utility::manual_link( 'title-dscr', '', 'button is-primary is-small' ); ?>
			</div>
		</div>
	</div>
	<div class="ystdtb-menu__section">
		<h2 class="ystdtb-menu__section_title">その他機能</h2>
		<div class="ystdtb-menu__column">
			<div class="ystdtb-menu__column-item">
				<h3>コード追加</h3>
				<figure class="ystdtb-menu__column-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code">
						<polyline points="16 18 22 12 16 6"></polyline>
						<polyline points="8 6 2 12 8 18"></polyline>
					</svg>
				</figure>
				<p>&lt;head&gt;内や&lt;/body&gt;直前などにJavaScriptなどを追加できる機能</p>
				<?php echo Utility::manual_link( 'add-code', '', 'button is-primary is-small' ); ?>
			</div>
		</div>
	</div>

</div>




















































