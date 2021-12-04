import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AccordionHeader from './AccordionHeader';

export default class AccordionItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleMouseDown(e) {
    e.preventDefault();
    this.props.onItemOpen(this.props.idx);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      this.handleMouseDown(e);
    }
  }

  cloneChildrenWithProps(child) {
    if (child) {
      return React.cloneElement(child, { open: this.props.open, idx: this.props.idx });
    }
    return null;
  }

  renderAccordionHeader(child) {
    if (child) {
      return (
        <div
          onMouseDown={this.handleMouseDown}
          onKeyDown={this.handleKeyDown}
          tabIndex="0"
          role="button"
        >
          {this.cloneChildrenWithProps(child)}
        </div>
      );
    }
    return null;
  }

  renderChildren(children) {
    if (children) {
      return React.Children.map(children, child => (
        (child.type === AccordionHeader ||
          (child.type && child.type.name && child.type.name.includes('AccordionHeader'))
        ) ?
          this.renderAccordionHeader(child) :
          this.cloneChildrenWithProps(child)
      ));
    }
    return null;
  }

  render() {
    const itemClasses = cx(
      'accordion__item',
      { 'accordion__item--active': this.props.open },
    );
    return (
      <div className={itemClasses}>
        {this.renderChildren(this.props.children)}
      </div>
    );
  }
}

AccordionItem.propTypes = {
  onItemOpen: PropTypes.func,
  open: PropTypes.bool,
  children: PropTypes.node,
  idx: PropTypes.number,
};

AccordionItem.defaultProps = {
  onItemOpen: () => {},
  open: true,
  children: <h3>default children</h3>,
  idx: 0,
};