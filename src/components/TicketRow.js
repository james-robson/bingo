import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'reflexbox';

import TicketNumber from './TicketNumber';
import constants from '../constants';

class TicketRow extends React.Component {

  constructor(props){
    super(props);
    const rowData = this.addBlankSpaces(props.row);
    this.state = {row: rowData}
  }

  componentWillReceiveProps(nextProps){
    const rowData = this.addBlankSpaces(nextProps.row);
    this.setState({row: rowData})
  }

  addBlankSpaces(row) {
    const columnRanges  = constants.COLUMN_RANGES;
    let rowWithSpaces = [];
    for (let i = 0; i < columnRanges.length; i++) {
      if(row[0] <= columnRanges[i]) {
        rowWithSpaces.push(row.shift())
      } else {
        rowWithSpaces.push("");
      }
    }

    return rowWithSpaces;
  }

  render() {
    return (
      <Flex>
        {this.state.row.map(function(ticketNumber, index){
          return (
            <TicketNumber key={index} ticketNumber={ticketNumber} />
          );
        })}
      </Flex>
    );
  }
}

TicketRow.propTypes = {
  row: PropTypes.array,
};

export default TicketRow;
