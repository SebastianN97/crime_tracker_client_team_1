import { fetchTeaserListData } from "../modules/crimeReports";
import parse from "html-react-parser";
import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class DisplayCrimeData extends Component {
  state = {
    crimeData: [],
  };

  componentDidMount = async () => {
    const crimeData = await fetchTeaserListData();
    this.setState({ crimeData: crimeData });
  };

  render() {
    let graph;
    let location = [];
    let types = [];

    if (this.state.crimeData !== null) {
      this.state.crimeData.forEach((data) => {
        types.push(data.title_type);
        location.push(data.title_location);
      });
      const crimeGraph = {
        datasets: [
          {
            data: types,
            location: location,
            label: "crime type",
          },
        ],
        location: location,
      };

      graph = (
        <>
          <Bar data={crimeGraph} />
        </>
      );
    }

    const authenticated = this.props.authenticated;
    let teaserList = this.state.crimeData.map((report) => { 
      return (
      
        <div data-cy={"data-" + report.id} key={report.id}>
          <h3 data-cy="teaser">{(report.description)}</h3>
          {authenticated && <p data-cy="content">{(report.content)}</p>} 
        </div> 
      );
    });

    return (
      <div>
        <h1>Crime Reports</h1>
        {teaserList}
        {graph}
      </div>
    );
  }
}

export default DisplayCrimeData;
