# yStandard投稿設定パネルへのToolbox SEO設定追加設計

調査日: 2026-08-16

## 結論

yStandard 4.59側には、外部TSXコンポーネントを既存の`[ys] SEO設定`パネルへ追加する受け口が実装済みである。今回設定が表示されない直接原因は、Toolboxが`ystdtb_seo_title`と`ystdtb_seo_description`を新しいJavaScript APIへ登録しておらず、REST API用の投稿メタ登録も行っていないためである。

修正はToolbox側を中心に行う。yStandard側は現在の`feature/meta-box`ブランチにある標準セクション対応を4.59の配布物へ含める。現在確認した実装に追加修正は不要である。

## 現在の実装

### Toolbox

`inc/post-meta/class-post-meta-seo.php`は、titleとmeta descriptionを次の従来フックへ追加している。

- `ys_meta_box_seo`
- `ys_save_post_meta_seo`

yStandard 4.59未満とClassic Editorでは、この経路で従来メタボックスへ表示・保存できる。

一方、ブロックエディター向けのToolboxプロバイダーは、現在次の項目だけを登録している。

- `[Toolbox]デザイン`: ヘッダーオーバーレイ
- `[Toolbox]ナビゲーション`: メニュー切り替え

titleとmeta descriptionについては、次の処理が存在しない。

- `ystandard.hooks.postSettings.items`へのTSXコンポーネント登録
- `ystdtb_seo_title`と`ystdtb_seo_description`の`register_post_meta()`登録

### yStandard 4.59

yStandardの`feature/meta-box`ブランチでは、標準セクションIDが次のように定義されている。

| セクションID | パネル |
| --- | --- |
| `ystandard/post` | `[ys] 投稿設定` |
| `ystandard/seo` | `[ys] SEO設定` |
| `ystandard/sns` | `[ys] SNS設定` |

`src/js/block-editor/post-meta.js`は、yStandard標準フィールドと外部TSXコンポーネントを同じ`PluginDocumentSettingPanel`内へ描画する。`src/js/block-editor/test/post-settings-extensions.test.js`にも、外部コンポーネントを既存SEOパネルへ追加するテストがある。

確認したコミットは次のとおりである。

- `15814d45`: 投稿設定の外部コンポーネント拡張API
- `4d1a6520`: 標準投稿設定パネルへの外部項目追加

## 表示条件

| 環境 | title・meta descriptionの表示先 |
| --- | --- |
| yStandard 4.59未満 | 従来の`[ys] SEO設定`メタボックス |
| yStandard 4.59以上、v5未満 | yStandardの`[ys] SEO設定`パネル |
| yStandard v5以上 | yStandard設定モーダル内の`ystandard/seo`セクション |
| Classic Editor | 従来の`[ys] SEO設定`メタボックス |

yStandard以外のToolboxモーダルには、この2項目を追加しない。現在のSEO機能はyStandardの出力フックとメタボックスへ依存しているためである。

## Toolbox側の修正方針

### 投稿メタのREST登録

`inc/post-meta/class-post-settings-meta.php`へ次のメタキーを追加する。

- `ystdtb_seo_title`
- `ystdtb_seo_description`

yStandard 4.59以上かつ新しい投稿設定を利用できる投稿タイプに対し、`type: string`、`single: true`、`show_in_rest: true`で登録する。権限確認は既存の`can_edit_post_meta()`を使用する。

サニタイズは従来の`Post_Meta::save_post_textarea()`と同じく、HTMLタグと改行を除去する。既存データの読み出しを維持し、空文字は未設定相当として扱う。

### 独立TSXコンポーネント

次の2コンポーネントを追加する。

```text
src/post-settings/providers/seo-title.tsx
src/post-settings/providers/seo-description.tsx
```

各コンポーネントは`useEntityProp()`で投稿メタを取得・更新し、変更対象以外のメタを保持する。UIは定型フィールド定義へ戻さず、それぞれ独立したTSXとして実装する。

表示内容は従来UIを引き継ぐ。

| 項目 | ラベル | 空欄時の説明 |
| --- | --- | --- |
| title | `<title>タグ用タイトル` | 投稿タイトルを使用する |
| meta description | `meta description` | 抜粋または投稿本文から自動生成する |

`@wordpress/components`は直接importしない。titleには既存のaktk`TextControl`ラッパーを使用し、meta description用には`src/aktk-block-components/wp-controls/textarea-control/`へWordPressコアの薄いラッパーを追加する。

### yStandard標準SEOセクションへの登録

`src/post-settings/providers/index.tsx`から、セクションを新規登録せず次の項目だけを追加する。

```ts
{
	id: 'ystdtb/seo-title',
	section: 'ystandard/seo',
	order: 100,
	Component: SeoTitleSetting,
}

{
	id: 'ystdtb/seo-description',
	section: 'ystandard/seo',
	order: 110,
	Component: SeoDescriptionSetting,
}
```

これにより、yStandard標準のnoindex・meta description無効化設定の後へToolbox設定を追加する。`ystandard/seo`をToolbox側でセクション定義すると予約済みIDとして無視されるため、セクション登録は行わない。

### 従来メタボックスとの共存

`inc/post-meta/class-post-meta-seo.php`の従来フックは削除しない。

- yStandard 4.59未満では従来メタボックスを表示する
- Classic Editorではバージョンにかかわらず従来メタボックスを表示する
- yStandard 4.59以上のブロックエディターでは、yStandardが従来メタボックスを`__back_compat_meta_box`として扱うため重複表示しない

`ys_block_editor_post_meta_fields`には登録しない。JavaScript APIと同時に使用すると、同じ設定が重複表示されるためである。

## yStandard側の扱い

現在の実装で、Toolboxが必要とする次の契約は満たされている。

- 予約済みセクション`ystandard/seo`
- 標準フィールドと外部項目の同一パネル描画
- `order`による外部項目の並び替え
- 外部項目への`postType`・`postId`受け渡し
- 後から追加されたJavaScriptフィルターの再取得
- 項目単位のエラー境界

したがって追加のテーマ修正は行わない。ただし、4.59の実際の配布物に`15814d45`と`4d1a6520`、および更新済み`js/block-editor/post-meta.js`を必ず含める。すでに配布済みの4.59プレリリース版に標準セクション対応が含まれていない場合は、その配布版を互換対象にせず、APIを含む最初のバージョンをToolbox側の下限として再設定する。

## テスト方針

### Toolbox PHP

- yStandard 4.59以上でSEOメタ2件がREST APIへ登録される
- 既存の保存値をREST APIから読み出せる
- REST APIから更新できる
- HTMLタグと改行を従来どおり除去する
- yStandard 4.59未満では新UI用メタを登録しない

### Toolbox TypeScript

- titleとmeta descriptionが`ystandard/seo`を参照する
- `ystandard/seo`セクション自体は追加しない
- 各入力が対象メタだけを更新し、他の投稿メタを保持する
- PHPの初期コンテキストと投稿設定コンテキストが一致しない場合は登録しない
- 既存のデザイン・ナビゲーション設定に回帰がない

### yStandard

既存の次のテストを回帰テストとして維持する。

- 外部TSXコンポーネントを既存SEO設定パネルへ追加できる
- 標準SEOフィールドと外部項目を同時に表示できる
- 予約済みSEOセクションの再定義を無視する
- 外部フィルターの例外で標準SEOパネルを非表示にしない

## 完了条件

- yStandard 4.59のブロックエディターで、`[ys] SEO設定`内にToolboxのtitleとmeta descriptionが表示される
- 入力後に投稿を保存し、再読み込みして値が維持される
- フロント側のtitle、meta description、OGPフォールバックが従来どおり動作する
- yStandard 4.59未満とClassic Editorでは従来メタボックスを使用できる
- `[Toolbox]デザイン`と`[Toolbox]ナビゲーション`の表示・保存に回帰がない

## 調査時の検証

yStandardの`src/js/block-editor/test/post-settings-extensions.test.js`を個別実行し、11件すべてPassした。更新済みビルドアセット`js/block-editor/post-meta.js`にも`ystandard/seo`と共通JavaScriptフックが含まれていることを確認した。
