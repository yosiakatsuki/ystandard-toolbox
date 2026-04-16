# ブロック操作テスト ガイドライン

ブロック（block-library 配下）のテスト戦略と実行手順を定めた共通ガイドライン。

block-library 配下のすべてのブロックに適用される恒久ルール。今後追加されるブロックも同じ手順でテストする。

## 目的

- 各ブロックの設定値が正しく保存・復元されるかを検証する
- UI 上の排他関係・条件付き表示・ラベル対応が期待通りに動作するかを検証する
- フロント表示・レスポンシブ挙動が想定通りかを確認する
- 保存 → 再読込でブロックの検証エラー・コンソールエラーが発生しないか（壊れないか）を検証する

## 対象

- block-library 配下のすべてのブロック（親子ブロックは親側にまとめて実施）

## テスト三層構成

テストは以下の三層で役割分担する。同じ項目を三層で重複検証するのではなく、**各層が得意な範囲を分担する**。

### L1: fixture-based integration test（自動・全パターン網羅）

- **手段**: Jest（`test/integration/fixtures/`）
- **実行頻度**: CI 毎回
- **検証対象**:
  - 属性 → HTML 出力（save 関数）の正当性
  - parse / serialize / validate の往復検証
  - deprecated 変換
  - 全設定パターンを網羅的にカバー（1 設定 1 fixture が基本）
- **得意**:
  - 速い（CI で数秒〜数十秒）
  - 網羅的（数百 fixture 可能）
  - 「保存 → 再読込で壊れない」を確実に検出
- **不得意**:
  - UI のラベル-値対応（値を直接書くので）
  - UI の排他/カスケードロジック（UI 経由しないので発火しない）
  - ビジュアル・レスポンシブ

### L2: Chrome UI 自動テスト（自動・スポット）

- **手段**: Chrome 拡張（`mcp__claude-in-chrome__*`）
- **実行頻度**: スポット実行（手動起動）
- **検証対象**:
  - 排他関係（例: `ratio` 設定 → `minHeight` が非表示 / 内部クリア）
  - 条件付き表示（例: `maxWidth` 設定 → ツールバーに `blockPosition` 出現）
  - ラベル ↔ 値の対応（ドロップダウン・ラジオ・チップの全選択肢をクリックし、対応する値が保存されるか）
  - 操作順序（プリセット → カスタム → プリセット などの切り替え整合性）
  - 複雑 UI（FocalPointPicker、ColorPalette、Media ライブラリ、RichText ツールバー制御等）
- **得意**:
  - 実 UI 経由の動作検証
  - onChange ハンドラ内の派生ロジック検証
- **不得意**:
  - 時間がかかる（1 件 7〜15 ツールコール）
  - ブラウザフォーカスに依存（Chrome 拡張の制約）

### L3: 手動確認（人間の目視）

- **手段**: ブラウザで開いて目視
- **実行頻度**: リリース前、examples HTML 作成時、マニュアル作成時
- **検証対象**:
  - フロント見た目（色・サイズ・余白・位置）
  - レスポンシブ挙動（実機ビューポート切替）
  - 他のブロック・テーマとの相互作用
- **得意**:
  - 最終的な見た目判断
  - 想定外の視覚不具合検出

## 責任分担表

各検証項目をどの層で扱うかの目安。

| 検証内容 | L1 fixture | L2 Chrome UI | L3 手動 |
|---|---|---|---|
| 属性 → HTML 出力の正当性 | ✅ 主担当 | - | - |
| parse/serialize 往復検証（保存で壊れない） | ✅ 主担当 | △ 最終確認 | - |
| ドロップダウン/ラジオ/チップの **全選択肢網羅** | ✅ 値レベル | ✅ ラベル↔値対応 | - |
| 色（プリセット / カスタム） | ✅ 属性レベル | △ ラベル対応確認 | - |
| フォントサイズ（プリセット + 直接指定 px/em） | ✅ 主担当 | - | - |
| 余白・枠線 ショートハンド（1箇所/2箇所/3箇所/4箇所） | ✅ 主担当 | - | - |
| デバイス別値（desktop/tablet/mobile 混在） | ✅ 属性・CSS 変数レベル | - | ✅ 実機ビューポート |
| boolean トグル / URL | ✅ 主担当 | - | - |
| **排他関係**（設定 A → 設定 B 非表示/クリア） | - | ✅ 主担当 | - |
| **条件付き表示**（UI の出現・消失） | - | ✅ 主担当 | - |
| **操作順序**（切り替え・リセットの整合性） | - | ✅ 主担当 | - |
| **複雑 UI**（Media Picker、FocalPointPicker 等） | - | ✅ 主担当 | - |
| RichText フォーマット適用（太字・リンク等） | △ HTML レベル | ✅ UI レベル | - |
| フロント見た目 | - | - | ✅ 主担当 |
| レスポンシブ挙動（実機ビューポート） | △ CSS 変数出力まで | - | ✅ 主担当 |
| ブロック複製・深いネスト | ✅ 属性構造レベル | △ UI 挙動 | - |

## ファイル構成

各ブロックのフォルダ内に `test-results/` サブフォルダを作成する。

```
src/blocks/block-library/[block-name]/
└── test-results/
    ├── spec.md         # L1/L2/L3 共通のテスト仕様書（Git 管理・永続）
    └── operation.md    # L2 セッション実行ログ（Git 管理外・.gitignore 対象）
```

L1 fixture の格納先は `test/integration/fixtures/blocks/` 配下（既存の仕組みに従う）。

`operation.md` は `.gitignore` で除外（`src/blocks/block-library/*/test-results/operation.md`）。

## テスト仕様書（spec.md）

### 作成タイミング

各ブロックの **examples HTML 作成直後 → 操作テスト着手前** に作成する。examples HTML の見出しツリーが spec.md のベースになる。

### 記載項目

各ブロックの仕様に合わせて具体化する。1 ファイル内に L1 / L2 / L3 すべてのテスト項目を記載する。

```markdown
# [ブロック名] 操作テスト仕様

## テスト方針
- L1: fixture-based integration test（全パターン網羅・CI 自動）
- L2: Chrome UI 自動テスト（排他・ラベル対応・条件表示・複雑 UI）
- L3: 手動確認（フロント見た目・レスポンシブ挙動）

運用ルールは docs/block-operation-test-guideline.md を参照。

## テスト対象の設定一覧
- パネル1（設定項目A / 設定項目B / ...）
- パネル2（...）
...

## 排他関係・条件付き表示
| 条件 | 影響 |
|---|---|
| [設定X] 設定あり | [設定Y] 非表示 |
...

## RichText ツールバー制御（該当あれば）
| 対象 | 制御 | 期待動作 |
|---|---|---|
...

## デバイス別テスト対象
- 対象設定（レスポンシブ対応のものだけ列挙）
- 各対象について: desktop のみ / mobile+desktop / 全3デバイス別値

---

## L1 fixture テストパターン（全パターン網羅）

### パネル1
- [ ] ystdtb__[block]__[panel]__[setting]__[variant]
...

### 代表的な組み合わせパターン
- [ ] ystdtb__[block]__combo__[シナリオ名]
...

---

## L2 Chrome UI テストパターン（絞り込み）

### 排他関係
- [ ] [テスト項目]

### ラベル-値対応（ドロップダウン・ラジオ・チップ等）
- [ ] [コントロール名]: 全選択肢クリック → 対応する値保存

### 条件付き表示
- [ ] [設定 X 時に UI が変わること]

### 複雑 UI
- [ ] [Media Picker / FocalPointPicker 等]

### 操作順序（切り替え・リセット）
- [ ] プリセット → カスタム → プリセット 切り替え整合性

### RichText フォーマット・ツールバー制御
- [ ] 太字・斜体等の基本フォーマット適用
- [ ] 無効化されている機能が表示されないこと

---

## L3 手動確認チェックリスト

### フロント見た目
- [ ] examples HTML をエディターに貼り付け、全パターンの見た目を目視確認

### レスポンシブ挙動
- [ ] 対象設定の各ビューポートでの表示確認

### 検証エラー・コンソールエラー
- [ ] examples HTML ペースト → 保存 → 再読込 で検証エラーが出ないこと
- [ ] コンソールエラーが無いこと

---

## 意地悪パターン（粗探し観点）
- このブロック固有の意地悪観点
- 共通の意地悪観点は docs/block-operation-test-guideline.md を参照
```

**重要**: spec.md は Claude による自動更新をしない。spec.md は「テスト仕様（繰り返し実行される検証項目）」として使い、セッションごとの進捗や結果は operation.md 側に記録する。仕様変更があった場合のみ、ユーザー承認のもとで spec.md を更新する。

## L1: fixture-based integration test

### 命名規則

既存の `{ブロック名スラッシュを__に変換}__{パターン名}.html` を踏襲しつつ、構造化する。

```
ystdtb__{block}__{panel}__{setting}__{variant}.html
```

例:
```
ystdtb__banner-link__link__url-external.html
ystdtb__banner-link__link__new-tab-on.html
ystdtb__banner-link__bg-color__preset-blue.html
ystdtb__banner-link__bg-color__custom-hex.html
ystdtb__banner-link__ratio__16-9.html
ystdtb__banner-link__padding__shorthand-all-32.html
ystdtb__banner-link__padding__shorthand-4corners.html
ystdtb__banner-link__font-size__px-24.html
ystdtb__banner-link__font-size__em-1-5.html
ystdtb__banner-link__font-size__responsive-desktop-mobile.html
ystdtb__banner-link__combo__photo-banner.html
ystdtb__banner-link__combo__simple-card.html
```

命名のポイント:
- `block` は block.json の name（スラッシュは `__` に）
- `panel` は spec.md のパネル名（短い英語スラッグ）
- `setting` は設定項目の英語名
- `variant` は具体値（`preset-blue` / `custom-hex` / `px-24` / `em-1-5` 等）
- deprecated 変換テストは従来通り `__deprecated-` を含める

### 作成パターンのルール

パターン生成は L2 Chrome UI テストと同じルールを流用する（責任分担表の L1 列に ✅ / △ がある項目）。

| 項目 | ルール |
|---|---|
| ドロップダウン/ラジオ/チップ | **全選択肢を個別 fixture で** |
| 色 | プリセット 1〜2 個 + カスタム hex 1 個 |
| フォントサイズ | プリセット 1 個 + 直接指定 px 1 個 + em 1 個 |
| 余白・枠線 ショートハンド | 一括 / 4 箇所別 / 2 箇所（上下・左右）/ 3 箇所 の 4 fixture |
| デバイス別値 | desktop 単独 / desktop+mobile / 全 3 デバイス の 3 fixture |
| boolean | true / false の 2 fixture |
| URL | 内部 / 外部 / 相対 の 3 fixture |

加えて「代表的な組み合わせパターン」を 5〜10 個（examples HTML の組み合わせ例を流用）。

### fixture 作成ワークフロー

```
1. spec.md の L1 セクションに fixture 名一覧を列挙（ユーザーと合意）
2. エディターでブロック挿入 → 目的の設定を適用 → 「コードエディター」モードで HTML をコピー
3. `test/integration/fixtures/blocks/` に .html ファイルとして保存
4. npm run fixtures:generate で期待値ファイル自動生成
5. 生成された .json をレビュー（isValid: true になっているか、属性が想定通りか）
6. npm run test:integration で全 fixture が通ることを確認
```

詳細は [testing.md](testing.md#integration-テストfixture-based-test) を参照。

## L2: Chrome UI 自動テスト

### セッション開始フロー

```
1. ユーザー: 「[ブロック名] の L2 テスト開始。編集URL: ○○」
2. Claude: tabs_context_mcp で現状把握
3. Claude: 既存タブを該当 URL へ navigate
4. Claude: src/blocks/block-library/[block-name]/test-results/spec.md の L2 セクションを読み込む
5. Claude: テスト開始前のクリーンアップ（後述）
6. Claude: 当セッションの実施範囲を宣言（L2 のサブセクション単位）
7. ユーザー: 承認 or 調整
8. Claude: サブセクション単位でまとめて操作 → まとめて保存・再読込・検証 → operation.md に追記
9. Claude: テスト完了後のクリーンアップ
10. Claude: 完了時、サマリと発見した問題を報告
```

### テスト開始・完了時のクリーンアップ

**テスト開始時**: 本文（エディターコンテンツ）が完全に空の状態にする
- 既存ブロックがあればすべて削除してから保存する
- 前回のセッションの残骸や他のテストブロックが残っていると検証に影響するため

**テスト完了時**: 本文を再度完全に空の状態に戻す
- テストで挿入したブロックをすべて削除
- 保存して次回セッションの開始時にきれいな状態で始められるようにする

**JS で全ブロック削除**:
```js
wp.data.dispatch('core/block-editor').resetBlocks([]);
```

### テストブロックの準備（必須）

テスト対象のブロックを挿入したら、**各設定パネルのテストを始める前に**以下を満たした状態にする。空のままテストすると実利用状況と乖離する。

#### テキスト入力領域（RichText）

すべての RichText に何らかのテキストを入力。短いダミー文言で可（例: 「メインテキスト」「サブテキスト」）。

RichText フォーマットの検証:
1. 太字・リンク等の基本フォーマット適用 → 保存 → 再読込で検証エラーが出ないこと
2. ツールバー制御（`allowedFormats` / `withoutInteractiveFormatting` 等）の確認
3. 同じ設定の RichText が複数ある場合は代表 1 つで OK

#### インナーブロック（InnerBlocks）

少なくとも 1 つブロックを追加した状態に。許容ブロックが限定 → 適切なブロック、何でも可 → 段落ブロック、親子構成 → 子ブロック 1 つ以上。

### 操作ルーチン（サブセクション単位でまとめて）

**サブセクション内で複数設定をまとめて変更 → 最後にまとめて保存・再読込・検証**する。個別 1 つずつ保存・再読込はしない（L1 fixture で個別パターンは担保されているため）。

```
1. エディターで対象ブロックを選択
2. サブセクション内の全設定パターンを順次適用
   各適用後に属性レベルで JS 確認（排他・ラベル対応等）
3. 最後に「更新」ボタンで保存
4. ページを再読込
5. 最終状態の属性が永続化されているか確認
6. 必要ならプレビューで DOM・スタイル確認
7. 結果を operation.md に追記（各パターン 1 行）
```

### 結果の書き込みタイミング（必須）

**サブセクション単位の検証が終わったら、operation.md に追記**する。セッション終了時の一括書き込みはしない。

理由:
- セッション途中で中断が入っても、そこまでの結果が残る
- ユーザーがリアルタイムで進捗・結果を確認できる
- 発見した問題の原因追跡がしやすい

### フロント確認のフロー（必要な場合のみ）

L2 ではフロント見た目の細かい検証は L3 に委ねる。ただし以下のケースは L2 内で確認:
- DOM 構造が変わる排他関係（例: ratio 設定で `.ystdtb-ratio__inner` が付く）
- CSS 変数・data 属性の出力確認
- コンソールエラー有無

```
1. 設定保存後、エディターの「プレビュー」ボタンをクリック
2. 新規タブまたは既存プレビュータブに navigate
3. read_page / javascript_tool で DOM・スタイル確認
4. read_console_messages でコンソールエラー確認
5. 編集画面タブに戻る（タブは閉じない）
```

### 問題発生時の扱い

| 問題 | 対処 |
|---|---|
| 貼り付け HTML と save() 出力の不一致（検証エラー） | **ブロック実装の問題**。operation.md に記録して報告のみ |
| 保存に失敗（500 エラー等） | operation.md に記録して報告 |
| コンソールエラー | スタックトレースも含めて operation.md に記録して報告 |
| Chrome 拡張の click 発火不良 | 手動確認に回す旨を記録（実装問題ではない） |

### 結果の記録（operation.md）

```markdown
# [ブロック名] 操作テスト結果（L2）

## YYYY-MM-DD（セッション）

### 環境
- URL: http://example-test.local/wp-admin/post.php?post=123&action=edit
- ブラウザ: Chrome
- テーマ: yStandard
- WP バージョン: 6.X
- プラグイン: vX.X

### テスト結果サマリ
- 実施: XX 件
- OK: XX
- NG: XX
- 対象外: XX
- 保留: XX

### 詳細
| カテゴリ | 対象 | パターン | 結果 | 備考 |
|---|---|---|---|---|
| 排他関係 | ratio × minHeight | ratio 設定 → minHeight 非表示 | ✅ | |
| ラベル対応 | 縦横比ドロップダウン | 全 6 選択肢 | ✅ | 全値が対応する slug で保存 |
| 条件付き表示 | maxWidth 設定 → blockPosition 出現 | | ✅ | |
...

### 発見した問題
- **P001**: [概要]
  - 再現手順: ...
  - 該当ファイル: save.tsx:L88
  - 関連: ...

---

## YYYY-MM-DD（前回セッション）
...
```

**列の意味**:
- `カテゴリ`: 排他関係 / ラベル対応 / 条件付き表示 / 複雑 UI / 操作順序 / RichText など、L2 の検証カテゴリ
- `対象`: どの設定・コントロールを対象にしたか
- `パターン`: 具体的な操作内容

### 記録ルール
- 新しいセッションの結果を**上**に追記（逆時系列）
- URL はそのセッションで使ったものをそのまま記載
- NG があった場合は「発見した問題」セクションに詳細を記載

## L3: 手動確認

spec.md の L3 セクションのチェックリストを、**リリース前 or マニュアル作成時**に人間が目視で確認する。

### 確認の観点

- フロント見た目（色・サイズ・余白・位置・タイポ）
- レスポンシブ挙動（実機で desktop / tablet / mobile ビューポートを切り替え）
- 他のブロックやテーマとの干渉がないか
- 想定外の視覚崩れ・アニメーション不具合

### 確認方法

- examples HTML をエディターに貼り付けてフロント閲覧
- 実機ブラウザで各ビューポートに切り替え
- 結果は別途メモ（operation.md には書かない）

## テストパターン作成の方針（L1/L2 共通）

| 項目 | 方針 |
|---|---|
| 選択肢系（ドロップダウン等） | **全パターン網羅**（L1: 全値 fixture、L2: 全値クリック） |
| 色（カラーパレット） | プリセット + 直接指定（hex）の両方。全色不要 |
| 文字色 + 背景色の組み合わせ | **文字のみ / 背景のみ / 両方 の 3 パターン** |
| フォントサイズ | プリセット + 直接指定。**単位は px と em 両方** |
| 余白・枠線（ショートハンド系） | **一括 / 4 箇所 / 2 箇所（上下・左右）/ 3 箇所（上・左右・下）** |
| デバイス別値 | **各デバイス単独 + 複数デバイス混在** |
| boolean トグル | true / false 両方 |
| URL 入力 | 内部リンク / 外部リンク / プロトコル違い（https / 相対パス） |

## 「粗探しのプロ」観点（意地悪パターン）

共通で押さえるべき観点:

- **極端な値**: 0、負値、超巨大値（9999px など）、0.01 のような極小値 → L1 fixture 向き
- **空値・初期値**: 空白のみ入力 → L1 fixture 向き
- **特殊文字**: テキスト欄に改行、絵文字、`<>&` などの HTML 特殊文字、バックスラッシュ → L1 fixture 向き
- **操作順序の切り替え**: プリセット色 → カスタム色 → プリセット色 → **L2 向き**
- **排他関係の境界**: → **L2 向き**
- **デバイス別 3 値バラバラ**: → L1 fixture 向き
- **リセット操作の完全性**: → **L2 向き**
- **ブロック複製後の独立性**: → L1 fixture（複製 HTML）+ L2（UI 操作）
- **深いネスト**: → L1 fixture 向き

ブロック固有の観点は spec.md に追加する。

## 役立つ JS snippet 集

`javascript_tool` で実行できる、L2 テストの品質向上・速度アップに役立つ snippet。

### ブロック一覧と検証状態の取得

```js
wp.data.select('core/block-editor').getBlocks()
  .map(b => ({
    name: b.name,
    clientId: b.clientId,
    isValid: b.isValid,
    validationIssues: b.validationIssues ?? []
  }))
```

### 対象ブロックの属性取得

```js
// 先頭ブロック
wp.data.select('core/block-editor').getBlocks()[0].attributes

// 選択中のブロック
const clientId = wp.data.select('core/block-editor').getSelectedBlockClientId();
wp.data.select('core/block-editor').getBlock(clientId)?.attributes
```

### 保存状態の確認

```js
({
  isSaving: wp.data.select('core/editor').isSavingPost(),
  didSave: wp.data.select('core/editor').didPostSaveRequestSucceed(),
  isDirty: wp.data.select('core/editor').isEditedPostDirty()
})
```

`isDirty: false` かつ `didSave: true` なら保存成功。

### 全ブロック削除（クリーンアップ用）

```js
wp.data.dispatch('core/block-editor').resetBlocks([]);
```

### 属性一括設定（前提条件セットアップ用）

**L2 テスト対象そのものを検証する目的では使わない**（UI onChange が発火しないため、排他/カスケード検証が無効）。前提条件として素早く属性をセットしたい場面でのみ使用。

```js
const clientId = wp.data.select('core/block-editor').getBlocks()[0].clientId;
wp.data.dispatch('core/block-editor').updateBlockAttributes(clientId, {
  customBackgroundColor: '#3b82f6'
});
```

### 保存後の HTML ソース取得

```js
wp.blocks.serialize(wp.data.select('core/block-editor').getBlocks())
```

## GIF 録画について

**基本不要**。GIF は 10〜30 フレームの画像として取り込まれ、1 操作あたり数万トークン消費、動作も遅くなる。

特定のバグの再現動画が必要な場合だけスポットで利用する。

## 関連ドキュメント

- [block-examples-guideline.md](block-examples-guideline.md) — examples HTML の作成ガイドライン（spec.md のベースになる）
- [testing.md](testing.md) — unit / integration テスト全般（L1 fixture の実行・追加手順）
- [v2-block-testing.md](v2-block-testing.md) — v2 リリースに向けたブロックテストの対象・進捗管理
