import React, { Component } from "react";
import Chart from "react-apexcharts";

class StatsChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Value",
          data: Object.values(props.data),
        },
      ],
      options: {
        fill: {
          colors: ["#1DB954"],
        },
        chart: {
          height: 600,
          type: "radar",
        },
        xaxis: {
          categories: Object.keys(props.data),
        },
        yaxis: {
          show: false,
        },
        plotOptions: {
          radar: {
            polygons: {
              fill: {
                colors: ["#404040", "#2F2F2F"],
              },
            },
          },
        },
        stroke: {
          colors: ["#eee"],
        },
        markers: {
          colors: ["#1ED760"],
          size: 4,
          hover: {
            size: 5,
          },
        },
        responsive: [
          {
            breakpoint: 620,
            options: {
              chart: {
                offsetX: 25,
                height: 400,
              },
            },
          },
          {
            breakpoint: 1024,
            options: {
              chart: {
                offsetX: 20,
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="radar"
        width="1000"
      />
    );
  }
}

export default StatsChart;
