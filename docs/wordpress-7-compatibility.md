# WordPress 7.0対応メモ

調査日: 2026-05-19

WordPress 7.0は、公式スケジュールでは2026-05-20にリリース予定。
このメモは、yStandard Toolbox v2で確認・対応する内容をまとめる。

## 進捗の見方

- ✅が付いている項目は完了
- 絵文字がない項目は次に扱う項目

## 参照情報

- ✅ [WordPress 7.0 Field Guide](https://make.wordpress.org/core/2026/05/14/wordpress-7-0-field-guide/)
- ✅ [WordPress 7.0 Release Schedule](https://make.wordpress.org/core/7-0/)
- ✅ [Iframed Editor Changes in WordPress 7.0](https://make.wordpress.org/core/2026/02/24/iframed-editor-changes-in-wordpress-7-0/)
- ✅ [Pattern Editing in WordPress 7.0](https://make.wordpress.org/core/2026/03/15/pattern-editing-in-wordpress-7-0/)
- ✅ [Block Visibility in WordPress 7.0](https://make.wordpress.org/core/2026/03/15/block-visibility-in-wordpress-7-0/)
- ✅ [Pattern Overrides in WP 7.0: Support for Custom Blocks](https://make.wordpress.org/core/2026/03/16/pattern-overrides-in-wp-7-0-support-for-custom-blocks/)
- ✅ [Dropping support for PHP 7.2 and 7.3](https://make.wordpress.org/core/2026/01/09/dropping-support-for-php-7-2-and-7-3/)

## 影響まとめ

- ✅ WordPress 7.0の主要な開発者向け変更を確認した
- ✅ このプラグインはブロックプラグインとして確認する
- ✅ `src/blocks/block-library/`配下のブロックは`apiVersion: 3`になっている
- ✅ プラグイン本体の`Requires PHP`は`8.2.0`で、WordPress 7.0のPHP最小要件`7.4.0`より高い
- ✅ 現在の`.wp-env.json`は`latest-ja.zip`を参照している
- ✅ 配布JSONの`tested`は`6.9.0`のままになっている

## 対応リスト

- ✅ WP70-01 WordPress 7.0環境でwp-envを起動できるようにする
- ✅ WP70-02 `.wp-env.json`の`core`をWordPress 7.0検証用に切り替える
- ✅ WP70-03 WordPress 7.0環境でプラグインを有効化してFatal errorが出ないことを確認する
- ✅ WP70-04 WordPress 7.0環境でyStandardテーマと組み合わせて管理画面・フロント画面を確認する
- ✅ WP70-05 WordPress 7.0環境で非yStandardテーマでも共通機能を確認する
- ✅ WP70-06 `src/blocks/block-library/`配下の全ブロックがエディターに挿入できることを確認する
- ✅ WP70-07 `apiVersion: 3`ブロックだけの投稿でiframed editor表示になっても編集UIが崩れないことを確認する
- WP70-08 エディター専用CSSがiframed editor内で正しく読み込まれることを確認する
- WP70-09 ブロックツールバーとInspector Controlsがiframed editor内で正しく動作することを確認する
- WP70-10 `contentOnly`内で編集対象にしたい属性へ`role: content`を追加する
- WP70-11 `banner-link`の`mainText`と`subText`に`role: content`が必要か確認する
- WP70-12 `box`の`label`に`role: content`が必要か確認する
- WP70-13 `icon-list-item`の`content`に`role: content`を追加する
- WP70-14 `timeline-item`の`labelContents`に`role: content`が必要か確認する
- WP70-15 `faq-item`はInnerBlocks中心のため`contentRole`または`role: content`の必要性を確認する
- WP70-16 `sns-share`の`labelBefore`と`labelAfter`に`role: content`が必要か確認する
- WP70-17 `parts`の`partsId`はコンテンツ扱いにしない方針で問題ないか確認する
- WP70-18 `posts`の検索・表示条件系属性はコンテンツ扱いにしない方針で問題ないか確認する
- WP70-19 コンテナ系ブロックに`supports.listView`を追加するか判断する
- WP70-20 `faq`に`supports.listView`を追加するか確認する
- WP70-21 `timeline`に`supports.listView`を追加するか確認する
- WP70-22 `icon-list`に`supports.listView`を追加するか確認する
- WP70-23 `description-list`に`supports.listView`を追加するか確認する
- WP70-24 `slider`に`supports.listView`を追加するか確認する
- WP70-25 既存の画面サイズ別非表示機能とWordPress 7.0のBlock Visibilityが競合しないことを確認する
- WP70-26 `metadata.blockVisibility`がbooleanとobjectの両方になり得る前提で、独自処理が値を壊さないことを確認する
- WP70-27 独自の`ystdtbIsHiddenMobile`、`ystdtbIsHiddenTablet`、`ystdtbIsHiddenDesktop`はv2では維持する
- WP70-28 Core Block Visibilityへの自動移行はv2リリース後の改善候補として扱う
- WP70-29 Pattern Overrides対応として、Block Bindingsに対応させる属性があるか確認する
- WP70-30 Pattern Overrides対応が不要な属性は追加実装しない
- WP70-31 Dynamic blockの`parts`、`posts`、`sns-share`でWordPress 7.0環境のフロント表示を確認する
- WP70-32 `posts`ブロックの`WP_Query`出力がWordPress 7.0環境で崩れないことを確認する
- WP70-33 `sns-share`ブロックの外部サービス用script読み込みがWordPress 7.0環境で崩れないことを確認する
- WP70-34 `wp_script_add_data( $handle, 'defer', true )`を使っている箇所を確認する
- WP70-35 script loading strategyへ移行するか判断する
- WP70-36 `wp_enqueue_script_module`やInteractivity APIを使っていないため、Script Modules依存対応は追加しない
- WP70-37 AI Client、Abilities API、Connectors APIは現行機能に直接関係しないため追加対応しない
- WP70-38 PHP最小要件は現行の`Requires PHP: 8.2.0`を維持する
- WP70-39 検証後に`ystandard-toolbox.json`の`tested`を`7.0.0`へ更新する
- WP70-40 検証後に`ystandard-toolbox-beta.json`の`tested`を`7.0.0`へ更新する
- WP70-41 検証後に必要なら`Requires at least`を見直す
- WP70-42 `npm run lint`を実行する
- WP70-43 `npm run test`を実行する
- WP70-44 `npm run build`を実行する
- WP70-45 必要に応じて`npm run test:unit:php`を実行する
- WP70-46 手動確認用の投稿または固定ページに主要ブロックを配置する
- WP70-47 手動確認対象ブロックの前に見出しと確認ポイントを入れる
- WP70-48 WordPress 7.0環境で保存後のブロック検証エラーが出ないことを確認する
- WP70-49 WordPress 7.0環境でフロント表示のCSS崩れがないことを確認する

## 設計方針

- WordPress 7.0対応は、既存v2実装を大きく作り替えず、互換性確認とメタデータ補強を中心に進める
- `apiVersion: 3`は維持し、iframe内で崩れる箇所があれば個別対応する
- `contentOnly`対応は、ユーザーが直接編集する文字列属性だけに絞る
- スタイル・表示条件・ID・検索条件の属性は原則として`role: content`にしない
- 画面サイズ別非表示は、v2では既存独自機能を維持する
- CoreのBlock Visibilityへの移行は、既存コンテンツの互換性とUI重複を確認してから判断する
- 新しいWordPress 7.0 APIは、現行機能に必要な場合だけ採用する
- 配布情報の`tested`更新は、WordPress 7.0環境での確認後に行う

## 確認対象

- `ystandard-toolbox.php`
- `ystandard-toolbox.json`
- `ystandard-toolbox-beta.json`
- `.wp-env.json`
- `src/blocks/block-library/*/block.json`
- `src/blocks/block-library/*/edit.tsx`
- `src/blocks/block-library/*/save.tsx`
- `src/blocks/block-library/*/index.php`
- `src/blocks/block-library/block-hook-hidden-by-size/`
- `inc/blocks/class-blocks.php`
- `inc/enqueue/class-enqueue.php`
- `inc/header/class-header-overlay.php`
- `inc/plugin-settings/class-plugin-settings.php`

## 検証コマンド

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:unit:php`

## 注意

- `npm run test:unit:php`はwp-envとDockerに依存する
- `npm run test`のうちPHPUnitはwp-envの状態に影響される
- WordPress 7.0リリース前後で`.wp-env.json`の`core`指定は見直す
- リリース直前のRC情報と正式リリース後の内容に差分が出た場合は、このメモを更新する
