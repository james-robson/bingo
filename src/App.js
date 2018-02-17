import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';
import ReactInterval from 'react-interval';

import TicketContainer from './components/TicketContainer';

import logo from './logo.png';
import './App.css';
import constants from './constants';

class App extends Component {
  constructor() {
    super();
    const ballsRemaining = Array.apply(null, {length: 90}).map(function(value, index){
      return index + 1;
    });
    this.state = {
      tickets: [],
      calledNumbers: [],
      playing: false,
      ballsRemaining: ballsRemaining,
      timerEnabled: false,
      timeout: 1000
    };
    this.handleClick  = this.handleClick.bind(this);
    this.startDrawing = this.startDrawing.bind(this);
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
    let state = Object.assign({}, this.state);
    state.playing      = true;
    state.timerEnabled = true;
    this.setState(state);
  }

  startDrawing() {

    const ball = this.state.ballsRemaining.splice(this.state.ballsRemaining.length * Math.random() | 0, 1)[0]
    const state = this.state;
    state.calledNumbers.unshift(ball);
    this.setState(state);
  }

  render() {
    const that = this;

    let ballsToCall = Array.apply(null, {length: 90}).map(function(value, index){
      return index + 1;
    });

    let playArea = this.state.playing ?
      <Flex justify='center' p={1/4} w={1} column>
        <Box p={1}>
          <div><span>Call:</span></div>
          <div className='called-number-lg'><span>{this.state.calledNumbers[0]}</span></div>
        </Box>
        <Box className='called-number-list' p={3/4}>
          <Flex wrap>
            {ballsToCall.map(function(number, index){
              return (
                <Box className={'number ' + (that.state.calledNumbers.includes(number) ? 'called-number' : '')}
                  key={index} p={1}>{number}</Box>
              );
            })}
          </Flex>
        </Box>
      </Flex> :
      <Flex justify='center' align='center' w={1}>
        <button onClick={this.handleClick} className='play-button'>
          <span>PLAY</span>
        </button>
      </Flex>;

    return (
      <div className="App">
        <ReactInterval
          timeout={this.state.timeout}
          enabled={this.state.timerEnabled}
          callback={this.startDrawing} />
        <Flex justify='center' align='center' className="App-header">
          <Box p={1}>
            <img src={logo} className="App-logo" alt="logo" />
          </Box>
        </Flex>
        <Flex w={1}>

          {playArea}

          <Box>
            <TicketContainer tickets={this.state.tickets} calledNumbers={this.state.calledNumbers} />
          </Box>
        </Flex>
      </div>
    );
  }
}

export default App;
