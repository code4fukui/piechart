import { extendGraphics } from "https://js.sabae.cc/extendGraphics.js";
import { hsl2rgb } from "https://js.sabae.cc/hsl2rgb.js";
import { Num } from "https://js.sabae.cc/Num.js";

const create = (tag) => document.createElement(tag);
const clear = (ele) => ele.innerHTML = "";

export const showTable = function(div, data, unit = "") {
  clear(div);
  const d = [];
  let sum = 0;
  for (const n in data) {
    d.push([ n, data[n] ]);
    sum += data[n];
  }
  d.sort(function(a, b) {
    if (a[1] < b[1])
      return 1;
    if (a[1] == b[1])
      return 0;
    return -1;
  });
  
  d.push(["合計", sum]);
  const tbl = create("table");
  for (let i = 0; i < d.length; i++) {
    const tr = create("tr");
    let td = create("td");
    const s = d[i][0];
    if (s.startsWith("http://") || s.startsWith("https://")) {
      td.innerHTML = "<a href=" + s + " target=_blank>" + s + "</a>";
    } else {
      td.textContent = s;
    }
    tr.appendChild(td);
    td = create("td");
    td.textContent = Num.addComma(d[i][1]) + unit;
    tr.appendChild(td);
    td = create("td");
    td.textContent = (d[i][1] / sum * 100).toFixed(1) + "%";
    tr.appendChild(td);
    tbl.appendChild(tr);
  }
  div.appendChild(tbl);
};
const omitData = (data) => {
  let sum = 0;
  for (const n in data) {
    sum += data[n];
  }
  const data2 = {};
  let etc = 0;
  const th = sum * 0.01;
  for (const n in data) {
    if (data[n] >= th) {
      data2[n] = data[n];
    } else {
      etc += data[n];
    }
  }
  if (etc) {
    if (data2["その他"]) {
      data2["その他"] += etc;
    } else {
      data2["その他"] = etc;
    }
  }
  return data2;
};
export const showGraph = (c, data, unit) => {
  data = omitData(data);
  const g = c.getContext("2d");
  extendGraphics(g);
  g.canvas1 = c;
  g.init = function() {
    const ua = navigator.userAgent;
    //this.ratio = 1;
    //if (ua.indexOf("iPhone") >= 0 || ua.indexOf("iPad") >= 0 || ua.indexOf("iPod") >= 0)
    this.ratio = window.devicePixelRatio;
    this.cw = this.canvas1.clientWidth * this.ratio;
    this.ch = this.canvas1.clientHeight * this.ratio;
    this.canvas1.width = this.cw;
    this.canvas1.height = this.ch;
    this.canvas1.ratio = this.ratio;
    if (this.draw != null) {
      this.draw();
    }
  };
  g.init();
  const d = [];
  let sum = 0;
  for (const n in data) {
    d.push([n, data[n]]);
    sum += data[n];
  }
//  alert(sum);
  
  d.sort(function(a, b) {
    if (a[0] == "その他")
      return 1;
    if (b[0] == "その他")
      return -1;
    if (a[1] < b[1])
      return 1;
    if (a[1] == b[1])
      return 0;
    return -1;
  });
//  dump(d);
  g.setFont = function(sh) {
    this.font = "normal " + sh + "px sans-serif";
  };
  g.fillTextCenter = function(s, x, y) {
    const met = this.measureText(s);
    const sw = met.width;
    this.fillText(s, x - sw / 2, y);
  };
  let timer = null;
  
  const animationtype = 1;
  const tcnt = 60;

  const animation = (t, type) => {
    switch (type) {
      case 0:
        return t * t;
      case 1:
        return 1 - (1 - t) * (1 - t);
      case 2:
        return Math.pow(t, 0.5);
    }
    return t;
  };
  
  let t = 0;
  g.draw = function() {
    g.setColor(255, 255, 255);
    g.fillRect(0, 0, g.cw, g.ch);
    
    const cx = g.cw / 2;
    const cy = g.ch / 2;
    const r = Math.min(g.cw, g.ch) / 2 * .95;
    
    const max = Math.PI * 2 * animation(t / tcnt, animationtype);
    const f = function(dx, dy, s, v) {
      g.translate(dx, dy);
      let th = -Math.PI / 2;
      for (let i = 0; i < d.length; i++) {
        const dth = d[i][1] / sum * max;
        const col = hsl2rgb(90 + 320 / d.length * i, s, v);
        g.beginPath();
        g.setColor(col[0], col[1], col[2]);
        g.moveTo(cx, cy);
        g.arc(cx, cy, r, th, th + dth, false);
        g.lineTo(cx, cy);
        g.closePath();
        g.fill();
        th += dth;
      }
      g.translate(-dx, -dy);
    };
    f(8, 8, .4, .8);
    //f(0, 0, .4, 1);

    const fh = g.ch / 30;
    g.setFont(fh);
//    g.setColor(255, 255, 255);
    g.setColor(0, 0, 0);
    let th = -Math.PI / 2;
    for (let i = 0; i < d.length; i++) {
      const dth = d[i][1] / sum * max;
      const x = cx + Math.cos(th + dth / 2) * r * .7;
      const y = cy + Math.sin(th + dth / 2) * r * .7;
      g.fillTextCenter(d[i][0], x, y - fh / 6);
      g.fillTextCenter(Num.addComma(d[i][1]) + unit, x, y + fh + fh / 6);
      g.fillTextCenter((d[i][1] / sum * 100).toFixed(1) + "%", x, y + fh * 2 + fh / 6);
      th += dth;
    }
    g.fillTextCenter("総数", cx, cy - fh / 6);
    g.fillTextCenter(Num.addComma(sum) + unit, cx, cy + fh + fh / 6);
    if (t >= tcnt) {
      clearInterval(timer);
    }
  };
  g.init();
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(function() {
    g.draw();
    t++;
  }, 1000 / 60);
};

export const showPieChart = (canvas, div, data, unit) => {
  showGraph(canvas, data, unit);
  showTable(div, data, unit);
};
