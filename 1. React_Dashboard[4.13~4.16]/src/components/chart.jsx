import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";


class ChartsPage extends React.Component {
  state = {
    dataBar: {
      labels: ["A", "B", "C", "D", "E"],
      datasets: [
        {
          label: "% of Votes",
          data: [12, 11, 3, 5, 2],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)"
            
          ],
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)"
            
          ]
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }


  render() {
    return (
      <MDBContainer style={{margin: '0rem', height: '10rem'}}>
        <h6>NextCore</h6>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;