import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import SalesData from "./SalesData";

// amCharts 4 라이센스 추가 am4core.addLicense
am4core.addLicense ( "CH105077966");

// 맵 라이센스 추가
am4core.addLicense ( "MP105077966");
am4core.options.commercialLicense = true;

export default class Sales extends Component {
  componentDidMount() {

    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("SalesChart1", am4charts.XYChart);

    // Add data
    chart.data = SalesData;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    //dateAxis.renderer.grid.template.location = 0;
    //dateAxis.renderer.minGridDistance = 30;

    let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis1.renderer.opposite = true;
    valueAxis1.renderer.fontSize = "5";
    valueAxis1.renderer.grid.template.disabled = true;

    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.grid.template.disabled = true;

    // Create series
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "today1";
    series1.dataFields.dateX = "date";
    series1.name = "INOCTETS";
    series1.strokeWidth = 2;
    series1.tensionX = 0.7;
    series1.yAxis = valueAxis2;
    series1.tooltipText = "{name}\n[bold font-size: 5]{valueY}[/]";


    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "today2";
    series2.dataFields.dateX = "date";
    series2.name = "OUTOCTETS";
    series2.strokeWidth = 2;
    series2.tensionX = 0.7;
    series2.yAxis = valueAxis2;
    series2.tooltipText = "{name}\n[bold font-size: 5]{valueY}[/]";
    series2.stroke = chart.colors.getIndex(0).lighten(0.5);
    series2.strokeDasharray = "3,3";


    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.fontSize = "10";

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  render() {
    return (
      <div>
        <div id="SalesChart1" style={{width: "260px", height: "180px"}} />
      </div>
    );
  }
}
