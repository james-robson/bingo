import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'reflexbox';

import './styles/TicketNumber.css';

/**
 * This component is a small number square which makes up a row on a player
 * ticket. The component manages style based on whether or not the 'called' prop
 * is passed down to it.
 * @class
 */
class TicketNumber extends React.Component {
  render() {
    return(
      <Box p={1} className={'ticket-number ' + (this.props.called ? 'called' : '')}>
          <span>{this.props.ticketNumber}</span>
      </Box>
    )
  }
}

TicketNumber.propTypes = {
  ticketNumber: PropTypes.string,
  called: PropTypes.bool,
};

export default TicketNumber;
