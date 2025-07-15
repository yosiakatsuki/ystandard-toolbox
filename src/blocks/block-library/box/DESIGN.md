# DESIGN.md - ボックスブロック

## 概要

囲み枠機能を提供するコンテナブロック。ラベル付きボックス、背景色、ボーダー、角丸、パディング、背景画像などの豊富なスタイリングオプションを持つ。InnerBlocksによる入れ子コンテンツに対応。

## 機能仕様

### 基本機能
- ボックス型コンテナブロック（InnerBlocks対応）
- 5種類のラベルスタイル（ラベル無し、外側、内側、全幅、線上）
- SVGアイコン付きラベル機能
- 背景画像とカバーオーバーレイ機能
- レスポンシブパディング設定
- リッチカラーコントロール（テーマカラー対応）

### ラベルスタイル
- `label-none` - ラベル無し
- `label-out` - 外側ラベル（ボックス外上部）
- `label-in` - 内側ラベル（ボックス内上部）
- `label-wide` - 全幅ラベル（ボックス全幅）
- `label-line` - 線上ラベル（ボーダー線上）

### 属性仕様（28個）
#### ボックススタイル
- `boxStyle: string` - ラベルスタイル（デフォルト: `label-none`）

#### ボックス色設定
- `boxBackgroundColor: string` - テーマ色名
- `customBoxBackgroundColor: string` - カスタム背景色
- `boxTextColor: string` - テーマ色名  
- `customBoxTextColor: string` - カスタムテキスト色
- `boxBorderColor: string` - テーマ色名
- `customBoxBorderColor: string` - カスタムボーダー色

#### ボックス形状
- `boxBorderSize: string` - ボーダー幅（デフォルト: `1px`）
- `boxBorderStyle: string` - ボーダースタイル（デフォルト: `solid`）
- `boxBorderRadius: string` - 角丸設定
- `boxPadding: object` - パディング設定（レスポンシブ対応）
- `isResponsiveBoxPadding: boolean` - レスポンシブパディング有効化

#### ラベル設定
- `label: string` - ラベルテキスト
- `labelIcon: string` - SVGアイコン名
- `labelFontSize: string` - テーマフォントサイズ名
- `customLabelFontSize: string` - カスタムフォントサイズ（デフォルト: `0.9em`）
- `labelWeight: string` - フォント太さ（デフォルト: `normal`）
- `labelBackgroundColor: string` - ラベル背景テーマ色
- `customLabelBackgroundColor: string` - ラベル背景カスタム色
- `labelTextColor: string` - ラベルテキストテーマ色
- `customLabelTextColor: string` - ラベルテキストカスタム色
- `labelBorderRadius: string` - ラベル角丸設定

#### 背景画像
- `backgroundImage: object` - 背景画像データ
- `backgroundImageCoverOpacity: number` - オーバーレイ透明度（デフォルト: 0.8）
- `backgroundImageRepeat: string` - 背景画像リピート（デフォルト: `no-repeat`）

## 既存実装の分析

### ファイル構成
- `index.tsx` - ブロック登録（registerBlockType）
- `edit.tsx` - エディターコンポーネント（322行）
- `save.tsx` - フロントエンド保存コンポーネント（324行）
- `config.tsx` - 属性定義・設定値・設定項目
- `function/` - ヘルパー関数群
- `inspector-controls/` - 設定パネルコンポーネント群
- `deprecated/` - 非推奨バージョン対応

### 現在の技術スタック
- **Higher Order Components**: `withColors`, `withFontSizes`の使用
- **aktk-block-components**: `SVGIcon`, `StretchTextControl`を使用
- **WordPressコンポーネント**: `InnerBlocks`, `InspectorControls`, `PanelBody`
- **カスタムヘルパー**: `getSpacing`, `getDataFallbackProperty`

### コンポーネント依存関係

#### aktk-block-components使用状況
- ✅ `@aktk/components/svg-icon` - SVGアイコン表示
- ✅ `@aktk/components/stretch-text-control` - 伸縮テキスト入力
- ✅ `@aktk/helper/spacing` - スペーシング計算
- ✅ `@aktk/helper/fallback` - フォールバック属性
- ✅ `@aktk/helper/attribute` - 属性マージ
- ✅ `@aktk/config` - プラグイン設定

#### プラグイン固有コンポーネント（inspector-controls/）
- `BoxType` - ボックススタイル選択
- `BoxBackgroundColor`, `BoxTextColor`, `BoxBorderColor` - 色設定
- `BoxBorderSize`, `BoxBorderStyle`, `BoxBorderRadius` - 形状設定  
- `BoxPadding` - パディング設定
- `LabelText`, `LabelIcon`, `LabelSize`, `LabelFontWeight` - ラベル設定
- `LabelBackgroundColor`, `LabelTextColor`, `LabelBorderRadius` - ラベル色・形状
- `BackgroundImage`, `BackgroundOpacity`, `BackgroundRepeat` - 背景画像

#### function/内ヘルパー関数
- `getBoxBorderRadius()` - ボックス角丸計算
- `getLabelBorderRadius()` - ラベル角丸計算  
- `isLabelOutside()` - ラベル外側判定

### スタイリング実装
- **CSS変数**: `--ystdtb-box-*`形式でレスポンシブ値を設定
- **レスポンシブパディング**: デスクトップ・タブレット・モバイル別設定
- **動的クラス名**: `is-box-style--{boxStyle}`形式
- **条件付きクラス**: `has-background`, `has-border`, `show-default-border`

## 移行設計

### block.json移行方針

#### 1. 新しいファイル構成
```
src/blocks/block-library/box/
├── block.json          # ブロック定義（新規作成）
├── index.php          # PHP登録処理（新規作成）
├── index.tsx          # TypeScript エントリーポイント（既存改修）
├── edit.tsx           # エディターコンポーネント（既存改修）
├── save.tsx           # 保存コンポーネント（既存改修）
├── style.scss         # フロントエンド用CSS（リネーム）
├── style-editor.scss  # エディター用CSS（リネーム）
├── config.tsx         # 設定・属性定義（既存維持）
├── function/          # ヘルパー関数（既存維持）
├── inspector-controls/ # 設定コンポーネント（既存維持）
└── deprecated/        # 非推奨対応（既存維持）
```

#### 2. block.json設計

**基本設定**
```json
{
  "apiVersion": 3,
  "name": "ystdtb/box",
  "title": "ボックス",
  "description": "囲み枠ブロック",
  "category": "ystdtb-common",
  "icon": "admin-comments",
  "keywords": ["box", "ボックス"],
  "textdomain": "ystandard-toolbox",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css", 
  "style": "file:./style-index.css"
}
```

**supports設定**
```json
{
  "supports": {
    "anchor": false,
    "align": false,
    "className": false,
    "lightBlockWrapper": true
  }
}
```

**attributes設定**
- 現在の28属性をblock.jsonに移行
- WordPressのschema形式で型定義
- デフォルト値の明示化

#### 3. PHP統合（index.php）

**ブロック登録**
```php
<?php
/**
 * ボックスブロック
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Box_Block.
 */
class Box_Block {

    const BLOCK_NAME = 'ystdtb/box';

    /**
     * Instance.
     *
     * @var Box_Block
     */
    private static $instance;

    /**
     * Constructor.
     */
    private function __construct() {
        add_action( 'init', [ $this, 'register_block' ], 100 );
    }

    /**
     * Instance.
     *
     * @return Box_Block
     */
    public static function get_instance() {
        if ( ! isset( self::$instance ) ) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * ブロック登録
     *
     * @return void
     */
    public function register_block() {
        register_block_type( __DIR__ );
    }
}

Box_Block::get_instance();
```

**render_callback検討**
- 現在は`save.tsx`による静的保存
- 動的レンダリングの必要性は低い
- 既存のフロントエンド実装を維持

### Higher Order Components維持方針

#### 1. HOC継続使用の判断
- `withColors`, `withFontSizes`は既存実装を維持
- 複雑な色・フォント管理ロジックの安定性を重視
- React hooksへの移行は将来の検討事項とする

#### 2. 維持する理由
- 既存の`props`構造が安定して動作している
- `color.color`, `fontSize.size`形式のアクセスパターンが確立
- InspectorControlsとの連携が適切に機能している
- 移行リスクを回避し、他の改善に集中

### aktk-block-components移行

#### 1. inspector-controls移行計画

**移行対象コンポーネント**
- `BoxBackgroundColor` → `aktk-block-components/components/color-pallet-control`
- `BoxBorderRadius` → `aktk-block-components/components/border-radius-control`  
- `BoxPadding` → `aktk-block-components/components/custom-spacing-select`

**プラグイン固有維持**
- `BoxType` - ボックススタイル選択（5種類）
- `LabelIcon` - SVGアイコン選択（プラグイン固有）
- `BackgroundImage` - 画像選択（複雑なロジック）

#### 2. wp-controls活用
```typescript
// 既存
import { ToggleControl, RangeControl } from '@wordpress/components';

// 移行後  
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
import RangeControl from '@aktk/block-components/wp-controls/range-control';
```

### CSSファイル移行

#### 1. ファイル名変更 ✅ 完了
- `_block.scss` → `style.scss`（フロントエンド用）
- `_edit.scss` → `style-editor.scss`（エディター用）

#### 2. 内容の整理
- **style.scss**: ブロック表示用CSS（`.ystdtb-box`関連）
- **style-editor.scss**: エディター専用CSS（破線枠、プレビュー等）

#### 3. CSS変数の維持
```scss
// レスポンシブパディング変数（維持）
--ystdtb-box-padding-top
--ystdtb-box-padding-top-tablet
--ystdtb-box-padding-top-mobile
// ボーダー・フォントサイズ変数（維持）
--ystdtb-box-border-width
--ystdtb-box-label-font-size
```

### TypeScript型定義強化

#### 1. 属性型定義
```typescript
interface BoxAttributes {
  boxStyle: 'label-none' | 'label-out' | 'label-in' | 'label-wide' | 'label-line';
  boxBackgroundColor?: string;
  customBoxBackgroundColor?: string;
  // ... 他の属性
  boxPadding?: SpacingObject;
  backgroundImage?: MediaObject;
}
```

#### 2. プロパティ型定義
```typescript
interface BoxEditProps {
  attributes: BoxAttributes;
  setAttributes: (attrs: Partial<BoxAttributes>) => void;
  boxBackgroundColor: ColorObject;
  boxTextColor: ColorObject;
  // ... HOC由来のプロパティ
}
```

## 移行時のリスク分析

### 高リスク
- **inspector-controls移行**: 28個の設定項目の移行でUI・UX変更のリスク
- **CSS変数依存**: フロントエンドの表示に直接影響する変数名変更リスク

### 中リスク  
- **block.json移行**: 既存属性との互換性問題
- **aktk-block-components移行**: コンポーネント仕様差異によるUI変更

### 低リスク
- **PHP登録処理**: `register_block_type(__DIR__)`は標準的な実装
- **TypeScript型定義**: ランタイムに影響しない改善
- **コメント日本語化**: 機能に影響しない変更

## 移行手順

### Phase 1: 基盤整備 ✅ 完了
1. **block.json作成** ✅ 完了
   - 28属性の正確な移行
   - supports設定の移行
   - アセットファイルパス設定

2. **index.php作成** ✅ 完了
   - `register_block_type(__DIR__)`実装
   - Box_Blockクラスによるシングルトン実装

3. **CSSファイルリネーム** ✅ 完了
   - `_block.scss` → `style.scss`
   - `_edit.scss` → `style-editor.scss`

### Phase 2: TypeScript移行 ✅ 完了
1. **型定義ファイル作成** ✅ 完了
   - `types.ts`で属性・プロパティ型定義（168行）
   - HOC由来プロパティの型定義
   - BoxAttributes, BoxEditProps, BoxSaveProps定義

2. **メインファイル改修** ✅ 完了
   - `index.tsx`でメタデータ駆動型registerBlockType実装
   - 適切なコメント構造とimport整理
   - `edit.tsx`, `save.tsx`のTypeScript化対応

### Phase 3: コンポーネント移行
1. **HOC維持**
   - `withColors`, `withFontSizes`は既存実装を維持
   - 安定性を重視し移行は行わない

2. **inspector-controls移行**
   - aktk-block-components対応コンポーネントから順次移行
   - プラグイン固有コンポーネントは最後に

### Phase 4: 検証・最適化
1. **機能検証**
   - 28属性すべての動作確認
   - レスポンシブパディング確認
   - 背景画像・ラベル機能確認

2. **互換性検証**
   - 既存投稿・ページでの表示確認
   - テーマカラー連携確認

## 完了基準

### 必須要件
- ✅ block.jsonによるブロック定義
- ✅ PHP自動登録処理（`register_block_type(__DIR__)`）
- ✅ 28属性すべての動作維持
- ✅ 5種類のラベルスタイル動作維持
- ✅ レスポンシブパディング機能維持
- ✅ 背景画像・SVGアイコン機能維持

### 品質要件
- ✅ TypeScript型定義による型安全性
- ✅ aktk-block-componentsの積極活用
- ✅ wp-controlsによる統一的なUI
- ✅ 日本語コメントによる保守性向上

### パフォーマンス要件
- ✅ ビルドサイズの最適化
- ✅ エディターでの動作軽快性維持
- ✅ フロントエンドでの表示性能維持

この移行により、yStandard Toolboxの中核ブロックの一つであるボックスブロックが最新のGutenberg仕様に対応し、保守性と拡張性が大幅に向上します。