# 投稿設定表示・yStandard連携設計

調査日: 2026-08-12
更新日: 2026-08-18

## 結論

投稿設定は、次の2責務へ分離する。

- 表示ホスト: 起動UI、モーダルまたは設定パネル、セクション配置を所有する
- 設定プロバイダー: 設定ごとのTSXコンポーネント、投稿メタ登録、表示条件、保存処理を所有する

設定項目は`radio`や`select`などの定型定義へ変換しない。各設定を独立したTSXコンポーネントとして実装し、JavaScriptフィルターへコンポーネント参照を登録する。

Toolbox、yStandard 4.59系、yStandard v5は同じJavaScriptフック契約を使用する。表示ホストがToolboxモーダル、yStandard投稿設定パネル、yStandardモーダルのいずれへ切り替わっても、Toolboxの設定コンポーネントは変更しない。

## 対応環境

| 環境 | 表示ホスト | Toolbox設定の扱い |
| --- | --- | --- |
| yStandard v5以降 | yStandard | ToolboxのTSXコンポーネントをyStandardモーダルへ追加する |
| yStandard v4.59.0-alpha-1以降、v5未満 | yStandard | ToolboxのTSXコンポーネントをブロックエディターの投稿設定パネルへ追加する |
| yStandard v4.59.0-alpha-1未満 | 従来のPHPメタボックス | 新しい投稿設定UIは使用しない |
| yStandard以外 | Toolbox | 外部プロバイダーが登録した設定をToolboxモーダルへ追加できる |
| Classic Editor | 従来のPHPメタボックス | 現行UIと保存処理を維持する |

titleとmeta descriptionのyStandard SEOパネル連携は、[yStandard投稿設定パネルへのToolbox SEO設定追加設計](./post-settings-seo-panel-design.md)に従う。

## 設計原則

### ホストは設定内容を知らない

表示ホストは次の処理だけを担当する。起動UIと開閉状態はToolboxモーダルを使用する場合だけ所有する。

- エディターヘッダーのySアイコンを表示する
- 「︙」メニューに`[ys]投稿設定`を表示する
- 両方の操作から同じモーダルと開閉状態を使用する
- 登録済みセクションと設定コンポーネントを順番に配置する
- 設定が0件の場合は起動UIを表示しない
- 後から設定が登録・解除された場合に表示を更新する
- 設定ごとにエラー境界を設け、1つの設定の例外でモーダル全体を停止させない

ホストは次の情報を持たない。

- 投稿メタキー
- コントロール種別
- ラベルや選択肢
- 値の取得・更新方法
- サニタイズ方法
- 設定固有の表示条件

### 設定は独立したTSXにする

各設定コンポーネントは、必要なWordPress APIとaktk-componentを直接使用する。

- `useEntityProp()`による投稿メタの取得・更新
- `BaseControl`、`ToggleGroup`、`CustomSelectControl`などによるUI構築
- 設定固有の説明、注意書き、複数コントロール、条件分岐
- オブジェクト型メタの部分更新

ホストから共通の`meta`や`setMeta()`を渡さない。将来、投稿メタ以外のCore Dataや独自APIを使用する設定も同じ契約で追加できるようにする。

### PHPとJavaScriptの責務を混ぜない

PHPは次を担当する。

- 使用テーマとyStandardバージョンの判定
- 投稿タイプ、投稿ID、機能の利用可否判定
- `register_post_meta()`、RESTスキーマ、サニタイズ、権限確認
- 設定コンポーネントが必要とする初期データの受け渡し
- ホスト用・プロバイダー用スクリプトの読み込み判定

JavaScriptは次を担当する。

- 設定コンポーネントの登録
- 選択された表示ホスト内の表示
- Core Dataへの編集値反映
- 設定固有の操作と状態管理

React要素や関数をPHPからJSON化して渡さない。

## 共通フック契約

### PHPの表示先選択

使用中のyStandardバージョンから初期表示先を判定し、PHPフィルターで変更できるようにする。

```php
$display_mode = apply_filters(
	'ys_post_settings_display_mode',
	$display_mode,
	[
		'post_type' => $post_type,
		'post_id'   => $post_id,
	]
);
```

| 戻り値 | 動作 |
| --- | --- |
| `legacy-meta-box` | yStandardの従来メタボックスを表示する |
| `toolbox-modal` | Toolboxが起動UIとモーダルを表示する |
| `ystandard-panel` | yStandard 4.59系の投稿設定パネルへ表示する |
| `ystandard-modal` | yStandard v5以降のモーダルへ表示する |
| `false` | Toolboxの表示ホストを読み込まない |

初期値はyStandard 4.59.0-alpha-1未満を`legacy-meta-box`、yStandard 4.59.0-alpha-1以上かつv5未満を`ystandard-panel`、yStandard 5.0.0-alpha-1以上を`ystandard-modal`、yStandard以外を`toolbox-modal`とする。

### JavaScriptのセクション追加

セクションは`@wordpress/hooks`の次のフィルターへ追加する。

```ts
const SECTION_FILTER = 'ystandard.hooks.postSettings.sections';
```

型は次のとおりとする。

```ts
interface PostSettingsContext {
	apiVersion: 1;
	postType: string;
	postId: number;
}

interface PostSettingsSection {
	id: string;
	title: string;
	order: number;
}
```

登録例:

```tsx
import { addFilter } from '@wordpress/hooks';

addFilter(
	'ystandard.hooks.postSettings.sections',
	'ystandard-toolbox/design',
	( sections: PostSettingsSection[], context: PostSettingsContext ) => [
		...sections,
		{
			id: 'ystdtb/design',
			title: __( '[Toolbox]デザイン', 'ystandard-toolbox' ),
			order: 100,
		},
	]
);
```

プロバイダーは`context`を使って追加可否を判断できる。ただし、PHPで判定できる条件はPHP側で解決し、不要なスクリプト自体を読み込まない。

### JavaScriptの設定追加

設定コンポーネントは次のフィルターへ追加する。

```ts
const ITEM_FILTER = 'ystandard.hooks.postSettings.items';
```

型は次のとおりとする。

```ts
import type { ComponentType } from '@wordpress/element';

interface PostSettingsItemProps {
	postType: string;
	postId: number;
}

interface PostSettingsItem {
	id: string;
	section: string;
	order: number;
	Component: ComponentType< PostSettingsItemProps >;
}
```

登録例:

```tsx
addFilter(
	'ystandard.hooks.postSettings.items',
	'ystandard-toolbox/header-overlay',
	( items: PostSettingsItem[] ) => [
		...items,
		{
			id: 'ystdtb/header-overlay',
			section: 'ystdtb/design',
			order: 10,
			Component: HeaderOverlaySetting,
		},
	]
);
```

コンポーネントのインスタンスではなくコンポーネント参照を渡す。ホストは`key`と共通propsを付けて描画する。

```tsx
<item.Component postType={ context.postType } postId={ context.postId } />
```

### 登録値の規則

- `id`は`ystdtb/header-overlay`のようにプロバイダー名で名前空間化する
- `section`は登録済みセクションIDを指定する
- `order`は昇順で表示する
- yStandard標準セクションは`10`から`30`を使用するため、Toolbox独自セクションは`100`以降へまとめる
- 同じ`order`の場合はフィルター適用後の追加順を維持する
- 同じ`id`が複数登録された場合は後から登録された定義を採用する
- 不正な定義、未登録セクション、不正なコンポーネントは描画しない
- 開発モードでは無視した定義を`console.warn()`で通知する
- 設定コンポーネントの描画中に例外が発生した場合は、その設定だけをエラー表示へ置き換える

### 後から追加された設定への追従

ホストは初回描画時に`applyFilters()`を実行するだけでなく、`@wordpress/hooks`の`hookAdded`と`hookRemoved`を監視する。

対象のセクション・設定フィルターが追加または解除された場合は、登録一覧を再取得して再描画する。これにより、ホストスクリプトとプロバイダースクリプトの厳密な実行順へ依存しない。

購読解除はReactコンポーネントのアンマウント時に行う。

## React実行環境

ToolboxとyStandardは独立してビルドするが、次のWordPressパッケージを外部依存として使用する。

- `@wordpress/element`
- `@wordpress/hooks`
- `@wordpress/core-data`
- `@wordpress/components`
- `@wordpress/i18n`

React本体やJSX runtimeを各成果物へ同梱しない。`@wordpress/scripts`が生成する`.asset.php`の依存関係を使い、WordPressが提供する同じReact・hooksレジストリ上で動作させる。

独自SlotFillは採用しない。別バンドルで個別に`createSlotFill()`を実行すると同じ名前でも別インスタンスになり、共有方法がホスト実装へ依存するためである。

## スクリプト分離

### モーダルホスト

Toolbox側のホストを独立したエントリーにする。

```text
src/post-settings/host/index.tsx
src/post-settings/host/post-settings-modal.tsx
src/post-settings/host/use-post-settings-items.ts
```

表示先が`toolbox-modal`で、ブロックエディターを利用できる場合だけ読み込む。

### Toolbox設定プロバイダー

Toolboxの設定登録も独立したエントリーにする。

```text
src/post-settings/providers/index.tsx
src/post-settings/providers/header-overlay.tsx
src/post-settings/providers/menu-replace.tsx
src/post-settings/providers/config.ts
```

yStandard 4.59.0-alpha-1以上で、対象投稿タイプがREST APIと`custom-fields`を利用できる場合に読み込む。

| 環境 | Toolboxホスト | Toolboxプロバイダー |
| --- | --- | --- |
| yStandard v4.59.0-alpha-1以上、v5未満 | 読み込まない | 読み込む |
| yStandard v5以降 | 読み込まない | 読み込む |
| yStandard v4.59.0-alpha-1未満 | 読み込まない | 読み込まない |
| yStandard以外 | 読み込む | yStandard依存設定は読み込まない |

この分離により、yStandard 4.59系とv5以降でToolboxモーダルを抑止しても、Toolbox設定コンポーネントはyStandardホストへ登録される。

## Toolbox設定コンポーネント

### オーバーレイ設定

`HeaderOverlaySetting`を1つの独立したTSXとして実装する。

```tsx
function HeaderOverlaySetting( { postType, postId }: PostSettingsItemProps ) {
	const [ meta, setMeta ] = useEntityProp(
		'postType',
		postType,
		'meta',
		postId
	);
	const value = meta?.[ 'ystdtb-overlay' ] || 'none';

	return (
		<BaseControl>
			<ToggleGroup
				label={ __( 'ヘッダーオーバーレイ', 'ystandard-toolbox' ) }
				value={ value }
				options={ overlayOptions }
				onChange={ ( nextValue ) =>
					setMeta( {
						...meta,
						'ystdtb-overlay': nextValue,
					} )
				}
			/>
		</BaseControl>
	);
}
```

未保存値と空文字は`none`として表示する。保存値は従来どおり`none`、`on`、`off`とする。

### メニュー切り替え設定

`MenuReplaceSetting`を1つの独立したTSXとして実装する。メニュー位置ごとに汎用フィールド定義を登録せず、コンポーネント内部で必要な数のコントロールを描画する。

PHPから次のシリアライズ可能な初期データだけを渡す。

```ts
interface MenuReplaceConfig {
	locations: Array< {
		name: string;
		label: string;
	} >;
	menus: Array< {
		value: string;
		label: string;
	} >;
}
```

コンポーネントは`ystdtb-menu-replace`を読み、変更したメニュー位置だけをイミュータブルにマージする。他の位置の値を失わない。

メニュー切り替えを表示するかは、既存の`ystdtb_can_replace_menu`を含むPHP側の判定を正本にする。利用不可の場合は設定データを渡さず、コンポーネントも登録しない。

## 投稿メタと保存

投稿メタの登録・検証は引き続きToolboxが所有する。

### オーバーレイ

- メタキー: `ystdtb-overlay`
- REST型: `string`
- 許可値: `none`、`on`、`off`
- 権限: 対象投稿の`edit_post`

### メニュー切り替え

- メタキー: `ystdtb-menu-replace`
- REST型: `object`
- 保存形式: メニュー位置をキー、メニューIDの数値文字列を値とする既存配列
- 空文字: 「変更なし」として許可する
- 書き込み時: 未登録位置、存在しないメニューID、不正値を除外する
- 読み取り時: 廃止済み位置を含む既存値もREST応答できるスキーマにする
- 権限: 対象投稿の`edit_post`

各TSXはCore Dataへ編集値を反映する。モーダル独自の保存ボタンは作らず、通常の投稿保存・更新時に保存する。

Classic Editorではnonce、権限確認、サニタイズを持つ従来メタボックスを維持する。新UI対象の従来メタボックスには`__back_compat_meta_box`を付ける。

## yStandard側の実装契約

yStandard 4.59系の投稿設定パネルとyStandard v5のモーダルは、次の契約を共有する。

- `ystandard.hooks.postSettings.sections`を適用する
- `ystandard.hooks.postSettings.items`を適用する
- `hookAdded`と`hookRemoved`を監視して登録変更へ追従する
- 共通propsとして`postType`と`postId`を設定コンポーネントへ渡す
- 登録値の検証、並び替え、重複ID処理をToolboxホストと同じ規則で行う
- yStandard自身の投稿設定も同じJavaScriptフィルターへTSXコンポーネントとして登録する

Toolbox固有のReact要素、メタキー、コントロール実装はyStandardへ含めない。

ホスト間で挙動がずれないよう、JavaScriptフック名、型定義、正規化規則、テストケースをこの文書を正本として共有する。

## テスト方針

### Toolboxプロバイダー

- オーバーレイTSXが未保存値を`none`として表示する
- オーバーレイ変更時に既存メタを維持して`setMeta()`する
- メニュー位置と選択肢をPHP設定から表示する
- 1つのメニュー位置を変更しても他の位置を失わない
- メニュー切り替え利用不可時は設定を登録しない
- yStandard 4.59.0-alpha-1以上ではプロバイダースクリプトを読み込む
- yStandard 4.59.0-alpha-1未満では従来メタボックスを表示する
- yStandard 4.59系ではToolboxホストを読み込まない
- v5ホストでもプロバイダーは読み込む

### Toolboxホスト

- ヘッダーアイコンと「︙」メニューが同じモーダルを開く
- 登録された独自コンポーネントを描画する
- セクションと設定を`order`順に表示する
- 設定が0件の場合は起動UIを表示しない
- フックが後から追加・解除された場合に再描画する
- 表示先が`legacy-meta-box`、`ystandard-panel`、`ystandard-modal`の場合はToolboxホストを登録しない

### PHP

- yStandard新UI対応下限と表示先のバージョン判定
- RESTメタ登録、スキーマ、サニタイズ、権限確認
- 既存保存値をREST APIから読み出せること
- メニュー位置とメニュー選択肢の初期データ
- Classic Editorの保存互換

## 現在の実装からの変更点

定型フィールド方式で作成した次の実装は採用しない。

- PHPの`ys_post_settings_modal_sections`と`ys_post_settings_modal_fields`によるUI定義
- `control`、`label`、`options`、`meta_key`、`meta_path`の汎用フィールド定義
- `FieldControl`による共通コントロール分岐
- ホスト側の汎用`getMetaValue()`と`setMetaValue()`

次の実装は維持できる。

- `ys_post_settings_display_mode`によるPHPの表示先選択
- オーバーレイとメニュー切り替えのRESTメタ登録
- サニタイズと権限確認
- 従来メタボックスのClassic Editor互換
- ヘッダーアイコンと「︙」メニューで同じモーダルを開く構成

実装時は、ホストとプロバイダーのエントリー分離を先に行い、その後にオーバーレイとメニュー切り替えを個別TSXへ移行する。

## 今回の仕様決定

- 設定UIは1設定につき1つの独立TSXを基本にする
- PHPフィルターは表示先選択だけに使う
- セクションと設定追加には`@wordpress/hooks`のJavaScriptフィルターを使う
- 設定登録値にはReactコンポーネント参照を含める
- ホストは投稿メタや共通フィールドレンダラーを持たない
- 各設定TSXが値の取得・更新と固有UIを所有する
- ToolboxホストとToolboxプロバイダーは別スクリプトにする
- yStandard 4.59系とv5は同じJavaScriptフィルター契約でホストを実装する
- ToolboxとyStandardはWordPressが提供するReactとhooksレジストリを共有する
- ToolboxのUI実装ではaktk-componentを使用する
