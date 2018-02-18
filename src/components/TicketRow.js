import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'reflexbox';

import TicketNumber from './TicketNumber';

/**
 * When provided with an array of integers, the TicketRow component will return
 * a row of TicketNumber components.
 * @class
 */
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
