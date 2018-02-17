import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import constants from './constants';
import TicketContainer from './components/TicketContainer';
import { Flex, Box } from 'reflexbox';

class App extends Component {
  constructor() {
    super();
    this.state = {tickets: [], calledNumbers: []};
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
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
    let row, rowWithSpaces;
    for (let ticketCount = 0; ticketCount < fullTickets.length; ticketCount++) {
      let ticketRowData = [];
      while (fullTickets[ticketCount].length) {
        row = fullTickets[ticketCount].splice(0, constants.ROW_SIZE);
        rowWithSpaces = this.addBlankSpaces(row)
        ticketRowData.push(rowWithSpaces);
      }
      ticketsWithRows.push(ticketRowData);
    }

    this.setState({
      tickets: ticketsWithRows,
      calledNumbers: this.state.calledNumbers
    })
  }

  addBlankSpaces(row) {
    const columnRanges  = constants.COLUMN_RANGES;
    let rowWithSpaces = [];
    for (let i = 0; i < columnRanges.length; i++) {
      if(row[0] <= columnRanges[i]) {
        rowWithSpaces.push(row.shift())
      } else {
        rowWithSpaces.push("");
      }
    }

    return rowWithSpaces;
  }

  handleClick() {
    this.setState({
      tickets: this.state.tickets,
      calledNumbers: ["1"]
    });
  }

  render() {
    console.log(this.state); //eslint-disable-line
    return (
      <div className="App">
        <Flex justify='center' align='center' className="App-header">
          <Box p={1}>
            <img src={logo} className="App-logo" alt="logo" />
          </Box>
        </Flex>
        <Flex w={1}>
          <Flex justify='center' align='center' direction='row' w={1}>
            <button onClick={this.handleClick} className="play-button">
              <span>PLAY</span>
            </button>
          </Flex>
          <Box>
            <TicketContainer tickets={this.state.tickets} calledNumbers={this.state.calledNumbers} />
          </Box>
        </Flex>
      </div>
    );
  }
}

export default App;
