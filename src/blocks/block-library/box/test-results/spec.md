# ボックスブロック 操作テスト仕様

エディター上の UI 操作・fixture による HTML 往復検証・手動確認の三層で動作を検証する仕様書。

## テスト方針

- **L1 (fixture-based integration test)**: 属性 → HTML 出力・parse/serialize 往復を代表パターン + 属性網羅で自動検証（CI 毎回）
- **L2 (Chrome UI 自動テスト)**: タイプ切替・色パレット・ラベル UI・背景画像アップロードのスポット検証
- **L3 (手動確認)**: フロント見た目・レスポンシブ挙動の目視確認

運用ルールは [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md) を参照。

## テスト対象の設定一覧

### サイドバーパネル（4 パネル）

| パネル | 主な設定項目 |
|---|---|
| タイプ | ボックススタイル 5 択（label-none / label-out / label-in / label-wide / label-line） |
| ボックス設定 | 背景色 / 文字色 / 枠線色 / 枠線サイズ / 枠線スタイル / 角丸 / 余白（レスポンシブ） |
| ラベル設定 | ラベルテキスト / アイコン / 文字サイズ / フォントウェイト / 背景色 / 文字色 / 角丸 |
| 背景画像 | 画像選択 / オーバーレイ不透明度 / 繰り返し |

## 排他関係・条件付き表示

| 条件 | 影響 |
|---|---|
| `boxStyle === 'label-none'` | ラベル要素が save に出力されない（UI は出るが反映されない） |
| `label` / `labelIcon` がいずれも未設定 | 選択状態でなければラベル要素が出力されない（編集時のみ placeholder 表示） |
| `backgroundImage` 未設定 | 背景画像関連の div（`ystdtb-box__background` / `__background-cover`）が出力されない |
| `boxBorderColor` あり or `customBoxBorderColor` あり | `has-border` + `has-border-color` クラスが付き、`show-default-border` が外れる |
| `boxBackgroundColor` / `customBoxBackgroundColor` なし かつ 枠線色なし | `show-default-border` が付与（デフォルトの薄い枠線を表示） |

## 角丸・ラベル角丸の適用ルール（save.tsx の function.ts）

| boxStyle | 角丸の適用位置 |
|---|---|
| label-none（hasLabel false） | 4 隅すべてに `boxBorderRadius` |
| label-out / label-wide | bottom-left / bottom-right のみに `boxBorderRadius`（top はラベル側） |
| label-in / label-line | 4 隅すべてに `boxBorderRadius`（ラベルは内側） |

---

## L1 fixture テストパターン

L1 fixture は `test/integration/fixtures/blocks/` 配下に配置。各 fixture は 1 設定を代表する HTML スナップショット。

### タイプ

- [ ] `ystdtb__box__type__label-none` — デフォルト
- [ ] `ystdtb__box__type__label-out`
- [ ] `ystdtb__box__type__label-in`
- [ ] `ystdtb__box__type__label-wide`
- [ ] `ystdtb__box__type__label-line`

### ボックス設定 > 背景色

- [ ] `ystdtb__box__bg__preset` — `boxBackgroundColor: "ys-blue"`
- [ ] `ystdtb__box__bg__custom` — `customBoxBackgroundColor: "#fef08a"`

### ボックス設定 > 文字色

- [ ] `ystdtb__box__text__custom` — `customBoxTextColor: "#0284c7"`

### ボックス設定 > 枠線

- [ ] `ystdtb__box__border__color-preset`
- [ ] `ystdtb__box__border__color-custom`
- [ ] `ystdtb__box__border__size-1px` — デフォルト（fixture では明示）
- [ ] `ystdtb__box__border__size-3px`
- [ ] `ystdtb__box__border__size-5px`
- [ ] `ystdtb__box__border__style-solid` — デフォルト
- [ ] `ystdtb__box__border__style-dotted`
- [ ] `ystdtb__box__border__style-dashed`
- [ ] `ystdtb__box__border__style-double`

### ボックス設定 > 角丸

- [ ] `ystdtb__box__border-radius__8px`
- [ ] `ystdtb__box__border-radius__16px`
- [ ] `ystdtb__box__border-radius__50percent`
- [ ] `ystdtb__box__border-radius__1em`

### ボックス設定 > 余白（ショートハンド網羅）

- [ ] `ystdtb__box__padding__all-16` — 4 辺同値
- [ ] `ystdtb__box__padding__4corners` — 4 辺別値
- [ ] `ystdtb__box__padding__responsive-desktop-mobile`
- [ ] `ystdtb__box__padding__responsive-all-devices`

### ラベル設定

- [ ] `ystdtb__box__label__text-only` — label-out + テキストのみ
- [ ] `ystdtb__box__label__icon-only` — label-out + アイコンのみ
- [ ] `ystdtb__box__label__text-and-icon` — label-in + テキスト + アイコン
- [ ] `ystdtb__box__label__font-size-small` — 0.75em
- [ ] `ystdtb__box__label__font-size-large` — 1.2em
- [ ] `ystdtb__box__label__weight-bold`
- [ ] `ystdtb__box__label__bg-preset`
- [ ] `ystdtb__box__label__bg-custom`
- [ ] `ystdtb__box__label__text-preset`
- [ ] `ystdtb__box__label__text-custom`
- [ ] `ystdtb__box__label__border-radius-4px`

### 背景画像

- [ ] `ystdtb__box__bgimage__with-image` — 画像あり・デフォルト（不透明度 0.8、no-repeat）
- [ ] `ystdtb__box__bgimage__opacity-05`
- [ ] `ystdtb__box__bgimage__opacity-0`
- [ ] `ystdtb__box__bgimage__repeat`
- [ ] `ystdtb__box__bgimage__repeat-x`
- [ ] `ystdtb__box__bgimage__repeat-y`

### 代表的な組み合わせパターン（examples の「設定の組み合わせ例」を流用）

- [ ] `ystdtb__box__combo__guide` — 解説ボックス（label-out + 淡色背景）
- [ ] `ystdtb__box__combo__caution` — 注意喚起（label-in + 赤系 + 太字）
- [ ] `ystdtb__box__combo__hint` — ヒント（label-none + 枠線 + 角丸）
- [ ] `ystdtb__box__combo__promo` — プロモ（背景画像 + オーバーレイ）

---

## L2 Chrome UI テストパターン（絞り込み）

### タイプ切替

- [ ] タイプ 5 択のボタン切替で `boxStyle` 属性が正しく保存
- [ ] label-none 時: ラベル設定パネルで値を入れても save 出力にラベル要素が出ない
- [ ] label-out → label-in 切替で `show-default-border` / ラベル位置が正しく入れ替わる

### ラベル設定の組み合わせ

- [ ] ラベル文字のみ入力（アイコンなし）→ `ystdtb-box__label-text` だけ出力
- [ ] アイコンのみ選択（文字空）→ `ystdtb-box__label-icon` だけ出力（選択中はプレースホルダ表示あり）
- [ ] 文字 + アイコン両方 → 両方出力
- [ ] フォントウェイト 太字 → `is-label-bold` クラス、通常 → `is-label-normal`

### 色パレット

- [ ] ボックス背景色プリセット → `has-{slug}-background-color` + `has-background`
- [ ] ボックス背景色カスタム → inline `background-color:#xxx` + `has-background`
- [ ] ラベル背景色プリセット / カスタム（同様）
- [ ] 文字色プリセット → `has-{slug}-color` + `has-text-color`
- [ ] 枠線色プリセット → `has-{slug}-border-color`（`has-border` も付与）

### 枠線

- [ ] 枠線スタイル 4 択（solid / dotted / dashed / double）全てで `border-style` が変化
- [ ] 枠線サイズ UnitControl で px 入力 → `--ystdtb-box-border-width` + `data-ys-ie-styles` 反映
- [ ] 枠線色クリア → `show-default-border` 付与（背景色もない前提）

### 角丸

- [ ] UnitControl で px / em / % の 3 単位で値入力 → `border-top-left-radius` 等 4 方向に同値で出力
- [ ] label-out 時、top-left / top-right は `undefined`（ラベルで上側が覆われるため）
- [ ] label-in 時、4 隅すべてに値が入る

### 余白（レスポンシブ）

- [ ] 標準タブで 4 辺一括入力 → desktop のみ CSS 変数化
- [ ] 標準タブで 4 辺別入力 → 4 方向個別 CSS 変数
- [ ] デバイス別タブで desktop + tablet + mobile 入力 → 全 CSS 変数化

### 背景画像

- [ ] メディアライブラリから画像選択 → `backgroundImage.url` / `backgroundImage.id` 保存
- [ ] 画像クリア → `backgroundImage` 属性削除、`ystdtb-box__background` div が消える
- [ ] オーバーレイ不透明度 RangeControl（0〜1, step 0.1）で属性保存
- [ ] 繰り返しドロップダウン 4 択（no-repeat / repeat / repeat-x / repeat-y）で属性保存

---

## L3 手動確認チェックリスト

### フロント見た目（examples/all-variations.html ベース）

- [ ] examples HTML をエディターに貼り付け → 保存 → フロントで全パターンの見た目を目視確認
- [ ] 代表的な組み合わせ（解説 / 注意喚起 / ヒント / プロモ）の最終見た目
- [ ] ラベル位置（label-out / label-in / label-wide / label-line）の視覚差
- [ ] 角丸時、ラベル部との繋ぎ目に不自然な隙間がないか
- [ ] 背景画像 + オーバーレイの重ね順が正しいか

### レスポンシブ挙動

- [ ] 余白レスポンシブ: desktop 32px → tablet 24px → mobile 16px の切り替え

### 検証エラー・コンソールエラー

- [ ] examples HTML ペースト → 保存 → 再読込で検証エラーが出ない
- [ ] ブラウザコンソールにエラー・警告なし

### テーマとの干渉

- [ ] yStandard テーマで見た目が壊れない
- [ ] 他のブロックと並べた時の整合性

---

## 意地悪パターン（粗探し観点）

共通観点は [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md#粗探しのプロ観点意地悪パターン) を参照。

ボックスブロック固有の観点:

- **ラベル空 + アイコン空 + label-out**: 空のラベルコンテナが表示されるか / 非表示か
- **背景色なし + 枠線色なし**: `show-default-border` でデフォルトの薄い枠線が表示される
- **label-none に切り替えても label / labelIcon 属性が残る**: 属性はクリアされず、他スタイルに戻すと復活
- **boxBorderSize = "0"**: 枠線消滅、ただし `data-ys-ie-styles` には `border-width:"0"` が残る
- **角丸 + label-out**: top-left / top-right の角丸がラベル側に適用される（function.ts の getLabelBorderRadius 準拠）

## 補足

- 本仕様は block.json / inspector-controls / examples HTML の構造に基づく
- ブロックの仕様変更時は本仕様も更新する
- L2 / L3 セッション結果は `operation.md`（Git 管理外）に記録
- L1 fixture は `test/integration/fixtures/blocks/` 配下
