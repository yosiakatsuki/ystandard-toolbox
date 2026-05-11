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
- [フォント機能：ブロックエディターのフォント選択肢への追加](#フォント機能ブロックエディターのフォント選択肢への追加)
- [aktk-block-components useTheme* の `@wordpress/editor` 依存削除を yStandard Blocks 側にも反映](#aktk-block-components-usetheme-の-wordpresseditor-依存削除を-ystandard-blocks-側にも反映)
- [見出し編集機能の背景色をグラデーション対応にする](#見出し編集機能の背景色をグラデーション対応にする)

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

> **検討済み代替案**: SCSS 側で `var(--ystdtb--box--padding-top, var(--ystdtb-box-padding-top))` のようにフォールバックを書いて CSS 側のみで対応する案も検討したが、save.tsx を据え置いたままだと新名前は誰も書き込まないため実効性がなく、save.tsx を変更する場合は block 検証エラーを避けるために deprecated が必須となる。結論として deprecated 追加方針が不可避。

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

---

## フォント機能：ブロックエディターのフォント選択肢への追加

- **追加日**: 2026-04-13
- **優先度**: 中
- **対象**: `inc/font/class-font.php`、エディター側 JS

### 背景

現在のフォント設定はサイト全体の font-family を一括指定する機能のみ。ブロックエディターのタイポグラフィ設定（フォントファミリー選択ドロップダウン）にフォントの選択肢を追加できると、ブロック単位でフォントを切り替えられるようになり、デザインの自由度が上がる。

### 修正案

- フォント設定画面で登録したフォントを WordPress の `wp_register_font_family` や `theme.json` の `fontFamilies` 相当の仕組みでエディターのフォント選択肢に追加する
- WordPress のフォント API（Fonts API / Font Library）の動向を踏まえて実装方法を決定する

### 注意点

- WordPress のフォント関連 API は変更が多い領域のため、実装時点での最新 API を確認すること
- ブロックテーマではフォント設定画面自体を非表示にしているため、ブロックテーマへの対応範囲は別途検討が必要

---

## aktk-block-components useTheme* の `@wordpress/editor` 依存削除を yStandard Blocks 側にも反映

- **追加日**: 2026-05-10
- **優先度**: 中
- **対象**: yStandard Blocks プラグイン側の `aktk-block-components/hooks/useThemeColors` / `useThemeGradient` / `useThemeFontSizes` / `useThemeSpacingSizes`（ystandard-toolbox と共用ライブラリ）

### 背景

ystandard-toolbox 側で v2 リリース対応として、`useTheme*` 4 フックから `@wordpress/editor`（`store as editorStore`）への依存を削除した。理由はウィジェット編集画面（`widgets.php` / カスタマイザーのウィジェット）で `wp-editor` スクリプトを enqueue すると WordPress 5.8+ の警告（"wp-editor スクリプトを新しいウィジェットエディターと一緒にエンキューしないでください"）が発生していたため。

aktk-block-components は ystandard-toolbox と yStandard Blocks プラグインの共用ライブラリで、現状 yStandard Blocks 側は古い実装のまま残っている可能性が高い。同期しないと、yStandard Blocks 側のブロックを使ったときに同じ警告が再発する。

### 現状（ystandard-toolbox 側で行った変更）

4 ファイルすべてで以下を削除:

```typescript
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

// useSelectから取得(主に設定画面用).
const dataXxx = useSelect( ( select ) => {
    const settings = select( editorStore )?.getEditorSettings();
    return settings?.xxx || [];
}, [] );
```

代わりに以下の 2 経路で値を取得する設計に統一:

1. `useSettings`（`@wordpress/block-editor`）— ブロックエディタ内
2. `applyFilters('aktk.hooks.getThemeXxx.themeXxx', [])` — 設定画面用フォールバック（PHP 側 `wp_localize_script` で渡した値を `addFilter` で注入）

### 修正案

yStandard Blocks 側でも同じ 4 ファイルを同様に書き換える。

### 影響範囲

- yStandard Blocks プラグインを利用しているサイトでウィジェット編集画面を開いたときの警告
- yStandard Blocks 側の各ブロックの `*.asset.php` から `wp-editor` 依存が消えるため、ビルド成果物の差分要確認

### 注意点

- yStandard Blocks 側で「設定画面相当」の機能から `useTheme*` を呼んでいる箇所があるか要確認。呼んでいる場合は `aktk.hooks.*` フィルタに `addFilter` 登録 + PHP 側 `wp_localize_script` で値提供が必要（ystandard-toolbox の `inc/plugin-settings/class-plugin-settings.php` の `get_editor_colors` / `get_editor_font_sizes` / `get_editor_spacing_sizes` を参考）
- グラデーション（`useThemeGradient`）は ystandard-toolbox の設定画面では未使用のため、PHP / addFilter の追加対応はしていない。yStandard Blocks 側で必要なら追加

---

## 見出し編集機能の背景色をグラデーション対応にする

- **追加日**: 2026-05-11
- **優先度**: 中
- **対象**:
  - `src/aktk-block-components/components/color-pallet-control/color-gradient-palette.tsx`（コンポーネント差し替えの本丸）
  - `src/plugin-settings/heading/app/options/background/background-color.tsx`
  - `src/plugin-settings/heading/app/editor/panel/style.tsx`（および疑似要素 `pseudo-elements.tsx`）
  - `src/plugin-settings/heading/app/preview/preview-style.tsx`
  - `src/plugin-settings/heading/types/index.ts`（`HeadingStyle.backgroundGradient` のコメント）

### 背景

見出し編集機能の背景色設定は現状単色（`backgroundColor`）のみ。`HeadingStyle` 型には `backgroundGradient` が定義されているが「未対応」コメントが付いており、UI 側は `ColorPalette`（単色のみ）が使われている。

ブロック側ではグラデーション背景が使えるブロックがあり、見出しデザインでも同等の表現ができると装飾の自由度が上がる。

### 過去の試行と判明した根本原因

2026-05 に `background-color.tsx` を `ColorGradientPalette` に差し替える形で対応を試みたが、`onChange` が 1 操作で 2 回連続で呼ばれる WP の仕様にハマり、巻き戻した。

`@wordpress/block-editor` の `__experimentalColorGradientControl`（= aktk-block-components の現行 `ColorGradientPalette` 内部で使用）は、color と gradient が両方有効なとき、**片方を選ぶともう片方を `onChange` 引数なし（= `undefined`）でクリアしようとする**実装（`node_modules/@wordpress/block-editor/src/components/colors-gradients/control.js` 参照）。

```javascript
// 抜粋
onChange={
    canChooseAGradient
        ? ( newColor ) => {
                onColorChange( newColor );
                onGradientChange();   // ← 引数なしで連続発火
          }
        : onColorChange
}
```

`setHeadingOption({ ...style, ...newValue })` のスプレッド更新と連続呼び出しが噛み合わず、直前にセットした color が後続の `onGradientChange()` で上書きされる。

ハンドラ側で「引数有無で分岐」する回避策もあるが、根本的に「1 操作 → 1 onChange」になっていないことがバグの温床なので、**コンポーネント側の差し替え**で根本解決する。

#### 課題 1（解消方針）: `ColorGradientPalette` の内部実装を `@wordpress/components` ベースに差し替える

aktk-block-components の `color-pallet-control/color-gradient-palette.tsx` から `__experimentalColorGradientControl`（`@wordpress/block-editor` 由来）を排除し、以下で再構成する。

- `@wordpress/components` の `ColorPalette` + `GradientPicker`
- タブ切替は自前実装、または `@wordpress/components` の `Tabs` を使う
- 「片方を選んだらもう片方をクリア」のロジックは**コンポーネント内部**に閉じ込め、外部には `{ color, gradient }` の最終値を**1 度の `onChange`** で通知する

これによる効果:

- 1 操作で `onChange` が 1 回しか呼ばれない → 上書きバグが起きない
- `@wordpress/block-editor` 依存（`BlockEditorProvider` 必須）から外れる → 設定画面でも安定動作
- ブロックエディタ側でも引き続き同じインターフェースで使える（破壊的変更を避ける）

実装上の注意:

- `colorValue` / `gradientValue` / `colors` / `gradients` / `onColorChange` / `onGradientChange` / `disableCustomColors` / `disableCustomGradients` / `enableCurrentColor` / `enableTransparent` などの**既存 props 互換は維持**する
- `useThemeColors` / `useThemeGradients` のフォールバック経路（`aktk.hooks.*` フィルタ）はそのまま使える
- aktk-block-components は **yStandard Blocks 共用ライブラリ**なので、差し替え後は ystandard-toolbox / yStandard Blocks の両方で動作確認が必要

差し替えが完了すれば、見出し編集側のハンドラはシンプルに書ける:

```typescript
const handleOnColorChange = ( newValue: string | undefined ) => {
    onChange( {
        backgroundColor: newValue,
        backgroundGradient: undefined,
    } );
};
const handleOnGradientChange = ( newGradient: string | undefined ) => {
    onChange( {
        backgroundColor: undefined,
        backgroundGradient: newGradient,
    } );
};
const handleOnClear = () => {
    onChange( { backgroundColor: undefined, backgroundGradient: undefined } );
};
```

#### 課題 2: `preview-style.tsx` の `Object.keys` が `undefined` 値キーを拾う

`onChange` の戻り値を `style.tsx` 側で `{ ...style, ...newValue }` とスプレッドするため、`backgroundColor: undefined` / `backgroundGradient: undefined` が `style` 上にキーとして残る（値 `undefined`）。

`preview-style.tsx` の `parseStyles` は `Object.keys( styles ).forEach` で全キーを舐めるので、値 `undefined` のキーも処理ループに入り、`background-color: undefined;` / `background: undefined;` といった**無効な CSS 文字列**が生成されてしまう。`background` ショートハンドの場合、無効値で他のプロパティが意図せず初期化される懸念もある。

**設計方針**: `parseStyles` の forEach 冒頭で `value === undefined` のキーをスキップする。これは堅牢化として preview 全体に効く。

```typescript
Object.keys( styles ).forEach( ( originalKey: string ) => {
    if ( ( styles as any )[ originalKey ] === undefined ) {
        return;
    }
    // ...
} );
```

#### 課題 3: グラデーション値の CSS プロパティ変換

`backgroundGradient` の値（`linear-gradient(...)` 等）を CSS に出すには、`background` ショートハンドとして出力する必要がある。`parseStyles` 内で `'backgroundGradient' === key` のときに `property = 'background'` に置換する処理を追加する。

```typescript
if ( 'backgroundGradient' === key ) {
    property = 'background';
}
```

#### 課題 4: `BackgroundColor` の型定義の互換性

型 `BackgroundColorProps` に `gradientValue` を追加する場合、`?:` のオプショナルにすること。必須にすると疑似要素側の `pseudo-elements.tsx` の `<BackgroundColor>` 呼び出しでも `gradientValue` を渡す必要が出るため。

### 修正案（再着手時の手順）

1. **コンポーネント差し替え**: aktk-block-components の `color-pallet-control/color-gradient-palette.tsx` を `@wordpress/components` ベースに書き換え
   - `ColorPalette` + `GradientPicker` + タブ切替を内部で組み合わせ
   - 「片方を選んだらもう片方をクリア」をコンポーネント内部で完結 → 外部への `onChange` は 1 回
   - 既存 props 互換を維持
2. **共用ライブラリ動作確認**: ブロックエディタ側（box / banner-link 等のグラデーション利用箇所）で同じ動作になることを確認
3. **見出し側適用**: `BackgroundColorProps` に `gradientValue?: string`（オプショナル）を追加し、`background-color.tsx` を `ColorGradientPalette` に差し替え
4. `style.tsx` から `<BackgroundColor>` に `gradientValue={ option?.backgroundGradient }` を渡す（疑似要素側もグラデーション対応するなら同様に）
5. `preview-style.tsx` に課題 2 / 3 の修正を入れる
6. `types/index.ts` の `backgroundGradient` の「未対応」コメントを除去
7. `preview-style.test.ts` に backgroundGradient の preview 生成ケースを追加
8. 実機で「色 ↔ グラデーション切替」「ClearButton で両方クリア」「保存・リロード後の値復元」を確認

### 影響範囲

- **aktk-block-components の `ColorGradientPalette`**（共用ライブラリ）— 内部実装差し替え。yStandard Blocks 側のグラデーション利用箇所にも影響するため両方で動作確認が必要
- 見出し編集機能の背景色設定 UI（メイン要素 / 疑似要素）
- preview の CSS 生成
- 既存の見出しスタイル（`backgroundColor` で保存済み）の表示 — 単色は引き続き使えるが、preview ロジック修正のリグレッション要確認

### 注意点

- aktk-block-components の差し替え分は、yStandard Blocks 側にも反映する必要がある（共用ライブラリ。`docs/future-improvements.md` の「aktk-block-components useTheme* の `@wordpress/editor` 依存削除を yStandard Blocks 側にも反映」と同じく、両プロジェクトの同期を意識）
- `useThemeGradients`（aktk-block-components）はブロックエディタ内では `useSettings` 経由でグラデーション一覧を取れるが、設定画面では `BlockEditorProvider` でラップされていないため空配列になる。設定画面でグラデーションプリセットを表示したい場合は、PHP 側で `editorGradients` を `wp_localize_script` で渡し、設定画面側で `aktk.hooks.getThemeGradients.themeGradients` フィルタに `addFilter` 登録する対応が必要（color / font / spacing と同じパターン）
- カスタムグラデーション入力（自由入力）は `disableCustomGradients={ false }` を設定すれば動くため、まずはカスタム入力のみ対応し、プリセット供給は別段階で進めるのも選択肢
