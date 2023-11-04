# piechart

```html
<canvas id="canvas"></canvas>
<div id="tbl"></div>

<script type="module">
import { showPieChart } from "https://code4fukui.github.io/piechart/showPieChart.js";

onload = async () => {
	const data = {
			A: 300,
			B: 100,
			C: 50,
			D: 3,
	};
	const unit = "人";
	showPieChart(canvas, tbl, data, unit);
};
</script>
```

## forked from

- [福井県こどもプログラミング協議会 2018年度 地域ICTクラブ アンケート結果](https://fukuno.jig.jp/app/csv/qgraph-localict2018.html)
