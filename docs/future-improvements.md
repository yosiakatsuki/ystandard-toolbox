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
