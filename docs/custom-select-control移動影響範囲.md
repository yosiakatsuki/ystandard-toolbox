# CustomSelectControlコンポーネント移動影響範囲

## 概要

`src/aktk-block-components/wp-controls/custom-select-control/index.tsx` を `src/aktk-block-components/components/custom-select-control/index.tsx` に移動する際の影響範囲調査結果。

## 移動対象ファイル

- **移動元**: `src/aktk-block-components/wp-controls/custom-select-control/index.tsx`
- **移動先**: `src/aktk-block-components/components/custom-select-control/index.tsx`

## 影響を受けるファイル（合計13ファイル）

### 1. `@aktk/components/custom-select-control` パスでインポートしているファイル（5ファイル）

これらのファイルは移動後も影響を受けない（エイリアスが正しく設定されているため）：

1. `src/plugin-settings/design/archive/sort.tsx`
2. `src/plugin-settings/design/archive/image.tsx`
3. `src/plugin-settings/design/archive/date.js`
4. `blocks/slider/inspector-controls/basic/slide-function.js`
5. `src/plugin-settings/cta/post-type-selector.tsx`

### 2. `@aktk/block-components/wp-controls/custom-select-control` パスでインポートしているファイル（8ファイル）

これらのファイルは**インポートパスの修正が必要**：

1. `src/plugin-settings/heading/app/style-select/index.tsx`
   - 現在: `import CustomSelectControl, { CustomSelectControlOption } from '@aktk/block-components/wp-controls/custom-select-control';`
   - 修正後: `import CustomSelectControl, { CustomSelectControlOption } from '@aktk/block-components/components/custom-select-control';`

2. `src/aktk-block-components/components/icon-control/custom-select-control.tsx`
   - 現在: `import CustomSelectControl from '@aktk/block-components/wp-controls/custom-select-control';`
   - 修正後: `import CustomSelectControl from '@aktk/block-components/components/custom-select-control';`

3. `src/plugin-settings/heading/app/options/background/background-size.tsx`
   - 現在: `import CustomSelectControl from '@aktk/block-components/wp-controls/custom-select-control';`
   - 修正後: `import CustomSelectControl from '@aktk/block-components/components/custom-select-control';`

4. `src/plugin-settings/heading/app/options/background/background-repeat.tsx`
   - 現在: `import CustomSelectControl from '@aktk/block-components/wp-controls/custom-select-control';`
   - 修正後: `import CustomSelectControl from '@aktk/block-components/components/custom-select-control';`

5. `src/plugin-settings/heading/app/options/background/background-position.tsx`
   - 現在: `import CustomSelectControl from '@aktk/block-components/wp-controls/custom-select-control';`
   - 修正後: `import CustomSelectControl from '@aktk/block-components/components/custom-select-control';`

6. `src/plugin-settings/heading/app/options/advanced/position.tsx`
   - 現在: `import CustomSelectControl from '@aktk/block-components/wp-controls/custom-select-control';`
   - 修正後: `import CustomSelectControl from '@aktk/block-components/components/custom-select-control';`

7. `src/plugin-settings/heading/app/options/advanced/controls.tsx`
   - 現在: `import CustomSelectControl, { type CustomSelectControlOption } from '@aktk/block-components/wp-controls/custom-select-control';`
   - 修正後: `import CustomSelectControl, { type CustomSelectControlOption } from '@aktk/block-components/components/custom-select-control';`

8. `src/plugin-settings/heading/app/editor/level.tsx`
   - 現在: `import CustomSelectControl, { CustomSelectControlOption } from '@aktk/block-components/wp-controls/custom-select-control';`
   - 修正後: `import CustomSelectControl, { CustomSelectControlOption } from '@aktk/block-components/components/custom-select-control';`

## 作業手順

1. **ファイル移動**
   - `src/aktk-block-components/wp-controls/custom-select-control/` ディレクトリを削除
   - `src/aktk-block-components/components/custom-select-control/index.tsx` として新規作成

2. **インポートパス修正**
   - 上記8ファイルのインポートパスを一括修正
   - `wp-controls/custom-select-control` → `components/custom-select-control`

3. **動作確認**
   - ビルドエラーがないことを確認
   - 各機能が正常に動作することを確認

## 備考

- `@aktk/components/custom-select-control` パスを使用しているファイルは修正不要
- レガシーコンポーネント `src/blocks/components/custom-select-control/index.tsx` は既に`@deprecated`のため対象外