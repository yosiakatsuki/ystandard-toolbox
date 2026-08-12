# 投稿設定のブロックエディター対応とモーダル連携設計

調査日: 2026-08-12

## 結論

投稿設定をブロックエディターのモーダルとして実装できる。

WordPressの`registerPlugin()`、`Fill`、`PluginMoreMenuItem`、`Modal`、`useEntityProp()`を組み合わせれば、独自の保存APIを作らず、通常の投稿保存フローへ投稿メタの変更を統合できる。

実装は次の2責務に分ける。

- モーダルホスト: 起動項目、モーダル枠、セクション配置、共通フィールド描画を担当する
- 設定プロバイダー: 投稿メタ登録、表示条件、ラベル、コントロール種別、選択肢、サニタイズを担当する

環境別のホストは次のとおりとする。

| 環境 | モーダルホスト | Toolbox設定の表示先 |
| --- | --- | --- |
| yStandard v5以降 | yStandard | yStandard投稿設定モーダルへ注入 |
| yStandard v4系 | Toolbox | title・meta descriptionだけyStandardのSEO設定へ注入し、それ以外はToolboxモーダル |
| yStandard以外 | Toolbox | Toolboxモーダル |
| Classic Editor | 従来のPHPメタボックス | 現行UIと保存処理を維持 |

ただし、現在のyStandard v5 alphaには投稿設定モーダルと外部注入APIがまだ存在しない。Toolbox実装を始める前に、yStandard v5側のホスト契約を確定する必要がある。

## 段階実装

初期段階では将来のホスト判定を入れず、yStandardのバージョンや使用テーマに関係なく、投稿のブロックエディターでToolbox独自モーダルを表示する。

- エディターヘッダーの固定領域にysアイコン付きの`[Toolbox] 投稿設定`ボタンを追加する
- 「ツールとオプション」に`[Toolbox] 投稿設定`を追加する
- どちらの起動操作も同じモーダルホストと開閉状態を使用する
- `src/aktk-block-components/`のモーダルラッパーを使用する
- `PluginMoreMenuItem`も`src/aktk-block-components/`のラッパーを介して使用する
- 実験的な`PinnedItems/core`のSlot名への依存はaktk-componentのアダプターへ隔離する
- モーダルの開閉だけを実装し、投稿メタ登録や設定フィールドは追加しない
- yStandard v5側のホストが実装された段階で、ホスト判定とモーダル抑止を追加する

## 調査した現状

### Toolbox

現在の投稿メタは次の4種類である。

| メタキー | 現行UI | 値 | 機能条件 |
| --- | --- | --- | --- |
| `ystdtb_seo_title` | yStandardのSEOメタボックスへPHPで追加 | 文字列 | yStandard 4.12.2以降 |
| `ystdtb_seo_description` | yStandardのSEOメタボックスへPHPで追加 | 文字列 | yStandard 4.12.2以降 |
| `ystdtb-overlay` | Toolboxメタボックス | `none`、`on`、`off` | yStandardのみ |
| `ystdtb-menu-replace` | Toolboxメタボックス | メニュー位置をキーとする配列 | yStandardのみ |

`inc/meta-box/class-meta-box.php`は、PHPフォーム描画、nonce、`save_post`保存を一体で管理している。投稿メタはREST APIへ登録されておらず、ブロックエディターのCore Dataからは更新できない。

`title`の出力はWordPress標準の`pre_get_document_title`を使っているが、meta descriptionとOGPの出力はyStandardのフィルターに依存している。現在の挙動を変えない限り、yStandard以外ではSEOの2項目を表示対象にしない。

### yStandard v4.59 beta

`feature/meta-box`ブランチでは、投稿設定・SEO設定・SNS設定が`PluginDocumentSettingPanel`へ移行されている。

- `register_post_meta()`で既存メタをREST APIへ公開する
- `useEntityProp( 'postType', postType, 'meta' )`で編集する
- `ys_block_editor_post_meta_fields`フィルターでフィールド定義を拡張できる
- 新UI対象の従来メタボックスは`__back_compat_meta_box`でClassic Editor専用にする

この拡張点を使えば、Toolboxの`ystdtb_seo_title`と`ystdtb_seo_description`をyStandard v4.59の`[ys] SEO設定`パネルへ追加できる。

ただし、現在の`get_meta_fields()`は同じフィルター結果をREST登録とUI描画の両方に使う。外部プラグインのメタ登録までテーマが所有する形になるため、v4.59公開前に次の分離を推奨する。

- yStandard自身のメタ定義: REST登録と既存保存互換に使用する
- ブロックエディターのUI定義: `ys_block_editor_post_meta_fields`で拡張する
- 外部プラグインのメタ登録: 各プラグインが所有する

### yStandard v5 alpha

確認した`5.0.0-alpha-11.10.01`では、投稿設定は従来のPHPメタボックスのままで、投稿設定モーダル、フィールドレジストリ、外部設定の注入APIはまだ存在しない。

yStandard v5側には、モーダルの見た目だけでなく、Toolboxなど外部プロバイダーがシリアライズ可能なフィールド定義を追加できるPHPフィルターが必要になる。

## WordPress標準APIとの対応

採用するコンポーネントはWordPressパッケージから公開されているものに限定する。ただし、任意のモーダルボタンをヘッダーへ追加する安定版SlotFillはないため、実験的な`PinnedItems/core`のSlot名をaktk-componentのアダプター内で利用する。

| API | 用途 |
| --- | --- |
| `register_post_meta()` | 既存投稿メタを投稿タイプ単位でREST APIへ公開する |
| `useEntityProp()` | 現在編集中の投稿メタを読み書きする |
| `registerPlugin()` | ブロックエディター拡張を登録する |
| `Fill` | エディターヘッダーの`PinnedItems/core`へモーダル起動ボタンを追加する |
| `PluginMoreMenuItem` | 「ツールとオプション」へモーダル起動項目を追加する |
| `Modal` | アクセシブルなモーダル本体を表示する |

`register_post_meta()`で`show_in_rest`を有効にする場合、対象投稿タイプに`custom-fields`サポートが必要になる。`post`と`page`にはToolboxからサポートを追加してよいが、外部プラグインのカスタム投稿タイプには無条件で追加しない。

参考:

- [register_meta()](https://developer.wordpress.org/reference/functions/register_meta/)
- [REST APIでの登録済みメタの読み書き](https://developer.wordpress.org/rest-api/extending-the-rest-api/modifying-responses/#working-with-registered-meta-in-the-rest-api)
- [@wordpress/core-dataのuseEntityProp](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/#useentityprop)
- [@wordpress/pluginsのregisterPlugin](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-plugins/#registerplugin)
- [@wordpress/componentsのSlotとFill](https://developer.wordpress.org/block-editor/reference-guides/components/slot-fill/)
- [PluginMoreMenuItem](https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-more-menu-item/)
- [Modal](https://developer.wordpress.org/block-editor/reference-guides/components/modal/)
- [PluginDocumentSettingPanel](https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-document-setting-panel/)

## 責務分離

### 投稿メタレジストリ

Toolbox内に投稿設定の正本となるレジストリを作る。各フィールド定義は最低限、次の情報を持つ。

```php
[
	'ystdtb-overlay' => [
		'section'           => 'design',
		'type'              => 'string',
		'control'           => 'radio',
		'label'             => __( 'ヘッダーオーバーレイ', 'ystandard-toolbox' ),
		'help'              => __( '未指定の場合は全体設定に従います。', 'ystandard-toolbox' ),
		'options'           => [
			[ 'label' => __( '全体設定に従う', 'ystandard-toolbox' ), 'value' => 'none' ],
			[ 'label' => __( '有効', 'ystandard-toolbox' ), 'value' => 'on' ],
			[ 'label' => __( '無効', 'ystandard-toolbox' ), 'value' => 'off' ],
		],
		'post_types'        => [],
		'requires_ystandard' => true,
		'sanitize_callback' => [ Post_Settings_Meta::class, 'sanitize_overlay' ],
	],
]
```

PHPのレジストリは次を担当する。

- 投稿タイプとテーマ条件に応じた利用可能フィールドの決定
- `register_post_meta()`の引数生成
- JavaScriptへ渡すシリアライズ可能なUI定義の生成
- Classic Editor向けの従来フォームと保存処理の互換維持

コールバックはJavaScriptへ渡さず、`key`、`section`、`control`、`label`、`help`、`options`など表示に必要な値だけを渡す。

### モーダルホスト

モーダルホストは投稿メタの意味や保存ロジックを持たない。

- エディターヘッダーに起動ボタンを表示する
- 「ツールとオプション」に起動項目を表示する
- モーダルの開閉状態を管理する
- セクションとフィールドを共通コンポーネントで描画する
- `useEntityProp()`の`meta`とsetterを各コントロールへ渡す
- 利用可能フィールドが0件なら起動項目を表示しない

Toolboxホストは`registerPlugin( 'ystandard-toolbox-post-settings', ... )`で登録し、`PinnedItems/core`内のボタンと`PluginMoreMenuItem`から同じ`Modal`を開く。任意のモーダルボタンをヘッダーへ追加する安定版SlotFillはないため、Slot名への依存は`src/aktk-block-components/`のアダプターへ隔離する。

モーダル独自の保存ボタンは作らない。コントロール変更時にCore Dataの編集状態へ反映し、通常の「保存」「更新」で投稿と一緒に保存する。モーダル内には「変更は投稿の保存・更新時に保存されます」と表示する。

### 設定プロバイダー

各機能はレジストリへフィールドを追加するだけにする。

- SEO: title、meta description
- ヘッダー: オーバーレイ
- ナビゲーション: メニュー切り替え
- 将来機能: 同じ定義形式で追加

機能クラスがモーダルの有無やyStandardのバージョンを個別判定しない。ホスト判定を1か所へ集約し、フィールド側は自身の利用条件だけを返す。

## ホスト判定

ホスト判定はテーマスラッグだけでなく、親テーマのメジャーバージョンを見る。

| 条件 | 判定 |
| --- | --- |
| `get_template() !== 'ystandard'` | Toolboxホスト |
| yStandardのメジャーバージョンが4以下 | Toolboxホスト |
| yStandardのメジャーバージョンが5以上 | yStandardホスト |

`version_compare( $version, '5.0.0', '>=' )`だけでは`5.0.0-alpha-*`をv5として判定できない。テーマバージョンの先頭要素を整数化してメジャーバージョンを判定する。

子テーマ利用時も親テーマを判定できるよう、現行どおり`get_template()`と`wp_get_theme( get_template() )`を使う。

## yStandardとの連携契約

### yStandard v4系

SEOの2項目だけを`ys_block_editor_post_meta_fields`へ追加する。

```php
$fields['ystdtb_seo_title'] = [
	'type'        => 'string',
	'control'     => 'textarea',
	'panel'       => 'seo',
	'label'       => __( '<title>タグ用タイトル', 'ystandard-toolbox' ),
	'help'        => __( '空白の場合は投稿タイトルになります。', 'ystandard-toolbox' ),
	'post_types'  => [],
];
```

互換範囲は次のようにする。

| yStandardバージョン | SEOの表示 |
| --- | --- |
| v4.59以降、v5未満 | yStandardの`[ys] SEO設定`ドキュメント設定パネル |
| v4.58以前 | 現行の`ys_meta_box_seo`による従来SEOメタボックス |

Toolboxのオーバーレイとメニュー切り替えは、v4系ではToolboxモーダルへ表示する。

### yStandard v5以降

yStandard側に次のようなUI専用フィルターを用意する。

```php
$sections = apply_filters( 'ys_post_settings_modal_sections', $sections, $post_type );
$fields   = apply_filters( 'ys_post_settings_modal_fields', $fields, $post_type );
```

Toolboxはこのフィルターへセクション・フィールド定義を追加する。投稿メタのREST登録とサニタイズはToolboxが行い、yStandardは登録済みメタのUIだけを描画する。

フィールドIDとセクションIDは衝突を避けるため、`ystdtb/seo-title`、`ystdtb/design`のようにプロバイダー名で名前空間化する。

yStandard v5以降では、Toolboxのモーダルスクリプト、起動項目、モーダル枠を登録しない。Classic EditorではyStandardのモーダルが利用できないため、従来メタボックスを維持する。

独自React要素を別バンドルから直接SlotFillへ注入する方式は初期実装では採用しない。共有Slotの公開方法、Reactコンテキスト、依存バージョンがホストとプロバイダーの結合点になるためである。まずは`radio`、`select`、`text`、`textarea`、`toggle`のシリアライズ可能な定義に限定する。

## 保存設計

### 共通方針

- 既存メタキーと保存値の意味を変えない
- 投稿の保存・自動保存フローへ統合する
- REST登録に`type`、`single`、`show_in_rest`、`sanitize_callback`、`auth_callback`を指定する
- `auth_callback`は対象投稿の`edit_post`権限を確認する
- Classic Editorではnonceと権限確認を維持する
- REST保存と`save_post`の二重保存を起こさない

### SEO

`ystdtb_seo_title`と`ystdtb_seo_description`は`string`、`single => true`として登録する。サニタイズは現行の`wp_strip_all_tags()`相当へ統一し、`wp_unslash()`を適切に扱う。

空文字を保存した場合にメタ行が残ってもフロント出力は変わらない。初期実装では、空文字を削除するためだけの独自REST処理は追加しない。

### オーバーレイ

`ystdtb-overlay`は`string`として登録し、`none`、`on`、`off`以外を`none`へ正規化する。

### メニュー切り替え

`ystdtb-menu-replace`は既存データがメニュー位置をキーとする連想配列であるため、保存形式を変更しない。

RESTスキーマは`object`とし、登録済みメニュー位置から`properties`を動的に組み立てる。各値は既存保存値との互換性を優先して数値文字列として扱い、サニタイズ時に次を行う。

- 未登録のメニュー位置を除外する
- 存在しないメニューIDを除外する
- 空値は「変更なし」として除外する
- 保存配列のキーと値を正規化する

この複合メタは既存値のREST応答を実装前にPHPUnitで確認する。スキーマ不一致が起きる場合は、保存形式変更ではなく専用RESTフィールドを代替案として再評価する。

## 従来メタボックスとの共存

新UIを利用できる投稿タイプでは、Toolboxの従来メタボックスへ`__back_compat_meta_box => true`を付け、Classic Editor専用にする。

新UIの利用条件は次のすべてを満たすこととする。

- ブロックエディターを利用している
- 投稿タイプが`show_in_rest`を有効にしている
- 投稿タイプが`custom-fields`をサポートしている
- 利用可能なToolboxフィールドが1件以上ある

条件を満たさないカスタム投稿タイプでは、従来メタボックスを残す。`post`と`page`以外へToolboxが`custom-fields`サポートを勝手に追加しない。

## 非yStandardテーマでの扱い

Toolboxモーダルの基盤は非yStandardでも動作する。ただし、現在の4項目はすべてyStandard連携機能である。

現行機能条件を維持する初期実装では、非yStandard環境の利用可能フィールドは0件になり、空のモーダルは表示しない。今後、テーマ非依存の投稿設定が追加された時点で、同じToolboxホストへ自動的に表示される。

非yStandardでもSEO設定やメニュー切り替えを有効化する場合は、フロント出力責務と対応テーマ範囲が変わるため、このUI移行とは別機能として判断する。

## UI方針

- 起動ラベルは`[Toolbox] 投稿設定`とする
- モーダルには目的が分かるタイトルを必ず付ける
- セクションは機能単位で分け、同名設定には対象要素名を付ける
- コントロールはWordPress標準コンポーネントに合わせる
- プロジェクト規約に従い、`@wordpress/components`を直接使わず`src/aktk-block-components/`のラッパーを使う
- textareaラッパーが不足する場合は、プラグイン固有ロジックを持たない共通ラッパーを追加する
- モーダルを閉じても編集値は破棄せず、投稿の未保存変更として維持する
- 画面幅が狭い場合は1カラムで表示する
- キーボード操作、Esc、フォーカス復帰は`Modal`の標準挙動を利用する

## ファイル構成案

| ファイル | 役割 |
| --- | --- |
| `inc/post-meta/class-post-settings-registry.php` | セクション・フィールド定義の集約 |
| `inc/post-meta/class-post-settings-meta.php` | REST登録、サニタイズ、投稿タイプ判定 |
| `inc/post-meta/class-post-settings-host.php` | yStandardメジャーバージョンとホスト判定 |
| `inc/post-meta/class-post-settings-editor.php` | ブロックエディター用アセットと設定の受け渡し |
| `src/post-settings/index.tsx` | エディタープラグイン登録 |
| `src/post-settings/post-settings-modal.tsx` | Toolboxモーダルホスト |
| `src/post-settings/field-control.tsx` | 共通フィールド描画 |
| `src/post-settings/types.ts` | セクション・フィールド型 |
| `src/post-settings/test/` | UIとホスト条件のunit test |
| `phpunit/test-post-settings.php` | REST登録、サニタイズ、互換条件のPHPUnit |

既存`inc/meta-box/class-meta-box.php`はすぐに削除しない。新UI対象で`__back_compat_meta_box`を指定できるよう拡張し、Classic Editorと対象外投稿タイプの互換層として残す。

## 実装単位

### メタ定義とREST登録

- 4メタキーの正本定義を作る
- `post`、`page`と対象カスタム投稿タイプへ登録する
- 既存値を読み出せることをPHPUnitで確認する
- Classic Editor保存を同じサニタイズ関数へ寄せる

### yStandard v4 SEO連携

- v4.59のSEOパネルへ2項目を注入する
- v4.58以前では従来PHPフックを維持する
- 同じ画面へ新旧UIが重複しないことを確認する

### Toolboxモーダル

- `PinnedItems/core`内のヘッダーボタン、`PluginMoreMenuItem`、`Modal`を追加する
- 利用可能フィールドだけを表示する
- Core Dataへ変更を反映する
- 従来メタボックスをClassic Editor互換へ切り替える

### yStandard v5ホスト連携

- yStandard側のモーダル契約を実装する
- Toolboxの定義をyStandardホストへ注入する
- Toolbox側のモーダル登録が抑止されることを確認する

この単位は依存順に進める。yStandard v5ホストが未完成でも、v4系と非yStandard向けToolboxホストまでは独立して実装できる。

## 検証マトリクス

| 環境 | 確認内容 |
| --- | --- |
| yStandard v4.59以降、v5未満 | SEOの2項目がyStandard SEOパネル、それ以外がToolboxモーダルへ表示される |
| yStandard v4.58以前 | SEOの2項目が従来SEOメタボックス、それ以外がToolboxモーダルへ表示される |
| yStandard v5 alpha・正式版 | Toolboxモーダルがなく、Toolbox設定がyStandardモーダルへ表示される |
| yStandard子テーマ | 親テーマのメジャーバージョンで正しくホスト判定される |
| 非yStandard | 利用可能フィールドが0件なら起動項目を表示しない |
| Classic Editor | 従来メタボックスで表示・保存できる |
| `post`、`page` | 対象フィールドがREST経由で保存・再読込できる |
| 対応カスタム投稿タイプ | REST、ブロックエディター、`custom-fields`条件を満たす場合だけ新UIになる |
| 権限不足ユーザー | 投稿メタを更新できない |

自動テストでは次を確認する。

- メタ型、RESTスキーマ、初期値、サニタイズ
- yStandardのメジャーバージョン判定
- 利用可能フィールドが0件の時にスクリプトを読み込まないこと
- v4 SEOフィールド定義の注入
- v5ホスト時のToolboxモーダル抑止
- コントロール変更時の`setMeta()`呼び出し
- 既存のフロント出力とPHPUnitに回帰がないこと

実装後は関連unit test、PHPUnit、lint、buildを実行する。ブラウザ確認は別途了承を得たうえで、投稿保存・再読込、キーボード操作、Classic Editorを確認する。

## 実装前に確定する事項

実装方針として残る判断は次の2点である。

- yStandard v5側のフィルター名とフィールド定義形式を、この設計の形で正本化する
- 非yStandardで現在のyStandard依存設定を新たに有効化するかは、今回のUI移行から分離する

この2点以外は、現在の保存キーと挙動を維持したまま段階的に実装できる。
