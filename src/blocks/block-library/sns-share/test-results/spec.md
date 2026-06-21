# シェアボタンブロック 操作テスト仕様

エディター上の UI 操作・fixture による HTML 往復検証・手動確認の三層で動作を検証する仕様書。

## テスト方針

- **L1 (fixture-based integration test)**: 属性 → serialize/parse 往復を全パターン網羅で自動検証（CI 毎回）
- **L2 (Playwright UI 自動テスト)**: 排他関係・条件付き表示・ラベル-値対応・操作順序のスポット検証
- **L3 (手動確認)**: フロント見た目・公式ボタン動作・実際のシェア URL パラメータを目視確認

運用ルールは [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md) を参照。

## ブロック特性

- **動的ブロック（SSR）**: `save()` は null、フロント描画は PHP 側（`render_callback` → 独自 HTML 生成）
- **レスポンシブ属性**: なし（align は単一 string 値）
- **RichText**: なし（すべて TextControl / HorizonButtonSelect / ToggleControl / AlignmentToolbar）
- **色・枠線・余白・フォントサイズ設定**: なし

## テスト対象の設定一覧

### ブロックツールバー

| 項目 | 属性 |
|---|---|
| 配置 | `align` |

### サイドバーパネル（4 パネル）

| パネル | 設定項目 | 属性 |
|---|---|---|
| デザイン | ボタン種類 | `buttonType` |
| シェアボタン ON-OFF | X / Twitter / Bluesky / Facebook / はてなブックマーク / LINE | `useX` / `useTwitter` / `useBluesky` / `useFacebook` / `useHatenaBookmark` / `useLINE` |
| テキスト | 上側テキスト / 下側テキスト | `labelBefore` / `labelAfter` |
| X用オプション | viaアカウント / おすすめアカウント / ハッシュタグ | `twitterVia` / `twitterRelatedUser` / `twitterHashTags` |

## 排他関係・条件付き表示

| 条件 | 影響 |
|---|---|
| `buttonType === "official"` | ブロックツールバーから AlignmentToolbar 非表示 |
| `buttonType === "official"` かつ `useBluesky === true` | エディタ上に NoticeWarning 表示（「Blueskyの公式ボタンはありません…」） |
| `buttonType === "official"` | ServerSideRender プレビューが無効化され「公式ボタンの確認は『新しいタブでプレビュー』から…」メッセージ表示 |
| `buttonType === "official"` | フロント出力で Bluesky ボタンは描画されない（PHP 側仕様） |
| 全 SNS OFF（`useX` / `useTwitter` / `useBluesky` / `useFacebook` / `useHatenaBookmark` / `useLINE` すべて false） | エディタ上に「表示できるシェアボタンがありません。」メッセージ表示、フロント未出力 |

## RichText ツールバー制御

該当なし（ブロック内で RichText を使用していない）。

## デバイス別テスト対象

該当なし（レスポンシブ対応属性は存在しない）。

---

## L1 fixture テストパターン（全パターン網羅）

L1 fixture は `test/integration/fixtures/blocks/` 配下に配置。動的ブロックのため `save()` は null で、serialize 時は属性 JSON のみが出力される（デフォルト値は省略される）。

### デザイン > ボタン種類（全選択肢網羅）

- [ ] `ystdtb__sns-share__design__button-type-circle` — `buttonType:"circle"`（デフォルト）
- [ ] `ystdtb__sns-share__design__button-type-square` — `buttonType:"square"`
- [ ] `ystdtb__sns-share__design__button-type-icon` — `buttonType:"icon"`
- [ ] `ystdtb__sns-share__design__button-type-official` — `buttonType:"official"`

### ツールバー > 配置

- [ ] `ystdtb__sns-share__toolbar__align-left` — `align:"left"`
- [ ] `ystdtb__sns-share__toolbar__align-right` — `align:"right"`

※ `align:"center"` はデフォルトで serialize 時に省略されるため fixture 化対象外。

### シェアボタン ON-OFF（boolean 非デフォルト値）

各 SNS を個別に「デフォルトと異なる値」に反転した fixture。

- [ ] `ystdtb__sns-share__toggle__use-x-false` — `useX:false`（デフォルト true）
- [ ] `ystdtb__sns-share__toggle__use-twitter-true` — `useTwitter:true`（デフォルト false）
- [ ] `ystdtb__sns-share__toggle__use-bluesky-true` — `useBluesky:true`（デフォルト false）
- [ ] `ystdtb__sns-share__toggle__use-facebook-false` — `useFacebook:false`（デフォルト true）
- [ ] `ystdtb__sns-share__toggle__use-hatena-bookmark-false` — `useHatenaBookmark:false`（デフォルト true）
- [ ] `ystdtb__sns-share__toggle__use-line-false` — `useLINE:false`（デフォルト true）

### テキスト

- [ ] `ystdtb__sns-share__text__label-before-set` — `labelBefore:"この記事をシェア！"`
- [ ] `ystdtb__sns-share__text__label-after-set` — `labelAfter:"シェアありがとうございます！"`
- [ ] `ystdtb__sns-share__text__label-both-set` — `labelBefore` と `labelAfter` 両方設定

### X用オプション

- [ ] `ystdtb__sns-share__twitter-option__via-set` — `twitterVia:"ystandard"`
- [ ] `ystdtb__sns-share__twitter-option__related-set` — `twitterRelatedUser:"ystandard"`
- [ ] `ystdtb__sns-share__twitter-option__hashtags-single` — `twitterHashTags:"ystandard"`
- [ ] `ystdtb__sns-share__twitter-option__hashtags-multiple` — `twitterHashTags:"ystandard,wordpress"`（カンマ区切り複数）

### 代表的な組み合わせパターン（実用シナリオ）

examples HTML の組み合わせ例を流用。

- [ ] `ystdtb__sns-share__combo__default-article` — デフォルト状態（属性すべて default、空 JSON）
- [ ] `ystdtb__sns-share__combo__sidebar-compact` — アイコン + 左寄せ + X/Facebook のみ
- [ ] `ystdtb__sns-share__combo__x-focused` — X 中心 + labelBefore + twitterVia + twitterHashTags
- [ ] `ystdtb__sns-share__combo__official-main` — 公式 + X/Facebook/はてブ/LINE（Bluesky OFF）

---

## L2 Playwright UI テストパターン（絞り込み）

### 排他関係・カスケード

- [ ] `buttonType: circle/square/icon` 選択時 → ブロックツールバーに AlignmentToolbar 表示
- [ ] `buttonType: official` 選択時 → ブロックツールバーから AlignmentToolbar 非表示
- [ ] `buttonType: official` + `useBluesky: true` → エディタ上に NoticeWarning 表示
- [ ] `buttonType: official` + `useBluesky: false` → NoticeWarning 非表示
- [ ] `buttonType: official` → ServerSideRender プレビュー無効化・代替メッセージ表示
- [ ] `buttonType: circle/square/icon` かつ 1 SNS 以上 ON → ServerSideRender プレビュー描画

### 条件付き表示

- [ ] 全 SNS OFF → 「表示できるシェアボタンがありません。」メッセージ表示
- [ ] いずれか 1 SNS ON + circle/square/icon → SSR プレビューに切り替わる
- [ ] buttonType 切替で NoticeWarning / 代替メッセージの出現・消失が正しいこと

### ラベル-値対応（全選択肢網羅）

ドロップダウン・ラジオ・チップの **全選択肢をクリック** し、対応する属性値が保存されることを確認。

- [ ] ボタン種類（HorizonButtonSelect 4 選択肢: 円・四角・アイコン・公式）→ `buttonType` の 4 値（`circle` / `square` / `icon` / `official`）が保存される
- [ ] 配置ツールバー（AlignmentToolbar 3 選択肢: 左・中央・右）→ `align` の 3 値（`left` / `center` / `right`）が保存される

### 複雑 UI

該当なし。Media Picker / FocalPointPicker / ColorPalette は未使用。

### 操作順序（切り替え・リセットの整合性）

- [ ] ボタン種類: circle → official → circle 切替 → AlignmentToolbar の消失・再出現
- [ ] useBluesky ON → buttonType: official → NoticeWarning 表示 → buttonType: circle に戻す → NoticeWarning 消失
- [ ] 全 SNS を順次 OFF → ノープレビューメッセージ表示 → 1 SNS を ON に戻すと SSR プレビュー復帰

### RichText フォーマット・ツールバー制御

該当なし（ブロック内で RichText を使用していない）。

### TextControl 入力

- [ ] labelBefore 入力 → 属性更新 → 全消去で `labelBefore:""` に戻る
- [ ] labelAfter 入力 → 属性更新 → 全消去で `labelAfter:""` に戻る
- [ ] twitterVia 入力 → 属性更新 → 全消去で `twitterVia:""` に戻る
- [ ] twitterRelatedUser 入力 → 属性更新 → 全消去で `twitterRelatedUser:""` に戻る
- [ ] twitterHashTags 入力 → 属性更新 → 全消去で `twitterHashTags:""` に戻る

---

## L3 手動確認チェックリスト

### フロント見た目（examples/all-variations.html ベース）

- [ ] examples HTML をエディターに貼り付け → 全パターンの見た目を目視確認
- [ ] `buttonType` 4 種類の実描画（circle / square / icon / official）
- [ ] `align` 3 パターンの見た目（left / center / right — `has-align-*` クラスの CSS 適用）
- [ ] labelBefore / labelAfter の表示位置・フォントサイズ

### 公式ボタン動作確認

- [ ] `buttonType: official` でフロントを表示 → 公式 JS（twitter widgets.js / facebook sdk.js / hatena bookmark_button.js / line loader.min.js）が 200 OK で読み込まれる
- [ ] X・Facebook・はてブ・LINE 各公式ボタンが実描画される
- [ ] Bluesky は `buttonType: official` では描画されないことを確認

### X用オプション動作確認（実際のシェアURL）

- [ ] `twitterVia` 設定: Xボタンクリック → 開いたポスト画面URLに `&via=...` 反映
- [ ] `twitterRelatedUser` 設定: 投稿後「おすすめアカウント」として表示される
- [ ] `twitterHashTags` 設定: ポスト本文に `#` 付きで追加される（カンマ区切り複数の展開）
- [ ] `useTwitter`（旧 Twitter）と `useX`（現 X）両方有効時、両方のボタンで同一のシェア URL パラメータが使われる

### 検証エラー・コンソールエラー

- [ ] examples HTML ペースト → 保存 → 再読込 で検証エラーが出ないこと
- [ ] ブラウザコンソールにエラー・警告なし

### テーマとの干渉

- [ ] yStandard テーマで見た目が壊れない
- [ ] 他のブロックと並べたときの整合性

---

## 意地悪パターン（粗探し観点）

共通観点は [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md#粗探しのプロ観点意地悪パターン) を参照。

sns-share ブロック固有の観点:

- **TextControl の特殊文字**: labelBefore / labelAfter に改行・絵文字・`<>&` などの HTML 特殊文字 → HTML エスケープ（`esc_html`）が正しく動作
- **Twitter オプションの特殊文字**: `@` を含む入力、先頭スペース、全角スペース、日本語ユーザー名、ASCII 外文字
- **ハッシュタグ区切りの揺れ**: `"ystandard, wordpress"`（カンマ後スペースあり）/ `"ystandard、wordpress"`（全角カンマ）/ `"#ystandard"`（`#` 混入）→ シェア URL での `hashtags=` パラメータ展開
- **official × Bluesky 単独 ON**: `buttonType:"official"` かつ Bluesky 以外すべて OFF → フロントで空の `<ul>` になる？（PHP 側 `if` 分岐で何も出ない挙動）
- **useX と useTwitter 両方 ON**: 同一のシェア URL を持つ X と Twitter ボタンが並ぶこと（重複に見えるが仕様）
- **全 SNS OFF → 全 ON 復帰**: UI 上でメッセージ→ SSR プレビューへの切り替えが遅延なく反映されるか
- **公式モードでの Facebook SDK 言語設定**: `ja_JP` ハードコードのため他言語サイトでの挙動（該当時のみ）

---

## 補足

- 本仕様は block.json / edit.tsx / index.php / examples HTML の構造に基づく
- ブロックの仕様変更時は本仕様も更新する
- L2 / L3 セッション結果は `operation.md`（Git 管理外）に記録
- L1 fixture は `test/integration/fixtures/blocks/` 配下
