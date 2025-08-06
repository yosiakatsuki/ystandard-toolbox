# BoxShadowControl

## 要件
- `@aktk/components/box-shadow-control`を移行して作成する
  - 移行対象ファイル @src/blocks/components/box-shadow-control/index.js
- @src/aktk-block-components 内のコンポーネントを使用して作成する
- スタイリングはTailwindCSSを使用する。
- RangeControlは使用しない。数値入力のみのコントロールを使用する
- i18n対応のテキストドメインは`aktk-block-components`とする
- `getComponentConfig`で取得している値はコンポーネント内に保持する
