import React from 'react';
import PropTypes from 'prop-types';

import TicketRow from './TicketRow';

import './styles/Ticket.css';

/**
 * Main ticket component - renders the number rows on each ticket (TicketRow
 * component) as well as the prize indicator.
 * prize indicator beside
 * @class
 */
class Ticket extends React.Component {
  render() {
    return (
      <div className="ticket-wrapper">
          {this.props.ticket.map(function(row, index){
            return (
              <TicketRow
                key={index}
                row={row}
                calledNumbers={this.props.calledNumbers}
                />
            );
          }, this)}
      </div>
    );
  }
}

Ticket.propTypes = {
  ticket: PropTypes.array,
  calledNumbers: PropTypes.array,
};

export default Ticket;
