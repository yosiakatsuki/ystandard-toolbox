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
npm run test:unit             # unit テストのみ
npm run test:unit:component   # コンポーネント単体テスト
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

## integration テスト（fixture-based test）

Gutenberg コアの [`test/integration/full-content`](https://github.com/WordPress/gutenberg/tree/trunk/test/integration/full-content) を参考にした、ブロックの parse / serialize / validate / migrate の往復検証テスト。

### 検証する内容

`test/integration/fixtures/blocks/` 配下の以下の4ファイルを 1 セットとして比較する:

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

### fixture ファイル名規則

```
{ブロック名スラッシュを__に変換}__{パターン名}.html
```

例:

- `ystdtb__slider__deprecated-basic.html` — slider ブロックの deprecated 基本パターン
- `ystdtb__slider__deprecated-ratio.html` — slider ブロックの deprecated・アスペクト比指定パターン
- `ystdtb__slider__deprecated-height-responsive.html` — slider ブロックの deprecated・レスポンシブ高さパターン

deprecated 変換のテストは basename に `__deprecated-` を含めること。`full-content.test.js` がこのパターンで判定し、deprecated 変換時の console 警告を抑制する。

### 新しいテストパターンを追加する手順

1. **入力 HTML を作成**

   `test/integration/fixtures/blocks/{ブロック名}__{パターン名}.html` を作成し、検証したいブロックの保存形式 HTML を貼り付ける。

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

## ブロックの設定例・使用例（examples）

ブロックの全設定パターンをエディターに貼り付けて表示確認するための HTML ファイル群。

詳細は [CLAUDE.md](../CLAUDE.md#ブロック設定例使用例examples) の「ブロック設定例・使用例（examples）」セクションを参照。

### テスト用画像URL

examples / fixtures で画像ブロックを含める場合、以下のURLを使用する。自前のデモサイトにホストされており、ローカルへのダウンロード・添付不要で HTML 貼り付けだけで画像表示の確認ができる。

- `https://wp-ystandard.com/wp/wp-content/uploads/2022/11/wugqj4whqka.jpg`
- `https://wp-ystandard.com/wp/wp-content/uploads/2022/08/tviv23vcuz4.jpg`
- `https://wp-ystandard.com/wp/wp-content/uploads/2022/05/image-clock.jpg`
