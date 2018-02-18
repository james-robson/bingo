import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Ticket from '../components/Ticket';

const ticket = [
  ['1', '', '2', '3', '', '', '4', '5'],
  ['6', '7', '8', '9', '10', '', '', ''],
  ['', '', '11', '12', '13', '14', '15', '']
];

const calledNumbersEmpty = [];
const calledNumbers      = [1, 2, 3];

it('renders without crashing when calledNumers is empty', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ticket ticket={ticket} calledNumbers={calledNumbersEmpty}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing when calledNumers has values', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ticket ticket={ticket} calledNumbers={calledNumbers}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('renders the expected element when calledNumers is empty', () => {
  const component = renderer.create(
    <Ticket ticket={ticket} calledNumbers={calledNumbersEmpty}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the expected element when calledNumers has values', () => {
  const component = renderer.create(
    <Ticket ticket={ticket} calledNumbers={calledNumbers}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
