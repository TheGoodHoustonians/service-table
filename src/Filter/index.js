import React, { Component } from 'react';
import CONSTANTS from '../constants';

import axios from 'axios';
import map from 'lodash/map';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import snakeCase from 'lodash/snakeCase';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {},
      topic: snakeCase(this.props.topic)
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  componentWillMount() {
    axios.get(CONSTANTS.FILTERS_BASE_URL + this.state.topic + '.json')
      .then((response) => {
        let filtersData = mapKeys(response.data, (filter) =>
          snakeCase(filter.name)
        );

        filtersData = mapValues(filtersData, (data) => {
          data.topic = this.state.topic
          return data;
        })

        this.setState({
          filters: filtersData
        });

        this.props.setData(filtersData, this.state.topic);
      });
  }

  handleFilter(changeEvent) {
    let checked = changeEvent.target.checked;
    let change = {
      [changeEvent.target.value]: {checked}
    };
    let filters = merge({}, this.state.filters, change);
    this.setState({filters});
    this.props.setData(change, this.state.topic);
  }

  render() {
    if (isEmpty(this.state.filters)){
      return null;
    }
    return (
      <fieldset>
        <label htmlFor={this.state.topic}>{this.props.topic}</label>
        {map(this.state.filters, (filter, name) =>
          <div key={name}>
            <input
              type="checkbox"
              id={name}
              name={`${this.state.topic}[]`}
              value={name}
              onChange={this.handleFilter}
            />
            <label
              className="label-inline"
              htmlFor={name}>
                {filter.name}
            </label>
          </div>
        )}
      </fieldset>
    )
  }

}

export default Filter;