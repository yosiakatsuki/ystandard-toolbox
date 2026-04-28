# 記事一覧 ブロック 操作テスト仕様

記事一覧（posts）ブロックのテスト仕様書。

対象ブロック:
- `ystdtb/posts`（dynamic block、`save() = null`、`render_callback` 経由でフロント描画）

dynamic block かつ PHP 側ロジックが多いブロックのため、四層構成（L0 PHPUnit / L1 fixture / L2 Chrome UI / L3 手動）で動作を検証する。

## テスト方針

- **L0 (PHPUnit)**: `render_callback($attributes)` の出力 HTML を `DOMDocument` + `DOMXPath` で網羅検証（CI 毎回、`phpunit/test-posts-block.php`）
- **L1 (fixture-based integration test)**: 属性の parse → serialize 往復（dynamic block なのでシリアライズ後はブロックコメントのみ。属性 JSON のロスなし保持を確認）
- **L2 (Chrome UI 自動テスト)**: 7 つの Inspector Controls パネルのラベル-値対応・条件付き表示・操作順序をスポット検証
- **L3 (手動確認)**: フロントエンドでの実投稿データ表示・レスポンシブ挙動・テーマとの相互作用を目視確認

運用ルールは [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md) を参照。L0 PHPUnit は本ブロック固有のオプトイン対応（[testing.md の PHPUnit セクション](../../../../../docs/testing.md#phpunit-テストオプトイン)）。

## ブロック特性

- **単体ブロック**: 親子関係なし
- **dynamic block**: `save()` は `null`、フロント表示は `render_callback` で `[ys_parts]` 風のテンプレート読み込みを行う（`templates/posts.php` / `templates/posts-simple.php`）
- **テンプレート上書き**: テーマの `ystdtb-templates/posts/posts.php` でテンプレートを上書き可能
- **innerBlocks**: なし
- **className サポート**: `false`（`wp-block-ystdtb-posts` プレフィックスを出力しない方針）。ただし `attributes.className` は明示的に定義されており wrapper class に追加可能
- **align サポート**: `['full']` のみ（`alignfull` 配置のみ）
- **example**: `block.json` の `example.attributes` に `count: 3, listType: 'card'` を定義（ブロック挿入プレビュー用）
- **モバイル判定**: `Posts_Block::is_mobile()` で `wp_is_mobile()` をベースに `ystdtb_blocks_posts_is_mobile` フィルター経由で切替可能
- **エディター内表示**: `ServerSideRender` でフロントと同じ HTML をプレビュー（`Disabled` でラップしてリンクを無効化）
- **filter フック**:
  - `ystdtb_blocks_posts_template_path` — テンプレートパス変更
  - `ystdtb_blocks_posts_template_args` — テンプレート変数の差し替え
  - `ystdtb_blocks_posts_is_mobile` — モバイル判定の切替

## テスト対象の設定一覧

### 基本設定（パネル: BasicOption）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| 表示件数 | `count` | number | 3 |
| モバイル時の表示件数 | `countMobile` | number | undefined |
| 並び順フィールド | `orderby` | string | `'date'` |
| 並び順 | `order` | string | `'DESC'` |

### 表示設定（パネル: DisplayOption）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| デザインタイプ | `listType` | string | `'card'`（`card` / `list` / `simple`） |
| モバイル時のデザインタイプ | `listTypeMobile` | string | undefined |
| カラム数（PC） | `colPc` | number | 3 |
| カラム数（タブレット） | `colTablet` | number | 3 |
| カラム数（モバイル） | `colMobile` | number | 1 |

### サムネイル設定（パネル: Thumbnail）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| サムネイル表示 | `showImg` | boolean | true |
| アスペクト比（PC） | `thumbnailRatio` | string | `'16-9'`（9 種） |
| アスペクト比（モバイル） | `thumbnailRatioMobile` | string | `'16-9'` |
| 画像サイズ | `thumbnailSize` | string | `'full'` |

### メタ情報（パネル: Meta）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| 日付表示 | `showDate` | boolean | true |
| カテゴリー表示 | `showCategory` | boolean | true |
| 概要表示 | `showExcerpt` | boolean | false |
| 概要行数 | `excerptLines` | number | 2 |

### 絞り込み（パネル: SearchOption）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| 投稿タイプ | `postType` | string | `'post'` |
| タクソノミー | `taxonomy` | string | undefined |
| ターム slug | `termSlug` | string | undefined |

### 高度な絞り込み（パネル: AdvancedSearch）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| 投稿 ID 指定 | `postIn` | string | undefined |
| 投稿名（slug）指定 | `postNameIn` | string | undefined |
| 親投稿 ID | `postParent` | string | undefined |

### 高度な表示（パネル: AdvancedDisplay）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| 表示開始位置 | `offset` | number | undefined |
| モバイル時の表示開始位置 | `offsetMobile` | number | undefined |

### その他

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| 追加 CSS クラス | `className` | string | `''` |
| 配置（`alignfull`） | `align`（supports） | — | undefined |

## 排他関係・条件付き表示

| 条件 | 影響 |
|---|---|
| `taxonomy` と `termSlug` の両方設定 | `tax_query` でフィルター（片方だけだと無視） |
| `postIn` 指定 | `post__in`（指定 ID のみに限定） |
| `postNameIn` 指定 | `post_name__in`（指定 slug のみに限定） |
| `postParent` 指定 | `post_parent` で子投稿のみ表示（階層型 post_type 向け） |
| `is_singular()` で表示中 | `post__not_in` で表示中投稿を結果から自動除外 |
| `wp_is_mobile()` true（モバイル） | `countMobile` / `listTypeMobile` / `thumbnailRatioMobile` / `offsetMobile` が設定されていれば PC 値を上書き |
| `showImg: false` | `<figure class="ystdtb-posts__thumbnail">` を出力しない |
| `listType: 'simple'` | `templates/posts-simple.php` を使用 → `<figure>`・カレンダーアイコン・カテゴリーアイコンを出力しない |
| `excerptLines === 2`（または未指定） | `style=""`（空、CSS 変数のデフォルト値 2 を使用） |
| `excerptLines` が 2 以外 | `style="--ystdtb--posts--excerpt-line-clamp:N"`（CSS カスタムプロパティで上書き） |
| `showDate: false` かつ `showCategory: false` | `<div class="ystdtb-posts__meta">` を出力しない |

## デバイス別テスト対象

posts ブロックには以下 4 つのモバイル切替属性がある（PC 値とは独立）。

| PC 用属性 | モバイル用属性 |
|---|---|
| `count` | `countMobile` |
| `listType` | `listTypeMobile` |
| `thumbnailRatio` | `thumbnailRatioMobile` |
| `offset` | `offsetMobile` |

`colPc` / `colTablet` / `colMobile` はそれぞれ独立属性で、CSS の `col-{device}--N` クラスで切替（フロントの CSS メディアクエリ依存）。

---

## L0 PHPUnit テストパターン（render_callback 出力検証）

実装は `phpunit/test-posts-block.php`。`Posts_Block::get_instance()->render_callback($attributes)` の戻り値 HTML を `DOMDocument` + `DOMXPath` で解析し、要素・クラス・inline style・件数・順序を検証する。

実行: `npm run test:unit:php`

### テストケース一覧

| # | テスト名 | 検証内容 |
|---|---|---|
| 1 | `test_default_renders_card_layout_with_3_items` | デフォルトで `is-card` wrapper + `<li>` × 3 |
| 2-4 | `test_list_type_outputs_correct_class`（@dataProvider） | `card` / `list` / `simple` で `is-{type}` クラス |
| 5-6 | `test_count_outputs_correct_item_count`（@dataProvider） | `count: 1` / `count: 6` で `<li>` 出現数一致 |
| 7 | `test_col_classes_are_applied_to_list` | `col-mobile--N col-tablet--N col-desktop--N` クラス |
| 8 | `test_show_img_true_renders_figure` | `<figure class="ystdtb-posts__thumbnail">` 出現 |
| 9 | `test_show_img_false_no_figure` | `<figure>` 非出現 |
| 10-18 | `test_thumbnail_ratio_outputs_correct_class`（@dataProvider 全 9 種） | `is-{ratio}` クラス（16-9 / 4-3 / 3-2 / 1-1 / 2-1 / 3-1 / 9-16 / 4-5 / 2-3） |
| 19 | `test_show_date_false_no_date_element` | `.ystdtb-posts__date` 非出現 |
| 20 | `test_show_category_false_no_cat_element` | `.ystdtb-posts__cat` 非出現 |
| 21 | `test_show_excerpt_false_no_excerpt_element` | `.ystdtb-posts__excerpt` 非出現 |
| 22 | `test_excerpt_default_lines_outputs_empty_inline_style` | `excerptLines` 未指定で `style=""` ★今回バグ防止 |
| 23 | `test_excerpt_lines_1_outputs_css_variable` | `excerptLines: 1` で `style="--ystdtb--posts--excerpt-line-clamp:1"` ★ |
| 24 | `test_excerpt_lines_4_outputs_css_variable` | `excerptLines: 4` で `style="--ystdtb--posts--excerpt-line-clamp:4"` ★ |
| 25 | `test_post_type_page_returns_only_pages` | `postType: 'page'` で固定ページのみ取得 |
| 26 | `test_post_in_returns_specified_ids_only` | `postIn` で指定 ID のみ取得 |
| 27 | `test_post_name_in_returns_specified_slugs_only` | `postNameIn` で指定 slug のみ取得 |
| 28 | `test_post_parent_returns_only_children` | `postParent` で子ページのみ取得 |
| 29 | `test_taxonomy_term_slug_filter` | `taxonomy` + `termSlug` で絞り込み |
| 30 | `test_offset_skips_initial_posts` | `offset: 3` で先頭 3 件をスキップ（タイトル順序検証） |
| 31 | `test_orderby_title_asc` | `orderby: 'title'` + `order: 'ASC'` で昇順 |
| 32 | `test_orderby_date_asc_returns_oldest_first` | `orderby: 'date'` + `order: 'ASC'` で最古 |
| 33 | `test_no_matching_posts_returns_empty_string` | 該当投稿無しで空文字列を返却 |
| 34 | `test_list_type_mobile_overrides_on_mobile` | モバイル時 `listTypeMobile` で wrapper class 上書き |
| 35 | `test_count_mobile_overrides_on_mobile` | モバイル時 `countMobile` で件数上書き |
| 36 | `test_thumbnail_ratio_mobile_overrides_on_mobile` | モバイル時 `thumbnailRatioMobile` で `is-{ratio}` 上書き |
| 37 | `test_offset_mobile_overrides_on_mobile` | モバイル時 `offsetMobile` でオフセット上書き |
| 38 | `test_simple_layout_no_figure` | `listType: 'simple'` で `<figure>` 非出現 |
| 39 | `test_custom_class_name_applied_to_wrapper` | `className` が wrapper の class に追加 |
| 40 | `test_singular_excludes_current_post` | `is_singular()` 時の `post__not_in` で表示中投稿を除外 |

合計 **40 テスト / 54 アサーション**。

### テストデータ

`set_up()` で以下を作成:
- テスト投稿 12 件（タイトル `テスト投稿 01`〜`テスト投稿 12`、`post_date` 2026-01-01〜2026-01-12）
- 親固定ページ 1 件 + 子固定ページ 3 件

モバイル切替は `add_filter('ystdtb_blocks_posts_is_mobile', '__return_true')` で発火。

---

## L1 fixture テストパターン（属性の往復保持）

dynamic block のため、`save()` は `null` で `serialized.html` はブロックコメント 1 行のみとなる。L1 で検証できるのは「parse → migrate → serialize で attributes が JSON ロスなく保持される」点のみ。属性の網羅検証は L0 PHPUnit で実施するため、L1 fixture は最小限とする。

fixture は `test/integration/fixtures/blocks/posts/` 配下に配置。

### 命名規則

`ystdtb__posts__{パネル}__{設定}__{バリアント}.html`

### 属性カバレッジ（パネル単位で代表値のみ）

| カテゴリ | fixture |
|---|---|
| デフォルト | `ystdtb__posts__default.html`（属性なし） |
| 基本設定 | `ystdtb__posts__basic__count.html` / `basic__count-mobile.html` / `basic__orderby-title-asc.html` / `basic__orderby-rand.html` |
| 表示設定 | `ystdtb__posts__display__list-type-list.html` / `display__list-type-simple.html` / `display__list-type-mobile.html` / `display__col-pc-tablet-mobile.html` |
| サムネイル | `ystdtb__posts__thumbnail__show-img-false.html` / `thumbnail__ratio-1-1.html` / `thumbnail__ratio-mobile.html` / `thumbnail__size-medium.html` |
| メタ | `ystdtb__posts__meta__hide-date.html` / `meta__hide-category.html` / `meta__excerpt-1-line.html` / `meta__excerpt-4-lines.html` |
| 絞り込み | `ystdtb__posts__search__post-type-page.html` / `search__taxonomy-term.html` |
| 高度な絞り込み | `ystdtb__posts__advanced-search__post-in.html` / `advanced-search__post-name-in.html` / `advanced-search__post-parent.html` |
| 高度な表示 | `ystdtb__posts__advanced-display__offset.html` / `advanced-display__offset-mobile.html` |
| その他 | `ystdtb__posts__other__class-name.html` / `other__align-full.html` |
| 組み合わせ例 | `ystdtb__posts__combo__blog.html` / `combo__gallery.html` / `combo__news.html`（examples HTML の組み合わせ例から代表 3 件） |

合計 **約 25 件**。L0 で網羅検証されているため、L1 では「JSON 属性の代表値が parse → serialize でロスしない」ことを確認する目的に絞る。

---

## L2 Chrome UI テストパターン（絞り込み）

L1 fixture / L0 PHPUnit でカバーできない UI 経由の挙動のみを Chrome 拡張で検証する。

### ラベル-値対応（全選択肢網羅）

| 対象 | 確認内容 |
|---|---|
| 並び順フィールド（CustomSelectControl） | `date` / `modified` / `title` / `rand` の 4 値とラベル対応 |
| 並び順（CustomSelectControl） | `ASC` / `DESC` の 2 値とラベル対応 |
| デザインタイプ（CustomSelectControl） | `card` / `list` / `simple` の 3 値とラベル対応 |
| モバイル時デザインタイプ | 同上 + 「PC と同じ」選択肢 |
| アスペクト比（CustomSelectControl） | 全 9 種（16-9 / 4-3 / 3-2 / 1-1 / 2-1 / 3-1 / 9-16 / 4-5 / 2-3）+ モバイルアスペクト比 |
| 画像サイズ（CustomSelectControl） | サイト登録の画像サイズ全種（thumbnail / medium / large / full / その他） |
| 投稿タイプ（CustomSelectControl） | `post` / `page` + カスタム投稿タイプ |
| タクソノミー（CustomSelectControl） | 投稿タイプに紐づく全タクソノミー |
| ターム（CustomSelectControl） | 選択タクソノミーに紐づく全ターム |

### 条件付き表示・カスケード

| 条件 | 確認内容 |
|---|---|
| `postType` 切替 | タクソノミー候補が連動して切り替わる |
| `taxonomy` 切替 | ターム候補が連動して切り替わる |
| `postIn` / `postNameIn` を入力 | UI 上で「絞り込み設定はクリアされる」旨の説明と整合する挙動 |
| `showImg: false` | サムネイル関連 UI（アスペクト比・画像サイズ）の表示状態 |
| `showExcerpt: false` | 概要行数 UI の表示状態 |
| `listType: 'simple'` | カラム数 UI / アスペクト比 UI の表示状態 |

### 操作順序（切り替え・リセット）

| 対象 | 確認内容 |
|---|---|
| `postType` 切替後の `taxonomy` / `termSlug` 残骸 | 投稿タイプ変更でタクソノミー候補が変わったとき、選択中値の整合確認 |
| `taxonomy` 切替後の `termSlug` 残骸 | タクソノミー変更でターム候補が変わったとき、選択中値の整合確認 |

### 複雑 UI / 永続化検証

| 対象 | 確認内容 |
|---|---|
| 全 26 属性の組み合わせ設定 → 保存 → 再読込 | attributes 完全保持・コンソールエラー無し |
| `align: 'full'` 切替 | ツールバーの配置切替で `align` 属性が保存される |

### ServerSideRender 反映

| 対象 | 確認内容 |
|---|---|
| Inspector Controls 各設定変更 | エディター内 `ServerSideRender` のプレビューが即座に更新される |
| `Disabled` ラッパー | プレビュー内のリンク・ボタンがクリック不能 |

---

## L3 手動確認チェックリスト

### フロント見た目（examples/all-variations.html ベース）

- [ ] 「設定の組み合わせ例」7 パターン（ブログ / ギャラリー / ニュース / おすすめ / シンプル / 最近更新 / ピックアップ）が想定通り表示
- [ ] 「基本設定」: 表示件数 1/3/6/12、PC/モバイル件数切替、並び順 5 種
- [ ] 「表示設定」: card / list / simple の各レイアウト、PC/モバイルデザイン切替、カラム数 1〜4 列
- [ ] 「サムネイル設定」: 画像あり/なし、アスペクト比 9 種、PC/モバイルアスペクト比切替、画像サイズ 4 種
- [ ] 「メタ情報」: 日付/カテゴリーの表示パターン 4 種、概要行数 1/2/4
- [ ] 「絞り込み設定」: 投稿タイプ post/page、カテゴリー絞り込み
- [ ] 「高度な絞り込み」: 投稿 ID / 投稿名 / 親ページ
- [ ] 「高度な表示」: オフセット、PC/モバイルオフセット切替
- [ ] アイキャッチ未設定時のデフォルト画像表示（プラグイン設定 / サイトロゴ / プレースホルダー SVG の優先順）
- [ ] アイキャッチ設定済み時の `object-fit: cover` 適用（エディター・フロント両方）

### ビューポート切替時の表示

- [ ] モバイル: `countMobile` / `listTypeMobile` / `thumbnailRatioMobile` / `offsetMobile` の上書き反映
- [ ] タブレット: `colTablet` の反映
- [ ] PC: `colPc` の反映
- [ ] モバイル `colMobile` 1〜2 列の表示

### シンプルレイアウトの色

- [ ] シンプル時の日付文字色がテキストカラー（修正済み）
- [ ] シンプル時のカテゴリースタイル（背景色付きラベル）

### 検証エラー・コンソールエラー

- [ ] エディター・フロントいずれもコンソールエラー無し
- [ ] 「ブロックには想定されていないか無効なコンテンツ〜」が出ない
- [ ] ServerSideRender のプレビューが正しく描画される

### テーマとの干渉

- [ ] yStandard テーマ標準: 余白・色・フォントが破綻していない
- [ ] テーマ側で `ystdtb-templates/posts/posts.php` を上書きしていないことを前提とする
- [ ] `align: 'full'` 配置でコンテンツ幅とページ幅の整合確認

### 編集 URL

- 例: `http://new-ystandard.lo/wp-admin/post.php?post=XXXX&action=edit`

---

## 意地悪パターン（粗探し観点）

通常の網羅では出にくい、想定外のエッジケースを意図的に試す。

- 投稿が 0 件のサイトでブロックを挿入 → エディターは何も表示せず、フロントも空のまま破綻しないか
- `postIn` に存在しない ID（例: `99999`）を指定 → 空文字列を返し破綻しないか（L0 でカバー済み）
- `postIn` と `postNameIn` を同時指定 → WP_Query の優先順序通りに動作するか
- `taxonomy` のみ指定して `termSlug` 空 → `tax_query` 条件不成立で全件返るか
- `count: 0` を指定 → クエリ動作（`posts_per_page = 0` は WordPress では「全件」相当）
- `count` に負数 → WordPress の挙動に従う
- `excerptLines: 0` → `style="--ystdtb--posts--excerpt-line-clamp:0"` で行数 0（実質非表示）
- 概要設定 `excerptLines` を文字列 `"3"` で送信 → `is_numeric` チェック → `(int)` 変換で動作
- `is_singular` シングル投稿表示中で `postIn` に表示中の ID を指定 → `post__not_in` で除外されるか
- カスタム投稿タイプで `taxonomy` がカスタムタクソノミー → 動作するか
- ブロックを 1 ページに複数配置（同設定 / 異設定） → 個別に正しく描画されるか

## 補足

- L0 PHPUnit と L3 手動確認の責任分担: L0 は「render_callback の論理出力」、L3 は「ブラウザでの実視覚」。L0 でグリーンでも、テーマ CSS の干渉・実画像のサイズ問題などは L3 で発見する
- 今回の `excerptLines` バグ（`style="1"`）の経緯: L1/L2/L3 でも検出できなかったため L0 を新設。再発防止として L0 のテストケース 22-24 を網羅
- 編集 URL での L2 確認時は ServerSideRender のキャッシュ挙動（投稿変更時の再描画）に注意
