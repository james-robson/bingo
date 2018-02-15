import React from 'react';
import PropTypes from 'prop-types';

class TicketNumber extends React.Component {
  render() {
    return(
      <div>{this.props.number}</div>
    )
  }
}

TicketNumber.propTypes = {
  number: PropTypes.string,
};

export default TicketNumber;
