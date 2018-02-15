import React from 'react';
import PropTypes from 'prop-types';
import TicketNumber from './TicketNumber';

class TicketRow extends React.Component {
  render() {
    return (
      <div>
        {this.props.row.map(function(number, index){
          return (
            <TicketNumber key={index} number={number} />
          );
        })}
      </div>
    );
  }
}

TicketRow.propTypes = {
  row: PropTypes.array,
};

export default TicketRow;
