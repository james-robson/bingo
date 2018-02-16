import React from 'react';
import PropTypes from 'prop-types';

import TicketRow from './TicketRow';

import './styles/Ticket.css';

class Ticket extends React.Component {
  render() {
    return (
      <div className="ticket-wrapper">
          {this.props.ticket.map(function(row, index){
            return (
              <TicketRow key={index} row={row} style={{flexDirection: 'row'}} />
            );
          })}
      </div>
    );
  }
}

Ticket.propTypes = {
  ticket: PropTypes.array,
};

export default Ticket;
