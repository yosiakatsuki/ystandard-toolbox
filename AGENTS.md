# AGENTS.md

このファイルは、Codex がこのリポジトリで作業するための引き継ぎメモです。

**重要**: ドキュメント・コメント・チャットは日本語で記述すること。

## プロジェクト概要

yStandard Toolbox は、無料 WordPress テーマ「yStandard」を拡張する商用プラグイン。
Gutenberg ブロック、デザイン設定、管理画面、ユーティリティ機能を提供する。

- WordPress: 6.1+
- PHP: 7.4+
- yStandard テーマ: 4.36.0+
- namespace: `ystandard_toolbox`
- 現在の主な作業文脈: v2 リリース準備

## リポジトリ状態の確認

作業開始時は、まず次を確認する。

```bash
git branch --show-current
git status --short
```

依存関係は通常 `node_modules/` と `vendor/` を使う。存在しない場合は `npm install` / `composer install` が必要。
wp-env は `.wp-env.json` で port `10020` を使用する。

## まず読むドキュメント

- `docs/v2-roadmap.md`: v2 リリースに向けた残タスクと進捗
- `docs/testing.md`: unit / integration / PHPUnit の構成と fixture 作成手順
- `docs/design-system.md`: Toolbox 側のデザイントークンと CSS 方針
- `docs/ystandard-design-system.md`: yStandard テーマ側の設計
- `docs/block-examples-guideline.md`: ブロック example 作成ルール
- `docs/block-operation-test-guideline.md`: UI 操作検証の共通ルール
- `docs/v2-block-testing.md`: v2 ブロック全体テストの対象・進捗

この `AGENTS.md` は単独で機能する作業ガイドとして維持する。外部エージェント専用ファイルが存在しても、必須ルールはここへ反映する。

## ディレクトリ構成

- `ystandard-toolbox.php`: プラグインメインファイル
- `inc/`: PHP バックエンド
- `src/blocks/block-library/`: v2 TypeScript ブロック
- `src/aktk-block-components/`: 共有コンポーネントライブラリ
- `src/plugin-settings/`: React 管理画面
- `src/sass/`: SCSS
- `blocks/posts/`: 残存レガシーブロック
- `build/`: ビルド済みアセット
- `test/`: Jest unit / integration
- `phpunit/`: WordPress PHPUnit

## 開発コマンド

```bash
npm run start                # wp-env 開始、DB/import、ブラウザ open
npm run start:env            # wp-env 開始、ブラウザ open
npm run stop                 # wp-env 停止
npm run watch                # 開発 watch
npm run build                # production build
npm run build:blocks:v2      # v2 ブロックのみ build
npm run lint                 # JS/CSS/PHP lint
npm run test                 # unit + integration
npm run test:unit:component  # JS/TS component unit
npm run test:integration     # Gutenberg fixture-based integration
npm run test:unit:php        # wp-env 経由 PHPUnit
npm run fixtures:generate    # 不足 fixture 生成
npm run fixtures:regenerate  # fixture 全再生成
npm run zip                  # 配布 zip 作成
```

`npm run start` や `npm run test:unit:php` は wp-env / Docker とネットワーク取得を伴う場合がある。

## 実装方針

- WordPress コア / Gutenberg の標準パターンを優先する。
- 非推奨 API や古い実装パターンは避け、可能な範囲で最新の WordPress / Gutenberg の手法に合わせる。
- 新規ブロックは `block.json` メタデータ駆動を基本にする。
- deprecated は WordPress 標準の `deprecated` 配列で管理する。
- テストは Gutenberg の fixture-based test に寄せる。
- 過剰な独自抽象は避け、既存のローカルパターンを優先する。
- WordPress コア準拠の方法がこのプロジェクトには過剰な場合は、推奨案・軽量な代替案・判断材料を整理して提案する。
- コード変更前に、機能ディレクトリ内の `DESIGN.md` 作成・更新が必要か確認する。
- PHP でインライン CSS を enqueue する場合は `ystandard_toolbox\Util\Text::minify()` を通す。
- レスポンシブ CSS を PHP 側で生成する場合は `Styles::add_media_query_only_mobile` / `only_tablet` / `over_desktop` を使う。

## コーディング規約

- WordPress Coding Standards に従う。
- ドキュメント・コメントは日本語で書く。
- TypeScript の型定義・interface 名・import セクションコメントは英語で書く。
- PHP は short array syntax を使う。
- CSS クラスは BEM を基本にし、プラグインのブロックは `ystdtb-` プレフィックスを使う。
- CSS カスタムプロパティは WordPress / yStandard と同じダブルハイフン形式にする。

### ドキュメント命名

1つのブロック内に同じ名前の設定が複数ある場合、ドキュメント上は対象要素名を前置する。

- 良い例: `BOX角丸`, `ラベル角丸`, `メインテキスト文字色`, `サブテキスト文字色`
- 避ける例: 単独の `角丸`, `文字色`

行番号だけで参照された場合でも、何の設定か分かる状態にする。

## TypeScript / React ルール

- import セクションコメントは英語のブロックコメントにする。
- `@wordpress/components` は直接使わず、原則 `@aktk/block-components/wp-controls/` のラッパーを使う。
- `@aktk/block-components/wp-controls/select-control` は存在しない。`@aktk/block-components/components/custom-select-control` を使う。
- ブロック側のコントロールは基本的に `BaseControl` でラップする。
- `src/aktk-block-components/` は複数プロジェクト共用。プラグイン固有ロジックを入れない。

import セクションコメントの例:

```tsx
import classnames from 'classnames';

/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/* Plugin Dependencies */
import { CATEGORY } from '@aktk/blocks/config';
```

`BaseControl` ラップの基本:

```tsx
<BaseControl>
	<UnitControl label={ __( 'サイズ', 'ystandard-toolbox' ) } />
</BaseControl>
```

ColorPalette などラベルが必要なコントロールは、外側の `BaseControl` と内側のコンポーネントの両方に label を渡す。

## ブロック開発

`src/blocks/block-library/` が v2 ブロックの主な配置場所。

主なブロック:

- 単体: `box`, `banner-link`, `parts`, `posts`, `sns-share`
- 親子: `slider` / `slider-item`
- 親子: `faq` / `faq-item`
- 親子: `timeline` / `timeline-item`
- 親子: `icon-list` / `icon-list-item`
- 親子: `description-list` / `description-list-dd-box` / `description-list-dd-simple` / `description-list-dl-column` / `description-list-dt`
- ブロックフック: `block-hook-hidden-by-size`

標準的なブロック構成:

```text
src/blocks/block-library/{block}/
├── block.json
├── index.tsx
├── index.php
├── edit.tsx
├── save.tsx
├── style.scss
├── style-editor.scss
├── types.ts
├── utils.ts
├── inspector-controls/
├── block-controls/
└── deprecated/
```

`index.tsx` の基本方針:

- `registerBlockType` で `block.json` の metadata を使う。
- `mergeDefaultAttributes( metadata.name, metadata.attributes )` で default attributes を統合する。
- `CATEGORY` は `@aktk/blocks/config` から import する。
- `COLORS` は `@aktk/block-components/config` から import する。
- `style.scss` は `index.tsx` で import する。
- エディター専用の `style-editor.scss` は `edit.tsx` 側で import する。

`index.php` の基本方針:

- namespace は `ystandard_toolbox`。
- サブ namespace は使わない。
- クラス名は `{Block_Name}_Block`。
- `BLOCK_NAME = 'ystdtb/{block-name}'` を定義する。
- `init` hook で `register_block_type( __DIR__ )` を実行する。
- singleton 形式の `get_instance()` を使う既存パターンに合わせる。

## CSS / デザイン

- Toolbox の CSS カスタムプロパティは `--ystdtb--` プレフィックスを使う。
- yStandard テーマ側の `--ystd--` トークンに依存しすぎず、テーマなしでも破綻しないフォールバックを持たせる。
- 色は `docs/design-system.md` のトークンを優先する。
- 不透明度付きの色は、可能なら `color-mix()` を使う。
- font-size は `rem` / `em`、line-height は単位なし、letter-spacing は `em` を基本にする。
- padding / margin / gap / border-width / box-shadow は原則 `px` を使う。
- SCSS のメディアクエリを新規に増やす前に、PHP 側のブレークポイント一元管理が必要な箇所か確認する。

## パスエイリアス

```text
@aktk/block-components/*  -> src/aktk-block-components/*
@aktk/blocks/*            -> src/blocks/*
@aktk/function/*          -> src/blocks/function/*
@aktk/components/*        -> src/blocks/components/*
@aktk/controls/*          -> src/blocks/controls/*
@aktk/utils/*             -> src/blocks/utils/*
@aktk/api                 -> src/blocks/api/index
@aktk/config/*            -> src/js/config/*
@aktk/helper/*            -> src/js/helper/*
@aktk/plugin-settings/*   -> src/plugin-settings/*
```

## テスト方針

- 小さな TS utility は該当ファイル近くの `test/*.test.ts` に unit を追加する。
- ブロックの保存形式・deprecated・migrate は `test/integration/fixtures/blocks/` の fixture-based test で見る。
- 複雑な PHP render logic は `phpunit/blocks/` に opt-in で追加する。
- fixture 追加・更新後は `.json` / `.parsed.json` / `.serialized.html` の差分を必ず確認する。

integration fixture の基本:

- 入力 HTML: `{basename}.html`
- parse 生出力: `{basename}.parsed.json`
- migrate 後構造: `{basename}.json`
- 再 serialize 結果: `{basename}.serialized.html`

deprecated 変換テストは basename に `__deprecated-` を含める。

fixture 名は次を基本にする。

```text
ystdtb__{block}__{panel}__{setting}__{variant}.html
```

fixture を追加した場合は `test/integration/helpers/register-blocks.js` に対象ブロックが登録されているか確認する。

## 注意点

- このファイルを Codex 向けの最上位作業ルールとして扱う。より詳細な設計・テスト手順は `docs/` 配下の該当文書を参照する。
- `library/plugin-update-checker/` は vendored library。通常は編集対象にしない。
- `build/`, `css/`, `js/` はビルド出力を含む。ソース変更時に必要な範囲だけ更新する。
- `node_modules/`, `vendor/`, `.wp-content/` は作業対象外。
- 既存の未コミット差分がある場合はユーザーの変更として扱い、勝手に戻さない。
