import { Component } from '@angular/core';
import {getScienceData} from "./data";
import * as Handsontable from 'handsontable';


const heatmapScale = chroma.scale(['#17F556', '#ED6D47']);
let heatmap = [];

function updateHeatmap(change, source) {
  if (change && change.length) {
    heatmap[change[0][1]] = generateHeatmapData(this, change[0][1]);
  } else {
    heatmap = [];

    const colCount = this.countCols();
    for (let i = 1; i < colCount; i++) {
      heatmap[i] = generateHeatmapData(this, i);
    }
  }
}

function point(min, max, value) {
  return (value - min) / (max - min);
}

function generateHeatmapData(context: any, colId) {
  const values = context.getDataAtCol(colId);

  return {
    min: Math.min.apply(null, values),
    max: Math.max.apply(null, values)
  };
}

function heatmapRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);

  if (heatmap[col]) {
    td.style.backgroundColor = heatmapScale(point(heatmap[col].min, heatmap[col].max, parseFloat(value))).hex();
    td.style.textAlign = 'right';
    td.style.fontWeight = 'bold';
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private data: any[];
  private options: any;
  private columns:any;

  constructor() {
    this.data = getScienceData();
    this.columns= [
      {data: 0, renderer: 'html'},
      {data: 1, type: 'numeric', format: '0[.]000000000000000'},
      {data: 2, type: 'numeric', format: '0[.]000000000000000', renderer: heatmapRenderer},
      {data: 3, type: 'numeric', format: '0[.]000000000000000'},
      {data: 4, type: 'numeric', format: '0[.]000000000000000', renderer: heatmapRenderer}
    ];
    this.options = {
      height: 600,
      colHeaders: ['Line chart', 'Frequency', 'Average age', 'Frequency', 'Average age'],
      rowHeaders: true,
      stretchH: 'all',
      columnSorting: true,

      afterLoadData: updateHeatmap,
      beforeChangeRender: updateHeatmap,
      mergeCells: [
        {row: 0, col: 0, rowspan: 20, colspan: 1}
      ]
    };
  }
}
