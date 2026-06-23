# メディアクエリ処理の改修設計

## 対象ファイル

`inc/util/class-styles.php` のメディアクエリ関連処理

## 改修目的

- ブレークポイント単位を `px` から `rem` に変更
- フックで単位を変更した際にも正しく計算できるようにする
- フックによるカスタマイズ性の整理

## 現状の課題

### ブレークポイント定義

```php
const BREAKPOINTS = [
    'mobile'  => 640,
    'tablet'  => 768,
    'desktop' => 1024,
    'large'   => 1200,
];
const BREAKPOINT_UNIT = 'px';
```

- 単位が `px` 固定
- `rem` 変換ロジックがない

### メディアクエリ生成（`add_media_query`）

- `min-width` にはブレークポイント値をそのまま使用
- `max-width` には `-0.02` した値を使用（`get_breakpoints_max_width_size`）
- `-0.02` がハードコードされており、単位に応じた調整ができない

### 既存フィルター

| フィルター | 用途 |
|---|---|
| `ystdtb_css_breakpoints` | ブレークポイント配列の上書き |
| `ys_get_break_points` | レガシー互換（yStandardテーマ用） |
| `ystdtb_css_breakpoint_unit` | 単位の上書き |
| `ys_get_breakpoint_unit` | レガシー互換 |
| `ystdtb_css_breakpoints_max_width_size` | max-width値の上書き |
| `ystdtb_breakpoints_min_width` | min-width個別値の上書き |
| `ystdtb_breakpoints_max_width` | max-width個別値の上書き |

### 利用箇所（ショートカットメソッド）

| メソッド | 生成されるメディアクエリ | 利用数 |
|---|---|---|
| `add_media_query_only_mobile` | `max-width: <mobile>` | 10箇所 |
| `add_media_query_only_tablet` | `min-width: <mobile>` AND `max-width: <desktop>` | 10箇所 |
| `add_media_query_over_desktop` | `min-width: <desktop>` | 9箇所 |
| `add_media_query_over_tablet` | `min-width: <mobile>` | 0箇所（未使用） |
| `add_media_query`（直接） | 任意の組み合わせ | 3箇所（heading互換モード + テスト） |

## 設計

### ブレークポイント定義の変更

定数の単位を `rem` に変更する。ブレークポイント値は `rem` で定義する（`1rem = 16px` 基準）。

```php
const BREAKPOINTS = [
    'mobile'  => 40,     // 640px / 16
    'tablet'  => 48,     // 768px / 16
    'desktop' => 64,     // 1024px / 16
    'large'   => 75,     // 1200px / 16
];
const BREAKPOINT_UNIT = 'rem';
```

### max-width調整値の単位別管理

postcss-media-minmax の実装に倣い、単位に応じた調整値を使い分ける。

| 単位 | 調整値 | 根拠 |
|---|---|---|
| `px` | `0.02` | 古いSafariで動作する最小値（postcss-media-minmax の `pixelStep`） |
| それ以外（`rem`, `em`等） | `0.001` | 複雑なクエリでも壊れない最小値（postcss-media-minmax の `step`） |

#### `get_max_width_step` メソッド（新規）

```php
/**
 * max-width計算用の調整値を取得.
 *
 * postcss-media-minmax に倣い、pxは0.02、それ以外は0.001を使用.
 *
 * @return float
 */
public static function get_max_width_step() {
    $unit = self::get_breakpoint_unit();
    $step = 'px' === $unit ? 0.02 : 0.001;

    return apply_filters( 'ystdtb_css_max_width_step', $step, $unit );
}
```

### `get_breakpoints_max_width_size` の改修

ハードコードされた `-0.02` を `get_max_width_step` に置き換える。

```php
public static function get_breakpoints_max_width_size( $type ) {
    $breakpoints = self::get_breakpoints();

    if ( ! is_array( $breakpoints ) || ! array_key_exists( $type, $breakpoints ) ) {
        return 0;
    }

    $step   = self::get_max_width_step();
    $result = $breakpoints[ $type ] - $step;

    return apply_filters(
        'ystdtb_css_breakpoints_max_width_size',
        apply_filters( 'ys_get_breakpoints_max_width_size', $result, $breakpoints, $type )
    );
}
```

### `add_media_query` メソッドの改修

ロジックの整理（条件組み立てを `implode` ベースに統一）。機能的な変更はなし。

```php
public static function add_media_query( $css, $min = '', $max = '' ) {
    $breakpoints = self::get_breakpoints();
    $unit        = self::get_breakpoint_unit();

    if ( ! array_key_exists( $min, $breakpoints ) && ! array_key_exists( $max, $breakpoints ) ) {
        return $css;
    }

    $conditions = [];

    // min側.
    if ( array_key_exists( $min, $breakpoints ) ) {
        $value        = $breakpoints[ $min ];
        $value        = apply_filters( 'ystdtb_breakpoints_min_width', $value, $min, $breakpoints );
        $conditions[] = "(min-width: {$value}{$unit})";
    }

    // max側.
    if ( array_key_exists( $max, $breakpoints ) ) {
        $value        = self::get_breakpoints_max_width_size( $max );
        $value        = apply_filters( 'ystdtb_breakpoints_max_width', $value, $max, $breakpoints );
        $conditions[] = "(max-width: {$value}{$unit})";
    }

    $query = implode( ' AND ', $conditions );

    if ( empty( $query ) ) {
        return $css;
    }

    return sprintf( '@media %s {%s}', $query, $css );
}
```

### フィルター整理

#### 維持するフィルター

| フィルター | 用途 |
|---|---|
| `ystdtb_css_breakpoints` | ブレークポイント配列の上書き |
| `ystdtb_css_breakpoint_unit` | 単位の上書き |
| `ystdtb_css_breakpoints_max_width_size` | max-width値の上書き |
| `ystdtb_breakpoints_min_width` | min-width個別値の上書き |
| `ystdtb_breakpoints_max_width` | max-width個別値の上書き |

#### 新規追加するフィルター

| フィルター | 用途 |
|---|---|
| `ystdtb_css_max_width_step` | max-width計算用の調整値の上書き |

#### レガシーフィルターの扱い

| フィルター | 対応 |
|---|---|
| `ys_get_break_points` | 維持（yStandardテーマとの互換性） |
| `ys_get_breakpoint_unit` | 維持（yStandardテーマとの互換性） |
| `ys_get_breakpoints_max_width_size` | 維持 |

### 未使用メソッドの扱い

`add_media_query_over_tablet` は利用箇所が0件だが、パブリックAPIとして削除はせず維持する。

### ショートカットメソッド

変更なし。現行のまま維持する。

```php
public static function add_media_query_only_mobile( $css )  // max-width: <mobile>
public static function add_media_query_over_tablet( $css )   // min-width: <mobile>
public static function add_media_query_only_tablet( $css )   // min-width: <mobile> AND max-width: <desktop>
public static function add_media_query_over_desktop( $css )  // min-width: <desktop>
```

### JS側への影響

`class-heading.php:189` で `Styles::get_breakpoints()` をフロントエンドに渡している。値が `rem` ベースに変わるため、JS側でこの値を使って計算している箇所がないか確認が必要。

## 出力の変化（Before / After）

### `add_media_query_only_mobile`

```css
/* Before */
@media (max-width: 639.98px) { ... }

/* After */
@media (max-width: 39.999rem) { ... }
```

### `add_media_query_only_tablet`

```css
/* Before */
@media (min-width: 640px) AND (max-width: 1023.98px) { ... }

/* After */
@media (min-width: 40rem) AND (max-width: 63.999rem) { ... }
```

### `add_media_query_over_desktop`

```css
/* Before */
@media (min-width: 1024px) { ... }

/* After */
@media (min-width: 64rem) { ... }
```

### フックで `px` に変更された場合

```php
add_filter( 'ystdtb_css_breakpoints', fn() => [
    'mobile' => 640, 'tablet' => 768, 'desktop' => 1024, 'large' => 1200,
] );
add_filter( 'ystdtb_css_breakpoint_unit', fn() => 'px' );
```

```css
/* get_max_width_step が自動的に 0.02 を返す */
@media (max-width: 639.98px) { ... }
@media (min-width: 640px) AND (max-width: 1023.98px) { ... }
@media (min-width: 1024px) { ... }
```

## テスト

既存テスト `phpunit/test-heading-design-css.php` の `test_add_media_query` を更新する。期待値を `rem` ベースに変更。

フックでの `px` 切り替えテストも追加する。

## 影響範囲

- `inc/util/class-styles.php` — メイン改修対象
- `phpunit/test-heading-design-css.php` — テスト期待値の更新
- JS側のブレークポイント利用箇所 — 値の変更影響を確認

## 改修ステップ

- 定数 `BREAKPOINTS` を `rem` 値に変更、`BREAKPOINT_UNIT` を `'rem'` に変更
- `get_max_width_step` メソッドを追加
- `get_breakpoints_max_width_size` の `-0.02` を `get_max_width_step()` に置き換え
- `add_media_query` を `implode` ベースにリファクタ
- テストの期待値を更新（`rem` ベース + `px` フック切り替えテスト追加）
- JS側のブレークポイント利用箇所の影響確認
