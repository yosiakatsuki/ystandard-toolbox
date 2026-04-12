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
  - アイコンフォント（`class-icon-font.php`）: アイコンリストブロックで使用するため非yStandardでも有効にする必要がある（要確認）
  - その他の yStandard チェックが入っている機能の妥当性を確認
- [ ] 投稿のtitle,description設定を非yStandardでも使えるようにする
- [ ] 一覧のtitle,description設定を非yStandardでも使えるようにする
- [ ] メタボックス・タクソノミー設定のUIアップデート（見た目の洗練）

## フェーズ3: テスト・検証

コード変更がすべて完了した状態で実施する。

- [ ] 開発済み機能の全体テスト
- [ ] yStandard テーマ連携の再確認
- [ ] yStandard テーマ以外での動作確認（使える・使えない機能の精査）
- [ ] v1 → v2 の最終差分確認（欠落がないことの最終チェック）

## フェーズ4: マニュアル更新

- [ ] マニュアルの更新

## フェーズ5: 共通ルール策定（リリース後でも可）

v2 リリースのブロッカーではない。リリース後に進めてもよい。

- [ ] yStandard シリーズ共通のコーディング・CSS ルールの策定
