  
import React from 'react';
import PropTypes from 'prop-types';

export default class AccordionHeader extends React.Component {
  render() {
    return (
      <div
        id={`accordion__header-${this.props.idx}`}
        role="tab"
        aria-controls={`accordion__content-${this.props.idx}`}
        aria-expanded={this.props.open}
        className="accordion__header"
      >
        {this.props.children}
      </div>
    );
  }
}

AccordionHeader.propTypes = {
  idx: PropTypes.number,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
};

AccordionHeader.defaultProps = {
  open: true,
  idx: 0,
};