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
| [banner-link](#banner-link) | ✅ | ✅ | ✅ 76件 | 🔄 部分 | ❌ |
| [block-hook-hidden-by-size](#block-hook-hidden-by-size) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [box](#box) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [description-list](#description-list--dd-box--dd-simple--dl-column--dt) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [faq](#faq--faq-item) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [icon-list](#icon-list--icon-list-item) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [parts](#parts) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [posts](#posts) | ⚠️ 要書直し | ❌ | ❌ | ❌ | ❌ |
| [slider](#slider--slider-item) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [sns-share](#sns-share) | ❌ | ❌ | ❌ | ❌ | ❌ |
| [timeline](#timeline--timeline-item) | ❌ | ❌ | ❌ | ❌ | ❌ |

凡例: ✅ 完了 / 🔄 進行中 / ⚠️ 要対応 / ❌ 未着手

**備考**: `description-list` / `faq` / `slider` / `timeline` には `__deprecated-*` の fixture が既に存在するが、これは deprecated マイグレーションテスト用で L1 操作テストには該当しない（スコープ外）。

## ブロック別詳細

フォルダ名昇順で 1 ブロックずつ対応する。

### banner-link

- [x] examples HTML 作成（847 行、70+ バリエーション）
- [x] spec.md 作成（三層 L1/L2/L3 対応）
- [x] L1 fixture 作成（76 件、`npm run test:integration` 全 113 件パス）
- [ ] L2 Chrome UI テスト（前セッションで 27/43 程度まで実施、`test-results/operation.md` に記録。Git 管理外）
- [ ] L3 フロント確認

**保留項目（UI 未対応のため）**:
- `border-radius__4corners` — `borderRadius` 属性は単一 string 値のみで 4 隅個別指定 UI 未対応
- `combo__campaign` — グラデーション UI 未実装

**次にやること**: L2 Chrome UI テストの再開（spec.md の L2 セクション参照）、または L3 フロント確認

### block-hook-hidden-by-size

段落ブロック・Box ブロックに設定を適用。各デバイスでの表示確認テキストを含める。
確認パターン: モバイルのみ / タブレットのみ / デスクトップのみ / モバイル+タブレット / タブレット+デスクトップ / モバイル+デスクトップ の 6 パターン。
「設定の組み合わせ例」セクションは省略。

- [ ] examples HTML 作成
- [ ] spec.md 作成
- [ ] L1 fixture 作成
- [ ] L2 Chrome UI テスト
- [ ] L3 フロント確認

**次にやること**: examples HTML 作成

### box

- [ ] examples HTML 作成
- [ ] spec.md 作成
- [ ] L1 fixture 作成
- [ ] L2 Chrome UI テスト
- [ ] L3 フロント確認

**次にやること**: examples HTML 作成

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

- [ ] examples HTML 作成
- [ ] spec.md 作成
- [ ] L1 fixture 作成
- [ ] L2 Chrome UI テスト
- [ ] L3 フロント確認

**次にやること**: examples HTML 作成

### timeline（+ timeline-item）

親ブロック側に 1 ファイルで集約。

- [ ] examples HTML 作成
- [ ] spec.md 作成
- [ ] L1 fixture 作成
- [ ] L2 Chrome UI テスト
- [ ] L3 フロント確認

**次にやること**: examples HTML 作成
