# コーディング規約と慣例

## 基本方針
- **日本語コメント**: ドキュメント・コメントは日本語で記述
- **WordPress規約遵守**: WordPress Coding Standardsに準拠
- **TypeScript優先**: 新規コードはTypeScriptで実装

## コメント記述ルール

### 基本ルール
- ラインコメント、Docコメント（JSDoc）、インラインコメント → **日本語**
- TypeScriptの型定義やインターフェース名 → **英語**
- importセクションコメント → **英語** + **ブロックコメント**

### importセクションコメント例
```typescript
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies  
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/**
 * Plugin Dependencies
 */
import { CATEGORY } from '@aktk/blocks/config';
```

### コメント順序
1. 外部ライブラリ（classnames等） → コメント無し、先頭に記載
2. WordPress Dependencies 
3. Aktk Dependencies (`@aktk/block-components/**`)
4. Plugin Dependencies（プラグイン固有）

## aktk-block-componentsでのルール

### @wordpress/components直接利用禁止
1. @wordpress/componentsは基本的に直接使用しない
2. wp-controls内にラップしたコンポーネントを作成・利用
3. 新規コンポーネントには必須適用
4. 既存の違反箇所は許容（後から追加されたルール）

### BaseControlによるラップ規則

#### 基本パターン
```typescript
<BaseControl>
    <UnitControl label={ __( 'サイズ', 'ystandard-toolbox' ) } />
</BaseControl>
```

#### ColorPaletteの特別対応
```typescript
<BaseControl label={ __( '背景色', 'ystandard-toolbox' ) }>
    <ColorPalette label={ __( '背景色', 'ystandard-toolbox' ) } />
</BaseControl>
```

#### 理由
- 統一された余白確保
- 視覚的な統一性
- ColorPaletteの設定内容明確化

## PHPコーディング規約

### 命名規則
- **namespace**: `ystandard_toolbox`（サブnamespace使用禁止）
- **クラス名**: `[機能名]_Block`形式
- **定数**: `const BLOCK_NAME = 'ystdtb/[ブロック名]'`
- **メソッド**: WordPress規約準拠

### ブロック登録統一パターン
```php
<?php
namespace ystandard_toolbox;

class Box_Block {
    const BLOCK_NAME = 'ystdtb/box';
    private static $instance;
    
    private function __construct() {
        add_action( 'init', [ $this, 'register_block' ], 100 );
    }
    
    public static function get_instance() {
        if ( ! isset( self::$instance ) ) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function register_block() {
        register_block_type( __DIR__ );
    }
}

Box_Block::get_instance();
```

## TypeScript規約

### 厳密設定
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noImplicitReturns: true`

### 型定義
- インターフェース名は英語
- propsの型定義必須
- 複雑な型は別ファイル（types.ts）に分離

## CSS/SCSS規約

### 命名規則
- BEM記法推奨
- Tailwind CSSクラス優先使用
- カスタムプロパティ活用

### ファイル構成
- `style.scss` - フロントエンド用
- `style-editor.scss` - エディター専用
- 中央集約廃止、個別インポート推奨