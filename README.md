# piechart

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A lightweight JavaScript library to generate an animated pie chart and a corresponding data table from a simple data object.

## Demo

- [Live editable demo](https://ss.sabae.cc/#1065)
- [Static sample](index.html)


![A colorful animated pie chart is displayed next to a data table. The chart has slices labeled A, B, C, and その他 (Other)
, each with its value and percentage. The table lists the same data with columns for name, value, and percentage, sorted in descending order.](https://user-images.githubusercontent.com/15958303/228355655-08e82103-605b-42e7-9430-67c261e403d5.gif)

## Features

-   Generates an animated pie chart on an HTML `<canvas>`.
-   Automatically creates a corresponding data table.
-   Aggregates small values (<1% of total) into a single "Other" (その他) slice.
-   Sorts table data in descending order by value.
-   Displays labels, values, and percentages on each pie slice.
-   Renders crisply on high-DPI (Retina) displays.
-   Supports Japanese number formatting (e.g., comma separators and "百万円" for millions).
-   Converts data keys that are URLs into clickable links in the table.

## Usage

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

-   **`canvasElement`**: The `<canvas>` element for the chart.
-   **`tableContainer`**: The `<div>` or other element to contain the generated table.
-   **`data`**: An object of `key: value` pairs where values are numbers.
-   **`unit`**: An optional string to append to values (e.g., "人", "円").

## Dependencies

This module relies on the following external scripts:
-   [extendGraphics.js](https://js.sabae.cc/extendGraphics.js)
-   [hsl2rgb.js](https://js.sabae.cc/hsl2rgb.js)
-   [Num.js](https://js.sabae.cc/Num.js)

## Original Source

This project is a fork and generalization of code from:
-   [福井県こどもプログラミング協議会 2018年度 地域ICTクラブ アンケート結果](https://fukuno.jig.jp/app/csv/qgraph-localict2018.html)

## License

This project is available under the MIT License.