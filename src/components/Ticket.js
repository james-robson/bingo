import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'reflexbox';
import TicketRow from './TicketRow';

import './styles/Ticket.css';

/**
 * Main ticket component - renders the number rows on each ticket (TicketRow
 * component) as well as the prize indicator.
 * prize indicator beside
 * @class
 */
class Ticket extends React.Component {
  constructor(){
    super();
    this.state = {
      numbersToGo: 5,
      line: false,
      bingo: false
    }
  }

  componentWillReceiveProps(){
    let rowsToGo = 3;
    for (let row = 0; row < this.props.ticket.length; row++) {
      let numbersToGo = 5;
      for (let num = 0; num < this.props.ticket[row].length; num++) {
        let checkNumber = this.props.ticket[row][num];
        if (this.props.calledNumbers.includes(parseInt(checkNumber, 10))) {
          numbersToGo -= 1;
        }
      }
      if (numbersToGo === 0) {
        rowsToGo -= 1;
      }
      this._updateNumbersToGo(numbersToGo);
    }

    if (rowsToGo === 0){
      let state = Object.assign({}, this.state);
      state.bingo = true;
      this.setState(state);
    }

  }

  render() {

    let prizeText = null;
    if (this.state.bingo) {
      prizeText = <span><span className='bingo'>BINGO</span></span>;
    } else if (this.state.line) {
      prizeText = <span><span className='line'>LINE</span></span>;
    } else {
      prizeText = <span><span className='number'>{this.state.numbersToGo}</span> TO GO </span>
    }

    return (
      <Flex className="ticket-wrapper">
        <div className="number-wrapper">
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
        <div className='prize-indicator'>
          {prizeText}
        </div>
      </Flex>
    );
  }

  _updateNumbersToGo(newVal){
    let state = Object.assign({}, this.state);
    if (newVal === 0) {
      state.line = true;
      state.numbersToGo = newVal;
      this.setState(state);
    } else if (newVal < this.state.numbersToGo) {
      state.numbersToGo = newVal;
      this.setState(state);
    }
  }
}

Ticket.propTypes = {
  ticket: PropTypes.array,
  calledNumbers: PropTypes.array,
};

export default Ticket;
