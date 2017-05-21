import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';

import css from 'fixed-data-table/dist/fixed-data-table.css';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

const DATA_COLUMNS = {
  organization_name: {
    label: "Name",
    type: "text"
  },
  website: {
    label: "Website",
    type: "text"
  },
  address: {
    label: "Address",
    type: "text"
  },
  contact_name: {
    label: "Contact",
    type: "text"
  },
  contact_phone: {
    label: "Phone",
    type: "text"
  },
  email: {
    label: "Email",
    type: "text"
  },
  hotline_phone: {
    label: "Hotline Phone",
    type: "text"
  },
  languages: {
    label: "Languages",
    type: "list"
  }, 
  client_referral_sources: {
    label: "Referral",
    type: "listobj"
  },
  client_requirements: {
    label: "Requirements",
    type: "listobj"
  },
  education_services: {
    label: "Education Services",
    type: "listobj"
  },
  education_supports: {
    label: "Education costs",
    type: "listobj"
  },
  legal_services: {
    label: "Legal",
    type: "listobj"
  },
  medical_amenities: {
    label: "Medical",
    type: "listobj"
  },
  outreach_programs: {
    label: "Outreach",
    type: "listobj"
  },
  payment_methods: {
    label: "Payment",
    type: "listobj"
  },
  prevention_services: {
    label: "Prevention",
    type: "listobj"
  },
  services: {
    label: "Services",
    type: "listobj"
  },
  shelter_capabilities: {
    label: "Capabilities",
    type: "listobj"
  },
  substance_abuse_treatments: {
    label: "Substance",
    type: "listobj"
  },
  support_groups: {
    label: "Support",
    type: "listobj"
  },
  target_demographics: {
    label: "Demographics",
    type: "listobj"
  },
  transportation_assistances: {
    label: "Transportation",
    type: "listobj"
  }
};




class Results extends Component {
  render() {
    let data = this.props.data;
    if (isEmpty(data)) {
      return null;
    }

    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={data.length}
        width={1000}
        height={800}>
        {map(DATA_COLUMNS, (columnInfo, colKey) => {
          return <Column
            header={<Cell>{columnInfo.label}</Cell>}
            cell={({rowIndex}) => {
                let cellData = data[rowIndex][colKey];
                if (columnInfo.type === 'listobj') {
                  cellData = map(cellData, 'name').join(', ');
                }
                return <Cell>{cellData}</Cell>;
              }
            }
            width={200}
          />
        })}

      </Table>
    );
  }
}

export default Results;
