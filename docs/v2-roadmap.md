# v2 リリースロードマップ

v2 リリースに向けた残タスクと優先順位。
手戻りを最小化するため、コード変更を伴うフェーズを先に完了させ、テスト・ドキュメントはコードが安定してから行う。

## フェーズ1: v1→v2 欠落機能の取り込み（最優先）

master ブランチの v2 未反映コミットを仕分けした結果、取り込みが必要なものは以下の通り。

### 取り込みが必要

- [x] Posts ブロック: 投稿タイプ変更時に `postIn` / `postNameIn` / `postParent` をクリア（`606d56d`）
  - `post-type.tsx` の `onChangePostType` で `taxonomy` / `termSlug` のみクリアしており、上記3属性が漏れている
- [x] 見出しデザイン: compatible モードのバグ修正（`6937476`）
  - `class-heading-compatible.php` 255行目付近で `$section`（文字列 "content" 等）を CSS セレクタとして使用しているバグ
- [x] 見出しデザイン: compatible モードのアコーディオンブロック除外（`ae49fdb` の一部）
  - `class-heading-compatible.php` のセレクタに `:not(:where(.wp-block-accordion-heading))` の追加が必要
- [x] SNS シェアボタン: Pocket 属性の残存クリーンアップ（`2446e7a`）
  - PHP 側では Pocket 出力は既に除外済みだが、`block.json` の `usePocket` 属性（default: true）と `edit.tsx` の参照が残存
- [x] SNS シェアボタン: 公式デザインのテキスト CSS クラス名不一致修正
  - `index.php` の公式ボタンで `__before` / `__after` が使われており、`__before-text` / `__after-text` に統一
- [x] スライダー: フロントエンド CSS の移行漏れ修正
  - `style.scss` に初期化前非表示・コンテナ幅・画像動画フィットを追加
  - `enqueue_responsive_style` でレスポンシブ高さ用 CSS を出力
- [x] LP テンプレート: 固定ヘッダー設定時の余白対応（`14370cd`）
  - v1 の `inc/lp/class-lp.php` に `body_class` フィルタ（`is-lp-template` / `is-lp-template-body` 付与）と `AFTER_ENQUEUE_CSS_HOOK` でのインライン CSS 出力（`--ys-site-header-height:0` 等）が追加されているが、v2 側は未実装
- [x] アイコンリストブロック: コアリストブロックとの相互変換（`12e8149` / `a2ff39f`）
  - v1 の `blocks/icon-list/transforms.js` に `core/list` ⇔ `ystdtb/icon-list` の双方向変換があるが、v2 では `transforms.ts` 自体が未実装
  - v2 は子ブロック構造（`ystdtb/icon-list-item` / `core/list-item`）のため innerBlocks をマップして再生成する実装が必要

### 要実機確認

- [x] スライダー: 全幅不具合修正（`d8d013c`）
  - yStandard v4 系のみ alignfull/alignwide の padding リセット CSS をインライン出力する形で対応済み

### 対応済み（作業不要）

以下は v2 で既に対応済みのため、追加作業は不要。

- ✅ SNS シェアボタン: Bluesky 追加 / X 対応 / Twitter 不具合修正
- ✅ スライダー: 逆方向再生 / slidesPerView auto / スライド数調整
- ✅ Posts ブロック: タクソノミー変更時のクリア / 概要文バグ（v2 は行数制限に設計変更）
- ✅ FAQ ブロック: 開閉式余白調整
- ✅ WordPress 6.9 対応（メイン見出し機能 / ブロック拡張 Warning / 画面別非表示）
- ✅ PHP 8.2 対応 / ブロックカテゴリー順序フック / パターンカテゴリー名変更

### 不要（v2 の設計で解消済み）

以下はレガシーブロック削除済み、または `wp-controls` ラッパーで一括対応されるため不要。

- ❌ 各ブロック互換対応（box, FAQ, アイコンリスト, 定義リスト, タイムライン等）— レガシーブロック削除済み
- ❌ `__nextHasNoMarginBottom` / `__next40pxDefaultSize` 系の対処 — ラッパーで一括管理
- ❌ FontSizePicker / withState / responsive value 等のレガシーコンポーネント修正
- ❌ wp_targeted_link_rel 削除 — `class-utility.php` 自体が削除済み
- ❌ FAQ フォントサイズ deprecated — v2 で再構築済み

## フェーズ2: deprecated の改修

v1 → v2 のブロック移行で設定変更・HTML 構造変更を行ったブロックについて、deprecated を作成済みだが旧コンポーネントのコピーが上手くいっていないのか、変換時にエラーになっている。全体テストの前にこれを解消する。

対象ブロック（いずれも子ブロック含む）:

- [x] `description-list`（`description-list-dd-box` / `description-list-dd-simple` / `description-list-dl-column` / `description-list-dt`）
- [x] `faq`（`faq-item`）
- [x] `timeline`（`timeline-item`）

進め方:

- 各ブロックの `deprecated/` 配下を確認し、v1 時点の属性・save 出力を正しく再現できているか検証する
- `examples/` 配下に v1 相当の HTML サンプルを用意し、エディターへ貼り付けて deprecated → 現行バージョンへの変換が成功することを確認する

## フェーズ2.1: yStandard テーマ以外での動作改善

- [x] yStandard テーマ以外での警告文の調整
- [x] Toolbox 機能ページで yStandard 連携機能だとわかりやすく表示
- [x] yStandard テーマ以外では Toolbox 機能ページから設定ページへのリンクを非表示にする
- [x] yStandard連携機能が非yStandard環境で無効化・非表示になっているか確認
- [ ] 非yStandardで使える機能の精査と有効化
  - [x] フォント設定（`class-font.php`）: 非yStandardでも使えるようにする（ブロックテーマでは非表示）
  - [x] アイコンフォント（`class-icon-font.php`）: 非yStandardでも `@font-face` とカラーパレットCSSを出力するよう対応
  - [x] その他の yStandard チェックが入っている機能の妥当性を確認
- [x] 投稿のtitle,description設定を非yStandardでも使えるようにする（対応しない: description 出力の責務は SEO プラグイン側に委ねるため。非 yStandard では設定欄を非表示）
- [x] 一覧のtitle,description設定を非yStandardでも使えるようにする（対応しない: 同上。非 yStandard ではターム編集画面の SEO 設定欄を非表示）
- [x] メタボックス・タクソノミー設定のUIアップデート（見た目の洗練）

## フェーズ3: テスト・検証

コード変更がすべて完了した状態で実施する。
テーマ種別によって動作・表示が分岐する機能があるため、環境ごとに確認する。

### 3.1 共通準備

- [x] テスト環境の用意（yStandard / クラシックテーマ / ハイブリッドテーマ / ブロックテーマの4種）
- [x] 機能マトリクス作成（下記「機能マトリクス」セクション）
- [x] v1 → v2 の最終差分確認（欠落がないことの最終チェック） — 取り込み漏れ2件を検出してフェーズ1へ追加

### 機能マトリクス

テーマ種別ごとに「有効 / 無効 / 非表示」になる機能の一覧。テスト時のチェックリストとして使用する。

**前提**: 本プラグインはテーマ判定を `get_template() === 'ystandard'` の二値判定で行っており、ハイブリッドテーマの独自判定はない。そのため基本的には「クラシック = ハイブリッド」として扱われる。唯一の例外はフォント設定で、`wp_is_block_theme()` による判定が入るためブロックテーマのみ無効。

| 機能 | yStandard | クラシック | ハイブリッド | ブロック |
|---|---|---|---|---|
| ブロック（block-library 全般） | ✅ | ✅ | ✅ | ✅ |
| ブロック拡張（Block Hook / セクション背景） | ✅ | ✅ | ✅ | ✅ |
| フォント設定 | ✅ | ✅ | ✅ | ❌ |
| アイコンフォント | ✅ | ✅ | ✅ | ✅ |
| 見出しデザイン | ✅ | ✅ | ✅ | ✅ |
| カスタムコード挿入 | ✅ | ✅ | ✅ | ✅ |
| カスタム CSS | ✅ | ✅ | ✅ | ✅ |
| アイコン管理 | ✅ | ✅ | ✅ | ✅ |
| IE ポリフィル | ✅ | ✅ | ✅ | ✅ |
| 投稿の title / description 設定 | ✅ (ystd 4.12.2+) | ❌ | ❌ | ❌ |
| 一覧（ターム）の title / description 設定 | ✅ | ❌ | ❌ | ❌ |
| 著作権テキスト編集 | ✅ | ❌ | ❌ | ❌ |
| ドロワーメニュー設定 | ✅ | ❌ | ❌ | ❌ |
| メニュー切り替え | ✅ | ⚠ UI 非表示 | ⚠ UI 非表示 | ⚠ UI 非表示 |
| アーカイブページ機能 | ✅ (ystd 4.13.1+) | ❌ | ❌ | ❌ |
| ヘッダーオーバーレイ設定 | ✅ | ❌ | ❌ | ❌ |
| サブヘッダー追加 | ✅ (ystd 4.11.0+) | ❌ | ❌ | ❌ |
| CTA（行動喚起）機能 | ✅ (ystd 4.23.0+) | ❌ | ❌ | ❌ |
| LP テンプレート | ✅ (ystd 4.26.1+) | ❌ | ❌ | ❌ |
| サイトデザイン拡張 | ✅ | ❌ | ❌ | ❌ |

凡例: ✅ 有効 / ❌ 非表示・無効 / ⚠ 一部制限あり

### 3.2 yStandard テーマでの全体テスト

- [x] 全ブロック（block-library 配下）の編集・保存・フロント表示確認 — [v2-block-testing.md](v2-block-testing.md) で三層テスト完了（L1 460 件 / L2 / L3 すべて済）
- [x] deprecated 変換（v1 コンテンツ → v2）の動作確認 — 各ブロックの `deprecated/` + L1 fixture（`__deprecated-*`）で migrate 検証済み
- [ ] プラグイン設定画面の全項目
	- 手動で確認中
		- 完了：
			- 「ヘッダー」
				- サブヘッダーパネル
				- ヘッダーオーバーレイパネル
			- 「メニュー」
	- 課題
		- [ ] 設定画面のパネルは枠線で囲んでどこまでが設定のまとまりかわかりやすくしたい
		- [x] サイトデザイン拡張 - ヘッダー
			- *設定保存時に白色のカバーが画面全体ではなく100vhしか出ていない気がする。スクロールできる場合に一番下まで覆えてない
		- [ ] サイトデザイン拡張 - メニュー
			- リッチドロワーメニューの説明を追加する。「モバイル表示のメニュー項目を編集できるようにする機能です」
			- 見出しが「有効 / 無効」なのでボタンも有効 / 無効にする
			- 有効にした場合、「メニューの編集は外観 -> ウィジェットから「ドロワーメニュー(上)」または「ドロワーメニュー(下)」」を編集してください
		- [ ] アーカイブ - 日付情報
			- デフォルト設定が選択できない（「選択してください」になってしまう）
- [ ] yStandard 連携機能の動作確認（フォント / アイコンフォント / 見出しデザイン / SEO 連携 等）
- [ ] ブロック拡張（Block Hook 含む）

- [ ] ウィジェット編集画面でエラーが出ているので対処
```
<b>Notice</b>:  関数 wp_enqueue_script() が<strong>誤って</strong>呼び出されました。wp-editor スクリプトを新しいウィジェットエディター (wp-edit-widgets または wp-customize-widgets) と一緒にエンキューしないでください。 詳しくは <a href="https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/">WordPress のデバッグ</a>をご覧ください。 (このメッセージはバージョン 5.8.0 で追加されました) in <b>/Users/yosiakatsuki/Local Sites/new-ystandard/app/public/wp-includes/functions.php</b> on line <b>6131</b><br>
```

### 3.3 非 yStandard テーマでの全体テスト

各テーマ種別で以下を確認する。

- 共通して使える機能: 正常動作すること
- yStandard 専用機能: 設定 UI が非表示、または無効化メッセージが表示されること
- テーマ種別ごとに分岐する機能: マトリクスどおりに有効 / 無効になっていること

#### 3.3.1 クラシックテーマ

- [ ] 共通機能の動作確認（ブロック / 設定画面 / メタボックス）
- [ ] yStandard 専用機能が非表示になっていること
- [ ] クラシックテーマで有効な機能（フォント設定・アイコンフォント等）の動作確認

#### 3.3.2 ハイブリッドテーマ

- [ ] 共通機能の動作確認
- [ ] yStandard 専用機能が非表示になっていること
- [ ] ハイブリッドテーマで有効な機能の動作確認

#### 3.3.3 ブロックテーマ

- [ ] 共通機能の動作確認
- [ ] yStandard 専用機能が非表示になっていること
- [ ] フォント設定が非表示になっていること（ブロックテーマは theme.json 管轄）
- [ ] アイコンフォント等、ブロックテーマでも有効な機能の動作確認

## フェーズ4: マニュアル更新

- [ ] マニュアルの更新

## フェーズ5: 共通ルール策定（リリース後でも可）

v2 リリースのブロッカーではない。リリース後に進めてもよい。

- [ ] yStandard シリーズ共通のコーディング・CSS ルールの策定
