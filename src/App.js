import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Line } from "react-chartjs-2";
import bitcoinaverage from "bitcoinaverage";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labels_data: [],
      data: {
        labels: [],
        datasets: [
          {
            label: "Poloneix",
            backgroundColor: "rgba(255,0,255,0.75)",
            data: [],
          },
        ],
      },
    };
  }

  componentDidMount() {
    console.log("badhdjd");
    const API_KEY = "N6BTWXQ0JJDIQDFK";
    const ticket = "BTCUSD";
    let label = [];
    let label1 = [];
    const API_Call =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=" +
      API_KEY;
    console.log(API_Call);
    axios.get(API_Call).then((res) => {
      let data = res.data;

      this.setState({
        labels_data: data,
      });
      //let labels = Object.keys(data["Time Series (Daily)"]);
      // data = labels.map(
      //   (label) => data["Time Series (Daily)"][label]["1. open"]
      // );
      //console.log(data);

      // this.setState({
      //   data: {
      //     labels: labels.slice(0, 1),
      //     datasets: [
      //       {
      //         label: "Poloneix",
      //         backgroundColor: "rgba(255,0,255,0.75)",
      //         data: data,
      //       },
      //     ],
      //   },
      // });
    });
  }

  onChangeData = (e) => {
    let labels = Object.keys(this.state.labels_data["Time Series (Daily)"]);
    let graphData = labels.map(
      (label) =>
        this.state.labels_data["Time Series (Daily)"][label]["4. close"]
    );
    const labels_data = this.state.labels_data;

    if (e.target.value == "1W") {
      this.setState({
        data: {
          labels: labels.slice(0, 7),
          datasets: [
            {
              label: "Poloneix",
              backgroundColor: "rgba(255,0,255,0.75)",
              data: graphData.slice(0, 7),
            },
          ],
        },
      });
    }

    if (e.target.value == "1M") {
      console.log("sad");
      this.setState({
        data: {
          labels: labels.slice(0, 30),
          datasets: [
            {
              label: "Poloneix",
              backgroundColor: "rgba(255,0,255,0.75)",
              data: graphData.slice(0, 30),
            },
          ],
        },
      });
    }

    if (e.target.value == "1D") {
      console.log("sad");
      this.setState({
        data: {
          labels: labels.slice(0, 1),
          datasets: [
            {
              label: "Poloneix",
              backgroundColor: "rgba(255,0,255,0.75)",
              data: graphData.slice(0, 1),
            },
          ],
        },
      });
    }
  };
  render() {
    return (
      <div style={{ position: "relative", width: 600, height: 550 }}>
        <h3>Chart Samples</h3>
        <Line options={{ responsive: true }} data={this.state.data} />
        <br />
        <br />
        <div className="Range">
          <button onClick={this.onChangeData.bind(this)} value="1D">
            1D
          </button>
          <button onClick={this.onChangeData.bind(this)} value="1W">
            1W
          </button>
          <button>6M</button>
          <button onClick={this.onChangeData.bind(this)} value="1M">
            1M
          </button>
        </div>
      </div>
    );
  }
}

export default App;
