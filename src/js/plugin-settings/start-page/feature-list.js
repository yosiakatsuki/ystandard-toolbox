import {
	Grid,
	Smartphone,
	Sidebar,
	Box,
	Square,
	List,
	Clock,
	MessageCircle,
	Archive,
	HardDrive,
	Share2,
	Image,
	CheckCircle,
	Code,
	Award,
	Menu,
	Layers,
} from 'react-feather';

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
				name: 'ヘッダーオーバーレイ',
				icon: () => <Layers />,
				description:
					'ヘッダーを透明にしてコンテンツに重ねて表示できる機能\n' +
					'ページ先頭に大きく画像や動画を表示するレイアウトに便利です。',
				manual: 'https://wp-ystandard.com/manual/ystdtb-header-overlay/',
				settingPage:
					'admin.php?page=ystdtb-settings-v2-design&tab=header',
			},
			{
				name: 'サブヘッダーメニュー',
				icon: () => <Menu />,
				description:
					'ヘッダーの上に追加で小さくメニューを表示できる機能',
				manual: 'https://wp-ystandard.com/manual/ystdtb-sub-header/',
				settingPage:
					'admin.php?page=ystdtb-settings-v2-design&tab=header',
			},
			{
				name: 'Copyright編集',
				icon: () => <Award />,
				description:
					'サイトフッターに表示されるCopyright表記の編集、「yStandard Theme by yosiakatsuki Powered by WordPress」の削除機能',
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
		],
	},
};
export default featureList;
