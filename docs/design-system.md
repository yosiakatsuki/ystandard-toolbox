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

濃色はすべて白背景上で WCAG AA 基準（コントラスト比 4.5:1 以上）をクリア。

| 系統 | 濃色（テキスト・アイコン用） | 淡色（背景・装飾用） | コントラスト比 |
|---|---|---|---|
| 青（ブランドカラー） | `--ystdtb--color--blue-dark` `#1565a0` | `--ystdtb--color--blue-light` `#dae9f5` | 5.5:1 |
| 赤 | `--ystdtb--color--red-dark` `#b5332a` | `--ystdtb--color--red-light` `#fce8e6` | 5.1:1 |
| 緑 | `--ystdtb--color--green-dark` `#1e7b3c` | `--ystdtb--color--green-light` `#e2f5ea` | 5.3:1 |
| 黄 | `--ystdtb--color--yellow-dark` `#7a6200` | `--ystdtb--color--yellow-light` `#fdf5dc` | 5.2:1 |
| オレンジ | `--ystdtb--color--orange-dark` `#a84e10` | `--ystdtb--color--orange-light` `#fef0e0` | 5.0:1 |
| 紫 | `--ystdtb--color--purple-dark` `#6b4a9e` | `--ystdtb--color--purple-light` `#f0eaf8` | 5.0:1 |

#### グレー

| プロパティ | 値 | 用途 |
|---|---|---|
| `--ystdtb--color--gray-bg` | `#f3f4f6` | 背景用の淡いグレー |
| `--ystdtb--color--gray-text` | `#656565` | 補助テキスト（5.7:1） |

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

yStandard テーマのブレークポイントに準拠。

| 名前 | 値 | 用途 |
|---|---|---|
| `mobile` | `600px` | モバイル／デスクトップの境界 |
| `tablet` | `1024px` | タブレット／デスクトップの境界 |

```css
/* モバイル: 599px以下 */
@media (max-width: 599px) { }

/* タブレット: 1023px以下 */
@media (max-width: 1023px) { }
```

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
| メディアクエリ | `px`（現行）| テーマとの互換性を維持 |
| `border-width` | `px` | 拡大しても太くなる必要がないため |
| `box-shadow` | `px` | 装飾的な値であり拡大に追従する必要がないため |

### 命名規則

#### CSSカスタムプロパティ

グローバルトークン:
```
--ystdtb--{カテゴリ}--{名前}
```

ブロックローカル変数:
```
--ystdtb-{ブロック名}-{プロパティ}
```

例:
```css
/* グローバルトークン（:root で定義） */
--ystdtb--color--blue-dark
--ystdtb--color--gray-text

/* ブロックローカル変数（ブロックセレクタで定義） */
--ystdtb-box-padding-top
--ystdtb-box-border-width
```

グローバルトークンは `--ystdtb--`（ダブルハイフン区切り）、ブロックローカル変数は `--ystdtb-`（シングルハイフン区切り）で区別する。

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

- **CSSカスタムプロパティ定義**: `:root` セレクタ
- **ブロックCSS**: 通常のクラスセレクタ（`.ystdtb-*`）
- **!important の不使用**: フロントエンドCSSでは `!important` を使わない
- **状態クラス**: `.is-*` で表示状態を切り替え（`.ystdtb-posts.is-card`）

### ファイル構成

```
src/sass/
├── foundation/
│   └── custom-property/    — CSSカスタムプロパティ（グローバルトークン）
├── global/                 — SCSSグローバルリソース（変数・mixin）
└── ystandard-toolbox.scss  — フロントエンドメインCSS

src/blocks/block-library/[ブロック名]/
├── style.scss              — フロントエンドCSS（ブロック個別）
└── style-editor.scss       — エディター専用CSS（ブロック個別）
```

- 各ブロックのCSSは `style.scss` に記述し、webpackがブロックごとにバンドル
- グローバルトークン（カラー等）は `foundation/custom-property/` に集約
- ブロックCSSからグローバルトークンはCSSカスタムプロパティ経由で参照（SCSS変数のimportは不要）

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

モバイルファーストではなく、デスクトップをベースに `max-width` で下位ブレークポイントを上書きする（既存ブロックとの一貫性のため）。

```css
/* デスクトップ（ベース） */
.ystdtb-example__list {
    grid-template-columns: repeat(3, 1fr);
}

/* タブレット以下 */
@media (max-width: 1023px) {
    .ystdtb-example__list {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* モバイル */
@media (max-width: 599px) {
    .ystdtb-example__list {
        grid-template-columns: 1fr;
    }
}
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
