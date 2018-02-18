import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'reflexbox';

import TicketNumber from './TicketNumber';

/**
 * When provided with an array of integers, the TicketRow component will return
 * a row of TicketNumber components. Each number is marked as 'called' based on
 * whether or not it exists in 'calledNumbers'.
 * @class
 */
class TicketRow extends React.Component {
render() {
    return (
      <Flex>
        {this.props.row.map(function(ticketNumber, index){
          const called = this.props.calledNumbers.includes(parseInt(ticketNumber, 10)) ? true : false;
          return (
            <TicketNumber
              key={index}
              ticketNumber={ticketNumber}
              called={called}/>
          );
        }, this)}
      </Flex>
    );
  }
}

TicketRow.propTypes = {
  row: PropTypes.array,
  calledNumbers: PropTypes.array,
};

export default TicketRow;
