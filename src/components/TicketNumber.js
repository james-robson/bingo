import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'reflexbox';

import './styles/TicketNumber.css';

class TicketNumber extends React.Component {
  render() {
    return(
      <Box p={1} className="ticket-number">{this.props.ticketNumber}</Box>
    )
  }
}

TicketNumber.propTypes = {
  ticketNumber: PropTypes.string,
};

export default TicketNumber;
