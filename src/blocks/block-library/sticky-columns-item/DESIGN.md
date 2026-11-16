# 片方が追従できるカラム（子）：子ブロック設計

作成日：2026-11-15。更新日：2026-11-16。状態：レビュー前・未実装。

対象は`ystdtb/sticky-columns-item`。コード例は設計説明用であり、実装ではない。コードパスはプロジェクトルート基準。Markdownリンクはこのファイルからの相対パス。

[親ブロックの設計書](../sticky-columns/DESIGN.md)を親子共通仕様の正本とする。最低WordPressバージョン、共通Supports、幅とgapの計算、コンテナクエリ生成、逆順表示は親の設計書を参照する。

## 既存コードの調査結果

- `faq-item/block.json`は`parent`で親の直下への配置を指定している。
- `faq-item/edit.tsx`は`useInnerBlocksProps()`に`templateLock: false`を渡し、親の固定テンプレート内でも子の内容を自由編集できる。
- `faq-item`にはSupportsの自動出力を抑え、別要素へ適用する例がある。今回の幅とwritingModeの適用先分離の参考にする。
- `docs/block-style-controls.md`に従い、標準Supportsと既存ラッパーを優先する。旧`src/blocks/controls/`は新規利用しない。
- バージョン別APIの確認結果と一次資料は[親の調査結果](../sticky-columns/DESIGN.md#wordpress標準apiの確認結果)に集約する。

## 推奨する役割と親子関係

- 日本語名は「片方が追従できるカラム（子）」、スラッグは`sticky-columns-item`。
- `ystdtb/sticky-columns`の直下にのみ配置し、親が生成する2個のうちの1個として扱う。
- 子の内部には通常のGutenbergブロックを自由に配置できる。子内部のブロック数は固定しない。
- 子は内容と装飾を静的HTMLとして保存する。親は動的に外枠・Grid・個別CSSを生成する。
- 子の幅入力と追従スイッチを提供し、実際の列配置・追従の有効化は親のレイアウト契約に従う。

## block.jsonの主要設定案

親と同じAPI v3・翻訳ドメイン・アセット指定を使い、次を差し替える。共通の装飾Supportsは[親の設計書](../sticky-columns/DESIGN.md#親子共通の装飾supports)を参照する。

```json
{
  "name": "ystdtb/sticky-columns-item",
  "title": "片方が追従できるカラム（子）",
  "parent": ["ystdtb/sticky-columns"],
  "selectors": { "root": ".ystdtb-sticky-columns-item" },
  "attributes": {
    "style": { "type": "object" }
  },
  "supports": {
    "html": false,
    "align": false,
    "className": false,
    "reusable": false,
    "spacing": {
      "padding": true,
      "margin": ["top", "bottom"],
      "__experimentalDefaultControls": { "padding": false, "margin": false }
    },
    "dimensions": {
      "width": true,
      "__experimentalSkipSerialization": ["width"],
      "__experimentalDefaultControls": { "width": false }
    }
  }
}
```

PHPは`Sticky_Columns_Item_Block`。子にはblockGapを付けない。`parent`はインサーターの直下制限であり、不正な投稿データを拒否するセキュリティ境界ではない。

## 属性の保存と追従スイッチ

- 幅は`style.dimensions.width`。独自の`width`属性を追加しない。
- 追従booleanは保存しない。親を直接参照し、自分が第1・第2のどちらかでスイッチの状態を導出する。
- ONは親の`stickyColumn`を自分の位置へ更新。OFFは自分が選択されている場合だけ`none`へ戻す。属性更新が1回なのでUndoも単純になる。
- 親の幅・gap計算値、DOM ID、clientIdは保存しない。保存値の重複と複製時の衝突を避ける。

独自スタイルの解除は`undefined`と`stripUndefined()`を使用。他の装飾、兄弟の幅、子の内容は維持する。

## HTML・保存・スタイル

```html
<div class="ystdtb-sticky-columns-item">
  <div class="ystdtb-sticky-columns-item__content">
    <!-- 利用者が配置した通常ブロック -->
  </div>
</div>
```

- 親の`.ystdtb-sticky-columns`直下に子の`.ystdtb-sticky-columns-item`を置く。間にレイアウト用ラッパーは挟まない。幅測定要素は親Gridの外側に置く。
- `supports.className: false`で標準の`wp-block-ystdtb-sticky-columns-item`を抑制し、独自クラスを明示する。`selectors.root`も独自クラスに合わせる。Supports用クラス・エディター操作用クラスは保持する。詳しくは[親のクラス設計](../sticky-columns/DESIGN.md#クラスと直接子の構造)を参照する。
- 子外側へ色・背景・グラデーション・枠線・角丸・影・padding・上下marginを適用する。
- `useBlockProps.save()`を子外側に、`InnerBlocks.Content`を本文要素内に使う。
- 幅は`style.dimensions.width`へ保存するが、子外側への自動`width`出力を抑制する。親がその値をGridの列定義へ変換する。
- 1列時は幅設定を保持しながら全幅表示し、追従を解除する。
- writingModeは本文要素へ適用する案。親の値より子の明示値を優先し、Gridの軸を変更しない。採用は未確定。
- 共通SCSSは`index.tsx`から、エディター専用SCSSは`edit.tsx`からimportする。`viewScript`は追加しない。
- `min-width: 0`と`box-sizing: border-box`を基本とする。追従対象は本文だけではなく、装飾を含む子外側全体。
- 親の生成CSSがコンテナ幅と追従対象に応じて`position: sticky`を適用する。子独自のブレークポイントは設けない。
- 祖先overflow、長い内容、追従下端、管理バーの扱いは[親の追従仕様](../sticky-columns/DESIGN.md#追従範囲オフセット)に従う。

## エディター実装方針

- 子外側には`useBlockProps()`、本文要素には`useInnerBlocksProps()`を使用する。
- 内部は`templateLock: false`とし、必要なら初期の空段落を1つ配置する。通常ブロックの許可一覧を独自に狭めない。
- 自分の親と直下での位置を`useSelect`で取得し、追従スイッチの状態を導出する。UIはsettingsグループへ配置する。
- 親の`stickyColumn`だけを更新し、兄弟の装飾・幅・内容は更新しない。親不在や子構成の不整合時に別のブロックを更新しない。
- 幅は7.0以上で標準dimensions UIを使用する案。6.5〜6.9は共有パネルとUnitControl等で同じ保存先へ入力する。対応機能が先行提供されるGutenberg環境を含め、入力UIを二重に出さない。
- 幅の許可単位、プリセット、不正値、過大幅は[親の幅とgapの契約](../sticky-columns/DESIGN.md#幅とgapの連携)を参照する。
- 独自パネルは共有コンポーネントへ分離し、親ブロックの検索・属性パス・排他制御は子ブロック側で扱う。
- ラベルは翻訳関数と`ystandard-toolbox`ドメインを使う。標準設定と同じプロパティの独自パネルを重複させない。
- 固定2個の維持は親の`templateLock: 'all'`が担当する。子内の自由編集までロックを継承させない。

## 動作確認・テスト方針

親子全体の検証計画は[親の設計書](../sticky-columns/DESIGN.md#実装時の検証方針)を参照する。子側では次を確認する。

- 幅未設定・px/rem/em/%・プリセットの保存と解除、他の装飾の保持。
- 第1をON→第2をON→OFFで追従対象が常に0個または1個になること。Undo/Redoでも親の単一値とスイッチ表示が一致すること。
- 子内部で通常ブロックを追加・削除・編集でき、子自身の追加・削除・移動は親の制約に従うこと。
- 親不在、不整合な子構成、複製、同期パターンでも別インスタンスの属性を更新しないこと。
- 子の保存HTMLに標準の`wp-block-ystdtb-sticky-columns-item`がなく、親Gridの直接子になること。独自selectorsでもSupportsの装飾が反映されること。
- fixtureのparse/serializeと保存再読込で子の内容・装飾・幅が保持されること。
- PHPの親レンダリングで子内容が二重に描画されず、不整合時にも内容が失われないこと。
- 許可を得た画面確認で、1列時の追従解除、子装飾を含む追従、幅の反映、長い内容、逆順時のTab順を確認すること。

## 仕様として判断が必要な事項

- 追従スイッチを子に置き、保存先は親の単一`stickyColumn`にする案。
- 6.5〜6.9へ幅の互換入力を提供するか、新ブロックの対応を7.0以上に限定するか。
- 幅の単位制限と希望幅としての扱い、過大指定時の縮小、1列時の全幅表示。
- タイポグラフィの対象範囲とwritingModeの本文適用。

親子にまたがる決定は[親の承認事項](../sticky-columns/DESIGN.md#承認が必要な仕様)へ反映し、子側だけで別の仕様に変更しない。

## 今回の作業範囲

設計Markdownのみを作成した。コード実装、ビルド、実装テスト、ブラウザ確認は行っていない。
