import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import constants from './constants';

class App extends Component {
  constructor() {
    super();
    let numberPairs = constants.INPUT_STRING.match(/(..?)/g, function(pair) {
      return parseInt(pair, 10);
    });

    let fullCards = [];
    while (numberPairs.length) {
      fullCards.push(numberPairs.splice(0, constants.CARD_SIZE));
    }

    let cardsWithRows = [];
    for (let cardCount = 0; cardCount < fullCards.length; cardCount++) {
      let cardRowData = [];
      while (fullCards[cardCount].length) {
        cardRowData.push(fullCards[cardCount].splice(0, constants.ROW_SIZE));
      }
      cardsWithRows.push(cardRowData);
    }

    this.state = {cards: cardsWithRows};

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.cards.map(function(card, index){
          return (
            <table>
                {card.map(function(row, index){
                  return (
                    <tr>
                      <td>{row}</td>
                    </tr>
                  );
                })}
            </table>
          );
        })}
      </div>
    );
  }
}

export default App;
