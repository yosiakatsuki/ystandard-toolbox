# yStandard Toolbox Debug: 見出し設定

yStandard Toolbox の見出しデザイン設定（v1 / v2）の確認・削除・エクスポート・インポートを行う開発者向けデバッグツール。

## 注意

- **本番環境では使わないこと**。設定の削除・上書きが容易にできるため、誤操作で本番設定を破壊する危険がある
- リポジトリには含まれるが、`npm run zip` / `npm run alpha` の配布物には含まれない（rsync `--exclude='/debug-tool'` で除外）

## インストール手順

このプラグインは独立した WordPress プラグインとして動作する。手動で有効化する。

1. このディレクトリ（`debug-tool/ystandard-toolbox-debug-heading-option/`）を `wp-content/plugins/` 配下に配置（このリポジトリでは既にプラグインディレクトリ内なので、シンボリックリンクや wp-env でのマウントなどで対応）
2. 管理画面「プラグイン」から「yStandard Toolbox Debug: 見出し設定」を有効化

## 使い方

管理画面の「ツール」メニュー配下、最下部に「[ys]見出し編集機能デバッグ」が追加される。

Toolbox 本体の v1 / v2 どちらの環境でも動作する（Toolbox の React SPA に依存しない実装のため）。

主な利用フロー:

1. **v1 環境**: Toolbox v1 で見出し設定を作成 → このツールで JSON エクスポート
2. **v2 環境**: そのサイトを Toolbox v2 へアップデート（または別の v2 環境にエクスポート JSON をインポート）
3. **動作確認**: マイグレーション・互換モードの動作を確認
4. 状態を初期化したいときは「すべて削除」で v1/v2/レベル設定を一括クリア

### 設定値の確認

現在保存されている以下 3 つの option 値と、互換モードフラグを表示する。

- `ystdtb_heading`（v1 形式）
- `ystdtb_heading_v2`（v2 メイン）
- `ystdtb_heading_level`（v2 レベル別）

### 削除

各設定を個別または一括で削除できる。削除時は CSS キャッシュ（transient `ystdtb_heading_v2_css`）も自動でクリアされる。

- v1 設定を削除
- v2 メイン設定を削除
- v2 レベル設定を削除
- すべて削除

### エクスポート

現在の設定を 1 つの JSON ファイルとしてダウンロードする。

ファイル名: `ystdtb-heading-options-YYYYMMDDHHMMSS.json`

### インポート

エクスポート済みの JSON ファイル（または同じ構造を持つ自作 JSON）をアップロードして option を上書きする。

`options` キー内の以下 3 キーのみ反映される。値が `null` の場合は `delete_option()` で削除される。

- `ystdtb_heading`
- `ystdtb_heading_v2`
- `ystdtb_heading_level`

それ以外のキーは無視される。

## JSON フォーマット

```json
{
  "exported_at": "2026-05-06T10:00:00+09:00",
  "site_url": "http://localhost:10020",
  "options": {
    "ystdtb_heading":       null,
    "ystdtb_heading_v2":    { ... },
    "ystdtb_heading_level": { ... }
  }
}
```

## ユースケース

- **互換モード再現**: v2 を削除 + v1 を JSON インポートで流し込み
- **マイグレーション再テスト**: v2 を削除 → 互換モードで起動して v1 → v2 マイグレーションを再実行
- **設定のバックアップ**: テスト前にエクスポートし、テスト後にインポートで戻す
- **テスト fixture 作成**: 任意の状態を作ってからエクスポートし、テストの初期データとして利用

## 関連ドキュメント

- [DESIGN.md](DESIGN.md) — 詳細な設計・仕様
