# 定義リストブロック 操作テスト仕様

定義リスト（description-list）親子ブロック全体のテスト仕様書。

対象ブロック:
- `ystdtb/description-list`（親 dl）
- `ystdtb/description-list-column`（横並びレイアウト、dl の直下）
- `ystdtb/description-list-dt`（用語）
- `ystdtb/description-list-dd-simple`（説明・テキストのみ）
- `ystdtb/description-list-dd-box`（説明・innerBlocks 形式）

エディター上の UI 操作・fixture による HTML 往復検証・手動確認の三層で動作を検証する。

## テスト方針

- **L1 (fixture-based integration test)**: 属性 → HTML 出力・parse/serialize 往復を全設定パターン網羅で自動検証（CI 毎回）
- **L2 (Chrome UI 自動テスト)**: 親子テンプレート制約・カラーパレット/グラデーション UI・border UI・templateLock 挙動のスポット検証
- **L3 (手動確認)**: フロント見た目・dl-column のレスポンシブスタック切替・dtWidth 反映を目視確認

運用ルールは [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md) を参照。

## ブロック特性

- **親子構成（2 層）**:
  - `dl` 直下に dt / dd-simple / dd-box / dl-column を自由配置
  - `dl-column` 直下は dt / dd-box のみ（dd-simple 不可）、`templateLock: "all"` で追加不可
- **RichText**: dt / dd-simple の `text` 属性（`rich-text` source）
- **レスポンシブ属性**:
  - dl: `responsiveMargin`
  - dt / dd-simple: `responsiveTextSize` / `responsivePadding` / `responsiveMargin`
  - dd-box: `responsivePadding` / `responsiveMargin`
  - dl-column: `responsiveDtWidth` / `responsiveMargin`
- **カラー系**:
  - dt / dd-simple / dd-box: `backgroundColor` / `customBackgroundColor` / `gradient` / `customGradient` / `textColor` / `customTextColor`
- **border**: dl-column のみ（`{width, style, color}` の FlatBorder）
- **className サポート**: dl のみ true（`wp-block-ystdtb-description-list` 付与）、他は全て false

## テスト対象の設定一覧

### 親 dl（description-list）

| 設定項目 | 属性 | レスポンシブ |
|---|---|---|
| 外側余白 | `margin` | `responsiveMargin` |

### 用語 dt（description-list-dt）

| パネル | 設定項目 | 属性 | レスポンシブ |
|---|---|---|---|
| 背景 | dt 背景色（プリセット） | `backgroundColor` | — |
| 背景 | dt 背景色（カスタム） | `customBackgroundColor` | — |
| 背景 | dt グラデーション（プリセット） | `gradient` | — |
| 背景 | dt グラデーション（カスタム） | `customGradient` | — |
| 背景 | dt 文字色（プリセット） | `textColor` | — |
| 背景 | dt 文字色（カスタム） | `customTextColor` | — |
| 文字 | dt 文字サイズ（プリセット） | `textSize` | `responsiveTextSize` |
| 文字 | dt 文字サイズ（カスタム） | `customTextSize` | 同上 |
| 文字 | dt フォントウェイト | `fontWeight` | — |
| 文字 | dt フォントスタイル | `fontStyle` | — |
| 文字 | dt 行間 | `lineHeight` | — |
| 文字 | dt 文字間隔 | `letterSpacing` | — |
| 余白 | dt 内側余白 | `padding` | `responsivePadding` |
| 余白 | dt 外側余白 | `margin` | `responsiveMargin` |

### 説明シンプル dd-simple（description-list-dd-simple）

属性は dt と完全に同一（class prefix / CSS カスタムプロパティ prefix のみ異なる）。

### 説明入れ子 dd-box（description-list-dd-box）

| パネル | 設定項目 | 属性 | レスポンシブ |
|---|---|---|---|
| 背景 | dd-box 背景色（プリセット） | `backgroundColor` | — |
| 背景 | dd-box 背景色（カスタム） | `customBackgroundColor` | — |
| 背景 | dd-box グラデーション（プリセット） | `gradient` | — |
| 背景 | dd-box グラデーション（カスタム） | `customGradient` | — |
| 背景 | dd-box 文字色（プリセット） | `textColor` | — |
| 背景 | dd-box 文字色（カスタム） | `customTextColor` | — |
| 余白 | dd-box 内側余白 | `padding` | `responsivePadding` |
| 余白 | dd-box 外側余白 | `margin` | `responsiveMargin` |

### 横並びレイアウト dl-column（description-list-column）

| パネル | 設定項目 | 属性 | レスポンシブ |
|---|---|---|---|
| スタック | モバイルでスタック | `isStackedOnMobile`（default: true） | — |
| スタック | タブレットでスタック | `isStackedOnTablet`（default: false） | — |
| サイズ | dt 幅 | `dtWidth` | `responsiveDtWidth` |
| ボーダー | ボーダー（width / style / color） | `border` | — |
| 余白 | 外側余白 | `margin` | `responsiveMargin` |

## 排他関係・条件付き表示

| 条件 | 影響 |
|---|---|
| dt / dd-simple に `textSize`（プリセット）設定あり | `customTextSize` は UI で非アクティブ（save 時も `fontSize` style 出力なし） |
| dt / dd-simple に `textSize`（プリセット）設定あり | `responsiveTextSize.desktop` の反映が抑制（プリセット優先） |
| dt / dd-simple / dd-box に `gradient` / `customGradient` 設定あり | `backgroundColor` / `customBackgroundColor` と同時指定時はグラデーションが優先（style の background に customGradient が入る） |
| dl-column の border に `color` / `width` どちらか未設定 | `--ystdtb--dl-column--border` CSS 変数は出力されない（`has-border` クラスも付かない） |
| dl-column は `templateLock: "all"` | dt / dd-box のペアは固定、ブロック追加・削除・並べ替え不可 |
| dl-column の子は allowedBlocks で dt / dd-box のみに制限 | dd-simple は dl-column 内に挿入不可（UI からも不可） |

## RichText ツールバー制御

dt / dd-simple の `text` 属性は `rich-text` source（デフォルトのフォーマット制限なし）。
- 太字・斜体・リンク等の基本フォーマット適用可
- ブロック側での `allowedFormats` 制御は設定なし

## デバイス別テスト対象

各レスポンシブ対応属性について、下記 3 パターンを網羅:

- `desktop` 単独指定
- `desktop + mobile` の 2 デバイス指定
- `desktop + tablet + mobile` の 3 デバイス指定

対象属性:
- `dl.responsiveMargin`
- `dt.responsiveTextSize` / `dt.responsivePadding` / `dt.responsiveMargin`
- `dd-simple.responsiveTextSize` / `dd-simple.responsivePadding` / `dd-simple.responsiveMargin`
- `dd-box.responsivePadding` / `dd-box.responsiveMargin`
- `dl-column.responsiveDtWidth` / `dl-column.responsiveMargin`

---

## L1 fixture テストパターン（全パターン網羅）

fixture は `test/integration/fixtures/blocks/dl/` 配下に配置。既存の `ystdtb__dl__deprecated-*` とは別プレフィックスで v2 操作テスト用を区別する（deprecated は v1 マイグレーションテスト用）。

命名規則: `ystdtb__dl__{subblock}__{panel-or-setting}__{variant}`

### 親 dl > 外側余白

- [ ] `ystdtb__dl__dl__margin__shorthand-all` — 4 辺同値（`margin: {top, right, bottom, left}` 同一値）
- [ ] `ystdtb__dl__dl__margin__shorthand-4corners` — 4 辺別値
- [ ] `ystdtb__dl__dl__margin__shorthand-2corners` — 上下・左右の 2 値パターン
- [ ] `ystdtb__dl__dl__margin__shorthand-3corners` — 上・左右・下の 3 値パターン
- [ ] `ystdtb__dl__dl__responsive-margin__desktop-only` — desktop のみ
- [ ] `ystdtb__dl__dl__responsive-margin__desktop-mobile` — desktop + mobile
- [ ] `ystdtb__dl__dl__responsive-margin__all-devices` — 全 3 デバイス

### dt > 背景

- [ ] `ystdtb__dl__dt__bg__preset` — `backgroundColor: "ys-light-green"`
- [ ] `ystdtb__dl__dt__bg__custom` — `customBackgroundColor: "#fff3d6"`
- [ ] `ystdtb__dl__dt__gradient__preset` — `gradient: "midnight"`
- [ ] `ystdtb__dl__dt__gradient__custom` — `customGradient: "linear-gradient(...)"`
- [ ] `ystdtb__dl__dt__text__preset` — `textColor: "ys-red"`
- [ ] `ystdtb__dl__dt__text__custom` — `customTextColor: "#2563eb"`

### dt > 文字サイズ

- [ ] `ystdtb__dl__dt__font-size__preset` — `textSize: "large"`
- [ ] `ystdtb__dl__dt__font-size__custom-px` — `customTextSize: "24px"`
- [ ] `ystdtb__dl__dt__font-size__custom-em` — `customTextSize: "1.5em"`
- [ ] `ystdtb__dl__dt__responsive-font-size__desktop-only`
- [ ] `ystdtb__dl__dt__responsive-font-size__desktop-mobile`
- [ ] `ystdtb__dl__dt__responsive-font-size__all-devices`

### dt > タイポグラフィ

- [ ] `ystdtb__dl__dt__font-weight__bold` — `fontWeight: "bold"`
- [ ] `ystdtb__dl__dt__font-weight__700` — `fontWeight: "700"`
- [ ] `ystdtb__dl__dt__font-style__italic` — `fontStyle: "italic"`
- [ ] `ystdtb__dl__dt__line-height__1-8` — `lineHeight: "1.8"`
- [ ] `ystdtb__dl__dt__letter-spacing__0-1em` — `letterSpacing: "0.1em"`

### dt > 内側余白（padding）

- [ ] `ystdtb__dl__dt__padding__shorthand-all`
- [ ] `ystdtb__dl__dt__padding__shorthand-4corners`
- [ ] `ystdtb__dl__dt__padding__shorthand-2corners`
- [ ] `ystdtb__dl__dt__padding__shorthand-3corners`
- [ ] `ystdtb__dl__dt__responsive-padding__desktop-only`
- [ ] `ystdtb__dl__dt__responsive-padding__desktop-mobile`
- [ ] `ystdtb__dl__dt__responsive-padding__all-devices`

### dt > 外側余白（margin）

- [ ] `ystdtb__dl__dt__margin__shorthand-all`
- [ ] `ystdtb__dl__dt__margin__shorthand-4corners`
- [ ] `ystdtb__dl__dt__margin__shorthand-2corners`
- [ ] `ystdtb__dl__dt__margin__shorthand-3corners`
- [ ] `ystdtb__dl__dt__responsive-margin__desktop-only`
- [ ] `ystdtb__dl__dt__responsive-margin__desktop-mobile`
- [ ] `ystdtb__dl__dt__responsive-margin__all-devices`

### dd-simple（dt と同一属性のため代表パターンに絞る）

dt で shorthand 網羅・device 別網羅は担保されているため、dd-simple は class prefix / CSS 変数 prefix が正しく出力されるかの確認に絞る。

- [ ] `ystdtb__dl__dd-simple__bg__preset` — `backgroundColor: "ys-light-orange"`
- [ ] `ystdtb__dl__dd-simple__bg__custom` — `customBackgroundColor`
- [ ] `ystdtb__dl__dd-simple__gradient__preset` — `gradient: "pale-ocean"`
- [ ] `ystdtb__dl__dd-simple__text__preset` — `textColor: "ys-green"`
- [ ] `ystdtb__dl__dd-simple__text__custom` — `customTextColor`
- [ ] `ystdtb__dl__dd-simple__font-size__preset`
- [ ] `ystdtb__dl__dd-simple__font-size__custom-px`
- [ ] `ystdtb__dl__dd-simple__responsive-font-size__all-devices`
- [ ] `ystdtb__dl__dd-simple__font-weight__bold`
- [ ] `ystdtb__dl__dd-simple__font-style__italic`
- [ ] `ystdtb__dl__dd-simple__line-height__1-8`
- [ ] `ystdtb__dl__dd-simple__letter-spacing__0-1em`
- [ ] `ystdtb__dl__dd-simple__padding__shorthand-4corners`
- [ ] `ystdtb__dl__dd-simple__responsive-padding__all-devices`
- [ ] `ystdtb__dl__dd-simple__margin__shorthand-4corners`
- [ ] `ystdtb__dl__dd-simple__responsive-margin__all-devices`

### dd-box > 背景

- [ ] `ystdtb__dl__dd-box__bg__preset` — `backgroundColor: "ys-light-blue"`
- [ ] `ystdtb__dl__dd-box__bg__custom` — `customBackgroundColor: "#eef2ff"`
- [ ] `ystdtb__dl__dd-box__gradient__preset` — `gradient: "pale-ocean"`
- [ ] `ystdtb__dl__dd-box__gradient__custom` — `customGradient`
- [ ] `ystdtb__dl__dd-box__text__preset` — `textColor: "ys-green"`
- [ ] `ystdtb__dl__dd-box__text__custom` — `customTextColor: "#7c3aed"`

### dd-box > 内側余白（padding）

- [ ] `ystdtb__dl__dd-box__padding__shorthand-all`
- [ ] `ystdtb__dl__dd-box__padding__shorthand-4corners`
- [ ] `ystdtb__dl__dd-box__padding__shorthand-2corners`
- [ ] `ystdtb__dl__dd-box__padding__shorthand-3corners`
- [ ] `ystdtb__dl__dd-box__responsive-padding__desktop-only`
- [ ] `ystdtb__dl__dd-box__responsive-padding__desktop-mobile`
- [ ] `ystdtb__dl__dd-box__responsive-padding__all-devices`

### dd-box > 外側余白（margin）

- [ ] `ystdtb__dl__dd-box__margin__shorthand-all`
- [ ] `ystdtb__dl__dd-box__margin__shorthand-4corners`
- [ ] `ystdtb__dl__dd-box__margin__shorthand-2corners`
- [ ] `ystdtb__dl__dd-box__margin__shorthand-3corners`
- [ ] `ystdtb__dl__dd-box__responsive-margin__desktop-only`
- [ ] `ystdtb__dl__dd-box__responsive-margin__desktop-mobile`
- [ ] `ystdtb__dl__dd-box__responsive-margin__all-devices`

### dl-column > スタック

- [ ] `ystdtb__dl__dl-column__stack__mobile-off` — `isStackedOnMobile: false`（デフォルト true の非デフォルト）
- [ ] `ystdtb__dl__dl-column__stack__tablet-on` — `isStackedOnTablet: true`（デフォルト false の非デフォルト）
- [ ] `ystdtb__dl__dl-column__stack__mobile-off-tablet-on` — 組み合わせ

### dl-column > dt 幅

- [ ] `ystdtb__dl__dl-column__dt-width__px` — `dtWidth: "150px"`
- [ ] `ystdtb__dl__dl-column__dt-width__percent` — `dtWidth: "30%"`
- [ ] `ystdtb__dl__dl-column__responsive-dt-width__desktop-only`
- [ ] `ystdtb__dl__dl-column__responsive-dt-width__desktop-mobile`
- [ ] `ystdtb__dl__dl-column__responsive-dt-width__all-devices`

### dl-column > ボーダー

- [ ] `ystdtb__dl__dl-column__border__solid-1px` — solid 1px（代表スタイル）
- [ ] `ystdtb__dl__dl-column__border__dashed-2px` — dashed 2px
- [ ] `ystdtb__dl__dl-column__border__dotted-1px` — dotted 1px
- [ ] `ystdtb__dl__dl-column__border__double-3px` — double 3px
- [ ] `ystdtb__dl__dl-column__border__color-custom` — カスタム hex 色

### dl-column > 外側余白（margin）

- [ ] `ystdtb__dl__dl-column__margin__shorthand-all`
- [ ] `ystdtb__dl__dl-column__margin__shorthand-4corners`
- [ ] `ystdtb__dl__dl-column__responsive-margin__desktop-only`
- [ ] `ystdtb__dl__dl-column__responsive-margin__all-devices`

### 代表的な組み合わせパターン（examples HTML の組み合わせ例を流用）

- [ ] `ystdtb__dl__combo__glossary` — 用語集（dl + dt + dd-simple × 3、太字強調）
- [ ] `ystdtb__dl__combo__faq` — FAQ 風（dt 背景色 + dd-box padding）
- [ ] `ystdtb__dl__combo__pricing` — 料金プラン表（dl-column + dtWidth + border × 3 行）
- [ ] `ystdtb__dl__combo__spec-table` — スペック表（dl-column + モバイル非スタック + 細め dtWidth）

---

## L2 Chrome UI テストパターン（絞り込み）

### 排他関係・カスケード

- [ ] dt / dd-simple で `textSize`（プリセット）選択中 → カスタム文字サイズ UI が非アクティブ / 適用されない
- [ ] dt / dd-simple で `customTextSize` 設定 → プリセットを選び直すと customTextSize が無効化される
- [ ] dt / dd-simple / dd-box で `backgroundColor` 設定後に `gradient` を設定 → style の background が gradient に切り替わる

### 条件付き表示

- [ ] dl-column の children は dt / dd-box のみ追加可能（dd-simple の追加 UI が出ない）
- [ ] dl-column の templateLock により dt / dd-box ペアは削除・並べ替え不可（ブロック操作 UI で該当ボタンが無効）

### ラベル-値対応（全選択肢網羅）

- [ ] dt / dd-simple / dd-box のカラーパレット（全 yStandard プリセット色）→ 各色選択で `backgroundColor` / `textColor` が slug で保存
- [ ] dt / dd-simple / dd-box のグラデーションパレット（全 yStandard プリセットグラデーション）→ `gradient` が slug で保存
- [ ] dt / dd-simple の文字サイズプリセット（全 theme.json 登録サイズ）→ `textSize` が slug で保存
- [ ] dl-column の border style セレクト（solid / dashed / dotted / double 等）→ `border.style` の各値が保存

### 複雑 UI

- [ ] カラーパレット（ColorPalette）: プリセット → カスタムピッカー → クリア の順で切替 → 属性が正しく遷移（`backgroundColor` / `customBackgroundColor` の一方のみ有効）
- [ ] border UI: color/width/style の 3 項目が揃ったときだけ `--ystdtb--dl-column--border` 出力・`has-border` 付与

### 操作順序（切り替え・リセットの整合性）

- [ ] 色: プリセット → カスタム → プリセット → クリア の順に切替 → 不要属性が残らない
- [ ] 文字サイズ: プリセット → カスタム → プリセット → クリア の順に切替 → 不要属性が残らない
- [ ] スタック設定: モバイルスタック ON → OFF → ON、タブレット OFF → ON → OFF
- [ ] dtWidth: 非レスポンシブで入力 → レスポンシブに切替 → 非レスポンシブに戻す

### RichText フォーマット・ツールバー制御

- [ ] dt の text: 太字・斜体・リンク・インラインコード適用 → 保存 → 再読込で検証エラーなし
- [ ] dd-simple の text: 同上
- [ ] dt / dd-simple の text を空にして保存 → parse 時に空 rich-text として復元（エラーなし）

### テンプレート制約

- [ ] dl の直下に dt / dd-simple / dd-box / dl-column を自由配置できる
- [ ] dl-column を新規挿入 → デフォルトで dt + dd-box が自動追加される
- [ ] dl-column 内に dd-simple を追加しようとしても許可されない

---

## L3 手動確認チェックリスト

### フロント見た目（examples/all-variations.html ベース）

- [ ] examples HTML をエディターに貼り付け → 全パターンの見た目を目視確認
- [ ] 「設定の組み合わせ例」4 パターン（用語集 / FAQ / 料金プラン表 / スペック表）の見た目
- [ ] dt / dd-simple の背景色 × 文字色の組み合わせ表示
- [ ] dt / dd-simple / dd-box のグラデーション（プリセット / カスタム）表示
- [ ] dd-box 内部に配置した段落・画像・リスト等が正しく描画される

### レスポンシブ挙動

- [ ] dl-column のモバイルスタック切替（desktop / tablet / mobile ビューポート）
- [ ] dl-column のタブレットスタック切替
- [ ] dl-column の `dtWidth` / `responsiveDtWidth` 反映（各ビューポートで dt 幅が期待通り）
- [ ] dt / dd-simple の `responsiveTextSize`（各ビューポートで文字サイズが切り替わる）
- [ ] dt / dd-simple / dd-box の `responsivePadding` / `responsiveMargin`（各ビューポートで余白が切り替わる）
- [ ] dl / dl-column の `responsiveMargin`（各ビューポートで外側余白が切り替わる）

### 検証エラー・コンソールエラー

- [ ] examples HTML ペースト → 保存 → 再読込で検証エラーが出ないこと
- [ ] ブラウザコンソールにエラー・警告なし

### テーマとの干渉

- [ ] yStandard テーマで見た目が壊れない
- [ ] 他のブロック（見出し / 段落 / Box / カラム）と並べたときの整合性
- [ ] dd-box 内に他のブロック（Box / 画像 / リスト / 段落）を入れ子にした際の描画

---

## 意地悪パターン（粗探し観点）

共通観点は [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md#粗探しのプロ観点意地悪パターン) を参照。

description-list ブロック固有の観点:

- **dt / dd-simple の RichText に HTML 特殊文字・改行・絵文字**: `text` 属性（rich-text source）で正しくエスケープされ、parse/serialize 往復で壊れないか
- **dt / dd-simple を空文字で保存**: `text: ""` 状態で保存 → 再読込で検証エラーが出ないか
- **dl-column に border.color のみ / border.width のみ設定**: `getDtColumnBorderProp` が両方揃わない場合 undefined を返し、`has-border` クラスも CSS 変数も出力されないこと
- **dtWidth に `calc(...)` 等の CSS 関数**: `--ystdtb--dl-column--width: calc(50% - 8px)` として保存・フロント反映されるか
- **responsiveTextSize.desktop のみ設定で textSize プリセットと併用**: プリセットが優先され responsive 値が無視される挙動
- **dl-column が dl の唯一の子（dt / dd-simple を挟まない）**: 表のように dl-column の連続配置が可能か
- **dd-box の innerBlocks が空**: paragraph を全削除した状態での save 挙動
- **dl-column 内に allowedBlocks 以外のブロックをクリップボード経由で挿入**: ブロック Paste で dd-simple を dl-column 内に貼り付けようとした場合の挙動
- **深いネスト**: dd-box 内に Box ブロック、さらにその中に段落 → 3 階層以上の serialize/parse 整合性
- **ブロック複製**: dl ブロックを複製 → 内部の dt / dd-simple / dl-column の clientId が独立・attributes が独立
- **プリセット色削除後のフォールバック**: 保存時に存在した `backgroundColor: "ys-xxx"` がテーマ更新で未定義化 → フロントで色なしとして表示される挙動

---

## 補足

- 本仕様は block.json / edit.tsx / save.tsx / utils.ts / examples HTML の構造に基づく
- ブロックの仕様変更時は本仕様も更新する
- L2 / L3 セッション結果は `operation.md`（Git 管理外）に記録
- L1 fixture は `test/integration/fixtures/blocks/dl/` 配下（既存 `ystdtb__dl__deprecated-*` と同ディレクトリに追加）
- 本仕様の fixture 数はおよそ 95 件（dl 7 / dt 31 / dd-simple 16 / dd-box 20 / dl-column 17 / combo 4）
