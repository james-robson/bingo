import React from 'react';
import PropTypes from 'prop-types';

import Ticket from './Ticket';

import './styles/TicketContainer.css';

/**
 * Component which renders a header for the tickets area and Ticket component
 * for each of the player's tickets.
 * @class
 */
class TicketContainer extends React.Component {
  render() {
    let that = this;
    return (
      <div className="ticket-container">
        <div>
          <span className='text-lg'>Tickets</span>
        </div>
        {this.props.tickets.map(function(ticket, index){
          return (
              <Ticket
                key={index}
                ticket={ticket}
                calledNumbers={that.props.calledNumbers}/>
          );
        })}
      </div>
    );
  }
}

TicketContainer.propTypes = {
  tickets: PropTypes.array,
  calledNumbers: PropTypes.array,
};

export default TicketContainer;
