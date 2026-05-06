# v2 リリース前 セキュリティレビュー

`/security-review` で `v2/test-1` ブランチを `master` 比較でスキャンした結果をまとめたドキュメント。

- レビュー対象ブランチ: `v2/test-1`
- 比較対象: `master`
- レビュー実施日: 2026-05-04

## サマリ

REST API エンドポイント、動的ブロックの render コールバック、投稿メタの保存処理、カスタム CSS/JS の出力経路、`$wpdb` 直接クエリ、`dangerouslySetInnerHTML` の利用箇所を重点的に確認した。

- 検出された **HIGH 重要度の脆弱性: 1 件**
- MEDIUM 以下: 0 件

検出された 1 件は v2 リリース前に修正必須。

## 検出された脆弱性

### Vuln 1: SNS シェアブロックの `twitterVia` / `twitterRelatedUser` 属性経由の Stored XSS

| 項目 | 内容 |
|---|---|
| ファイル | `src/blocks/block-library/sns-share/index.php` |
| 該当行 | L209 / L212（属性文字列の組み立て）、L226（エスケープなし出力） |
| 重要度 | HIGH |
| カテゴリ | `xss`（Stored） |
| 信頼度 | 9 / 10 |
| 導入元 | v2 リライト（master の v1 実装には存在しない） |

#### 概要

v2 リライトで導入された `ystdtb/sns-share` ブロックのサーバーサイド render コールバック内で、`buttonType === 'official'` のとき、ブロック属性 `twitterVia` / `twitterRelatedUser` を生のまま文字列連結し、`<a>` タグへエスケープなしで出力している。

```php
// L207-213
$twitter_attr = '';
if ( isset( $share_button['official']['twitter-via'] ) && $share_button['official']['twitter-via'] ) {
    $twitter_attr .= ' data-via="' . $share_button['official']['twitter-via'] . '"';
}
if ( isset( $share_button['official']['twitter-related'] ) && $share_button['official']['twitter-related'] ) {
    $twitter_attr .= ' data-related="' . $share_button['official']['twitter-related'] . '"';
}
...
// L226
<a href="..." data-url="<?php echo esc_url_raw( $url ); ?>"<?php echo $twitter_attr; ?> ...>Tweet</a>
```

両属性は `block.json` で `string` 型として宣言されているのみで、サーバ側で追加のサニタイズはかかっていない。`get_share_button_param()`（L279–289）も加工せずそのまま渡している。同じ `<a>` タグ上の他の動的値はすべて `esc_attr` / `esc_url_raw` を通しているのに、`$twitter_attr` だけ漏れている状態。

v1（master）の実装（`blocks/sns-share/class-sns-share-block.php`）は yStandard テーマの `[ys_share_button]` ショートコードへ委譲しており、これらの属性をプラグイン側から echo することは無かった。**この sink は v2 リライトで新規に発生**。

#### 攻撃シナリオ

1. `edit_posts` 権限を持つユーザー（Author 以上）が `ystdtb/sns-share` ブロックを挿入し、`buttonType = 'official'` / `useX = true` に設定する。
2. ブロックの属性 JSON に次のようなペイロードを埋め込む（ブロックエディタの「ソースコード」エディタや、外部から直接 `post_content` を編集できる手段で十分）。

   ```
   "twitterVia": "x\" onfocus=alert(document.cookie) autofocus tabindex=0 x=\""
   ```

3. ブロックデリミッタはコメント形式（`<!-- wp:ystdtb/sns-share {"twitterVia":"..."} -->`）で `post_content` に保存される。`wp_kses_post` / `wp_filter_post_kses` は HTML タグ・テキストをサニタイズするが、HTML コメント内の JSON はそのまま通す。そのため `unfiltered_html` 権限がない Author レベルでも、ペイロードは保存時に削除されない。
4. 投稿が公開されると、`the_content` 経由で render コールバックが実行される。サイト訪問者（管理者がログイン状態でフロントを閲覧している場合も含む）でペイロードが発火し、Cookie の窃取・REST API への成りすましリクエスト等が可能になる。

`twitterRelatedUser` も同じ経路で同様に悪用可能。`twitterHashTags`（L211）はこの属性文字列ではなく URL クエリ（L293）に流れるが、こちらも生で `urlencode` を経ずに連結されているため、防御的に同時にサニタイズしておくのが望ましい。

#### 推奨修正

該当 2 箇所で `esc_attr()` を通す。

```php
if ( ! empty( $share_button['official']['twitter-via'] ) ) {
    $twitter_attr .= ' data-via="' . esc_attr( $share_button['official']['twitter-via'] ) . '"';
}
if ( ! empty( $share_button['official']['twitter-related'] ) ) {
    $twitter_attr .= ' data-related="' . esc_attr( $share_button['official']['twitter-related'] ) . '"';
}
```

防御層を厚くするなら、`get_share_button_param()` 内で `twitterVia` / `twitterRelatedUser` / `twitterHashTags` を Twitter ハンドル / ハッシュタグ用の文字種（`[A-Za-z0-9_,]+`）にサニタイズしておくと、URL クエリへの流入経路も同時にカバーできる。

## 確認済み・問題なしと判断した領域

- **REST API エンドポイント** — 本ブランチで登録されている 14 ルートはすべて `Api::register_rest_route()`（`inc/api/class-api.php:50–64`）を経由しており、`permission_callback` で `current_user_can('manage_options')` が強制されている。認可バイパスなし。
- **他の動的ブロック render コールバック** — `posts` / `parts` を確認。`esc_attr` / `esc_html` / `wp_kses_post` および `intval` キャストが適切に行われている。
- **投稿メタ保存処理** — `inc/post-meta/class-post-meta.php`、`inc/header/class-header-overlay.php`、`inc/navigation/class-menu-replace.php`。生の `$_POST` を保存している箇所はあるが、消費側でホワイトリスト一致（`'on'` / `'off'` / `'none'`）または `int` キャストを通してから出力しているため、未サニタイズが反映される経路はない。
- **カスタム CSS / コード追加 / フォント設定** — `inc/code/`、`inc/custom-css/`、`inc/font/`。いずれも `manage_options` でゲートされており、生 HTML / CSS / JS の出力は仕様（管理者自身に対する XSS は脅威モデル外）。
- **`dangerouslySetInnerHTML`（TSX）** — 4 箇所。
  - `svg-icon`: 内蔵アイコンセットのハードコードのみ
  - `preview-style.tsx`: 管理画面のみで管理者制御
  - `faq-item/deprecated/1.34.1` / `timeline-item/deprecated/1.34.1`: 既存 `post_content`（保存時に kses 通過済み）の HTML を round-trip するのみで、新規 sink を作っていない
- **`$wpdb` 直接クエリ / `eval` / `unserialize` / `shell_exec` / 可変パスでの file inclusion** — 本ブランチでは新規導入なし。

## 対応方針

v2 リリース前に Vuln 1 を修正する。修正コミットは単独で切り、コミットメッセージにレビュー由来である旨を明記する。修正後はユニットテストとして「危険文字列を含む `twitterVia` / `twitterRelatedUser` を持つ attributes でレンダーしても、出力 HTML が `data-via=""...` のような属性離脱を起こさない」ことを担保するケースを追加する案がある。

## 参考

- 元レポート: `/security-review` コマンドの実行結果（このドキュメントは元レポートを翻訳・整形したもの）
