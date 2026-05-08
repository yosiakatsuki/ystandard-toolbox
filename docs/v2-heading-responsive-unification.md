# v2 見出し編集機能 レスポンシブデータ構造統一

## 目的

見出し編集機能のレスポンシブ値の持ち方を、ブロックと同じ「`xxx` + `responsiveXxx` 別キー方式」に統一する。

## 背景

見出し編集機能とブロックでレスポンシブ値の持ち方に差があった。

| 機能 | レスポンシブ値の持ち方 |
|---|---|
| 見出し編集 | `fontSize: { desktop, tablet, mobile }` の 1 キーにまとめる方式（`ResponsiveValues` 型） |
| ブロック（banner-link 等） | `fontSize: '1.4em'` ＋ `responsiveFontSize: { desktop, tablet, mobile }` の **別キー** 方式 |

v2 リリース後に構造を変更すると、保存済みデータに対して再度マイグレーションが必要になり、ユーザにも開発側にも負担。**v2 リリース前にブロック方式に統一**することで、将来の再マイグレーションを回避する。

## 命名規則

- 単一値（既存のキー名を維持）: `xxx`
- レスポンシブ値（新規キー）: `responsiveXxx`

例:

```typescript
fontSize: '1.4em'                                 // 単一値（既存）
responsiveFontSize: { desktop, tablet, mobile }   // レスポンシブ値（新規）
```

## 対象範囲

### 触るファイル

- `src/plugin-settings/heading/types/index.ts` — 型定義
- `src/plugin-settings/heading/preset/preset.json` — v2 の React UI で使うプリセット
- `src/plugin-settings/heading/app/options/` 以下の各 UI コンポーネント
- `src/plugin-settings/heading/app/preview/preview-style.tsx` — プレビュー側 CSS 生成
- `inc/heading/class-heading-migration.php` — v1 → v2 マイグレーション
- `inc/util/class-styles.php` — PHP 側 CSS 出力
- `phpunit/settings/test-heading-design-*.php` — PHP テスト
- `src/plugin-settings/heading/app/preview/preview-style.test.ts` — JS テスト

### 触らないファイル

- `library/ystandard-toolbox-heading/preset.json` — v1 互換用（v1 時代の構造を保持する役割。マイグレーションロジックがこれを読んで v2 の新構造に変換する）
- ブロック関連ファイル — 既にブロック方式（`xxx` + `responsiveXxx`）を採用済み
- 他の `src/plugin-settings/` 配下 — レスポンシブ型を使っていないため対象外

## 対象プロパティ一覧

### HeadingStyle（メイン要素）

| 区分 | プロパティ | 統一後の名前 |
|---|---|---|
| typography | `fontSize` | `fontSize` + `responsiveFontSize` |
| typography | `textAlign` | `textAlign` + `responsiveTextAlign` |
| typography | `fontWeight` | `fontWeight` + `responsiveFontWeight` |
| border | `borderRadius` | `borderRadius` + `responsiveBorderRadius` |
| border | `border` | `border` + `responsiveBorder` |
| spacing | `padding` | `padding` + `responsivePadding` |
| spacing | `margin` | `margin` + `responsiveMargin` |
| size | `width` / `minWidth` / `maxWidth` | 各々 `xxx` + `responsiveXxx` |
| size | `height` / `minHeight` / `maxHeight` | 同上 |
| advanced | `display` | `display` + `responsiveDisplay` |
| advanced | `flexDirection` | `flexDirection` + `responsiveFlexDirection` |
| advanced | `alignItems` | `alignItems` + `responsiveAlignItems` |
| advanced | `justifyContent` | `justifyContent` + `responsiveJustifyContent` |
| advanced | `gap` | `gap` + `responsiveGap` |

### HeadingPseudoElementsStyle（before/after 疑似要素）

メイン要素と同じプロパティ群のうち、`flexDirection` / `alignItems` / `justifyContent` / `gap` 以外（before/after では `display` のみ）。

## Phase 分け

### Phase 1: シンプルな単一値レスポンシブ（7 プロパティ）

- `textAlign`
- `fontWeight`
- `display`
- `flexDirection`
- `alignItems`
- `justifyContent`
- `gap`

### Phase 2: サイズ系・borderRadius（7 プロパティ）

- `width` / `minWidth` / `maxWidth`
- `height` / `minHeight` / `maxHeight`
- `borderRadius`

### Phase 3: 特殊な構造を持つもの（4 プロパティ）

- `padding`（`ResponsiveSpacing`、内部に `{top, right, bottom, left}` の入れ子）
- `margin`（同上）
- `fontSize`（`CustomFontSize` 特殊型、テーマ設定連動あり）
- `border`（最も複雑、`{ desktop: { top: { color, style, width } } }` の三重入れ子）

## 修正レイヤー（プロパティごと共通）

| # | レイヤー | ファイル例 |
|---|---|---|
| 1 | 型定義 | `src/plugin-settings/heading/types/index.ts` |
| 2 | migrate ロジック | `inc/heading/class-heading-migration.php` |
| 3 | UI コンポーネント | `src/plugin-settings/heading/app/options/{区分}/{プロパティ}.tsx` |
| 4 | プレビュー CSS 生成 | `src/plugin-settings/heading/app/preview/preview-style.tsx` |
| 5 | PHP CSS 出力 | `inc/util/class-styles.php` |
| 6 | preset.json (UI 用) | `src/plugin-settings/heading/preset/preset.json` |
| 7 | テスト群 | `phpunit/settings/test-heading-design-*.php` / `preview-style.test.ts` |

## 進め方

型定義 / preset.json も含め、すべて Phase 内で書き換える。Stage 0 は事前準備（ドキュメント作成）のみ。

### Stage 0: 事前準備

1. このドキュメント作成

### Stage 1: Phase 1 をまとめて対応・まとめてテスト

Phase 1 の 7 プロパティについて、以下のレイヤーをまとめて修正:

1. 型定義（旧型を削除、新型 `xxx` + `responsiveXxx` を追加）
2. `preset.json` 書き換え（該当プロパティ部分）
3. migrate ロジック（v1 → v2 変換を新形式に）
4. UI コンポーネント
5. preview-style.tsx
6. PHP CSS 出力
7. テスト
8. 動作確認

### Stage 2: Phase 2 をまとめて対応・まとめてテスト

Phase 2 の 7 プロパティについて同様。

### Stage 3: Phase 3 はプロパティごと

Phase 3 の 4 プロパティは構造が複雑なため、1 プロパティずつ:

1. 設計（必要に応じて）
2. 型定義
3. preset.json 書き換え
4. 実装（migrate / UI / preview / PHP CSS 出力）
5. テスト
6. 動作確認

## 進捗管理

### Stage 0

- [x] ドキュメント作成

### Stage 1: Phase 1（typography & advanced 7 プロパティをまとめて）

対象: `textAlign` / `fontWeight` / `display` / `flexDirection` / `alignItems` / `justifyContent` / `gap`

- [x] 型定義
- [x] preset.json 書き換え
- [x] migrate
- [x] UI コンポーネント
- [x] preview-style.tsx
- [x] PHP CSS 出力
- [x] テスト
- [ ] 動作確認

### Stage 2: Phase 2（size & borderRadius 7 プロパティをまとめて）

対象: `width` / `minWidth` / `maxWidth` / `height` / `minHeight` / `maxHeight` / `borderRadius`

- [x] 型定義
- [x] preset.json 書き換え
- [x] migrate
- [x] UI コンポーネント
- [x] preview-style.tsx（Phase 1 で対応済み）
- [x] PHP CSS 出力（Phase 1 で対応済み）
- [x] テスト
- [ ] 動作確認

### Stage 3: Phase 3（プロパティごと）

- [x] `padding`
- [x] `margin`
- [ ] `fontSize`
- [ ] `border`

## 関連ドキュメント

- [docs/v2-roadmap.md](v2-roadmap.md) — v2 リリースに向けた残タスク
- [docs/v2-settings-testing.md](v2-settings-testing.md) — プラグイン設定画面テスト
- [CLAUDE.md](../CLAUDE.md) — プロジェクト全体ガイド

## セッション再開メモ

### 現在のステータス

Phase 3 の最初のプロパティ `padding` の実装は完了し、テスト全 PASS（PHP 83件 / Jest 141件）+ ビルド成功。**動作確認待ち** で一旦セッションを終了。

### 再開時の最初のステップ

ユーザに **padding の動作確認結果** をヒアリング。確認依頼項目:

1. v2 設定 UI で「内側余白(Padding)」のレスポンシブ操作（単一値 / レスポンシブ切替）が動作するか
2. preset:background-color など padding を持つプリセット選択時、padding の各値が正しく入るか
3. v1 → v2 マイグレーション後、`padding` が `{top, right, bottom, left}` の単一値で保存されるか
4. CSS 出力（フロント・エディタ両方）で padding が正しく適用されるか

### 対応済みの課題（旧データ混在問題）

#### 問題のシナリオ

migrate を実行せずに v2 設定 UI で操作すると、以下のような旧形式と新形式の混在データが保存される。

```json
"padding": {
    "desktop": {
        "top": "0.5em",
        "right": "0.5em",
        "bottom": "0.5em",
        "left": "0.5em"
    },
    "top": "35px",
    "right": "5px",
    "bottom": "35px",
    "left": "5px"
}
```

CSS 出力時、`is_responsive_style` が `desktop` キーを見て「レスポンシブ」と判定し、`parse_spacing_style` が `desktop` 配下のみを処理 → **旧データの 0.5em が勝つ**。新形式の `35px` 等は無視される。

#### 原因の整理（確認済み）

1. データの初期状態が旧形式（`padding: { desktop: {...} }`）
2. UI コンポーネント `CustomSpacingSelectControl.CustomValue` が「desktop プロパティ」を未知のキーとして保持しつつ、ユーザの top/right/bottom/left 入力を追加マージして返す
3. panel/style.tsx の `handleOnChange` は shallow merge で padding 全体を置き換えるが、UI から返ってきた混在構造がそのまま保存される

#### 対処方針

CSS 出力と UI 入力の責務を分けて対処した。

- CSS 出力側では、`desktop / tablet / mobile` だけで構成されている配列をレスポンシブ値として扱う
- `padding` / `margin` の CSS 展開では、`top / right / bottom / left` 以外のキーを出力しない
- プレビュー CSS 生成側も PHP 側と同じ判定・出力ルールに合わせる
- `padding` UI の単一値入力では、旧 `desktop` キーを混ぜたまま保存しないように値を正規化する

これにより、旧形式の `desktop` と新形式の `top / right / bottom / left` が混在しても、CSS 出力では新形式の値が優先される。

#### 対応ファイル

- `inc/util/class-styles.php`
- `src/plugin-settings/heading/app/preview/preview-style.tsx`
- `src/plugin-settings/heading/app/options/spacing/control.tsx`
- `src/plugin-settings/heading/app/options/spacing/padding.tsx`
- `phpunit/settings/test-heading-design-style.php`
- `src/plugin-settings/heading/app/preview/preview-style.test.ts`

### Phase 3 残作業

`padding` / `margin` 完了後、以下を順次対応:

- [ ] `fontSize`（`CustomFontSize` 特殊型、テーマ設定連動あり）
- [ ] `border`（三重入れ子、最も複雑）

### 補足

- 各 Phase 完了時に動作確認を挟む方針
- ユーザはコミットは自分で行う（マイグレ系の作業をしてからコミット）
- ドキュメントの「進捗管理」も合わせて更新すること
