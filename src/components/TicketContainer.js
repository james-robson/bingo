import React from 'react';
import PropTypes from 'prop-types';

import Ticket from './Ticket';

import './styles/TicketContainer.css';

class TicketContainer extends React.Component {
  render() {
    return (
      <div className="ticket-container">
        {this.props.tickets.map(function(ticket, index){
          return (
              <Ticket key={index} ticket={ticket} />
          );
        })}
      </div>
    );
  }
}

TicketContainer.propTypes = {
  tickets: PropTypes.array,
};

export default TicketContainer;
