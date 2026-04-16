# ブロック操作テスト ガイドライン

Chrome 拡張（`mcp__claude-in-chrome__*`）を使い、エディター上で実際に UI 操作を行って設定が正しく保存されるかを確認するための共通ガイドライン。

block-library 配下のすべてのブロックに適用される恒久ルール。今後追加されるブロックも同じ手順でテストする。

## 目的

- 各ブロックの UI 設定操作が正しく保存に反映されるかを実機で確認する
- エディター表示・フロント表示の双方で想定通りに表示されるかを確認する
- 保存 → 再読込でブロックの検証エラー・コンソールエラーが発生しないかを確認する

## 対象

- block-library 配下のすべてのブロック（親子ブロックは親側にまとめて実施）

## 前提条件

- テスト用ページは**固定ページ + 非公開設定**を使用する
- ページ URL はセッション開始時にユーザーから都度提供される。**ドキュメントに記載しない**（開発環境・本番非公開投稿のどちらも使う可能性があるため）
- ブラウザタブは既存のものを再利用する
- フロント確認用のプレビュータブは**閉じずにタブ移動で扱う**（編集ページは1つのため、タブ整理が簡単）

## セッション開始フロー

```
1. ユーザー: 「[ブロック名] の操作テスト開始。編集URL: ○○」
2. Claude: tabs_context_mcp で現状把握
3. Claude: 既存タブを該当 URL へ navigate
4. Claude: src/blocks/block-library/[block-name]/test-results/spec.md を読み込む
   - spec.md が存在しない → 作成フローへ（後述）
5. Claude: テスト開始前のクリーンアップ（後述）
6. Claude: 当セッションの実施範囲を宣言
   例: 「spec.md の項目 1〜3 を今回実施します。4 以降は次回」
7. ユーザー: 承認 or 調整
8. Claude: 1 設定ずつ実行 → operation.md に追記
9. Claude: テスト完了後のクリーンアップ
10. Claude: 完了時、サマリと発見した問題を報告
```

**重要**: spec.md は Claude による自動更新をしない。spec.md は「テスト仕様（繰り返し実行される検証項目）」として使い、セッションごとの進捗や結果は operation.md 側に記録する。仕様変更があった場合のみ、ユーザー承認のもとで spec.md を更新する。

## テスト開始・完了時のクリーンアップ

**テスト開始時**: 本文（エディターコンテンツ）が完全に空の状態にする
- 既存ブロックがあればすべて削除してから保存する
- 前回のセッションの残骸や、他のテストブロックが残っていると検証に影響するため

**テスト完了時**: 本文を再度完全に空の状態に戻す
- テストで挿入したブロックをすべて削除
- 保存して次回セッションの開始時にきれいな状態で始められるようにする

**JS で全ブロック削除する snippet**:
```js
wp.data.dispatch('core/block-editor').resetBlocks([]);
```
実行後は「更新」ボタンで保存。

## ファイル構成

各ブロックのフォルダ内に `test-results/` サブフォルダを作成する。

```
src/blocks/block-library/[block-name]/
└── test-results/
    ├── spec.md         # テスト仕様書（Git 管理・永続）
    └── operation.md    # セッション実行ログ（Git 管理外・.gitignore 対象）
```

`operation.md` は `.gitignore` で除外される（`src/blocks/block-library/*/test-results/operation.md`）。

## テスト仕様書（spec.md）

### 作成タイミング

各ブロックの **examples HTML 作成直後 → 操作テスト着手前** に作成する。examples HTML の見出しツリーが spec.md のベースになる。

### 作成手順

1. `block.json` / `inspector-controls/` / `examples/all-variations.html` を読み込み、対象ブロックの設定・排他関係を把握
2. 共通ガイドライン（本ドキュメント）の方針に沿ってテストパターンをドラフト
3. ユーザー承認を得て Git コミット

### 記載項目

各ブロックの仕様に合わせて具体化する（以下は枠組み）。

```markdown
# [ブロック名] 操作テスト仕様

## テスト対象の設定一覧
- パネル1（設定項目A / 設定項目B / ...）
- パネル2（...）
...

## 排他関係・条件付き表示
- [設定X] 設定あり → [設定Y] 非表示
- [設定Z] が [条件] のときのみ [設定W] が有効
...

## テストパターン
### パネル1
- [ ] 設定項目A: パターン1
- [ ] 設定項目A: パターン2
- [ ] 設定項目B: ...
...

## デバイス別テスト観点
- 対象設定（レスポンシブ対応のものだけ列挙）
- 各対象について: desktop のみ / mobile+desktop / 全3デバイス別値

## 意地悪パターン（粗探し観点）
- このブロック固有の意地悪観点
- 共通の意地悪観点は本ガイドラインを参照
```

## 1 設定あたりの操作ルーチン

**1 つの設定を変えるたびに保存・再読込まで行う**。まとめて設定して一括保存はしない。

```
1. エディターで対象ブロックを選択
2. 設定 UI で 1 つの値を変更
3. エディター表示を確認
4. 「更新」ボタンで保存
5. ページを再読込（navigate 再実行）
6. ブロックの検証エラーの有無を確認
7. read_console_messages でコンソールエラー確認
8. プレビューボタンをクリック → 新規タブでフロント表示
9. プレビュータブに switch → DOM・スタイル・コンソールを確認
10. 編集画面タブに戻る（タブは閉じない）
11. 結果を operation.md に追記
```

## テストパターン作成の方針

| 項目 | 方針 |
|---|---|
| 選択肢系（ドロップダウン等） | **全パターン網羅** |
| 色（カラーパレット） | プリセット + 直接指定（hex）の両方。全パターン不要 |
| 文字色 + 背景色の組み合わせ | **文字のみ / 背景のみ / 両方 の 3 パターン** |
| フォントサイズ | プリセット + 直接指定。全パターン不要。**単位は px と em 両方** |
| 余白・枠線（ショートハンド系） | **一括 / 4 箇所 / 2 箇所（上下・左右）/ 3 箇所（上・左右・下）** の構造を意識してパターン作成 |
| デバイス別値 | **各デバイス単独 + 複数デバイス混在** のパターン |
| boolean トグル | true / false 両方 |
| URL 入力 | 内部リンク / 外部リンク / プロトコル違い（https / 相対パス） |

## 「粗探しのプロ」観点（意地悪パターン）

共通で押さえるべき観点:

- **極端な値**: 0、負値、超巨大値（9999px など）、0.01 のような極小値
- **空値・初期値**: 空白のみ入力 → 保存できるか
- **特殊文字**: テキスト欄に改行、絵文字、`<>&` などの HTML 特殊文字、バックスラッシュ
- **操作順序の切り替え**: プリセット色 → カスタム色 → プリセット色 に戻す（切り替えの整合性）
- **排他関係の境界**: 排他関係がある設定を同時設定 → どちらが優先されるか
- **デバイス別 3 値バラバラ**: desktop / tablet / mobile 全て別値
- **リセット操作の完全性**: 設定 → 保存 → リセット → 保存 → 再読込で完全に消えているか
- **ブロック複製後の独立性**: 設定済みブロックを複製 → 両方独立して動くか
- **深いネスト**: 親子ブロックの場合、子を親の中で複数入れ子にする

ブロック固有の観点は spec.md に追加する。

## フロント確認のフロー

### 前提
- **URL を直接 GET せず、Chrome で操作**（ローカル開発環境 URL も含め、Chrome がアクセスできる環境で確認）

### 手順
```
1. 設定保存後、エディターの「プレビュー」ボタンをクリック
2. 新規タブがプレビューURLで開く
3. Claude: tabs_context_mcp でタブ一覧取得、プレビュータブを特定
4. Claude: プレビュータブに switch
5. Claude: read_page / javascript_tool で DOM・スタイル確認
6. Claude: read_console_messages でコンソールエラー確認
7. Claude: 編集画面タブに switch で戻る（タブは閉じない）
```

### フロント確認の観点
- 想定した class が付与されているか
- style 属性・カスタムプロパティが正しく出力されているか
- アイコン・画像が表示されているか
- コンソールエラーなし

## 問題発生時の扱い

| 問題 | 対処 |
|---|---|
| 貼り付け HTML と save() 出力の不一致（検証エラー） | **ブロック実装の問題**。operation.md に記録して報告のみ。「ブロックのリカバリーを試行」は実行しない |
| 保存に失敗（500 エラー等） | operation.md に記録して報告 |
| コンソールエラー | スタックトレースも含めて operation.md に記録して報告 |
| フロント表示崩れ | operation.md に記録して報告。スクリーンショットは取得しない。URL はユーザーに伝えて手動確認を依頼 |

## 結果の記録（operation.md）

### フォーマット

```markdown
# [ブロック名] 操作テスト結果

## YYYY-MM-DD（セッション）

### 環境
- URL: https://example-test.local/wp-admin/post.php?post=123&action=edit
- ブラウザ: Chrome
- テーマ: yStandard
- WP バージョン: 6.X
- プラグイン: vX.X

### テスト結果サマリ
- 実施: XX / XX パターン
- OK: XX
- NG: XX（後述）

### 詳細
| # | 設定項目 | パターン | エディタ | フロント | 再読込 | コンソール | 結果 | 備考 |
|---|---|---|---|---|---|---|---|---|
| 1 | リンクURL | サイト内 | ✅ | ✅ | ✅ | ✅ | OK | |
| 2 | リンクURL | 外部 + 新タブ | ✅ | ✅ | ✅ | ✅ | OK | |
| 3 | 背景色 | プリセット | ✅ | ✅ | ❌ | ✅ | NG | 再読込で検証エラー |
...

### 発見した問題
- **P001**: [概要]
  - 再現手順: ...
  - save.tsx と実 HTML の差分（該当する場合）: ...
  - 関連: ...

---

## YYYY-MM-DD（前回セッション）
...
```

### 記録ルール
- 新しいセッションの結果を**上**に追記（逆時系列）
- URL はそのセッションで使ったものをそのまま記載（テスト環境 / ライブ環境の追跡用）
- NG があった場合は「発見した問題」セクションに詳細を記載

## 役立つ JS snippet 集

`javascript_tool` で実行できる、テストの品質向上・速度アップに役立つ snippet。

### ブロック一覧と検証状態の取得

全ブロックの検証状態を一度に把握する。問題あるブロックを特定しやすい。

```js
wp.data.select('core/block-editor').getBlocks()
  .map(b => ({
    name: b.name,
    clientId: b.clientId,
    isValid: b.isValid,
    validationIssues: b.validationIssues ?? []
  }))
```

### 対象ブロックの属性取得

現在選択中のブロック、または先頭ブロックの属性を取得。

```js
// 先頭ブロック
wp.data.select('core/block-editor').getBlocks()[0].attributes

// 選択中のブロック
const clientId = wp.data.select('core/block-editor').getSelectedBlockClientId();
wp.data.select('core/block-editor').getBlock(clientId)?.attributes
```

### 保存状態の確認

保存ボタンクリック後に呼び出して、保存が完了したかを確認。

```js
({
  isSaving: wp.data.select('core/editor').isSavingPost(),
  didSave: wp.data.select('core/editor').didPostSaveRequestSucceed(),
  isDirty: wp.data.select('core/editor').isEditedPostDirty()
})
```

`isDirty: false` かつ `didSave: true` なら保存成功。

### 全ブロック削除（クリーンアップ用）

テスト開始時・完了時の本文クリア。

```js
wp.data.dispatch('core/block-editor').resetBlocks([]);
```
実行後「更新」ボタンで保存する。

### 属性一括設定（UI 操作を省略したい場合）

UI での属性設定が複雑すぎる場合や、前提条件として素早く属性をセットしたい場合に利用。
**ただし「UI 操作が正しく動くか」が検証対象の場合は UI 経由で設定すること。**

```js
const clientId = wp.data.select('core/block-editor').getBlocks()[0].clientId;
wp.data.dispatch('core/block-editor').updateBlockAttributes(clientId, {
  customBackgroundColor: '#3b82f6',
  mainText: 'テキスト'
});
```

### 特定ブロック名で検索

複数ブロックが混在する場面で対象ブロックを特定。

```js
wp.data.select('core/block-editor').getBlocks()
  .filter(b => b.name === 'ystdtb/banner-link')
```

### 保存後の HTML ソース取得

save() 関数が生成した実際の HTML を確認する（検証エラー原因の特定に）。

```js
wp.blocks.serialize(wp.data.select('core/block-editor').getBlocks())
```

## GIF 録画について

**基本不要**。GIF は 10〜30 フレームの画像として取り込まれ、1 操作あたり数万トークン消費、動作も遅くなる。

特定のバグの再現動画が必要な場合だけスポットで利用する。

## 関連ドキュメント

- [block-examples-guideline.md](block-examples-guideline.md) — examples HTML の作成ガイドライン（spec.md のベースになる）
- [v2-block-testing.md](v2-block-testing.md) — v2 リリースに向けたブロックテストの対象・進捗管理
