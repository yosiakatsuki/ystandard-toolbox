# yStnadard Toolbox

無料WordPressテーマ「yStandard」用機能拡張プラグイン

詳細・購入はこちら▼
[https://wp-ystandard.com/plugins/ystandard-toolbox/](https://wp-ystandard.com/plugins/ystandard-toolbox/)

## 開発メモ
- 見出し編集機能
- プレビュー作成・スタイル調整2024/01/31
- エディット機能作成する。プリセットの選択・コピーから
- データのオブジェクトの形式確認から…


## 更新履歴

### v2.0.0
- [変更] `ystdtb_css_breakpoints` キー変更 `sm`-> `mobile`, `md` -> `tablet`, `lg` -> `desktop`、値に単位追加.

### v1.28.0 :
- [調整] WordPress 6.6 向け調整
- [調整] スライダーブロック編集画面調整
- [調整] ブロックパターン編集機能：パターンカテゴリーのデフォルトカテゴリー名を「yStandard Toolbox」からサイト名に変更

### v1.26.0 : 2023/11/08
- [調整] WordPress 6.4 向け調整
- [調整] PHP 8.2向け調整
- [追加] ブロックカテゴリーの順序を調整するフック追加（ystdtb_block_category_top）
- [修正] SNSシェアボタンブロック：XボタンのON-OFF設定調整
- [変更] アイコンリストブロック：入れ子ブロックに変更

### v1.25.0 : 2023/03/30
- [調整] WordPress 6.2向け調整
- [調整] デバイス別非表示機能のエディター向けスタイル調整
- [修正] FAQブロック:フォントサイズの指定を変えるとブロックエラーが出る点の対処
- [調整] 必要WordPressバージョンを6.1に引き上げ

### v1.24.0
- [追加] レイアウトフレームブロック追加
- [追加] アコーディオンブロック追加(β)
- [調整] 開発環境整理

### v1.23.1
- [修正] 見出し編集機能 font-family 指定不具合修正

### v1.23.0
- [追加] Toolbox アーカイブ設定 - レイアウト設定 にシンプルタイプを追加(yStandard 4.36.0対応)
- [追加] スライダーブロック : 「スライド効果」設定を追加（エフェクトがスライドのときのみ有効）
- [調整] スライダーブロック : スライドの速さ(秒)を10秒まで設定できるように調整
- [調整] スライダーブロック : スライド切り替え時間で0秒を設定できるように調整

### v1.22.0
- [追加] 記事一覧ブロック:リストスタイルに「シンプル」タイプを追加(yStandard 4.36.0対応)
- [追加] 記事一覧ブロック:表示開始位置(offset)設定を追加(yStandard 4.36.0対応)
- [追加] 記事一覧ブロック:モバイル用リストスタイルの設定を追加
- [追加] 記事一覧ブロック:モバイル用表示件数の設定を追加
- [追加] 必要 yStandard バージョンを4.36.0に引き上げ
- [調整] WordPress 6.0向け対応
- [調整] ボックスブロック:WP 6.0 対応
- [調整] スライダーブロック:WP 6.0 対応
- [調整] FAQブロック:WP 6.0 対応
- [修正] WordPressコア カラムブロック向けスタイル削除
- [修正] 管理画面のいくつかのページでJavaScriptのエラーが発生する点の修正

### v1.21.2
- [調整] 投稿一覧ブロック 絞り込み設定で表示されない投稿タイプがある点の修正

### v1.21.1
- [調整] 定義リストブロック スタイル調整

### v1.21.0
- [追加] 定義リストブロック追加
- [追加] 画面サイズ別ブロック非表示設定追加
- [追加] フロントページ用メニュー変更機能追加
- [追加] 動作に必要なyStandardバージョンをv4.34.0に引き上げ
- [修正] モバイルメニューウィジェット機能を使っている場合、AMPページでメニューが表示されない点を修正
- [調整] Webフォント機能が使われている場合、カスタマイザーのフォント設定が無効になるように調整
- [調整] FAQブロックスタイル調整

### v1.20.1
- [修正] 見出しデザイン編集機能 デザイン調整 - ステッチ

### v1.20.0
- [調整] WordPress 5.9 向け調整

### v1.19.0
- [追加] スライダーブロック：スライドを中央から表示する設定追加
- [追加] 記事一覧ブロック：概要文の文字数を指定する設定追加
- [修正] スライダーブロック：AMPエラー対処
- [調整] Q&Aブロック：余白調整

### v1.18.0
- [調整] yStandard 4.31.0向け調整
- [調整] 「モバイルメニュー」設定を「リッチドロワーメニュー」に名称変更

### v1.17.1
- [修正] サブヘッダーメニューの設定がタブレットサイズで反映されない点の修正

### v1.17.0
- [追加] スライダーブロック追加
- [追加] バナーリンクブロック(β)追加

### v1.16.0
- [追加] ボックスブロック：背景画像指定の追加
- [追加] ボックスブロック：ラベル無しタイプの追加
- [調整] ボックスブロック：文字色指定時にリンクの色を指定した文字色を合わせるように調整

### v1.15.0
- [追加] 投稿詳細ページ上部・下部並べ替え機能：表示・非表示 設定追加
- [追加] パーツブロック追加
- [追加] 記事一覧ブロック：デザイン設定を追加する仕組みの追加
- [追加] アイコンリストブロック：アイコンを追加する仕組みの追加
- [追加] ブロックパターン：コードでブロックパターンを追加する仕組みの追加
- [調整] 必要yStandardバージョン引き上げ(v4.30.1)

### v1.14.3
- [修正] 見出しデザイン編集：余白(margin)の単位切り替えができない、0を入力しても反映されない点の修正

### v1.14.2
- [修正] 一部設定画面が正常に表示されない点の修正

### v1.14.1
- [調整] yStandard v4.28.0 向け調整
- [修正] ブロック用スクリプトenqueue不具合修正
- [修正] ブロック初期値カスタマイズ機能不具合修正

### v1.14.0
- [追加] ボックスブロック追加
- [調整] 翻訳調整

### v1.13.1
- [調整] アイコンリストブロック：スタイル調整

### v1.13.0
- [調整] WordPress 5.8対応
- [調整] アイコン選択機能調整
- [追加] カスタムアイコン機能追加（PHPカスタマイズ）
- [追加] システム情報表示追加

### v1.12.0
- [追加] LPテンプレート追加
- [調整] Toolboxメニューページ一部刷新

### v1.11.0
- [追加] アイコンリストブロック追加
- [調整] yStandard Toolboxメニュー TOPページ スタイル調整

### v1.10.3
- [修正] PHP 5.6でのエラー回避

### v1.10.2
- [修正] 投稿詳細ページ上部・下部並べ替え機能 脱字修正

### v1.10.1
- [修正] 投稿詳細ページ上部・下部並べ替え機能 矢印ボタン不具合修正

### v1.10.0
- [追加] 投稿詳細ページ上部・下部並べ替え機能追加
- [調整] Toolbox設定画面スタイル調整
- [調整] Toolbox設定画面 保存中表示調整

### v1.9.0
- [追加] モバイルメニュー用ウィジェット機能追加
- [追加] 記事一覧ブロック 並び替え条件に更新日を追加
- [修正] ブロックパターン管理画面並び替え不具合修正
- [調整] WordPress 5.7向け調整
- [調整] FAQブロックレイアウト調整
- [調整] タイムラインブロックレイアウト調整

### v1.8.0
- [追加] ウィジェット:カテゴリー,ナビゲーションメニュー,固定ページ ウィジェットで子階層を折り畳める機能を追加

### v1.7.0
- [追加] Copyright編集機能にサイト名・サイトURL変換用予約語追加
- [調整] Webフォント設定を編集画面にも反映

### v1.6.0
- [追加] ヘッダーオーバーレイ機能追加
- [調整] 記事一覧ブロックで投稿が無い場合の編集画面表示調整
- [調整] yStandard Toolboxメニューのスタイル調整

### v1.5.1
- [修正] 見出しデザイン編集機能 リボンデザイン不具合修正

### v1.5.0
- [追加] ブロックパターンカテゴリー機能追加
- [調整] WordPress 5.6向け対応、必要WordPressバージョンを5.6に引き上げ

### v1.4.0
- [追加] ヘッダーオーバーレイ機能追加（β機能）
- [追加] SNSシェアボタンブロック追加
- [調整] タイムライン・FAQブロックの子ブロックアイコン色を変更
- [調整] ページ別SEO設定に補足説明文追加

### v1.3.3
- [調整] SEO対策プラグインを使うとtitleタグが重複することがある点の対応

### v1.3.2
- [調整] カテゴリー：titleタグ編集機能の調整
- [調整] マニュアルリンクの調整

### v1.3.1
- [調整] カスタム投稿タイプ向け調整

### v1.3.0
- [修正] yStandard Blocks セクションブロック拡張機能追加

### v1.2.1
- [修正] Copyright編集機能でテーマ情報削除設定が保存されない不具合の修正

### v1.2.0
- [追加] 投稿一覧ページのデフォルト画像設定機能追加
- [追加] 投稿一覧ページのレイアウトをデスクトップとモバイルで別々にできる機能の追加
- [追加] 投稿一覧ページの並び順変更機能追加
- [追加] 投稿一覧ページの画像表示サイズ変更機能追加
- [追加] 投稿一覧ページの日付表示変更機能追加

### v1.1.0
- [追加] カテゴリー・アーカイブページのtitle,meta description設定追加
- [追加] WordPressバージョンのチェック追加

### v1.0.2
- [追加] Q・A ラベルの揃え位置再調整

### v1.0.1
- [追加] Q・A ラベルの揃え位置設定追加
- [調整] FAQブロック余白調整

### v1.0.0
- [追加] 製品版リリース

### v0.6.0
- [追加] 見出しデザイン追加
- [追加] サブヘッダーメニュー機能追加
- [追加] titleタグ設定、meta description設定追加（SEO対策機能）
- [調整] ビルド機能調整

### v0.5.0
- [調整] アップデート機能調整

### v0.4.0
- [追加] FAQブロック追加

### v0.3.0
- [追加] タイムラインブロック追加

### v0.2.1
- [修正] 記事一覧ブロック タグ選択不具合修正
- [調整] 見出し編集機能　カスタム選択時は文字設定以外をクリア
- [調整] 見出し編集機能　吹き出しブロックの背景色を変えた際に高度な設定も同期する

### v0.2.0
- [追加] ブロックパターン編集機能追加
- [追加] カラムブロック用スタイル追加
- [追加] テーブルブロック用スタイル追加

### v0.1.0
- [追加] β版作成

### v0.0.2 ~ v0.0.11
- [追加] Copyright編集機能追加
- [追加] マニュアルページの追加
- [修正] AMPページスクリプト読み込み不具合修正
- [修正] スクリプト読み込み不具合修正
- [修正] 見出し編集機能のCSS出力不具合修正
- [追加] 記事一覧ブロックの追加
- [追加] 追加CSS編集画面追加
- [追加] フォント指定の追加機能追加
- [追加] 見出し編集機能追加

### v0.0.1
- [追加] α版作成

## yStandardシリーズ共通フック

### `ys_get_custom_icon`

カスタムアイコン追加用フック

### `ys_block_default_attributes`

ブロック初期値カスタマイズ用

## Third-party resources

### Plugin Update Checker

License: MIT
Source : <https://github.com/YahnisElsts/plugin-update-checker>

### React FontIconPicker

License: MIT
Source : <https://github.com/fontIconPicker/react-fonticonpicker>

### IntersectionObserver

License: W3C Software and Document License
Source : <https://github.com/w3c/IntersectionObserver>

### Feather

License: MIT
Source : <https://github.com/feathericons/feather>

### React Feather Icons

License: MIT
Source : <https://github.com/feathericons/react-feather>

### Vue Feather Icons

License: MIT
Source : <https://github.com/egoist/vue-feather-icons>

### Simple Icons

License: CC0 - 1.0
Source : <https://github.com/simple-icons/simple-icons>

### Vue.js

License: MIT
Source : <https://github.com/vuejs/vue>

### vue-color

License: MIT
Source : <https://github.com/xiaokaike/vue-color>

### vue-toasted

License: MIT
Source : <https://github.com/shakee93/vue-toasted>

### Vue.Draggable

License: MIT
Source : <https://github.com/SortableJS/Vue.Draggable>

### hex-rgb

License: MIT
Source : <https://github.com/sindresorhus/hex-rgb>

### axios

License: MIT
Source : <https://github.com/axios/axios>

### Swiper

License: MIT
Source : <https://github.com/nolimits4web/swiper>

### BGJar.

License: CC BY 4.0
Source : <https://bgjar.com/>

### Hero Patterns.

License: CC BY 4.0
Source : <https://www.heropatterns.com/>


### React-Toastify

License: MIT
Source : <https://github.com/fkhadra/react-toastify>

### react-beautiful-dnd

License: Apache License, Version 2.0
Source : <https://github.com/atlassian/react-beautiful-dnd>
