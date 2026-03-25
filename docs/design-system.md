# yStandard Toolbox デザインシステム

## 概要

yStandard Toolbox のフロントエンド向けデザインシステム。CSSカスタムプロパティによるトークンベースの設計を採用し、yStandard テーマとの整合性を保ちつつ、他テーマでも単独で機能する。

### yStandard テーマとの関係

- yStandard テーマは `--ystd--` プレフィックスのCSSカスタムプロパティを定義する
- yStandard Toolbox は `--ystdtb--` プレフィックスで独自のトークンを定義する
- テーマのトークンに依存しない設計とし、テーマなしでも表示が崩れない

---

## デザイントークン

### カラー

`src/sass/foundation/custom-property/_index.scss` で定義。

#### ベースカラー

| プロパティ | 値 | 用途 |
|---|---|---|
| `--ystdtb--color--black` | `#222222` | 本文テキスト |
| `--ystdtb--color--white` | `#ffffff` | 背景 |

#### カラーパレット（濃色 / 淡色）

濃色はすべて WCAG AA 基準（コントラスト比 4.5:1 以上）をクリア。白背景上だけでなく、対応する淡色背景上でもAA基準を満たす。

| 系統 | 濃色（テキスト・アイコン用） | 淡色（背景・装飾用） | vs 白 | vs 淡色 |
|---|---|---|---|---|
| 青（ブランドカラー） | `--ystdtb--color--blue-dark` `#1565a0` | `--ystdtb--color--blue-light` `#dae9f5` | 6.2:1 | 5.0:1 |
| 赤 | `--ystdtb--color--red-dark` `#b5332a` | `--ystdtb--color--red-light` `#fce8e6` | 6.0:1 | 5.1:1 |
| 緑 | `--ystdtb--color--green-dark` `#1e7b3c` | `--ystdtb--color--green-light` `#e2f5ea` | 5.3:1 | 4.7:1 |
| 黄 | `--ystdtb--color--yellow-dark` `#7a6200` | `--ystdtb--color--yellow-light` `#fdf5dc` | 5.9:1 | 5.4:1 |
| オレンジ | `--ystdtb--color--orange-dark` `#a84e10` | `--ystdtb--color--orange-light` `#fef0e0` | 5.6:1 | 5.0:1 |
| 紫 | `--ystdtb--color--purple-dark` `#6b4a9e` | `--ystdtb--color--purple-light` `#f0eaf8` | 6.8:1 | 5.8:1 |

#### グレー

| プロパティ | 値 | 用途 | vs 白 | vs gray-bg |
|---|---|---|---|---|
| `--ystdtb--color--gray-bg` | `#f3f4f6` | 背景用の淡いグレー | - | - |
| `--ystdtb--color--gray-text` | `#656565` | 補助テキスト | 5.8:1 | 5.3:1 |
| `--ystdtb--color--gray-sub` | `#767676` | 日付・キャプション等の薄い補助テキスト | 4.5:1 | 4.2:1 |

#### カラーの使い方

```css
/* テキスト色 */
color: var(--ystdtb--color--black);
color: var(--ystdtb--color--gray-text);

/* 背景色 */
background-color: var(--ystdtb--color--gray-bg);
background-color: var(--ystdtb--color--blue-light);

/* ボーダー色 — カラートークンを直接使用 */
border-color: var(--ystdtb--color--gray-text);
```

### ブレークポイント

| 名前 | 値（px） | 値（rem） | Custom Media | 用途 |
|---|---|---|---|---|
| `mobile` | `640px` | `40rem` | `--ystdtb--bp--mobile` | モバイル／タブレットの境界 |
| `pc` | `1024px` | `64rem` | `--ystdtb--bp--pc` | タブレット／PCの境界 |

#### 現行（SCSS / レガシーCSS）

```css
@media (max-width: 599px) { }
@media (max-width: 1023px) { }
```

#### 移行後（CSS custom-media-queries + range syntax）

PostCSS の `postcss-custom-media` と `postcss-media-minmax`（media-query-ranges）で処理する。

```css
@custom-media --ystdtb--bp--mobile (width < 40rem);
@custom-media --ystdtb--bp--pc (width < 64rem);

/* モバイル（640px未満） */
/* noinspection CssInvalidAtRule */
@media (--ystdtb--bp--mobile) { }

/* タブレット以下（1024px未満） */
/* noinspection CssInvalidAtRule */
@media (--ystdtb--bp--pc) { }
```

`rem`単位を使用することで、ブラウザのフォントサイズ設定変更時にブレークポイントもそれに追従する。range syntax（`width < 40rem`）は PostCSS で `(max-width: 39.9375rem)` に展開される。

---

## CSSアーキテクチャ

### CSS単位の方針（アクセシビリティ対応）

yStandard テーマの方針に準拠。ブラウザのフォントサイズ設定変更に対応するため、CSS単位を使い分ける。

| 用途 | 推奨単位 | 理由 |
|---|---|---|
| `font-size` | `rem` / `em` | ブラウザのフォントサイズ設定に追従させるため |
| `line-height` | 単位なし数値（例: `1.5`） | フォントサイズに比例して自動調整されるため |
| `letter-spacing` | `em` | フォントサイズに比例させるため |
| `padding` / `margin` / `gap` | `px` | フォントサイズ設定変更時に余白が膨らみ、可読性が低下するのを防ぐため |
| `width` / `height`（固定値） | `px` | サイズを厳密に制御するため |
| メディアクエリ | `rem`（新規）/ `px`（現行レガシー） | ブラウザのフォントサイズ設定に追従させるため。custom-media-queries で定義 |
| `border-width` | `px` | 拡大しても太くなる必要がないため |
| `box-shadow` | `px` | 装飾的な値であり拡大に追従する必要がないため |

### 命名規則

#### CSSカスタムプロパティ

すべてダブルハイフン（`--`）区切りで統一する。WordPress コア（`--wp--preset--color--black`）やyStandard テーマ（`--ystd--`）と同じ規則。

グローバルトークン:
```
--ystdtb--{カテゴリ}--{名前}
```

ブロックローカル変数:
```
--ystdtb--{ブロック名}--{プロパティ}
```

カスタムメディア:
```
--ystdtb--bp--{名前}
```

例:
```css
/* グローバルトークン（:root で定義） */
--ystdtb--color--blue-dark
--ystdtb--color--gray-text

/* ブロックローカル変数（ブロックセレクタで定義） */
--ystdtb--box--padding-top
--ystdtb--box--border-width
--ystdtb--posts--list-gap

/* カスタムメディア */
--ystdtb--bp--mobile
--ystdtb--bp--pc
```

グローバルトークンとブロックローカル変数は、カテゴリ名（`color`, `bp`）vs ブロック名（`posts`, `box`）で区別する。役割プレフィックス（`--block--` 等）は付けない。

#### CSSクラス

BEM記法。プラグインのブロックは `ystdtb-` プレフィックス。

```
.ystdtb-{ブロック名}              — Block
.ystdtb-{ブロック名}__{要素名}    — Element
.ystdtb-{ブロック名}--{修飾子}    — Modifier（あまり使わない）
.ystdtb-{ブロック名}.is-{状態}    — State（表示タイプ等の切替）
```

例:
```css
.ystdtb-posts              /* ブロックルート */
.ystdtb-posts__list         /* リスト要素 */
.ystdtb-posts__thumbnail    /* サムネイル要素 */
.ystdtb-posts.is-card       /* カード表示状態 */
.ystdtb-posts.is-list       /* リスト表示状態 */
```

#### Tailwind CSS（エディターUIのみ）

- エディター側（管理画面）のコンポーネントでのみ使用
- フロントエンドのブロック表示には使用しない
- `tailwind.config.js` でカスタムトークンを定義

### 詳細度の設計方針

yStandard シリーズはカスタマイズのしやすさが売りのプロダクトであるため、**ユーザーが少ないセレクタで上書きできる**低い詳細度を維持する。

#### 基本ルール: 詳細度 0,1,0（クラス1つ）

フロントエンドのブロックCSSは、原則としてクラス1つ分の詳細度（0,1,0）で記述する。

```css
/* ✅ 正しい: 詳細度 0,1,0 */
.ystdtb-posts { }
.ystdtb-posts__list { }
.ystdtb-posts__thumbnail { }

/* ❌ 避ける: 詳細度 0,2,0（不必要なネスト） */
.ystdtb-posts .ystdtb-posts__list { }
```

#### 状態クラスの詳細度

状態クラス（`.is-*`）は `:where()` で囲み、詳細度を 0,1,0 に維持する。

```css
/* ✅ 正しい: 詳細度 0,1,0 */
.ystdtb-posts:where(.is-card) { }
.ystdtb-posts:where(.is-list) { }

/* ❌ 避ける: 詳細度 0,2,0 */
.ystdtb-posts.is-card { }
```

#### ユーザーカスタマイズとの関係

詳細度 0,1,0 を基本とすることで、ユーザーはクラス1つの指定で上書きできる。

```css
/* ユーザーのカスタムCSS — 同じ詳細度で後から読み込めば上書き可能 */
.ystdtb-posts__title {
    font-size: 1.2rem;
}

/* または詳細度を1段上げれば確実に上書きできる */
.ystdtb-posts .ystdtb-posts__title {
    font-size: 1.2rem;
}
```

#### 詳細度一覧

| 対象 | セレクタ例 | 詳細度 |
|---|---|---|
| CSSカスタムプロパティ定義 | `:root` | 0,1,0（擬似クラス） |
| ブロックCSS（基本） | `.ystdtb-posts` | 0,1,0 |
| BEM Element | `.ystdtb-posts__list` | 0,1,0 |
| 状態クラス | `.ystdtb-posts:where(.is-card)` | 0,1,0 |
| `!important` | — | **使用禁止** |

### ファイル構成

```
src/sass/                              — レガシー（段階的にCSSへ移行）
├── foundation/
│   └── custom-property/               — CSSカスタムプロパティ（グローバルトークン）
├── global/                            — SCSSグローバルリソース（変数・mixin）
└── ystandard-toolbox.scss             — フロントエンドメインCSS

src/blocks/block-library/[ブロック名]/
├── style.css（新規）/ style.scss（既存）  — フロントエンドCSS（ブロック個別）
└── style-editor.css（新規）/ style-editor.scss（既存） — エディター専用CSS
```

- 各ブロックのCSSは `style.css`（新規）または `style.scss`（既存）に記述し、webpackがブロックごとにバンドル
- グローバルトークン（カラー等）は `foundation/custom-property/` に集約
- ブロックCSSからグローバルトークンはCSSカスタムプロパティ経由で参照（SCSS変数のimportは不要）

### SCSS → CSS 移行方針

段階的にSCSSを廃止し、素のCSS（PostCSSで処理）に移行する。

#### 移行ルール

- **新規ブロック**: `.css` で作成する（`.scss` は使わない）
- **既存ブロック**: 改修時に `.scss` → `.css` へ移行を検討（強制ではない）
- **PostCSS機能の活用**: CSS Nesting、custom-media-queries は PostCSS プラグインで変換

#### SCSSで使用していた機能の代替

| SCSS機能 | CSS代替 |
|---|---|
| 変数（`$var`） | CSSカスタムプロパティ（`var(--*)`） |
| ネスト（`& .child`） | CSS Nesting（`& .child`）— PostCSS で展開 |
| `@use` / `@import` | 不要（CSSカスタムプロパティはグローバルに参照可能） |
| mixin / extend | 必要な場合はクラスの組み合わせで対応 |
| メディアクエリ変数 | `@custom-media` で定義 |

#### 新規CSSファイルの例

```css
/* src/blocks/block-library/[ブロック名]/style.css */

@custom-media --ystdtb--bp--mobile (width < 40rem);
@custom-media --ystdtb--bp--pc (width < 64rem);

.ystdtb-example {
	color: var(--ystdtb--color--black);

	& .ystdtb-example__meta {
		color: var(--ystdtb--color--gray-text);
		font-size: 0.875rem;
	}
}

@media (--ystdtb--bp--pc) {
	.ystdtb-example {
		/* タブレット以下のスタイル */
	}
}

@media (--ystdtb--bp--mobile) {
	.ystdtb-example {
		/* モバイルのスタイル */
	}
}
```

---

## ブロックCSSの書き方ガイド

### カラーの参照

ハードコードせず、カスタムプロパティを使用する。

```css
/* ✅ 正しい */
color: var(--ystdtb--color--gray-text);
background-color: var(--ystdtb--color--gray-bg);
border-color: var(--ystdtb--color--gray-text);

/* ❌ 誤り */
color: #656565;
background-color: #f3f4f6;
```

### レスポンシブ

PCをベースに、下位ブレークポイントで上書きする。新規CSSでは `@custom-media` + range syntax を使用する。

```css
/* 新規CSS: custom-media-queries + range syntax */
@custom-media --ystdtb--bp--mobile (width < 40rem);
@custom-media --ystdtb--bp--pc (width < 64rem);

/* PC（ベース） */
.ystdtb-example__list {
    grid-template-columns: repeat(3, 1fr);
}

/* タブレット以下（1024px未満） */
@media (--ystdtb--bp--pc) {
    .ystdtb-example__list {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* モバイル（640px未満） */
@media (--ystdtb--bp--mobile) {
    .ystdtb-example__list {
        grid-template-columns: 1fr;
    }
}
```

```css
/* 既存SCSS（レガシー）: px値を直接使用 */
@media (max-width: 1023px) { }
@media (max-width: 599px) { }
```

### aspect-ratio

画像のアスペクト比は CSS `aspect-ratio` を使用する。旧 `.ratio` ハック（padding-top）は使わない。

```css
.ystdtb-example__thumbnail {
    overflow: hidden;
    aspect-ratio: 16 / 9;
}

.ystdtb-example__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

### ブロックローカル変数

ブロック固有のカスタマイズ可能な値はブロックローカル変数として定義する。

```css
.ystdtb-box {
    --ystdtb-box-padding-top: 1em;
    --ystdtb-box-padding-right: 1em;
    --ystdtb-box-border-width: 0;
}

.ystdtb-box__inner-container {
    padding-top: var(--ystdtb-box-padding-top);
    border-width: var(--ystdtb-box-border-width);
}
```
