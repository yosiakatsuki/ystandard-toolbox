import {
	Archive,
	Award,
	Box,
	Clock,
	CheckCircle,
	Code,
	File,
	Grid,
	HardDrive,
	Image,
	List,
	Layers,
	MessageCircle,
	Menu,
	Minimize2,
	Smartphone,
	Sidebar,
	Square,
	Share2,
	Type,
} from 'react-feather';
/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

const featureList = {
	block: {
		title: 'カスタムブロック',
		items: [
			{
				name: 'スライダーブロック',
				icon: () => <Sidebar />,
				description: 'シンプルなスライドショーを作成できるブロック',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-slider/',
			},
			{
				name: 'ボックスブロック',
				icon: () => <Box />,
				description: '囲み枠を作成できるブロック',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-box/',
			},
			{
				name: '定義リストブロック',
				icon: () => <Square />,
				description:
					'用語(dt)と説明(dd)を組み合わせて作るリストブロック',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-description-list/',
			},
			{
				name: 'アイコンリストブロック',
				icon: () => <List />,
				description: 'マーカーにアイコンを表示できるリストブロック',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-icon-list/',
			},
			{
				name: 'タイムラインブロック',
				icon: () => <Clock />,
				description:
					'時系列に略歴を表示したり、手順の説明などに便利なタイムライン（ステップ）ブロック',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-timeline/',
			},
			{
				name: 'Q&Aブロック',
				icon: () => <MessageCircle />,
				description: '「よくある質問」の作成に便利なブロック',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-faq/',
			},
			{
				name: '記事一覧ブロック',
				icon: () => <Archive />,
				description:
					'投稿の一覧を様々な条件で絞り込み表示できるブロック',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-posts/',
			},
			{
				name: 'パーツブロック',
				icon: () => <HardDrive />,
				description:
					'[ys]パーツ機能で作成したコンテンツを簡単に表示できるブロック',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-ys-parts/',
			},
			{
				name: 'シェアボタンブロック',
				icon: () => <Share2 />,
				description: 'SNSシェアボタンを表示できるブロック',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-sns-share/',
			},
			{
				name: 'バナーリンクブロック(β)',
				icon: () => <Image />,
				description:
					'画像の上にテキストを配置したバナータイプのリンクを作成できるブロック',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-banner-link/',
			},
		],
	},
	'block-extension': {
		title: 'ブロック拡張機能',
		items: [
			{
				name: 'ブロックパターン',
				icon: () => <Grid />,
				description:
					'よく使う定型文などを登録してブロックエディターで簡単に利用できる機能',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-patterns/',
				settingPage:
					'edit.php?post_type=ystdtb-patterns&page=ystdtb-settings-v2-block-patterns',
			},
			{
				name: '画面サイズ別非表示機能',
				icon: () => <Smartphone />,
				description:
					'PC・タブレット・モバイル画面サイズでブロックを非表示にできる機能',
				manual: 'https://wp-ystandard.com/manual/ystdtb-block-option-hidden-by-size/',
			},
		],
	},
	design: {
		title: 'デザイン機能',
		items: [
			{
				name: __( 'ヘッダーオーバーレイ', 'ystandard-toolbox' ),
				icon: () => <Layers />,
				description: __(
					'ヘッダーを透明にしてコンテンツに重ねて表示できる機能<br>ページ先頭に大きく画像や動画を表示するレイアウトに便利です。',
					'ystandard-toolbox'
				),
				manual: 'https://wp-ystandard.com/manual/ystdtb-header-overlay/',
				settingPage:
					'admin.php?page=ystdtb-settings-v2-design&tab=header',
			},
			{
				name: __( 'フォント設定', 'ystandard-toolbox' ),
				icon: () => <Type />,
				description: __(
					'Google FontsなどのWebフォント読み込み、font-familyカスタマイズ機能',
					'ystandard-toolbox'
				),
				manual: 'https://wp-ystandard.com/manual/ystdtb-add-font/',
				settingPage: 'admin.php?page=ystdtb-settings-v2-font',
			},
			{
				name: __( 'LP機能', 'ystandard-toolbox' ),
				icon: () => <File />,
				description: __(
					'LP向けテンプレート機能<br>ヘッダー・フッターが非表示になり、編集画面の内容だけが表示されるページを作成できます。',
					'ystandard-toolbox'
				),
				manual: 'https://wp-ystandard.com/manual/ystdtb-lp/',
			},
			{
				name: __( '投稿詳細上下部並び替え', 'ystandard-toolbox' ),
				icon: () => <List />,
				description: __(
					'投稿詳細ページの本文上・下のSNSシェアボタンや関連記事の表示順序を変更できる機能',
					'ystandard-toolbox'
				),
				manual: 'https://wp-ystandard.com/manual/ystdtb-cta/',
				settingPage: 'admin.php?page=ystdtb-settings-v2-cta',
			},
			{
				name: __( 'サブヘッダーメニュー', 'ystandard-toolbox' ),
				icon: () => <Menu />,
				description: __(
					'ヘッダーの上に追加で小さくメニューを表示できる機能',
					'ystandard-toolbox'
				),
				manual: 'https://wp-ystandard.com/manual/ystdtb-sub-header/',
				settingPage:
					'admin.php?page=ystdtb-settings-v2-design&tab=header',
			},
			{
				name: __( 'TOP専用メニュー', 'ystandard-toolbox' ),
				icon: () => <Menu />,
				description: __(
					'フロントページ専用のメニューを表示できる機能',
					'ystandard-toolbox'
				),
				manual: 'https://wp-ystandard.com/manual/ystdtb-only-front-page-menu/',
			},
			{
				name: __( 'ドロワーメニュー拡張', 'ystandard-toolbox' ),
				icon: () => <Menu />,
				description: __(
					'ウィジェットを使ってモバイルメニュー内にボタンや記事一覧などを配置できる機能',
					'ystandard-toolbox'
				),
				manual: 'https://wp-ystandard.com/manual/ystdtb-mobile-menu-widget/',
				settingPage:
					'admin.php?page=ystdtb-settings-v2-design&tab=menu',
			},
			{
				name: __( 'アーカイブページ拡張', 'ystandard-toolbox' ),
				icon: () => <Grid />,
				description: __(
					'投稿一覧のデフォルト画像や一覧画像サイズ、一覧レイアウトを変更できる機能',
					'ystandard-toolbox'
				),
				manual: 'https://wp-ystandard.com/manual/ystdtb-archive/',
				settingPage:
					'admin.php?page=ystdtb-settings-v2-design&tab=archive',
			},
			{
				name: __( 'ウィジェット子階層折りたたみ', 'ystandard-toolbox' ),
				icon: () => <Minimize2 />,
				description: __(
					'カテゴリー・ナビゲーションメニュー・固定ページウィジェットで子階層を折りたたみ表示する機能',
					'ystandard-toolbox'
				),
				manual: 'https://wp-ystandard.com/manual/ystdtb-widget-accordion/',
			},
			{
				name: __( 'Copyright編集', 'ystandard-toolbox' ),
				icon: () => <Award />,
				description: __(
					'サイトフッターに表示されるCopyright表記の編集、「yStandard Theme by yosiakatsuki Powered by WordPress」の削除機能',
					'ystandard-toolbox'
				),
				manual: 'https://wp-ystandard.com/manual/ystdtb-copyright/',
				settingPage:
					'admin.php?page=ystdtb-settings-v2-design&tab=copyright',
			},
		],
	},
	'theme-extension': {
		title: 'テーマ拡張機能',
		items: [
			{
				name: '投稿のtitle,description設定',
				icon: () => <CheckCircle />,
				description:
					'投稿タイトルとは別の<title>設定、メタデスクリプションを設定できる機能',
				manual: 'https://wp-ystandard.com/manual/ystdtb-title-dscr/',
			},
			{
				name: '一覧のtitle,description設定',
				icon: () => <Archive />,
				description:
					'カテゴリー・タグ一覧ページの<title>設定、メタデスクリプションを設定できる機能',
				manual: 'https://wp-ystandard.com/manual/ystdtb-term-meta-seo/',
			},
		],
	},
	utility: {
		title: '便利機能・その他',
		items: [
			{
				name: 'head,footerコード追加',
				icon: () => <Code />,
				description:
					'<head>内や</body>直前などにJavaScriptなどを追加できる機能',
				manual: 'https://wp-ystandard.com/manual/ystdtb-add-code/',
				settingPage: 'admin.php?page=ystdtb-settings-v2-add-code',
			},
			{
				name: 'カスタムCSS編集',
				icon: () => <Code />,
				description:
					'公開ページ・ブロックエディターに反映するCSSを追加できる機能',
				manual: 'https://wp-ystandard.com/manual/custom-css-v2/',
				settingPage: 'admin.php?page=ystdtb-settings-v2-custom-css',
			},
		],
	},
};
export default featureList;
