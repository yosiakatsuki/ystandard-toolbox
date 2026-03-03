# block-hook-hidden-by-size: classnames/dedupe 除去設計書

## 背景

`src/blocks/block-library/block-hook-hidden-by-size/index.tsx` は `classnames/dedupe` を使用して、ブロックの `className` 属性に対する非表示用クラスのトグル（追加・除去）を行っている。

将来的に `classnames` → `clsx` への統一を進めるにあたり、`clsx` にはdedupe機能がないため、このファイルのみ個別対応が必要。

## 現状の実装

3つのトグルハンドラが `classnames/dedupe` を使用：

```tsx
import classnames from 'classnames/dedupe';

// className = "some-class ystdtb-hidden-mobile" の状態で
// value = false が渡された場合：
classnames( className, { 'ystdtb-hidden-mobile': false } )
// → "some-class"（dedupeにより除去される）

// 通常のclsxで同じことをすると：
clsx( className, { 'ystdtb-hidden-mobile': false } )
// → "some-class ystdtb-hidden-mobile"（文字列内のクラスが残る）
```

該当箇所は以下の3ハンドラ：

- `handleToggleMobile` — `ystdtb-hidden-mobile` のトグル
- `handleToggleTablet` — `ystdtb-hidden-tablet` のトグル
- `handleToggleDesktop` — `ystdtb-hidden-desktop` のトグル

## 変更方針

`Set` を使ったローカル関数 `toggleClassName` に置き換える。

### toggleClassName 関数仕様

```tsx
/**
 * クラス名のトグル。
 *
 * @param baseClassName 元のクラス名文字列
 * @param targetClass   トグル対象のクラス名
 * @param add           true: 追加、false: 除去
 * @return 更新後のクラス名文字列
 */
function toggleClassName(
    baseClassName: string | undefined,
    targetClass: string,
    add: boolean
): string {
    const classes = new Set(
        ( baseClassName ?? '' ).split( /\s+/ ).filter( Boolean )
    );
    if ( add ) {
        classes.add( targetClass );
    } else {
        classes.delete( targetClass );
    }
    return [ ...classes ].join( ' ' );
}
```

**配置**: `index.tsx` 内のローカル関数として定義。他ファイルで同様のユースケースが発生した場合にユーティリティ切り出しを検討する。

### 変更差分

```diff
-import classnames from 'classnames/dedupe';

+/**
+ * クラス名のトグル。
+ *
+ * @param baseClassName 元のクラス名文字列
+ * @param targetClass   トグル対象のクラス名
+ * @param add           true: 追加、false: 除去
+ * @return 更新後のクラス名文字列
+ */
+function toggleClassName(
+    baseClassName: string | undefined,
+    targetClass: string,
+    add: boolean
+): string {
+    const classes = new Set(
+        ( baseClassName ?? '' ).split( /\s+/ ).filter( Boolean )
+    );
+    if ( add ) {
+        classes.add( targetClass );
+    } else {
+        classes.delete( targetClass );
+    }
+    return [ ...classes ].join( ' ' );
+}

 // モバイル非表示切り替え
 const handleToggleMobile = ( value: boolean ) => {
     setAttributes( {
         ystdtbIsHiddenMobile: value,
-        className: classnames( className, {
-            'ystdtb-hidden-mobile': value,
-        } ),
+        className: toggleClassName( className, 'ystdtb-hidden-mobile', value ),
     } );
 };

 // タブレット非表示切り替え
 const handleToggleTablet = ( value: boolean ) => {
     setAttributes( {
         ystdtbIsHiddenTablet: value,
-        className: classnames( className, {
-            'ystdtb-hidden-tablet': value,
-        } ),
+        className: toggleClassName( className, 'ystdtb-hidden-tablet', value ),
     } );
 };

 // デスクトップ非表示切り替え
 const handleToggleDesktop = ( value: boolean ) => {
     setAttributes( {
         ystdtbIsHiddenDesktop: value,
-        className: classnames( className, {
-            'ystdtb-hidden-desktop': value,
-        } ),
+        className: toggleClassName( className, 'ystdtb-hidden-desktop', value ),
     } );
 };
```

### 動作の同等性

| 操作 | classnames/dedupe | toggleClassName |
| --- | --- | --- |
| `className` が空、`add = true` | `"ystdtb-hidden-mobile"` | `"ystdtb-hidden-mobile"` |
| `className` が空、`add = false` | `""` | `""` |
| `className` にクラスあり、`add = true` | 重複なしで追加 | `Set` により重複なしで追加 |
| `className` にクラスあり、`add = false` | クラスを除去 | `Set.delete` でクラスを除去 |
| `className` に他クラスあり | 他クラス維持 | 他クラス維持 |

## テスト

`toggleClassName` のユニットテストを作成する。

### テストファイル

`src/blocks/block-library/block-hook-hidden-by-size/test/toggle-class-name.test.ts`

### テストケース

```typescript
describe( 'toggleClassName', () => {
    // 追加
    it( '空文字にクラスを追加できる', () => {
        expect( toggleClassName( '', 'foo', true ) ).toBe( 'foo' );
    } );

    it( 'undefinedにクラスを追加できる', () => {
        expect( toggleClassName( undefined, 'foo', true ) ).toBe( 'foo' );
    } );

    it( '既存クラスに追加できる', () => {
        expect( toggleClassName( 'bar', 'foo', true ) ).toBe( 'bar foo' );
    } );

    it( '既に存在するクラスを追加しても重複しない', () => {
        expect( toggleClassName( 'foo bar', 'foo', true ) ).toBe( 'foo bar' );
    } );

    // 除去
    it( '存在するクラスを除去できる', () => {
        expect( toggleClassName( 'foo bar', 'foo', false ) ).toBe( 'bar' );
    } );

    it( '存在しないクラスの除去は何も変わらない', () => {
        expect( toggleClassName( 'bar', 'foo', false ) ).toBe( 'bar' );
    } );

    it( '空文字から除去しても空文字を返す', () => {
        expect( toggleClassName( '', 'foo', false ) ).toBe( '' );
    } );

    // エッジケース
    it( '余分な空白を正規化する', () => {
        expect( toggleClassName( '  foo   bar  ', 'baz', true ) ).toBe( 'foo bar baz' );
    } );
} );
```

## 完了条件

- `classnames/dedupe` の import が `index.tsx` から除去されていること
- `toggleClassName` のユニットテストが全件パスすること
- `npm run build:blocks:hook` が成功すること
- エディターで非表示設定のトグルが正常動作すること（クラスの追加・除去）
