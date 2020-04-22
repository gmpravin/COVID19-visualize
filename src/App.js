import React, { Component } from "react";
import { Cards, Chart, CountryPicker } from "./component";
import styles from "./App.module.css";
import { fetchData } from "./api/index";
import { Nav } from "./component/Nav";

class App extends Component {
  state = {
    data: {},
    country: ""
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async country => {
    const Data = await fetchData(country);
    this.setState({ data: Data, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <Nav />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />

        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
