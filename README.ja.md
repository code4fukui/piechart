# piechart

単純なデータオブジェクトからアニメーション付き円グラフと対応するデータテーブルを生成する軽量なJavaScriptライブラリです。

## デモ

- [ライブ編集可能なデモ](https://ss.sabae.cc/#1065)
- [静的サンプル](index.html)

![カラフルなアニメーション付き円グラフがデータテーブルの隣に表示されています。グラフにはA、B、C、その他のラベルがついたスライスがあり、それぞれの値とパーセンテージが表示されています。テーブルは同じデータを名前、値、パーセンテージの列で降順に並べています。](https://user-images.githubusercontent.com/15958303/228355655-08e82103-605b-42e7-9430-67c261e403d5.gif)

## 機能

- HTML `<canvas>` 上にアニメーション付き円グラフを生成します。
- 対応するデータテーブルを自動的に作成します。
- 小さな値（合計の1%未満）を単一の「その他」スライスに集約します。
- テーブルのデータを値の降順で並べ替えます。
- 各スライスにラベル、値、パーセンテージを表示します。
- 高DPI（Retina）ディスプレイでも鮮明に描画します。
- 日本語の数値フォーマット（例: カンマ区切りや「百万円」の単位）をサポートします。
- データのキーがURLの場合、テーブル内でクリック可能なリンクに変換します。

## 使い方

```html
<canvas id="canvas"></canvas>
<div id="tbl"></div>

<script type="module">
import { showPieChart } from "https://code4fukui.github.io/piechart/showPieChart.js";

const data = {
	A: 300,
	B: 100,
	C: 50,
	D: 3,
};
const unit = "人";
showPieChart(canvas, tbl, data, unit);
</script>
```

## API

### `showPieChart(canvasElement, tableContainer, data, [unit])`

- **`canvasElement`**: グラフを描画する `<canvas>` 要素。
- **`tableContainer`**: 生成されたテーブルを配置する `<div>` などの要素。
- **`data`**: 値が数値である `key: value` ペアのオブジェクト。
- **`unit`**: 値の末尾に追加する任意の文字列（例: "人", "円"）。

## 依存関係

このモジュールは以下の外部スクリプトに依存しています:
- [extendGraphics.js](https://js.sabae.cc/extendGraphics.js)
- [hsl2rgb.js](https://js.sabae.cc/hsl2rgb.js)
- [Num.js](https://js.sabae.cc/Num.js)

## オリジナルソース

このプロジェクトは、以下のコードをフォークして汎用化したものです:
- [福井県こどもプログラミング協議会 2018年度 地域ICTクラブ アンケート結果](https://fukuno.jig.jp/app/csv/qgraph-localict2018.html)

## ライセンス

このプロジェクトは MIT License の下で利用可能です。
