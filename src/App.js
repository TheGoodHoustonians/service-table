import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CONSTANTS from './constants';

import Sidebar from './Sidebar';
import Results from './Results';

import axios from 'axios';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import reject from 'lodash/reject';
import find from 'lodash/find';
import reduce from 'lodash/reduce';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allResults: [],
      matchingResults: []
    };

    this.filterResults = this.filterResults.bind(this);
  }

  componentWillMount() {
    axios.get(CONSTANTS.FILTERS_BASE_URL + 'service_providers.json')
      .then((response) => {
        this.setState({
          allResults: response.data,
          matchingResults: response.data
        });
      });
  }

  filterResults(filters) {
    let selected = filter(filters, 'checked');
    let matching = reject(this.state.allResults, (item) =>
      reduce(selected, (result, selectedFilter) => {
          return result && isEmpty(find(item[selectedFilter.topic], {name: selectedFilter.name}))
        }, true
      )
    )

    this.setState({
      matchingResults: matching
    });
  }

  render() {
    return (
      <div className="App container-fluid">
        <div className="row">
          <div className="column">
            <Sidebar
              topics={["Client Requirements", "Medical Amenities"]}
              onSubmit={this.filterResults}
            />
          </div>
          <div className="column column-75">
            <Results data={this.state.matchingResults}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
