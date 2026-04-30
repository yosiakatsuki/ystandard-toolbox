# テスト

yStandard Toolbox のテスト全般のドキュメント。

## 構成

```
test/
├── unit/                # コンポーネント・pure function 単体テスト用
│   ├── component.config.js
│   └── setup-tests.js
└── integration/         # Gutenberg fixture-based テスト用
    ├── integration.config.js
    ├── setup-tests.js
    ├── fixtures/
    │   ├── blocks/      # 各ブロックの fixture セット
    │   ├── index.js
    │   └── utils.js
    ├── full-content/
    │   └── full-content.test.js
    └── helpers/
        └── register-blocks.js
```

unit テスト本体は `src/` 配下に `*.test.[jt]s(x)` として配置する。integration テストは `test/integration/` に集約する。

## 実行コマンド

```bash
npm run test                  # すべてのテスト（unit + integration）
npm run test:unit             # unit テストのみ（JS unit + PHP unit）
npm run test:unit:component   # コンポーネント単体テスト
npm run test:unit:php         # PHPUnit（wp-env 経由）
npm run test:integration      # integration テスト（fixture-based）
npm run fixtures:generate     # 期待値ファイル未生成のものを自動生成
npm run fixtures:regenerate   # 期待値ファイルを全削除して再生成
```

## unit テスト

`test/unit/component.config.js` を Jest 設定として使う。

- **対象**: pure function の単体テスト、React コンポーネントのレンダリング・動作テスト
- **書き方**: テストファイルは該当ファイルと同階層に `test/` ディレクトリを作成し、`*.test.ts(x)` で配置する
- **インポートパス**: 相対パス（`../index`）を使用
- **モック**: `test/unit/setup-tests.js` で `@wordpress/components`, `@wordpress/block-editor` 等を最小スタブ化している

例:

```
src/aktk-block-components/utils/number/
├── to-int.ts
└── test/
    └── to-int.test.ts
```

## PHPUnit テスト（オプトイン）

`phpunit/` 配下に PHP ロジック単体テストを格納する。WordPress の `WP_UnitTestCase` ベース。

### 適用方針

三層テスト戦略（L1 fixture / L2 Playwright UI / L3 手動）の枠外で、**PHP ロジックが複雑なブロックに限ってオプトインで追加する**。全ブロック必須ではない。

判定基準:

- `render_callback` 内で投稿クエリ・テンプレート変数組み立て・条件分岐・属性正規化が多数含まれる
- 出力 HTML（クラス / 要素 / inline style）の組み合わせが多く、目視（L3）だけでは網羅検証が難しい
- 過去にバグの実績があり、再発防止が必要

### 実行コマンド

```bash
npm run test:unit:php     # wp-env 経由で PHPUnit 実行
```

`wp-env start` が事前に必要。

### テスト方針

ブロックの `render_callback($attributes)` の戻り値（HTML 文字列）を `DOMDocument` + `DOMXPath` で解析し、以下を網羅検証する:

- 特定の CSS クラスの有無（wrapper class / `is-{listType}` / `col-mobile--N` 等）
- 特定の要素の有無（`<figure>` / `<p class="ystdtb-posts__excerpt">` 等）
- inline style の文字列（CSS カスタムプロパティ等）
- 件数（`<li>` の出現回数）
- 並び順（タイトル文字列の出現順序）

投稿は `$this->factory->post->create_many()` で生成。モバイル切替は `wp_is_mobile` フィルターで制御。

### ファイル配置

ブロック単位のテストは `phpunit/blocks/` 配下にまとめる（PHPUnit の `<directory>` 設定は再帰的にスキャンするため、`phpunit.xml.dist` 側の追加設定は不要）。

```
phpunit/
├── bootstrap.php
├── blocks/
│   └── test-{block-name}.php     # ブロック単位のテスト
└── data/                          # フィクスチャデータ
```

### spec.md との対応

PHPUnit テストを追加するブロックは、`test-results/spec.md` に「L0: PHPUnit テスト」セクションを設けて、テスト対象メソッド・ケース一覧・出力検証ポイントを記述する。spec.md を読めば PHPUnit テストの意図が把握できる状態にする。

## integration テスト（fixture-based test）

Gutenberg コアの [`test/integration/full-content`](https://github.com/WordPress/gutenberg/tree/trunk/test/integration/full-content) を参考にした、ブロックの parse / serialize / validate / migrate の往復検証テスト。

### 検証する内容

`test/integration/fixtures/blocks/{block}/` 配下の以下の4ファイルを 1 セットとして比較する:

| ファイル | 内容 |
|---|---|
| `{basename}.html` | 入力 HTML（投稿に保存されたブロック） |
| `{basename}.parsed.json` | パーサーの生出力 |
| `{basename}.json` | parse + migrate 後のブロック構造 |
| `{basename}.serialized.html` | 再シリアライズ後の HTML |

これにより以下が一度に検証される:

- HTML を正しく parse できるか
- deprecated migrate が正しく動くか
- save 関数が正しい HTML を生成するか
- 再 parse しても破綻しないか

### fixture ディレクトリ構成

fixture はブロックごとにサブディレクトリを切って格納する。見通し確保のための慣習。

```
test/integration/fixtures/blocks/
├── banner-link/
├── box/
├── dl/             ← description-list 系（basename の `ystdtb__dl__` 接頭辞に合わせる）
├── faq/
├── slider/
├── sns-share/
├── timeline/
└── {block}/
```

- ディレクトリ名は basename の `ystdtb__{block}__` から自動判定される（`test/integration/fixtures/utils.js`）
- 新しいブロックを追加する場合、ディレクトリが存在しなければ `fixtures:generate` 実行時に自動作成される

### fixture ファイル名規則

```
{ブロック名スラッシュを__に変換}__{パターン名}.html
```

ファイル名はディレクトリ分割後も変えない（既存の命名規則と git 履歴を保つため）。

例:

- `slider/ystdtb__slider__deprecated-basic.html` — slider ブロックの deprecated 基本パターン
- `slider/ystdtb__slider__deprecated-ratio.html` — slider ブロックの deprecated・アスペクト比指定パターン
- `slider/ystdtb__slider__deprecated-height-responsive.html` — slider ブロックの deprecated・レスポンシブ高さパターン

deprecated 変換のテストは basename に `__deprecated-` を含めること。`full-content.test.js` がこのパターンで判定し、deprecated 変換時の console 警告を抑制する。

### 新しいテストパターンを追加する手順

1. **入力 HTML を作成**

   `test/integration/fixtures/blocks/{ブロックディレクトリ}/{ブロック名}__{パターン名}.html` を作成し、検証したいブロックの保存形式 HTML を貼り付ける。

2. **対象ブロックを `register-blocks.js` に登録**

   `test/integration/helpers/register-blocks.js` に対象ブロックの登録処理が含まれていることを確認する。なければ追加する。

   ```js
   import metadata from '../../../src/blocks/block-library/{ブロック名}/block.json';
   import save from '@aktk/blocks/block-library/{ブロック名}/save';
   import deprecated from '@aktk/blocks/block-library/{ブロック名}/deprecated';

   registerOnce( metadata, { save, deprecated } );
   ```

   注意: `block.json` の import は `babel-plugin-inline-json-import` の制約のため、エイリアスでなく相対パスで書く。

3. **期待値ファイルを自動生成**

   ```bash
   npm run fixtures:generate
   ```

   `.json` / `.parsed.json` / `.serialized.html` の3ファイルが自動生成される。

4. **期待値の中身を確認**

   生成された `.json` を開き、`isValid: true` になっているか、attributes が想定通りに migrate されているかを目視確認する。

5. **再実行で安定動作を確認**

   ```bash
   npm run test:integration
   ```

### 期待値ファイルの再生成

migrate ロジック等を変更した場合は期待値ファイルを更新する必要がある。

```bash
npm run fixtures:regenerate
```

このコマンドは既存の期待値ファイルをすべて削除してから再生成する。生成後、git diff で差分を確認すること。

### ブロック登録時の注意

integration テスト用のブロック登録（`register-blocks.js`）は、edit.tsx の依存（`@wordpress/editor` 等）を引き込まないために、`block.json` + `save` + `deprecated` のみを直接 `registerBlockType` する形をとっている。`edit` はダミー関数で渡している。

これは「parse / migrate / serialize / validate のために必要な最小限」だけを登録する手法で、テスト環境を軽量に保つための工夫。

## L1 操作テスト fixture の作成

ブロックの全設定パターンを network なしで CI 検証するための fixture 作成ワークフロー。[block-operation-test-guideline.md](block-operation-test-guideline.md) の L1 層で使われる。

### 命名規則

```
ystdtb__{block}__{panel}__{setting}__{variant}.html
```

- `block`: block.json の name（スラッシュを `__` に変換）
- `panel`: spec.md のサイドバーパネル名を英語スラッグ化（例: `link` / `bg-color` / `max-width`）
- `setting`: パネル内の設定項目名（例: `url` / `new-tab` / `font-size`）
- `variant`: 具体値（例: `preset-blue` / `custom-hex` / `px-24` / `em-1-5` / `responsive-desktop-mobile`）

例（格納先サブディレクトリ付き）:
```
banner-link/ystdtb__banner-link__link__url-external.html
banner-link/ystdtb__banner-link__bg-color__preset-blue.html
banner-link/ystdtb__banner-link__ratio__16-9.html
banner-link/ystdtb__banner-link__padding__shorthand-4corners.html
banner-link/ystdtb__banner-link__main-text__font-size-em-1-5.html
banner-link/ystdtb__banner-link__combo__photo-banner.html
```

deprecated 変換テストは従来通り basename に `__deprecated-` を含める（`full-content.test.js` が判定に使う）。

### カテゴリ別パターン作成ルール

spec.md の L1 セクションで列挙する fixture パターン生成ルール:

| カテゴリ | fixture 作成数の目安 |
|---|---|
| ドロップダウン/ラジオ/チップ | **全選択肢を個別 fixture で**（例: 縦横比 6 選択肢 → 6 fixture） |
| 色 | プリセット 1〜2 個 + カスタム hex 1 個 |
| フォントサイズ | プリセット 1 個 + 直接指定 px 1 個 + em 1 個 |
| レスポンシブ設定 | desktop 単独 / desktop+mobile / 全 3 デバイス の 3 fixture |
| 余白・枠線 ショートハンド | 一括 / 4 箇所別 / 2 箇所（上下・左右）/ 3 箇所（上・左右・下）の 4 fixture |
| boolean トグル | true / false の 2 fixture |
| URL | 内部 / 外部 / 相対 の 3 fixture |

加えて、各ブロックで **実用的な組み合わせパターン 5〜10 個** を `combo` として fixture 化する。examples HTML の「設定の組み合わせ例」セクションを流用できる。

### fixture 大量作成の効率化

1 ブロックあたり 50〜100 fixture となるため、以下の手法で効率化する。

#### 方針 A: examples HTML から抽出（推奨）

`src/blocks/block-library/[block-name]/examples/all-variations.html` は既に多くのバリエーションを含んでいる。ここから個別の `<!-- wp:xxx ... --> ... <!-- /wp:xxx -->` 単位で抜き出して fixture 化するのが最も効率的。

手順:
1. examples HTML を開く
2. 各 `<!-- wp:{blockname} ... /-->`（自己閉じ）または `<!-- wp:{blockname} -->...<!-- /wp:{blockname} -->` のブロック単位を切り出す
3. spec.md の L1 セクションの fixture 名に対応する形で個別ファイルへ保存

#### 方針 B: エディター経由（examples に無いパターン）

examples に無い fixture（排他境界など）はエディターで個別に作る:
1. ブロック挿入 → 目的の設定を適用
2. 「コードエディター」モードで HTML をコピー
3. `test/integration/fixtures/blocks/{ブロックディレクトリ}/` に保存

### fixture 作成ワークフロー

1. **spec.md の L1 セクションで fixture 名一覧を確定**（ユーザーと合意）
2. **examples HTML から抽出 or エディターで作成**
3. **`test/integration/fixtures/blocks/{ブロックディレクトリ}/` に `.html` として保存**（ディレクトリがなければ作成）
4. **対象ブロックが `register-blocks.js` に登録されていることを確認**（なければ追加）
5. **`npm run fixtures:generate` で期待値ファイル自動生成**
6. **生成された `.json` をレビュー**:
   - `isValid: true` になっているか
   - attributes が想定通りに保存されているか
   - `validationIssues` が空か
7. **`npm run test:integration` で全 fixture が通ることを確認**
8. **git コミット**

### fixture 作成時の注意点

- **入力 HTML はブロックエディターが出力する save() 形式に厳密に一致させる**。少しでもズレると validation エラーになる
- examples HTML から抽出時、親文脈の改行やインデントは除去する
- fixture は「1 ブロック 1 ファイル」が原則（複数ブロックを含む fixture は `combo` 系のみ）
- コメント `<!-- wp:... -->` は絶対に改変しない（属性シリアライズに使われる）

### トラブルシューティング

| 症状 | 対処 |
|---|---|
| `isValid: false` で生成される | 入力 HTML が save() 出力と不一致。エディターで該当設定を作り直して HTML をコピーし直す |
| `validationIssues` に差分が出る | 属性値と innerHTML の対応が崩れている。ブロックの attribute source を確認 |
| ブロックが認識されない | `register-blocks.js` に該当ブロックが登録されていない |
| deprecated 警告が出る | basename に `__deprecated-` を含めていない |

### エラー・warning 発生時の運用

`npm run test:integration` / `npm run fixtures:generate` でテスト失敗や
Block validation warning が出た場合、**即座に修正コードを書かない**。
まず以下を提示して方針の合意を取る:

1. 失敗テスト名とエラーメッセージの要点
2. 原因の見立て（save.tsx 出力との差異、期待値ファイルの古さ 等）
3. 修正案と影響範囲

原因の読み違いや、修正パスが複数あるケースがあるため、
手を動かす前に確認を挟む。unit テストや他の自動テストでも同様。

### spec.md との対応

各ブロックの spec.md L1 セクションにチェックリスト形式で fixture 名を列挙する。これが ToDo リスト兼ドキュメントになる。fixture 作成が完了したら spec.md のチェックボックスを更新するのは **行わない**（spec.md は仕様で、進捗管理は operation.md で行う。fixture 自体は `git ls-files test/integration/fixtures/blocks/` で存在確認可能）。

## ブロックの設定例・使用例（examples）

ブロックの全設定パターンをエディターに貼り付けて表示確認するための HTML ファイル群。

詳細は [docs/block-examples-guideline.md](block-examples-guideline.md) を参照。

### テスト用画像URL

examples / fixtures で画像ブロックを含める場合、以下のURLを使用する。自前のデモサイトにホストされており、ローカルへのダウンロード・添付不要で HTML 貼り付けだけで画像表示の確認ができる。

- `https://wp-ystandard.com/wp/wp-content/uploads/2022/11/wugqj4whqka.jpg`
- `https://wp-ystandard.com/wp/wp-content/uploads/2022/08/tviv23vcuz4.jpg`
- `https://wp-ystandard.com/wp/wp-content/uploads/2022/05/image-clock.jpg`

### テスト用動画URL

examples / fixtures で動画ブロック（`core/video`）を含める場合、以下のURLを使用する。

- `https://wp-ystandard.com/wp/wp-content/uploads/2020/12/top-movie.mp4`
