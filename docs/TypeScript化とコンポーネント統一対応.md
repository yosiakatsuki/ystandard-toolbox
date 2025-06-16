# TypeScript化とコンポーネント統一対応ガイド

## 対応方針

### 1. コンポーネントの統一化

#### @wordpress/componentsの直接利用排除

-   `@wordpress/components`を直接使用せず、`@aktk/block-components/wp-controls`にラップしたコンポーネントを使用
-   WordPress(Gutenberg)アップデートによるプロパティ変更への対応を一元化

#### aktk-block-componentsへの統一

-   古い`@aktk/components`から`@aktk/block-components/components`に移行
-   export default → export function形式への変更

### 2. TypeScript化の統一パターン

#### インポートセクションの構造統一

```typescript
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { ComponentName } from '@aktk/block-components/components/component-name';

/**
 * Plugin Dependencies
 */
import { PluginSettingsPanel } from '@aktk/plugin-settings/components/panel';
```

#### コンポーネント構造の統一

-   `PanelBody` → `PluginSettingsPanel` + `PanelInner`
-   `BaseControl` → `PluginSettingsBaseControl`
-   `export default function`形式への統一

#### 型定義の追加

-   Props用インターフェース定義
-   設定データ用インターフェース定義
-   関数の引数・戻り値型の明示

### 3. 共通して対応した内容

#### CustomSelectControlの統一

-   `@aktk/components/custom-select-control` → `@aktk/block-components/components/custom-select-control`
-   `import CustomSelectControl` → `import { CustomSelectControl }`
-   `isHorizon`プロパティの削除、`label`のBaseControlへの移動

#### MediaUploadの統一

-   `@aktk/components/media-upload-control` → `@aktk/block-components/components/media-upload`
-   `MediaUploadControl.Utils` → `MediaUpload`
-   型定義の統一（`MediaObject`を共通使用）

#### 国際化対応

-   `__()` 関数の使用
-   日本語JSDocコメントの追加

#### スタイルの統一

-   Tailwind CSSクラスの使用
-   `toBool`ユーティリティの使用

## 参考ファイル（対応済み）

### TypeScript化完了ファイル

-   `src/plugin-settings/design/archive/sort.tsx`
-   `src/plugin-settings/design/archive/date.tsx`
-   `src/plugin-settings/design/archive/image.tsx`
-   `src/plugin-settings/design/copyright/index.tsx`

### コンポーネント統一参考ファイル

-   `src/plugin-settings/design/header/overlay.tsx`（MediaUpload使用例）
-   `src/aktk-block-components/wp-controls/input-control/index.tsx`（wp-controlsパターン）
-   `src/aktk-block-components/wp-controls/text-control/index.tsx`（wp-controlsパターン）

### 作成したwp-controlsコンポーネント

-   `src/aktk-block-components/wp-controls/custom-select-control/index.tsx`

## 作業フロー

1. **型定義追加**: Props、設定データのインターフェース作成
2. **インポート修正**: aktk-block-components版への変更
3. **コンポーネント構造変更**: PluginSettingsPanel等への統一
4. **プロパティ調整**: 新しいコンポーネント仕様に合わせて修正
5. **ビルド確認**: `npm run build:plugin-settings`でエラーチェック
6. **コミット**: 変更内容を適切に記録

## 注意点

-   レガシーファイル（.js）は一度.tsxにリネームしてからTypeScript化。差分がわかるようにファイル名を変えたところで作業を中止し、一度commitする。commitせずに次の作業へは進めない。またcommitは自動で行わず必ず確認をすること。
-   `isHorizon`等の存在しないプロパティは削除
-   `label`はCustomSelectControlではなくBaseControlに配置
-   `useMediaUtils={true}`の追加を忘れずに
-   型エラーが出る場合は適切なfallback値（`|| ''`等）を追加
