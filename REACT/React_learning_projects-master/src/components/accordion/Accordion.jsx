import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.configureState(props.openItems);
    this.onItemOpen = this.onItemOpen.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.openItems ||  nextProps.openItems === 0) &&
      this.state.openItems &&
      (nextProps.openItems.length !== this.state.openItems.length ||
        nextProps.openItems.every((element, index) => element !== this.state.openItems[index]))
    ) {
      this.setState(this.configureState(nextProps.openItems));
    }
  }

  onItemOpen = (index) => {
    let openItems = [...this.state.openItems];
    if (this.props.accordion) {
      openItems = openItems[0] === index ? [] : [index];
    } else {
      const idx = openItems.indexOf(index);
      if (idx > -1) {
        openItems.splice(idx, 1);
      } else {
        openItems.push(index);
      }
    }
    if (this.props.onItemOpen) {
      this.props.onItemOpen(openItems);
    }
    this.setState({
      openItems,
    });
  }

  configureState = (openItems) => {
    const state = {
      openItems: [],
    };
    if (openItems !== undefined) {
      state.openItems = Array.isArray(openItems) ? openItems : [openItems];
    }
    return state;
  }

  isOpen(index) {
    if (this.props.accordion) {
      return this.state.openItems[0] === index;
    }
    return this.state.openItems.indexOf(index) > -1;
  }

  renderAccordionItems(children) {
    if (children) {
      return React.Children.map(children, (child, idx) => {
        const childProps = {
          idx,
          onItemOpen: this.onItemOpen,
          open: this.isOpen(idx),
        };
        return React.cloneElement(child, childProps);
      });
    }
    return null;
  }

  render() {
    const accordionClasses = cx('accordion', this.props.className);
    return <div className={accordionClasses}>{this.renderAccordionItems(this.props.children)}</div>;
  }
}

Accordion.propTypes = {
  accordion: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onItemOpen: PropTypes.func.isRequired,
  className: PropTypes.string,
  openItems:
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]).isRequired,
};

Accordion.defaultProps = {
  accordion: true,
  className: '',
};