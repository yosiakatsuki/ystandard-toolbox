# yStandard Toolbox v2アップデート記事メモ

## 作成状況

- 公開記事の既存草案は、このリポジトリ内では見つからなかった
- `README.md`のv2.0.0更新履歴、`docs/v2-roadmap.md`、`docs/v2-manual-update.md`をもとに告知記事案を作成
- 本文: `docs/v2-update-announcement/article.md`

## タイトル候補

- 【yStandard Toolbox v2.0】設定画面・見出しデザイン・主要ブロックを刷新したメジャーアップデート
- 【yStandard Toolbox v2.0】設定画面と主要機能を刷新したメジャーアップデート
- 【yStandard Toolbox v2.0】メジャーアップデートのお知らせ

## 公開前に差し替えるもの

- `v2.0.0 : 2026/XX/XX`の公開日
- 正式版のバージョン表記
- マニュアル公開URL
- アイキャッチ画像
- 見出しデザイン移行手順ページへのリンク
- 記事一覧ブロックCSS変更の詳細ページがある場合はリンク追加
- 更新前の注意をどこまで強めるか

## 参考にした直近記事

- https://wp-ystandard.com/category/infomation/
- https://wp-ystandard.com/ystandard-blocks-v3-25/
- https://wp-ystandard.com/ystandard-toolbox-v1-36/
- https://wp-ystandard.com/ystandard-v4-57/
- https://wp-ystandard.com/ystandard-blocks-v3-24/
- https://wp-ystandard.com/ystandard-v4-56/
- https://wp-ystandard.com/ystandard-blocks-v3-23/

## 合わせたトーン

- 冒頭で「公開しました」と更新の目的を短く説明する
- 「更新内容」セクションでバージョンごとの箇条書きを置く
- その後に主要な変更点を見出しで説明する
- 互換性や注意点は「アップデート前に確認すること」として独立させる
- 最後にバックアップを取って更新する案内と、コミュニティ・製品ページへの導線を置く

## 記事内で強く出したポイント

- 設定画面全体の刷新
- 見出しデザイン編集機能の刷新
- v1見出し設定の互換モードと移行ツール
- yStandard以外のテーマでも使える機能の拡充
- 記事一覧ブロックの独自実装化とCSSカスタマイズ注意
- 主要ブロックの親子ブロック化
- 更新前のバックアップとテスト環境確認

## 注意

- 現在のリポジトリ上では`ystandard-toolbox.php`が`2.0.0-beta-6`、`ystandard-toolbox.json`が`2.0.0-beta-3`になっていたため、正式公開前にバージョン関連ファイルの同期を確認する
- `package.json`の`version`は`1.0.0`のため、配布バージョン管理に使っていない前提で扱う
- 記事本文では正式リリース想定で`v2.0.0`と書いている
