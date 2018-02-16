import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import constants from './constants';
import TicketContainer from './components/TicketContainer';
import { Flex } from 'reflexbox';

class App extends Component {
  constructor() {
    super();
    let numberPairs = constants.INPUT_STRING.match(/(..?)/g).map(function (number) {
      // Parsing as base 10 then casting back to string removes leading 0s the
      // ticket numbers but keeps the type right for the JSX template.
      return parseInt(number, 10).toString();
    });

    let fullTickets = [];
    while (numberPairs.length) {
      fullTickets.push(numberPairs.splice(0, constants.TICKET_SIZE));
    }

    let ticketsWithRows = [];
    for (let ticketCount = 0; ticketCount < fullTickets.length; ticketCount++) {
      let ticketRowData = [];
      while (fullTickets[ticketCount].length) {
        ticketRowData.push(fullTickets[ticketCount].splice(0, constants.ROW_SIZE));
      }
      ticketsWithRows.push(ticketRowData);
    }

    this.state = {tickets: ticketsWithRows};

  }


  render() {
    console.log(this.state); //eslint-disable-line
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Flex justify='flex-end'>
          <TicketContainer tickets={this.state.tickets} />
        </Flex>
      </div>
    );
  }
}

export default App;
