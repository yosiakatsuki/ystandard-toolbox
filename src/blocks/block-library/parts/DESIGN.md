# DESIGN.md - パーツブロック

## 概要

「[ys]パーツ」カスタム投稿タイプで作成したパーツコンテンツを表示するサーバーサイドレンダリングブロック。エディター内でパーツのプレビュー表示に対応し、専用のスタイルシート読み込み機能を持つ。

## 機能仕様

### 基本機能
- パーツ選択UI（SelectControl）
- サーバーサイドレンダリング（`ServerSideRender`）
- エディター内プレビュー表示
- ブロックエディター用CSS動的読み込み（`transformStyles`）
- ショートコード連携（`[ys_parts]`）

### 表示パターン
1. **パーツ未選択時**: パーツ選択UIを大きく表示（グレー背景エリア）
2. **パーツ選択時**: ServerSideRenderでプレビュー表示 + 視覚的な「[ys]パーツ」ラベル

### 属性仕様（1個）
- `partsId: string` - 選択された[ys]パーツのID（デフォルト: `''`）

## 既存実装の分析

### ファイル構成
- `index.tsx` - ブロック登録（レガシー構造）
- `edit.js` - エディターコンポーネント（48行）
- `config.js` - 属性・supports定義
- `block.json` - ブロックメタデータ（attributes未定義）
- `index.php` - PHP登録処理（render_callback実装済み）
- `inspector-controls/parts-id.js` - パーツ選択コントロール
- `editor-styles/index.js` - エディター用CSS動的読み込み

### 現在の技術スタック
- **WordPress Components**: `InspectorControls`, `PanelBody`, `ServerSideRender`
- **WordPress Block Editor**: `useBlockProps`, `transformStyles`
- **レガシーコンポーネント**: `@wordpress/components`の`BaseControl`, `SelectControl`を直接使用
- **プラグイン固有ヘルパー**: `@aktk/helper/blockConfig`で動的データ取得

### PHPバックエンド連携

#### render_callback実装
```php
public function render_callback( $attributes, $content = '' ) {
    $attributes = wp_parse_args(
        $attributes,
        [
            'partsId'  => '',
            'parts_id' => '',
        ]
    );

    $attributes['parts_id'] = $attributes['partsId'];
    $parts_id = $attributes['parts_id'];
    // ショートコード用に変換
    $attributes = Shortcode::parse_shortcode_attributes( $attributes );

    $content = do_shortcode( "[ys_parts {$attributes}]" );

    return apply_filters( "ystdtb_parts_block_content_{$parts_id}", $content );
}
```

**特徴**:
- `partsId` → `parts_id`への変換（スネークケース）
- `[ys_parts]`ショートコードへの委譲
- パーツID別フィルターフック対応

#### add_block_config実装
```php
public function add_block_config( $option ) {
    // [ys]パーツ一覧を取得
    $parts = get_posts([
        'post_type'      => 'ys-parts',
        'posts_per_page' => -1,
    ]);

    $parts = array_map(
        function ( $post ) {
            return [
                'label' => $post->post_title,
                'value' => $post->ID,
            ];
        },
        $parts
    );

    $option['partsList'] = $parts;
    $option['partsPreviewStyles'] = $this->get_parts_preview_styles();

    return $option;
}
```

**JavaScriptへ公開されるデータ**:
- `partsList`: パーツ一覧（label/value形式）
- `partsPreviewStyles`: プレビュー用CSSスタイル配列

#### get_parts_preview_styles実装
```php
private function get_parts_preview_styles() {
    $result = [];
    $styles = wp_styles();

    // コアブロックCSS
    if ( isset( $styles->registered['wp-block-library']->src ) ) {
        $src  = $styles->registered['wp-block-library']->src;
        $path = untrailingslashit( ABSPATH ) . $src;
        if ( is_file( $path ) ) {
            $result[] = [
                'css'            => file_get_contents( $path ),
                'baseURL'        => site_url() . $src,
                '__unstableType' => 'plugin',
            ];
        }
    }

    // Toolbox ブロックCSS
    $path = YSTDTB_PATH . '/css/ystandard-toolbox.css';
    if ( is_file( $path ) ) {
        $result[] = [
            'css'            => file_get_contents( $path ),
            'baseURL'        => YSTDTB_URL . '/css/ystandard-toolbox.css',
            '__unstableType' => 'plugin',
        ];
    }

    return apply_filters( 'ystdtb_parts_block_preview_styles', $result );
}
```

**機能**:
- WordPressコアブロックCSSの読み込み
- yStandard ToolboxブロックCSSの読み込み
- `transformStyles`でエディター内プレビュー用に変換
- フィルターフックで拡張可能

### コンポーネント依存関係

#### レガシー直接使用（移行必要）
- ❌ `@wordpress/components/BaseControl` → `@aktk/block-components/wp-controls/base-control`
- ❌ `@wordpress/components/SelectControl` → `@aktk/block-components/components/custom-select-control`
- ❌ `__nextHasNoMarginBottom`, `__next40pxDefaultSize`プロパティ削除必要

#### プラグイン固有ヘルパー（維持）
- ✅ `@aktk/helper/blockConfig` - `getBlockConfig('partsList')`, `getBlockConfig('partsPreviewStyles')`

#### WordPress標準（維持）
- ✅ `@wordpress/block-editor` - `useBlockProps`, `InspectorControls`, `transformStyles`
- ✅ `@wordpress/server-side-render` - `ServerSideRender`
- ✅ `@wordpress/components` - `PanelBody`（wp-controlsへの移行は不要）

### スタイリング実装

#### style-editor.scss（エディター専用）
- `.ystdtb-parts__edit-parts-select` - パーツ未選択時のグレー背景エリア
- `.ystdtb-parts__edit-parts-preview` - プレビュー表示エリア
  - `::before` - 左上の「[ys]パーツ」青ラベル
  - `::after` - 青色オーバーレイ（透明度0.05）
  - コンテンツ幅制限（`--ystd-content-default-width`対応）
  - `alignfull`, `alignwide`対応

#### style.scss（フロントエンド用）
- 現在はほぼ空（フロントエンドは`[ys_parts]`ショートコード側で処理）

## 移行設計

### block.json移行方針

#### 1. 新しいファイル構成（目標）
```
src/blocks/block-library/parts/
├── block.json          # ブロック定義（attributes追加必要）✅ 既存改修
├── index.php          # PHP登録処理 ✅ 既存完成
├── index.tsx          # TypeScriptエントリーポイント（メタデータ駆動化必要）
├── edit.tsx           # エディターコンポーネント（TypeScript化必要）
├── types.ts           # TypeScript型定義（新規作成）
├── style.scss         # フロントエンド用CSS ✅ 既存完成
├── style-editor.scss  # エディター用CSS ✅ 既存完成
├── inspector-controls/
│   ├── index.ts       # エクスポート（TypeScript化）
│   └── parts-id.tsx   # パーツ選択（TypeScript化・CustomSelectControl移行）
├── editor-styles/
│   ├── index.ts       # エクスポート（TypeScript化）
│   └── editor-styles.tsx # CSS読み込み（TypeScript化・リネーム）
└── config.js          # 廃止予定（block.jsonに統合）
```

#### 2. block.json設計

**基本設定** ✅ 完了
```json
{
  "apiVersion": 3,
  "name": "ystdtb/parts",
  "title": "[ys]パーツ",
  "description": "「[ys]パーツ」を表示するブロック",
  "category": "ystdtb-common",
  "keywords": ["parts", "ys-parts"],
  "textdomain": "ystandard-toolbox"
}
```

**attributes設定**（追加必要）
```json
{
  "attributes": {
    "partsId": {
      "type": "string",
      "default": ""
    }
  }
}
```

**supports設定**（追加必要）
```json
{
  "supports": {
    "customClassName": false,
    "className": false,
    "html": false,
    "align": false
  }
}
```

#### 3. PHP統合（index.php）✅ 既存完成

**現在の実装**:
- ✅ `register_block_type(__DIR__, ['render_callback' => ...])`実装済み
- ✅ `Parts_Block`クラスによるシングルトン実装
- ✅ `add_block_config`フックでパーツ一覧・スタイル公開
- ✅ ショートコード連携処理完成

**改善不要**: 既存PHPコードは最新仕様に準拠済み

### TypeScript移行

#### 1. 型定義（新規作成）

**types.ts**
```typescript
/**
 * パーツブロック属性
 */
export interface PartsAttributes {
	partsId: string;
}

/**
 * パーツブロックEditコンポーネントのプロパティ
 */
export interface PartsEditProps {
	attributes: PartsAttributes;
	setAttributes: (attrs: Partial<PartsAttributes>) => void;
	clientId: string;
}

/**
 * パーツ選択肢の型
 */
export interface PartsOption {
	label: string;
	value: string | number;
}
```

#### 2. index.tsx改修（メタデータ駆動化）

**変更前**:
```typescript
import { registerBlockType } from '@wordpress/blocks';
import { attributes, supports } from './config';

registerBlockType( 'ystdtb/parts', {
	apiVersion: 2,
	title: __( '[ys]パーツ', 'ystandard-toolbox' ),
	// ...
	attributes,
	supports,
	edit,
} );
```

**変更後**:
```typescript
import { registerBlockType } from '@wordpress/blocks';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';
import { COLORS } from '@aktk/block-components/config';
import { CATEGORY } from '@aktk/blocks/config';
// @ts-ignore
import metadata from './block.json';
import edit from './edit';
import icon from './icon';
import './style.scss';

export function registerPartsBlock() {
	const attributes = mergeDefaultAttributes(
		metadata.name,
		metadata.attributes
	);

	registerBlockType( metadata.name, {
		...metadata,
		...{
			icon: (
				<HardDrive
					stroke={ COLORS.iconForeground }
					style={ { fill: 'none' } }
				/>
			),
			category: CATEGORY.common,
			attributes,
			edit,
			save() {
				return null;
			},
		},
	} );
}

registerPartsBlock();
```

**主な変更点**:
- `block.json`からメタデータをインポート
- `mergeDefaultAttributes`で属性マージ
- `config.js`の廃止
- 日本語コメント追加

#### 3. edit.tsx改修（TypeScript化）

**主な変更点**:
- `PartsEditProps`型定義の適用
- `ServerSideRender`の型安全化
- `import type`の活用

#### 4. inspector-controls移行

**parts-id.tsx改修**:

**変更前**:
```javascript
import { BaseControl, SelectControl } from '@wordpress/components';

<BaseControl __nextHasNoMarginBottom>
	<SelectControl
		label={ __( 'パーツ', 'ystandard-toolbox' ) }
		value={ partsId }
		options={ partsIdList }
		onChange={ ( value ) => {
			setAttributes( { partsId: value } );
		} }
		__next40pxDefaultSize
		__nextHasNoMarginBottom
	/>
</BaseControl>
```

**変更後**:
```typescript
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';
import type { PartsEditProps } from '../types';

const PartsId = ( props: PartsEditProps ) => {
	const { attributes, setAttributes } = props;
	const { partsId } = attributes;

	const defaultSelectLabel = __( '選択してください', 'ystandard-toolbox' );
	const partsList = getBlockConfig( 'partsList', [] );

	const options = [
		{ key: '', name: `-- ${ defaultSelectLabel } --` },
		...partsList.map( ( item: PartsOption ) => ({
			key: String( item.value ),
			name: item.label,
		} ) ),
	];

	return (
		<BaseControl label={ __( 'パーツ', 'ystandard-toolbox' ) }>
			<CustomSelectControl
				value={ partsId }
				options={ options }
				onChange={ ( value ) => {
					setAttributes( { partsId: value } );
				} }
			/>
		</BaseControl>
	);
};
```

**主な変更点**:
- `SelectControl` → `CustomSelectControl`
- オプション形式: `{label, value}` → `{key, name}`
- `__nextHasNoMarginBottom`, `__next40pxDefaultSize`プロパティ削除
- ラベルを`BaseControl`に移動
- TypeScript型定義追加

### アーキテクチャ上の特徴

#### 1. サーバーサイドレンダリング
- フロントエンド表示はPHPで動的生成
- `save()`は`null`を返す（静的HTML保存なし）
- `render_callback`で`[ys_parts]`ショートコードに委譲

#### 2. エディター内プレビュー
- `ServerSideRender`でリアルタイムプレビュー
- `transformStyles`でCSS変換・適用
- WordPress標準ブロックCSSも読み込み

#### 3. 動的データ連携
- PHPで`partsList`を生成してJavaScriptへ公開
- `getBlockConfig`でデータ取得
- ビルド時ではなく実行時にパーツ一覧を取得

## 移行時のリスク分析

### 高リスク
- **CustomSelectControl移行**: オプション形式変換でUI変更の可能性
- **getBlockConfig依存**: PHPデータ連携が正しく動作するか要確認

### 中リスク
- **TypeScript化**: 型定義ミスによるビルドエラー
- **ServerSideRender型**: WordPress型定義との整合性

### 低リスク
- **block.json移行**: 既存PHPと完全互換
- **CSS**: 既存スタイルシート変更なし
- **PHP**: 改修不要（既存完成）

## 移行手順

### Phase 1: 基盤整備 ✅ 一部完了

1. **block.json改修**（追加必要）
   - `attributes`定義追加
   - `supports`定義追加

2. **index.php** ✅ 完了
   - 改修不要（既存完成）

3. **CSS** ✅ 完了
   - 改修不要（既存完成）

### Phase 2: TypeScript移行

1. **types.ts作成**
   - `PartsAttributes`定義
   - `PartsEditProps`定義
   - `PartsOption`定義

2. **index.tsx改修**
   - メタデータ駆動型実装
   - `config.js`依存削除
   - 適切なコメント追加

3. **edit.js → edit.tsx**
   - TypeScript化
   - 型定義適用
   - ServerSideRender型安全化

### Phase 3: コンポーネント移行

1. **inspector-controls/parts-id.tsx**
   - TypeScript化
   - `CustomSelectControl`移行
   - オプション形式変換

2. **editor-styles/index.tsx**
   - TypeScript化
   - 型定義追加

3. **config.js削除**
   - block.jsonへの完全移行確認後削除

### Phase 4: 検証・最適化

1. **機能検証**
   - パーツ選択動作確認
   - ServerSideRenderプレビュー確認
   - エディター用CSS読み込み確認
   - フロントエンド表示確認

2. **互換性検証**
   - 既存パーツブロックの表示確認
   - パーツ一覧の取得確認
   - ショートコード連携確認

3. **ビルド検証**
   - `npm run build:blocks:v2`成功確認
   - アセットサイズ確認
   - TypeScriptエラー解消

## 完了基準

### 必須要件
- ✅ block.jsonによる完全なブロック定義（attributes, supports含む）
- ✅ TypeScript化（index.tsx, edit.tsx, types.ts）
- ✅ CustomSelectControlへの移行
- ✅ config.js削除
- ✅ パーツ選択機能の動作維持
- ✅ ServerSideRenderプレビュー動作維持

### 品質要件
- ✅ TypeScript型定義による型安全性
- ✅ aktk-block-componentsの活用
- ✅ wp-controlsによる統一的なUI
- ✅ 日本語コメントによる保守性向上
- ✅ レガシープロパティ（`__next*`）の完全削除

### パフォーマンス要件
- ✅ ビルドサイズの維持
- ✅ エディターでの動作軽快性維持
- ✅ ServerSideRenderのパフォーマンス維持

この移行により、パーツブロックが最新のGutenberg仕様に対応し、TypeScript化とaktk-block-componentsの活用により保守性が大幅に向上します。特にPHP側は既に最新仕様に対応済みのため、フロントエンド側のみの移行で完了する比較的低リスクな移行となります。
