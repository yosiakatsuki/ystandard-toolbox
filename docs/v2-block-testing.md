# v2 ブロック全体テスト

v2 リリースロードマップ フェーズ3.2「yStandard テーマでの全体テスト」のうち、block-library 配下の全ブロックを対象とした編集・保存・フロント表示確認の進捗管理。

作成ルールは [docs/block-examples-guideline.md](block-examples-guideline.md) を参照。

## 作業の流れ

各ブロックについて以下を順に実施する。

1. **見出しツリー設計**: block.json / edit.tsx / inspector-controls を読み、パネル構成・排他関係を整理して見出しツリーを作成
2. **examples HTML 作成**: `src/blocks/block-library/[ブロック名]/examples/all-variations.html` を執筆
3. **エディター確認**: wp-env のエディターに貼り付け、全設定がエラーなく表示されることを確認
4. **フロント確認**: フロントエンドで全パターンの表示を目視確認

## 進捗

フォルダ名昇順で 1 ブロックずつ対応する。

### banner-link

- [ ] 見出しツリー設計
- [ ] examples HTML 作成
- [ ] エディター確認
- [ ] フロント確認

### block-hook-hidden-by-size

段落ブロック・Box ブロックに設定を適用。各デバイスでの表示確認テキストを含める。
確認パターン: モバイルのみ / タブレットのみ / デスクトップのみ / モバイル+タブレット / タブレット+デスクトップ / モバイル+デスクトップ の 6 パターン。
「設定の組み合わせ例」セクションは省略。

- [ ] 見出しツリー設計
- [ ] examples HTML 作成
- [ ] エディター確認
- [ ] フロント確認

### box

- [ ] 見出しツリー設計
- [ ] examples HTML 作成
- [ ] エディター確認
- [ ] フロント確認

### description-list（+ dd-box / dd-simple / dl-column / dt）

親ブロック側に 1 ファイルで集約。子ブロックの設定も含めて網羅。

- [ ] 見出しツリー設計
- [ ] examples HTML 作成
- [ ] エディター確認
- [ ] フロント確認

### faq（+ faq-item）

親ブロック側に 1 ファイルで集約。

- [ ] 見出しツリー設計
- [ ] examples HTML 作成
- [ ] エディター確認
- [ ] フロント確認

### icon-list（+ icon-list-item）

親ブロック側に 1 ファイルで集約。

- [ ] 見出しツリー設計
- [ ] examples HTML 作成
- [ ] エディター確認
- [ ] フロント確認

### parts

- [ ] 見出しツリー設計
- [ ] examples HTML 作成
- [ ] エディター確認
- [ ] フロント確認

### posts

既存の `all-variations.html` を全面書き直し。

- [ ] 見出しツリー設計
- [ ] examples HTML 作成（書き直し）
- [ ] エディター確認
- [ ] フロント確認

### slider（+ slider-item）

親ブロック側に 1 ファイルで集約。

- [ ] 見出しツリー設計
- [ ] examples HTML 作成
- [ ] エディター確認
- [ ] フロント確認

### sns-share

- [ ] 見出しツリー設計
- [ ] examples HTML 作成
- [ ] エディター確認
- [ ] フロント確認

### timeline（+ timeline-item）

親ブロック側に 1 ファイルで集約。

- [ ] 見出しツリー設計
- [ ] examples HTML 作成
- [ ] エディター確認
- [ ] フロント確認
