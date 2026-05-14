# v2 リリース向け マニュアル更新計画

サービスページ <https://wp-ystandard.com/plugins/ystandard-toolbox/> からリンクされている各マニュアルについて、v2 リリースに向けた更新内容を整理する。

## 進め方

- 本番サイト（wp-ystandard.com）をローカルにコピーして作業する
- ローカル上でマニュアル本文・スクリーンショットを整える
- v2 正式リリースのタイミングで本番へ上書き反映する
- Discord での β テスト案内投稿のネタにも使えるよう、機能インパクトの大きいものから順に整備する

## マニュアル資料の作成方針

v2 向けマニュアルの下書き・確認メモは `docs/v2-manual/` 配下に作成する。
このディレクトリは、wp-ystandard.com に反映する前の作業用資料置き場として扱う。

- マニュアル資料は機能ごとに 1 ファイルで作成する
- ファイル名は既存マニュアルのスラッグに合わせる（例: `ystdtb-heading.md`, `ystdtb-block-posts.md`）
- 新規マニュアルは想定スラッグをファイル名にする
- 親子ブロックは公開マニュアルの単位に合わせ、親ブロック側のファイルに子ブロックの説明も含める
- 複数機能をまとめる必要がある場合は、公開ページの設計に合わせてハブ用ファイルを作成する

各マニュアル資料には、必要に応じて次の項目を記載する。

- 対象 URL
- 対象機能
- v2 での変更点
- 既存マニュアルから更新する内容
- 本文案
- スクリーンショット差し替え箇所
- 動作確認項目
- 未決事項

## 対応状況

完了したものに ✅ を付ける。作業中は 🔄。未対応はそのまま。

### 優先度 1: ユーザー体験への影響が大きい大型改修

Discord の β テスト案内・正式リリース告知でも訴求したい目玉機能。

- 見出しデザイン編集（ystdtb-heading）
- CSS 編集機能（ystdtb-custom-css）
- 投稿一覧ブロック（ystdtb-block-posts）

### 優先度 2: 設定画面の React 化

UI が刷新されたためスクリーンショット差し替えと操作説明の見直しが必要。

- 投稿詳細上下部並び替え／CTA（ystdtb-cta）
- コード追加（ystdtb-add-code）
- ブロックパターン編集機能（ystdtb-block-patterns）
- サイトデザイン拡張（既存マニュアルの書き直し）

### 優先度 3: ブロックの親子化・新規ブロック・その他

着手順は問わない。

ブロックの親子化対応：

- 定義リストブロック（ystdtb-block-description-list）
- アイコンリストブロック（ystdtb-block-icon-list）
- スライダーブロック（ystdtb-block-slider）
- タイムラインブロック（ystdtb-block-timeline）
- FAQ ブロック（ystdtb-block-faq）

新規マニュアル：

- [ys]パーツブロック（新規ページ作成）

軽微な更新：

- Web フォント追加（ystdtb-add-font）— 非 yStandard 対応の追記
- ボックスブロック（ystdtb-block-box）
- バナーリンクブロック（ystdtb-block-banner-link）
- シェアボタンブロック（ystdtb-block-sns-share）
- 画面サイズ別非表示機能（ystdtb-block-option-hidden-by-size）
- LP テンプレート（ystdtb-lp）
- 投稿ページの SEO 設定（ystdtb-title-dscr）— 適用条件追記
- 一覧ページの SEO 設定（ystdtb-term-meta-seo）— 適用条件追記

内容確認のみ（変更なければそのまま）：

- ヘッダーオーバーレイ（ystdtb-header-overlay）
- アーカイブページ拡張（ystdtb-archive）
- モバイルメニュー拡張（ystdtb-mobile-menu-widget）
- サブヘッダーメニュー（ystdtb-sub-header）
- TOP 専用メニュー（ystdtb-only-front-page-menu）
- Copyright 編集（ystdtb-copyright）
- ウィジェット子階層折りたたみ（ystdtb-widget-accordion）

## 各マニュアルの更新内容

### 優先度 1

#### 見出しデザイン編集

- URL: <https://wp-ystandard.com/manual/ystdtb-heading/>
- v2 での主な変更点
  - v1 はエリア別デザイン設定（見出しレベル、固定ページタイトル など）が中心だった
  - v2 では上記に加えて、**ブロックスタイルとしてだけ使える見出しデザイン**を作成できるようになった
  - ブロックスタイルは見出しブロックだけでなく**段落ブロックにも適用可能**
  - 設定画面を React 化、UI を全面刷新
  - レスポンシブ構造の統一、アコーディオンブロック除外などの細部調整
- 訴求ポイント（Discord 投稿でも使える観点）
  - 「ブロックスタイルとしての見出しデザイン」が作れる
  - 「段落ブロックにも同じデザインを適用できる」自由度
  - 自分専用デザインを増やせる
- 必要な作業
  - 設定画面のスクリーンショット差し替え（全面）
  - ブロックスタイル機能の使い方・適用例の追加
  - 段落ブロックへの適用例の追加

#### CSS 編集機能

- URL: <https://wp-ystandard.com/manual/ystdtb-custom-css/>
- v2 での主な変更点
  - v1 は「追加 CSS 編集」という単一テキストエリアだった
  - v2 から**独自の CSS 編集画面**になった
  - **フロント／エディター共通**、**フロントのみ**、**エディターのみ**の 3 区分で CSS を分けて記述できる
- マニュアル名・キャッチ
  - 「追加 CSS 編集」というタイトル変更を検討（例: 「CSS 編集」）
- 訴求ポイント
  - エディター上でのプレビュー専用 CSS を書き分けられる
  - フロント表示と編集画面のレイアウト調整を別管理できる
- 必要な作業
  - 設定画面のスクリーンショット差し替え
  - 3 つの区分の使い分け説明
  - 旧「追加 CSS 編集」からの移行有無の説明（必要なら）

#### 投稿一覧ブロック

- URL: <https://wp-ystandard.com/manual/ystdtb-block-posts/>
- v2 での主な変更点
  - **yStandard テーマ以外でも利用可能**になった
  - 概要文の制御を「文字数制限」から「**行数制限**」に変更
  - レガシーブロックからの移行に伴う UI 調整
- 訴求ポイント
  - yStandard テーマを使っていないユーザーにも便利な記事一覧ブロック
  - 行数制限により高さの揃ったカードレイアウトが作りやすい
- 必要な作業
  - 「対応テーマ」セクションの記載更新（yStandard 専用ではない旨を明記）
  - 行数制限 UI のスクリーンショット差し替え
  - 概要文設定の説明書き換え

### 優先度 2

#### 投稿詳細上下部並び替え／CTA

- URL: <https://wp-ystandard.com/manual/ystdtb-cta/>
- v2 での主な変更点
  - 設定画面を React 化
  - リスト UI を刷新（投稿タイプ別タブ、リストアイテム UI 更新）
- 必要な作業
  - スクリーンショット差し替え
  - 操作手順の確認

#### コード追加

- URL: <https://wp-ystandard.com/manual/ystdtb-add-code/>
- v2 での主な変更点
  - 設定画面 React 化（UI 刷新）
- 必要な作業
  - スクリーンショット差し替え
  - 入力欄・適用範囲の説明確認

#### ブロックパターン編集機能

- URL: <https://wp-ystandard.com/manual/ystdtb-block-patterns/>
- v2 での主な変更点
  - 設定画面 React 化
- 必要な作業
  - スクリーンショット差し替え
  - 操作手順の確認

#### サイトデザイン拡張

- URL: 既存マニュアルの書き直しで対応（新規ページ作成ではなく、既存ヘッダー／メニュー／アーカイブ／Copyright のいずれかをハブ化する想定）
- v2 での主な変更点
  - 設定画面（`src/plugin-settings/design/` 配下）が React 化
  - ヘッダーオーバーレイ／メニュー切り替え／アーカイブ／Copyright をひとまとめにした「サイトデザイン拡張」として整理
- 必要な作業
  - 個別マニュアルへの導線を持つハブ的なマニュアル構成にするか、まとめページとして書き直すかの方針決定
  - スクリーンショット差し替え

### 優先度 3

#### ブロックの親子化

定義リスト・アイコンリスト・スライダー・タイムライン・FAQ は v2 で親子ブロック構造に再設計されている。共通の更新方針は次の通り。

- ブロック追加時の挙動（親ブロックを入れると子ブロックが配置される、など）の説明
- 子ブロック単位での編集ができることの明示
- スクリーンショット差し替え

ブロック固有の追加点：

- **定義リストブロック**（<https://wp-ystandard.com/manual/ystdtb-block-description-list/>）
  - 5 ブロック構成に再設計（`description-list` + `description-list-dt` + `description-list-dd-box` + `description-list-dd-simple` + `description-list-dl-column`）
  - 表現パターンの幅が大きく広がっているため、構成例を複数追加したい
- **アイコンリストブロック**（<https://wp-ystandard.com/manual/ystdtb-block-icon-list/>）
  - 親子ブロック化（`icon-list` + `icon-list-item`）
  - **コアリストブロック（`core/list`）⇔ アイコンリスト**の相互変換に対応
- **スライダーブロック**（<https://wp-ystandard.com/manual/ystdtb-block-slider/>）
  - 親子ブロック化（`slider` + `slider-item`）
  - 逆方向再生、`slidesPerView: auto`、スライド数調整、全幅対応など機能追加
- **タイムラインブロック**（<https://wp-ystandard.com/manual/ystdtb-block-timeline/>）
  - 親子ブロック化（`timeline` + `timeline-item`）
- **FAQ ブロック**（<https://wp-ystandard.com/manual/ystdtb-block-faq/>）
  - 親子ブロック化（`faq` + `faq-item`）
  - 開閉式の余白調整

#### 新規マニュアル

- **[ys]パーツブロック**
  - v2 で新規追加された `ystdtb/parts` ブロック
  - yStandard の「ys-parts」と連携してパーツを呼び出す
  - 必要な記載：機能概要／使用条件（yStandard 連携前提か否か）／使い方／設定項目／注意点
  - 新規マニュアルページとして作成し、サービスページからの導線を追加

#### 軽微な更新

- **Web フォント追加**（<https://wp-ystandard.com/manual/ystdtb-add-font/>）
  - 非 yStandard テーマ（クラシック／ハイブリッド）でも利用可能になった旨を追記
  - ブロックテーマでは無効になることも明記
- **ボックスブロック**（<https://wp-ystandard.com/manual/ystdtb-block-box/>）／**バナーリンクブロック**（<https://wp-ystandard.com/manual/ystdtb-block-banner-link/>）／**画面サイズ別非表示機能**（<https://wp-ystandard.com/manual/ystdtb-block-option-hidden-by-size/>）
  - サイドバー UI 差分の確認とスクリーンショット差し替え
- **シェアボタンブロック**（<https://wp-ystandard.com/manual/ystdtb-block-sns-share/>）
  - Pocket 削除済・Bluesky 追加済（マニュアル側はすでに概ね最新）
  - デザインバリエーション説明と表示順を要確認
- **LP テンプレート**（<https://wp-ystandard.com/manual/ystdtb-lp/>）
  - 固定ヘッダー設定時の余白対応に関する追記が必要かを確認
- **投稿ページの SEO 設定**（<https://wp-ystandard.com/manual/ystdtb-title-dscr/>）／**一覧ページの SEO 設定**（<https://wp-ystandard.com/manual/ystdtb-term-meta-seo/>）
  - 適用条件として「yStandard テーマ使用時のみ。非 yStandard では設定 UI 非表示」を追記

#### 内容確認のみ

下記は v2 で大きな仕様変更はない想定。実機で動作・UI を確認し、変更なければマニュアルもそのまま。

- ヘッダーオーバーレイ（yStandard 専用）
- アーカイブページ拡張（yStandard 専用、4.13.1+）
- モバイルメニュー拡張／ドロワー（yStandard 専用）
- サブヘッダーメニュー（yStandard 専用、4.11.0+）
- TOP 専用メニュー
- Copyright 編集（yStandard 専用）
- ウィジェット子階層折りたたみ
