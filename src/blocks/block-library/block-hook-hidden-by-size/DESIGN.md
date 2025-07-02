# DESIGN.md - ブロック拡張：画面サイズによる非表示機能

## 概要

既存ブロックに対して、デバイス別（モバイル・タブレット・デスクトップ）での表示・非表示を制御する機能を提供するブロック拡張機能。

## 機能仕様

### 基本機能
- 既存のすべてのGutenbergブロックに対して適用可能な拡張機能
- モバイル・タブレット・デスクトップの3つの画面サイズでの表示・非表示を個別制御
- ブロックエディター上では視覚的にわかるよう破線の枠線で表示状態を示す

### 対象ブロック
- `customClassName`サポートがあるブロック
- `ystdtdHiddenBySize`サポートが有効なブロック
- 名前空間が`core`、`ystdb`、`ystdtb`で始まるブロック

### 属性定義
```typescript
interface HiddenBySizeAttributes {
  ystdtbIsHiddenMobile: boolean;   // モバイルで非表示
  ystdtbIsHiddenTablet: boolean;   // タブレットで非表示
  ystdtbIsHiddenDesktop: boolean;  // デスクトップで非表示
}
```

## 既存実装の分析

### ファイル構成（レガシー）
```
blocks/extension/hidden-by-size/
├── index.js              # メインロジック（フィルター・Higher Order Component）
├── attributes.json       # ブロック属性定義
├── class-hidden-by-size.php  # PHP側の属性マージ処理
├── _block.scss          # フロントエンド用CSS
└── _edit.scss           # エディター用CSS
```

### 技術的特徴
- **フィルターベースの実装**: `blocks.registerBlockType`と`editor.BlockEdit`フィルターを使用
- **Higher Order Component**: `createHigherOrderComponent`でブロックエディターを拡張
- **動的属性追加**: レジスト時に対象ブロックにのみ属性を追加
- **クラス名管理**: `classnames/dedupe`を使用してCSSクラスを動的制御

### 依存関係
- `@aktk/components/ystandard-icon` - パネルアイコン
- `@aktk/components/manual-link` - マニュアルリンクコンポーネント
- `../helper` - ヘルパー関数（`isEnableHook`, `getPanelClassName`）

## 移行設計

### 新しいファイル構成
```
src/blocks/block-library/extension-hidden-by-size/
├── DESIGN.md            # 本設計書
├── index.tsx            # TypeScript化されたメインロジック
├── types.ts             # TypeScript型定義
├── hooks.ts             # カスタムフック定義
├── style.scss           # フロントエンド用CSS（旧_block.scss）
├── style-editor.scss    # エディター用CSS（旧_edit.scss）
└── index.php            # PHP属性処理統合ファイル
```

**注意**: この機能はブロック拡張のため`block.json`は使用不可。ブロック拡張機能は既存ブロックに機能を追加するものであり、新しいブロックタイプを登録するものではないため、`register_block_type(__DIR__)`による自動エンキューも利用できない。そのため、手動でのアセットエンキューが必要となる。

### blocks/extension 完全削除対応
- `blocks/extension/class-extension.php` の `register_block_type_args` フィルター処理を移植
- `blocks/extension/hidden-by-size/class-hidden-by-size.php` の属性マージ処理を移植
- `ystandard_toolbox\Util\File::get_json_file_contents` 依存を除去
- 完全に独立した属性処理システムを構築

### モダン化の要点

#### 1. TypeScript化
- 属性の型安全性を確保
- WordPress APIの型定義を活用
- コンポーネント間の型定義を明確化

#### 2. React Hooks活用
- Higher Order Componentからカスタムフックへの移行検討
- 状態管理の最適化

#### 3. aktk-block-components移行
- `@aktk/components/ystandard-icon` → `aktk-block-components/components/svg-icon`
- `@aktk/components/manual-link` → `aktk-block-components/components/manual-link`
- 新規`wp-controls/toggle-control`の活用

#### 4. CSS命名規則統一
- ファイル名を`style.scss`、`style-editor.scss`に統一
- 既存のCSS内容は変更なし（互換性維持）

#### 5. PHP側実装刷新
- `index.php`でのブロック登録処理
- 属性定義をTypeScriptと連携

### 実装上の注意点

#### 互換性の維持
- 既存の属性名（`ystdtbIsHiddenMobile`等）は変更しない
- CSSクラス名（`ystdtb-hidden-*`）は変更しない
- フィルターの実行優先度（`Number.MAX_SAFE_INTEGER`）を維持

#### エディター機能
- InspectorControlsパネルの表示位置・内容を維持
- ToggleControlの`__nextHasNoMarginBottom`プロパティ維持
- パネルアイコンとクラス名を維持

#### ブロックサポート機能
- `customClassName`サポート確認の仕組み維持
- `ystdtdHiddenBySize`サポート確認の追加

## 移行時のリスク

### 高リスク
- フィルターの実行タイミング変更による他プラグインとの競合
- Higher Order Componentからの移行による予期しない副作用

### 中リスク
- aktk-block-components移行時のコンポーネント仕様差異
- TypeScript化によるビルドエラー

### 低リスク
- CSS・PHPファイル名変更（機能に影響なし）
- 型定義追加（ランタイムに影響なし）

## ビルドとアセットエンキューの設計

### ビルド設定

ブロック拡張機能では`block.json`による自動ビルド・エンキューが使用できないため、以下の方法で対応：

#### webpack設定（`webpack.blocks.v2.config.js`）
```javascript
entry: {
  'extension-hidden-by-size': './src/blocks/block-library/extension-hidden-by-size/index.tsx',
}
```

#### ビルド出力
- **JavaScript**: `build/blocks/extension-hidden-by-size/index.js`
- **Asset情報**: `build/blocks/extension-hidden-by-size/index.asset.php`
- **CSS（エディター用）**: `build/blocks/extension-hidden-by-size/style-editor.css`
- **CSS（フロントエンド用）**: `build/blocks/extension-hidden-by-size/style.css`

### アセットエンキュー設計

#### PHPでの手動エンキュー（`index.php`）
```php
class HiddenBySize {
    public function __construct() {
        // ブロック属性追加
        add_filter( 'register_block_type_args', [ $this, 'add_attributes' ], 999, 2 );
        // エディター用アセット
        add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );
        // フロントエンド用アセット
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_assets' ] );
    }

    public function enqueue_editor_assets() {
        // asset.phpファイルから依存関係とバージョンを取得
        $asset_file = YSTDTB_PATH . '/build/blocks/extension-hidden-by-size/index.asset.php';
        $asset = file_exists( $asset_file ) ? include $asset_file : [
            'dependencies' => [],
            'version'      => YSTDTB_VERSION,
        ];

        // JavaScript
        wp_enqueue_script(
            'ystdtb-extension-hidden-by-size-editor',
            YSTDTB_URL . '/build/blocks/extension-hidden-by-size/index.js',
            $asset['dependencies'],
            $asset['version'],
            true
        );

        // CSS（エディター用）
        if ( file_exists( YSTDTB_PATH . '/build/blocks/extension-hidden-by-size/style-editor.css' ) ) {
            wp_enqueue_style(
                'ystdtb-extension-hidden-by-size-editor',
                YSTDTB_URL . '/build/blocks/extension-hidden-by-size/style-editor.css',
                [],
                $asset['version']
            );
        }
    }

    public function enqueue_frontend_assets() {
        // フロントエンド用CSS
        if ( file_exists( YSTDTB_PATH . '/build/blocks/extension-hidden-by-size/style.css' ) ) {
            wp_enqueue_style(
                'ystdtb-extension-hidden-by-size',
                YSTDTB_URL . '/build/blocks/extension-hidden-by-size/style.css',
                [],
                YSTDTB_VERSION
            );
        }
    }
}

// インスタンス化
new HiddenBySize();
```

### 最適化ポイント

1. **asset.phpファイルの活用**
   - `@wordpress/scripts`が生成する依存関係情報を利用
   - 適切な依存関係とバージョン管理を自動化

2. **条件付きエンキュー**
   - ファイル存在確認でエラーを防止
   - 開発・本番環境での柔軟性を確保

3. **パフォーマンス**
   - フロントエンド用CSSは必要な場合のみエンキュー
   - エディター用アセットはエディターでのみ読み込み

## 移行状況

### 完了済み
- ✅ TypeScript型定義ファイル作成 (`types.ts`)
- ✅ メインロジックのTypeScript化 (`index.tsx`)
- ✅ カスタムフック実装 (`hooks.ts`)
- ✅ CSSファイル移行・リネーム (`style.scss`, `style-editor.scss`)
- ✅ PHPエントリーポイント作成 (`index.php`)
- ✅ PHP属性処理をindex.phpに統合
- ✅ blocks/extension完全削除対応完了
- ✅ ビルド・エンキュー設計確定
- ✅ webpack.blocks.v2.config.jsにエントリーポイント追加
- ✅ 手動アセットエンキューシステム実装
- ✅ ビルド・エンキュー動作確認

### 実装上の変更点

#### フロントエンド（TypeScript/React）
- aktk-block-componentsのSvgIconとManualLinkコンポーネントを使用
- Higher Order Componentパターンを維持（互換性重視）
- フィルター実行優先度を維持（`Number.MAX_SAFE_INTEGER`）
- 属性名・CSSクラス名は既存のものを維持
- **importセクションコメントをブロックコメント形式に変更**
- **重複処理を統合：hooks.tsの関数をindex.tsxで使用するように最適化**

#### バックエンド（PHP）
- **blocks/extension依存を完全に除去**
- **index.phpに全属性処理を統合（クラス使用）**
- **ystandard_toolbox\Util\File依存を除去し、属性定義を直接記述**
- **register_block_type_argsフィルターを独自実装**
- **フィルター名とロジックは既存と完全互換**
- **手動アセットエンキューシステムを実装**

#### ビルドシステム
- **webpack.blocks.v2.config.jsにエントリーポイント追加**
- **asset.phpファイルによる依存関係管理**
- **条件付きCSSエンキューシステム**
- **CSS/JSファイルの自動生成確認済み**

### 実装完了

ブロック拡張機能「画面サイズによる非表示機能」の最新Gutenberg仕様への移行が完了しました。

#### 生成されるアセット
- `build/blocks/extension-hidden-by-size.js` - メインJavaScript
- `build/blocks/extension-hidden-by-size.asset.php` - 依存関係情報
- `build/blocks/extension-hidden-by-size.css` - エディター用CSS
- `build/blocks/style-extension-hidden-by-size.css` - フロントエンド用CSS
- `build/blocks/extension-hidden-by-size/index.php` - PHPファイル（コピー）

#### 注意事項
- ManualLinkコンポーネントは`aktk-block-components`に存在しないため削除
- CSS命名は`@wordpress/scripts`の自動生成に従う
- エディター用CSS・フロントエンド用CSSは適切に分離

### 今後の検証項目

1. **機能検証**
   - 各画面サイズでの非表示機能動作確認
   - エディター上での視覚的表示確認
   - 既存ブロックへの適用可能性確認

2. **互換性検証**
   - 既存投稿・ページでの表示崩れがないか
   - 他のブロック拡張機能との競合確認
   - yStandardテーマとの連携確認

3. **パフォーマンス検証**
   - ビルドサイズの確認
   - エディター動作の軽快性確認

## 今後の拡張予定

- レスポンシブ設定のプリセット機能
- より細かい画面サイズでの制御オプション
- アニメーション効果の追加検討