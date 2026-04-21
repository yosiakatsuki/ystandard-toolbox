# v2 ブロック全体テスト

v2 リリースロードマップ フェーズ3.2「yStandard テーマでの全体テスト」のうち、`src/blocks/block-library/` 配下の全ブロックを対象とした編集・保存・フロント表示確認の進捗管理。

三層テスト戦略（L1 fixture / L2 Chrome UI / L3 手動）で進める。

## このドキュメントの読み方

新規セッションで作業を再開するときは以下の順で進める:

1. 「全体進捗サマリー」で全ブロックの状態を一目で把握
2. 対象ブロックの「ブロック別詳細」セクションを読み、「次にやること」を確認
3. 実ファイル（examples / spec.md / fixture ディレクトリ）で最終状態を検証
4. 作業を開始

進捗ドキュメントは古くなる可能性があるため、**作業前に必ず実ファイルを確認する**こと。

## 参照ドキュメント（必読）

- [block-operation-test-guideline.md](block-operation-test-guideline.md) — 三層テスト戦略 L1/L2/L3 の詳細運用ルール
- [testing.md](testing.md) — L1 fixture 作成手順・トラブルシューティング
- [block-examples-guideline.md](block-examples-guideline.md) — examples HTML の書き方

## 作業の流れ（ブロック単位）

各ブロックについて以下の順に実施する。

1. **examples HTML 作成**: `src/blocks/block-library/[ブロック名]/examples/all-variations.html` を執筆（見出しツリー設計を兼ねる）
2. **spec.md 作成**: `src/blocks/block-library/[ブロック名]/test-results/spec.md` に三層対応の操作テスト仕様を作成
3. **L1 fixture 作成**: `test/integration/fixtures/blocks/` 配下に spec.md の L1 リストに対応する fixture を作成し、`npm run test:integration` で全通過を確認
4. **L2 Chrome UI テスト**: Chrome 拡張で spec.md の L2 絞り込み項目を実機確認（結果は `test-results/operation.md` に記録、Git 管理外）
5. **L3 手動確認（フロント）**: フロントエンドで全パターンの表示を目視確認

## 全体進捗サマリー

| ブロック | examples | spec.md | L1 fixture | L2 Chrome UI | L3 フロント |
|---|:-:|:-:|:-:|:-:|:-:|
| [banner-link](#banner-link) | ✅ | ✅ | ✅ 76件 | ✅ | ✅ |
| [block-hook-hidden-by-size](#block-hook-hidden-by-size) | ✅ | ✅ | — 対象外 | ✅ | ✅ |
| [box](#box) | ✅ | ✅ | ✅ 48件 | ✅ | ✅ |
| [description-list](#description-list--dd-box--dd-simple--dl-column--dt) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [faq](#faq--faq-item) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [icon-list](#icon-list--icon-list-item) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [parts](#parts) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [posts](#posts) | ⚠️ 要書直し | ❌ | ❌ | ❌ | ❌ |
| [slider](#slider--slider-item) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [sns-share](#sns-share) | ✅ | ✅ | ✅ 23件 | ✅ | ✅ |
| [timeline](#timeline--timeline-item) | ❌ | ❌ | ❌ | ❌ | ❌ |

凡例: ✅ 完了 / 🔄 進行中 / ⚠️ 要対応 / ❌ 未着手

**備考**: `description-list` / `faq` / `slider` / `timeline` には `__deprecated-*` の fixture が既に存在するが、これは deprecated マイグレーションテスト用で L1 操作テストには該当しない（スコープ外）。

## ブロック別詳細

フォルダ名昇順で 1 ブロックずつ対応する。

### banner-link

- [x] examples HTML 作成（グラデーション例削除・レスポンシブ 3 デバイス化などの手動テストフィードバック反映済み）
- [x] spec.md 作成（三層 L1/L2/L3 対応）
- [x] L1 fixture 作成（76 件、`npm run test:integration` 全 113 件パス）
- [x] L2 Chrome UI テスト完了（複数セッションで実施、結果は `test-results/operation.md` に集約。Git 管理外）
- [x] L3 フロント確認（ユーザー手動確認にて完了）

**スコープ外（UI 未対応のため fixture 保留）**:
- `border-radius__4corners` — `borderRadius` 属性は単一 string 値のみで 4 隅個別指定 UI 未対応
- `combo__campaign` — グラデーション UI 未実装（examples のキャンペーン例は単色に書き換え済）

**手動テストで判明した実装修正**:
- メインテキスト/サブテキストの HTMLタグ UI を v1 挙動に合わせ、「-- 選択してください --」を非表示化、初期値を `div` に統一（`block.json` default + `useEmptyValue={ false }`）
- HTMLタグを一度選択後に空値へ戻した際の `InvalidCharacterError` に対する多層防御ガードを追加

### block-hook-hidden-by-size

段落ブロック・Box ブロックに設定を適用。各デバイスでの表示確認テキストを含める。
確認パターン: モバイルのみ / タブレットのみ / デスクトップのみ / モバイル+タブレット / タブレット+デスクトップ / モバイル+デスクトップ の 6 パターン。
「設定の組み合わせ例」セクションは省略。

- [x] examples HTML 作成（6 パターン × 段落/Box = 12 ブロックペア）
- [x] spec.md 作成（L1 は対象外、L2 / L3 手動テスト中心に改訂済）
- [—] L1 fixture — **対象外**。本ブロックはフィルタ経由で attribute を追加する拡張のため、test 環境で正しく parse するには `index.tsx` の分割が必要。実装修正コストが見合わないため L1 は実施しない。既存 fixture 12 件は削除済み
- [x] L2 Chrome UI テスト完了（`test-results/operation.md` に記録。Git 管理外）
- [x] L3 フロント確認完了（ユーザー手動確認にて OK）

### box

- [x] examples HTML 作成（25 ボックス + 4 コンボ例 + 余白プリセット例 + label-line + レスポンシブ余白例）
- [x] spec.md 作成（三層 L1/L2/L3 対応。BOX角丸・ラベル角丸の適用ルール表を実装準拠に更新済み）
- [x] L1 fixture 作成（48 件、`npm run test:integration` box 分全通過）
- [x] L2 Chrome UI テスト完了（spec.md 記述の不一致 1 件を発見 → 実装準拠に修正。`test-results/operation.md` に記録）
- [x] L3 フロント確認（ユーザー手動確認にて完了）

**今日の box 改修で対応した実装修正**:

- CSS カスタムプロパティのメディアクエリ処理を SCSS `@include` から PHP 側（`Styles::add_media_query_*` + `Text::minify`）へ統一。従来 768〜1023px でタブレット余白設定が効いていなかった不具合を修正
- 余白プリセット（`var:preset|spacing|*`）の save 時展開対応（`presetTokenToCssVar`）
- 線上ラベル（label-line）+ 余白レスポンシブの上側余白・ラベル横位置の反映不具合修正（PHP 側で label-line 用の responsive override を追加）
- エディタ表示: ラベル文字サイズ／アイコンサイズが反映されない不具合修正、ラベル太さボタンの角丸修正
- CSS 詳細度を `:where()` で (0,0,1,0) に統一
- SCSS 変数をグローバル CSS カスタムプロパティへ移行

**次のターン以降**: description-list（+ dd-box / dd-simple / dl-column / dt）

### description-list（+ dd-box / dd-simple / dl-column / dt）

親ブロック側に 1 ファイルで集約。子ブロックの設定も含めて網羅。

- [ ] examples HTML 作成
- [ ] spec.md 作成
- [ ] L1 fixture 作成
- [ ] L2 Chrome UI テスト
- [ ] L3 フロント確認

**次にやること**: examples HTML 作成

### faq（+ faq-item）

親ブロック側に 1 ファイルで集約。

- [ ] examples HTML 作成
- [ ] spec.md 作成
- [ ] L1 fixture 作成
- [ ] L2 Chrome UI テスト
- [ ] L3 フロント確認

**次にやること**: examples HTML 作成

### icon-list（+ icon-list-item）

親ブロック側に 1 ファイルで集約。

- [ ] examples HTML 作成
- [ ] spec.md 作成
- [ ] L1 fixture 作成
- [ ] L2 Chrome UI テスト
- [ ] L3 フロント確認

**次にやること**: examples HTML 作成

### parts

- [ ] examples HTML 作成
- [ ] spec.md 作成
- [ ] L1 fixture 作成
- [ ] L2 Chrome UI テスト
- [ ] L3 フロント確認

**次にやること**: examples HTML 作成

### posts

既存の `all-variations.html` が 695 行存在するが、v2 向けに全面書き直しが必要。

- [ ] examples HTML 作成（既存ファイル書き直し）
- [ ] spec.md 作成
- [ ] L1 fixture 作成
- [ ] L2 Chrome UI テスト
- [ ] L3 フロント確認

**次にやること**: 既存 examples の内容を確認して書き直し方針を決める

### slider（+ slider-item）

親ブロック側に 1 ファイルで集約。

- [ ] examples HTML 作成
- [ ] spec.md 作成
- [ ] L1 fixture 作成
- [ ] L2 Chrome UI テスト
- [ ] L3 フロント確認

**次にやること**: examples HTML 作成

### sns-share

- [x] examples HTML 作成
- [x] spec.md 作成（三層 L1/L2/L3 対応）
- [x] L1 fixture 作成（23 件、`npm run test:integration` 全通過）
- [x] L2 Chrome UI テスト完了（24 項目すべて OK、`test-results/operation.md` に記録。Git 管理外）
- [x] L3 フロント確認完了（ユーザー手動確認にて OK）

### timeline（+ timeline-item）

親ブロック側に 1 ファイルで集約。

- [ ] examples HTML 作成
- [ ] spec.md 作成
- [ ] L1 fixture 作成
- [ ] L2 Chrome UI テスト
- [ ] L3 フロント確認

**次にやること**: examples HTML 作成
