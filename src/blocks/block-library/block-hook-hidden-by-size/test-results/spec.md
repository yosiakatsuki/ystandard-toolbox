# 画面サイズによる非表示 操作テスト仕様

ブロック拡張（ブロックフック）のため、独立ブロックではなく既存ブロックに属性を付加する形で動作する。エディター上の UI 操作・fixture による HTML 往復検証・手動確認の三層で動作を検証する仕様書。

## テスト方針

- **L1 (fixture-based integration test)**: **対象外**。ブロック拡張（filter 経由の attribute 追加）のため、test 環境で同等のフィルターを有効化するには `index.tsx` の分割など実装修正が必要。コストに見合わないため L1 は行わず、L2 / L3 で代替する
- **L2 (Playwright UI 自動テスト)**: トグル挙動・クラス付与・排他ではない独立動作・サポート判定の条件付き表示を UI 経由で検証
- **L3 (手動確認)**: フロントでのメディアクエリ切替を目視確認（デバイスごとの非表示挙動）

運用ルールは [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md) を参照。

## 機能仕様サマリー

### 適用対象

ブロックが次の条件をすべて満たす場合、パネルが表示される:

- ブロック名が `core`, `ystdb`, `ystdtb` 名前空間で始まる
- `customClassName` サポートが有効（WordPress デフォルト true）
- `ystdtdHiddenBySize` サポートが有効（WordPress デフォルト true）

### 属性

| 属性名 | 型 | デフォルト | 付与されるクラス |
|---|---|---|---|
| `ystdtbIsHiddenMobile` | boolean | false | `ystdtb-hidden-mobile` |
| `ystdtbIsHiddenTablet` | boolean | false | `ystdtb-hidden-tablet` |
| `ystdtbIsHiddenDesktop` | boolean | false | `ystdtb-hidden-desktop` |

### UI

「非表示設定(画面サイズ)」パネル（BlockHookPanel）内の 3 つの ToggleControl:

- モバイルで非表示
- タブレットで非表示
- PCで非表示

いずれかが true の場合、パネルの `isEnabled` が true になり、見た目でアクティブ状態が表示される。

## 排他関係・条件付き表示

| 条件 | 影響 |
|---|---|
| 非適用ブロック（`customClassName: false` 等） | パネルが表示されない |
| トグル ON | `className` に対応する `ystdtb-hidden-*` クラスが追加される |
| トグル OFF | `className` から対応する `ystdtb-hidden-*` クラスが削除される |
| いずれかのトグル ON | BlockHookPanel の `isEnabled` が true（アクティブ表示） |
| 複数トグル同時 ON | クラスは独立して加算（排他ではない） |

---

## L1 fixture テストパターン

**対象外**。本ブロック拡張は `blocks.registerBlockType` フィルタで attribute を追加する仕組みのため、test 環境で正しく parse させるには `index.tsx` を attribute filter と editor filter に分割する必要がある。実装修正コストが L1 による追加検証価値に見合わないため、L1 は実施せず手動テスト（L2 / L3）で代替する。

属性保存の基本動作は既に box / paragraph 側の L1 / L2 / L3 テストで間接的にカバーされる（保存 HTML に `className` と `ystdtbIsHidden*` が保持されること）。

---

## L2 Playwright UI テストパターン（絞り込み）

### 対象ブロックのパネル表示

- [ ] core/paragraph にパネル「非表示設定(画面サイズ)」が表示される
- [ ] ystdtb/box にパネル「非表示設定(画面サイズ)」が表示される
- [ ] core/nextpage（`customClassName: false`）にパネルが表示されない

### トグル動作と属性・クラス付与

- [ ] モバイルトグル OFF → ON → `ystdtbIsHiddenMobile: true` + className に `ystdtb-hidden-mobile` 追加
- [ ] モバイルトグル ON → OFF → `ystdtbIsHiddenMobile: false` + className から該当クラス削除
- [ ] タブレットトグル OFF → ON → 同様（代表確認で 1 ケース）
- [ ] PC トグル OFF → ON → 同様（代表確認で 1 ケース）

### 複数トグル独立動作（排他ではない）

- [ ] モバイル + タブレット 同時 ON → className に両方のクラスが追加される
- [ ] モバイル ON → タブレット ON → モバイル OFF → モバイルクラスのみ削除、タブレットクラスは保持
- [ ] 3 つ全部 ON → 3 クラスすべて付与

### BlockHookPanel アクティブ表示

- [ ] すべて OFF → `isEnabled: false`（非アクティブ表示）
- [ ] どれか 1 つ ON → `isEnabled: true`（アクティブ表示）

### 既存 className との共存

- [ ] 既存の自由入力 className がある状態でトグル ON → 既存クラスを保持したまま `ystdtb-hidden-*` 追加
- [ ] トグル OFF → `ystdtb-hidden-*` のみ削除、既存クラスは残る

### 保存・再読込による永続化

- [ ] 3 つすべて ON にして保存 → 再読込で属性・className が保持されている
- [ ] トグルを 1 つ OFF にして保存 → 再読込で className から該当クラスが消えている

---

## L3 手動確認チェックリスト

### フロント見た目（メディアクエリ切替）

- [ ] examples HTML を公開し、実機 3 デバイス（またはブラウザのデバイスエミュレーション）で確認
- [ ] モバイルサイズ: 「モバイル非表示」系のブロックが hidden、「タブレット + PC 非表示」のブロックが表示
- [ ] タブレットサイズ: 「タブレット非表示」系のブロックが hidden、「モバイル + PC 非表示」のブロックが表示
- [ ] PC サイズ: 「PC 非表示」系のブロックが hidden、「モバイル + タブレット非表示」のブロックが表示

### エディター上の視覚表示

- [ ] 非表示設定されているブロックに破線枠が表示される（`style-editor.css` の演出）
- [ ] 非表示設定なしのブロックには破線が出ない

### 検証エラー・コンソールエラー（最終確認）

- [ ] examples HTML ペースト → 保存 → 再読込で検証エラーが出ないこと
- [ ] ブラウザコンソールにエラー・警告なし

### テーマとの干渉

- [ ] yStandard テーマで非表示の CSS ルール（`.ystdtb-hidden-mobile` 等）が適用される
- [ ] テーマ切替（他テーマ）でクラスが付いていてもスタイルが当たらない場合の挙動を確認

---

## 意地悪パターン（粗探し観点）

共通観点は [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md#粗探しのプロ観点意地悪パターン) を参照。

このブロック拡張固有の観点:

- **プレースホルダー状態のブロックで ON**: まだ本文を入力していない段落でトグル操作 → エディター内表示・保存挙動
- **インナーブロックへの適用**: Box ブロック内の段落ブロックにも個別にパネルが出るか
- **同一 className を重複付与しない**: 既にクラスがある状態で再度 ON しても `ystdtb-hidden-mobile ystdtb-hidden-mobile` とならない（classnames の dedupe 実装）
- **非対応ブロックへのフィルター**: 対象外ブロック（他社提供ブロック）にパネルが出ないこと

## 補足

- 本仕様は `index.tsx` / `types.ts` / `index.php` / examples HTML の構造に基づく
- 仕様変更時は本仕様も更新する
- L2 / L3 セッション結果は `operation.md`（Git 管理外）に記録
- L1 fixture は `test/integration/fixtures/blocks/` 配下
