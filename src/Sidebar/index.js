import React, { Component } from 'react';
import Filter from '../Filter';

import map from 'lodash/map';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {}
    };

    this.setFilters = this.setFilters.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setFilters(changes) {
    let filters = merge({}, this.state.filters, changes);
    this.setState({filters});
    console.info(filters)
  }

  handleSubmit(submitEvent) {
    submitEvent.preventDefault();

    this.props.onSubmit(this.state.filters);
    this.state = {
      filters: {}
    };
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        {map(this.props.topics, (topic) =>
          <Filter
            key={snakeCase(topic)}
            topic={topic}
            setData={this.setFilters}
          />
        )}
        <input
          className="button-primary"
          type="submit"
          value="Send"
        />
      </form>
    )
  }
}

export default Sidebar;
