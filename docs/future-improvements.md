# 将来対応リスト

v2 リリース後など、後続のバージョンで対応したい改修・リファクタリング項目。
v2 リリースのブロッカーではないものをここに集約する。

リリース前の必須タスクは [v2-roadmap.md](v2-roadmap.md) を参照。

## 書き方

新しい項目を追加するときは以下のテンプレートに沿って記載する。

- **追加日**: 気づいた日付（YYYY-MM-DD）
- **優先度**: 低 / 中 / 高
- **対象**: 修正対象のファイル・コンポーネント
- **背景**: なぜ修正したいか
- **現状**: 現在の実装（必要に応じてコード抜粋）
- **修正案**: どう変えるか（必要に応じてコード抜粋）
- **影響範囲**: 関連するブロック・コンポーネント、要動作確認箇所
- **注意点**: ブラウザ対応・互換性・前提条件など

完了した項目は削除するか、`## 完了済み` セクションに移動する。

## 一覧

- [ratio コンポーネントの aspect-ratio 化](#ratio-コンポーネントの-aspect-ratio-化)
- [CSS カスタムプロパティ命名規則の統一（ブロックローカル変数のダブルハイフン化）](#css-カスタムプロパティ命名規則の統一ブロックローカル変数のダブルハイフン化)

---

## ratio コンポーネントの aspect-ratio 化

- **追加日**: 2026-04-07
- **優先度**: 低
- **対象**: `src/sass/component/ratio/_index.scss`

### 背景

現状の `.ystdtb-ratio` は `padding-top` + `position: absolute` のレガシー手法でアスペクト比を実現している。IE11 等の古いブラウザを切り捨てた現在は `aspect-ratio` プロパティに置き換えてシンプルにできる。

### 現状

```scss
.ystdtb-ratio {
	display: block;
	position: relative;
	width: 100%;

	&::before {
		content: "";
		display: block;
	}

	&.is-1-1::before {
		padding-top: #{(global.decimal-floor(math.div(1, 1), 2) * 100)}#{"%"};
	}
	// ...各比率ごとに padding-top を計算

	.ystdtb-ratio__inner {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: hidden;
	}
}
```

### 修正案

```scss
.ystdtb-ratio {
	display: block;
	width: 100%;

	&.is-1-1  { aspect-ratio: 1 / 1; }
	&.is-2-1  { aspect-ratio: 2 / 1; }
	&.is-3-1  { aspect-ratio: 3 / 1; }
	&.is-3-2  { aspect-ratio: 3 / 2; }
	&.is-4-3  { aspect-ratio: 4 / 3; }
	&.is-16-9 { aspect-ratio: 16 / 9; }

	.ystdtb-ratio__inner {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
}
```

`::before` / `position: absolute` の擬似要素ハックがなくなる。`sass:math` / `decimal-floor` の依存も不要になる。

### 影響範囲

- **banner-link ブロック**（`src/blocks/block-library/banner-link/`）— 現役で使用中。書き換え後の見た目に変化がないか要動作確認
- **slider ブロックの v1 フォールバック CSS**（`src/blocks/block-library/slider/style.css` の v1 フォールバックブロック）— `.ystdtb-slider.ystdtb-ratio` の aspect-ratio 指定が共通CSS側に移るため、フォールバックの該当箇所は重複削除可能
- **エディター**（`src/sass/ystandard-toolbox-block-editor.scss` で `@use`）— 同じCSSのためエディタープレビューも自動で反映される

### 注意点

- `aspect-ratio` プロパティ対応: Chrome 88+, Safari 15+, Firefox 89+
- yStandard Toolbox の動作要件は WordPress 6.1+ のため、ブラウザ互換性の問題はない
- v1 のスライダーで `ystdtb-ratio__inner` が `position: absolute` 前提に組まれているため、`.ystdtb-ratio__inner` 側の `position` 削除が他の表示に影響しないか念のため確認

---

## CSS カスタムプロパティ命名規則の統一（ブロックローカル変数のダブルハイフン化）

- **追加日**: 2026-04-08
- **優先度**: 中
- **対象**:
  - `src/blocks/block-library/box/` 配下
  - `src/blocks/block-library/faq/` および `faq-item/` 配下
  - `src/blocks/block-library/banner-link/` 配下
  - `src/blocks/block-library/description-list-dl-column/` 配下

### 背景

CSS カスタムプロパティの命名がプラグイン内で混在している。グローバルトークンと一部ブロック（posts, timeline-item, sns-share）は既にダブルハイフン区切り（`--ystdtb--posts--list-gap`）で書かれているが、box, faq, banner-link, description-list-dl-column はシングルハイフン区切り（`--ystdtb-box-padding-top`）のまま残っている。

WordPress コア（`--wp--preset--color--black`）や yStandard テーマ（`--ystd--`）との一貫性を取りたい。ユーザーが CSS でカスタマイズするときも、プレフィックスで即座にグループがわかる命名の方が扱いやすい。

### 命名規則

決定済み。役割プレフィックス（`--block--` 等）は付けず、ブロック名で区別する。

```
グローバル:       --ystdtb--{カテゴリ}--{name}     例: --ystdtb--color--blue-dark
ブロックローカル: --ystdtb--{ブロック名}--{name}   例: --ystdtb--box--padding-top
```

### 対象と変更例

| 現状 | 変更後 |
|---|---|
| `--ystdtb-box-padding-*` | `--ystdtb--box--padding-*` |
| `--ystdtb-box-border-*` | `--ystdtb--box--border-*` |
| `--ystdtb-box-label-font-size` | `--ystdtb--box--label-font-size` |
| `--ystdtb-faq-padding` | `--ystdtb--faq--padding` |
| `--ystdtb-faq-item-padding-*` | `--ystdtb--faq-item--padding-*` |
| `--ystdtb-banner-link-{prop}-{device}` | `--ystdtb--banner-link--{prop}-{device}` |
| `--ystdtb-dl-column-border` | `--ystdtb--description-list-dl-column--border` |

### 対応方針（重要）

単純に `save.tsx` / `edit.tsx` / SCSS のカスタムプロパティ名をリネームするだけだと、**既存の v2 HTML（シングルハイフン形式で保存された投稿）がブロックエディタで validate に失敗して「ブロックエラー」になる**。

そのため、各ブロックで **deprecated を追加して旧形式 HTML を吸収する**方針で進める。

#### 手順（ブロック単位）

1. **現状の save 関数を deprecated としてコピー**
   - 例: `src/blocks/block-library/box/deprecated/2.0-single-hyphen/` を作成
   - 現状の `save.tsx` と `types.ts` の attributes 定義をコピー
   - `migrate` 関数は identity（attributes をそのまま返す）で OK（attributes 自体は変わらず、インラインスタイルの命名だけが変わるため）
2. **新 `save.tsx` のカスタムプロパティ名をダブルハイフン版に変更**
3. **`edit.tsx` のインラインスタイルも同様にダブルハイフン版に変更**
4. **SCSS 内のカスタムプロパティ定義・参照もダブルハイフン版に変更**
5. **DESIGN.md のカスタムプロパティ記載も更新**
6. **`deprecated/index.tsx` に新 deprecated を追加**（既存の `deprecated_1-16` 等と並べる）
7. **ユニットテスト + integration テスト（fixture 追加を推奨）で migrate 動作を検証**
8. **実機で既存 box ブロックを含む投稿を開いて、ブロックエラーが出ないか確認**

### 影響範囲

- **既存の v2 HTML** — deprecated 追加で吸収可能
- **ユーザーのカスタマイズ CSS** — ユーザーがシングルハイフン版の CSS カスタムプロパティを上書きしていた場合は動かなくなる。v2 リリースノートに記載すべき破壊的変更
- **テーマ側との連携** — グレー色系はテーマ側の `--ystd--*` に依存しているが、こちらは触らない
- **slider の v1 フォールバック (`--ystdtb-slide-height-*`)** — 命名規則統一の対象外（v1 互換のためそのまま、いずれ削除予定）

### 注意点

- `deprecated_1-16`（v1 互換用）はシングルハイフン版の save 関数を含むため、**触らない**こと。v1 HTML の migrate に必要
- 新 deprecated エントリはあくまで「v2 内のシングルハイフン HTML」を吸収するためのもの
- 複数ブロックで同じパターンが必要になるため、最初の 1 ブロック（box）で手順を確立したらテンプレ化すると効率が良い
- `block-hook-hidden-by-size` の `--ystdtb-hidden-position` は既に対応済み（ユーザー側で対応完了）
