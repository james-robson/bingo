import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';
import ReactInterval from 'react-interval';

import TicketContainer from './components/TicketContainer';

import logo from './logo.png';
import './App.css';
import constants from './constants';

/**
 * Parent component of the bingo app. Loads the TicketContainer component.
 * @class
 */
class App extends Component {
  constructor() {
    super();

    // Initialise state with sensible defaults
    this.state = {
      tickets: [],
      calledNumbers: [],
      playing: false,
      ballsRemaining: constants.ALL_BALLS.slice(),
      timerEnabled: false,
      timeout: constants.CALLER_TIMEOUT
    };
    this._handlePlayClick  = this._handlePlayClick.bind(this);
    this._startDrawingBalls = this._startDrawingBalls.bind(this);
  }

  componentWillMount() {
    let numberPairs = constants.INPUT_STRING.match(/(..?)/g).map(function (number) {
      /* Parsing as base 10 then casting back to string removes leading 0s the
         ticket numbers but keeps the type right for the JSX template. */
      return parseInt(number, 10).toString();
    });

    // Cut our number list into ticket size chunks
    let fullTickets = [];
    while (numberPairs.length) {
      fullTickets.push(numberPairs.splice(0, constants.TICKET_SIZE));
    }

    let ticketsWithRows = [];
    let row, rowWithSpaces;

    /* Divide up the ticket data into individual rows. Mutating the data this
       way makes rendering the child components much simpler. */
    for (let ticketCount = 0; ticketCount < fullTickets.length; ticketCount++) {
      let ticketRowData = [];
      while (fullTickets[ticketCount].length) {
        row = fullTickets[ticketCount].splice(0, constants.ROW_SIZE);
        rowWithSpaces = this._addBlankSpaces(row)
        ticketRowData.push(rowWithSpaces);
      }
      ticketsWithRows.push(ticketRowData);
    }

    /* Setting state to required values. In reality this would probably be the
       the result of an async call to an API and wrapped in a promise */
    this.setState({
      tickets: ticketsWithRows,
      calledNumbers: this.state.calledNumbers
    })
  }

  render() {
    const that = this;
    let ballsToCall = constants.ALL_BALLS.slice();

    /* The play area is displayed conditionally based on current state */
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
        <button onClick={this._handlePlayClick} className='play-button'>
          <span>PLAY</span>
        </button>
      </Flex>;

    return (
      <div className="App">
        <ReactInterval
          timeout={this.state.timeout}
          enabled={this.state.timerEnabled}
          callback={this._startDrawingBalls} />

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

  /**
   * Inserts empty spaces into ticket row row data based on the column limits
   * for a ticket. Returns the mutated array which will be rendered by a
   * TicketRow component.
   * @param {Array} row - An array of strings representing one ticket row
   * @return {Array}
   */
  _addBlankSpaces(row) {
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

  /**
   * Changes the 'playing' and 'timerEnabled' keys in state to start our game.
   * This will show the play area and start the timer - see _startDrawingBalls()
   */
  _handlePlayClick() {
    let state = Object.assign({}, this.state);
    state.playing      = true;
    state.timerEnabled = true;
    this.setState(state);
  }

  /**
   * Method used as a callback to the ReactInterval component. Once play starts
   * this method will be called once per second. A random ball is removed from
   * 'ballsRemaining' and added to the start of 'calledNumbers', which are both
   * held in state. The resulting state changes update all components in the app
   * as props are updated through the child components.
   */
  _startDrawingBalls() {
    const ball = this.state.ballsRemaining.splice(this.state.ballsRemaining.length * Math.random() | 0, 1)[0]
    const state = this.state;
    state.calledNumbers.unshift(ball);
    this.setState(state);
  }
}

export default App;
