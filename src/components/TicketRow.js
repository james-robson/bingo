import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'reflexbox';

import TicketNumber from './TicketNumber';

class TicketRow extends React.Component {
render() {
    return (
      <Flex>
        {this.props.row.map(function(ticketNumber, index){
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
