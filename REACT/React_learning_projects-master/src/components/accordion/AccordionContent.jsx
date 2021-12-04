  
import React from 'react';
import PropTypes from 'prop-types';

const ANIMATION_DELAY = 300;

export default class AccordionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.open,
      enableInactiveAccordion: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const domRect = this.sectionElement && this.sectionElement.getBoundingClientRect();
    if (domRect && window.innerHeight - domRect.top >= 0) {
      this.handleScroll();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.setState({
        show: true,
      });
    } else {
      setTimeout(() => {
        this.setState({
          show: false,
        });
      }, ANIMATION_DELAY);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    window.removeEventListener('scroll', this.handleScroll);
    this.renderInactiveAccordion();
  }

  renderInactiveAccordion = () => {
    this.setState({
      enableInactiveAccordion: true,
    });
  }

  render() {
    const {
      idx, open, children, style,
    } = this.props;

    return (
      <div
        id={`accordion__content-${idx}`}
        aria-labelledby={`accordion__header-${idx}`}
        role="tabpanel"
        aria-hidden={!open}
        className="accordion__content"
        style={open ? style : null}
        ref={(el) => {
          this.sectionElement = el;
        }}
      >
        <div
          className="accordion__content__container"
          style={{ display: this.state.show || open ? 'block' : 'none' }}
        >
          {(this.state.show || this.state.enableInactiveAccordion) ? children : null}
        </div>
      </div>
    );
  }
}

AccordionContent.propTypes = {
  idx: PropTypes.number,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  style: PropTypes.shape({}),
};

AccordionContent.defaultProps = {
  open: true,
  idx: 0,
  style: {},
};