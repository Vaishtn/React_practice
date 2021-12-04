/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageData: {
        code: [],
        page: 1,
      },
      totalPageCount: Math.ceil(this.props.total / this.props.limit),
      getParentElem: this.props.getParentElem,
    };
    this.start = this.start.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.getParentElem !== state.getParentElem) {
  //     return {
  //       getParentElem: props.getParentElem
  //     };
  //   }
  //   return null;
  // }

  componentDidMount() {
    const { totalPageCount } = this.state;
    // const totalPageCount = this.getTotalPageCount;
    window.addEventListener('resize', this.start);
    this.init({
      size: totalPageCount, // pages size
      page: 1, // selected page
    });
  }

  componentDidUpdate(prevProps) {
    const { totalPageCount } = this.state;
    // only update chart if the data has changed
    if (prevProps.selectVal !== this.props.selectVal) {
      this.init({
        size: totalPageCount, // pages size
        page: 1, // selected page
      });
      this.props.pageMovement(1);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.start);
  }

  // Initiate pagination with initial data
  init(data) {
    this.extend(data);
    this.start();
  }

  // Data initialization
  extend(data) {
    const { pageData } = this.state;
    const initData = data || {};
    pageData.size = initData.size || 0;
    pageData.page = initData.page || 1;
    this.setState({
      pageData: { ...pageData },
    });
  }

  // Adding page numbers
  add(s, f) {
    const { pageData } = this.state;
    const numClass = 'MuiButtonBase-root MuiPaginationItem-root';
    for (let i = s; i < f; i += 1) {
      pageData.code.push([
        <li key={`key_${i}`}>
          <button
            id={`button_${i}`}
            className={pageData.page === i ? `${numClass} clicked` : numClass}
            tabIndex="0"
            type="button"
            aria-label={`Go to page ${i}`}
            onClick={this.handleClick}
          >
            {i}
          </button>
        </li>,
      ]);
    }
    this.setState({
      pageData: { ...pageData },
    });
  }

  // Adding ellipses and first no
  first() {
    const { pageData } = this.state;
    const numClass = 'MuiButtonBase-root MuiPaginationItem-root';
    pageData.code.push([
      <li key="first">
        <button
          id="button_1"
          className={pageData.page === 1 ? `${numClass} clicked` : numClass}
          tabIndex="0"
          type="button"
          aria-label="Go to page first"
          onClick={this.handleClick}
        >
          1
        </button>
      </li>,
      <li key="ellipses1">
        <button
          id="button_dot_first"
          className="MuiPaginationItem-root MuiPaginationItem-ellipsis"
          tabIndex="0"
          type="button"
          aria-label="Go to page button dot first"
        >
          ...
        </button>
      </li>,
    ]);
    this.setState({
      pageData: { ...pageData },
    });
  }

  // Adding ellipses and last no
  last() {
    const { pageData } = this.state;
    const numClass = 'MuiButtonBase-root MuiPaginationItem-root';
    pageData.code.push([
      <li key="ellipses2">
        <button
          id="button_dot_last"
          className="MuiPaginationItem-root MuiPaginationItem-ellipsis"
          tabIndex="0"
          type="button"
          aria-label="Go to page button dot last"
        >
          ...
        </button>
      </li>,
      <li key="last">
        <button
          id={`button_${pageData.size}`}
          className={pageData.page === pageData.size ? `${numClass} clicked` : numClass}
          tabIndex="0"
          type="button"
          aria-label="Go to page last"
          onClick={this.handleClick}
        >
          {pageData.size}
        </button>
      </li>,
    ]);
    this.setState({
      pageData: { ...pageData },
    });
  }

  // Gets clicked on each page number
  handleClick(e) {
    const { pageData, getParentElem } = this.state;
    const currentPage = Number(e.target.innerText);
    pageData.page = currentPage;
    this.setState({
      pageData,
    });
    if(getParentElem().current) {
      getParentElem().current.scrollIntoView({ block: 'start' });
    }
    this.disablePageArrow(currentPage);
    this.props.pageMovement(currentPage);
    this.start();
  }

  // previous page
  prev() {
    const { pageData, getParentElem } = this.state;
    pageData.page -= 1;
    if (pageData.page < 1) {
      pageData.page = 1;
    }
    this.setState({
      pageData: { ...pageData },
    });
    if(getParentElem().current) {
      getParentElem().current.scrollIntoView({ block: 'start' });
    }
    this.disablePageArrow(pageData.page);
    this.props.pageMovement(pageData.page);
    this.start();
  }

  // next page
  next() {
    const { pageData, getParentElem } = this.state;
    pageData.page += 1;
    if (pageData.page > pageData.size) {
      pageData.page = pageData.size;
    }
    this.setState({
      pageData: { ...pageData },
    });
    if(getParentElem().current) {
      getParentElem().current.scrollIntoView({ block: 'start' });
    }
    this.disablePageArrow(pageData.page);
    this.props.pageMovement(pageData.page);
    this.start();
  }

  // Reset data
  finish() {
    const { pageData } = this.state;
    pageData.displayBtn = pageData.code;
    pageData.code = [];
    this.setState({
      pageData: { ...pageData },
    });
  }

  // For smaller device
  smallPagination(pageData, step) {
    if (pageData.size < (step * 3) + 1) {
      this.add(1, pageData.size + 1);
    } else if (pageData.page < (step * 2)) {
      this.add(1, (step * 3)); // 6
      this.last();
    } else if (pageData.page > pageData.size - (step * 2)) { 
      this.first();
      this.add(pageData.size - (step * 2), pageData.size + 1);
    } else {
      this.first();
      this.add(
        pageData.page - 1,
        pageData.page + step
      );
      this.last();
    }
    this.setState({
      pageData: { ...pageData },
    });
  }

  // For larger device
  largePagination(pageData, step) {
    if (pageData.size < (step * 4)) {
      this.add(1, pageData.size + 1);
    } else if (pageData.page < (step * 2) + 1) {
      this.add(1, (step * 3) + 1);
      this.last();
    } else if (pageData.page > pageData.size - (step * 2)) {
      this.first();
      this.add(pageData.size - (step * 2) - 2, pageData.size + 1);
    } else {
      this.first();
      this.add(
        pageData.page - step,
        pageData.page + step + 1
      );
      this.last();
    }
    this.setState({
      pageData: { ...pageData },
    });
  }


  // Find pagination type
  start() {
    const { pageData } = this.state;
    const newWindowWidth = Math.min(
      document.defaultView.innerWidth,
      document.documentElement.clientWidth,
      document.body.clientWidth,
    );
    if (newWindowWidth < 767) {
      this.smallPagination(pageData, 2);
    } else {
      this.largePagination(pageData, 3);
    }
    this.finish();
  }

  // Disable prev and next page arrows
  disablePageArrow(currentPage) {
    const { pageData } = this.state;
    if (currentPage !== 1) {
      document.getElementById('prev_btn').classList.remove('disabled');
      document.getElementById('prev_btn').disabled = false;
    } else if (currentPage === 1) {
      document.getElementById('prev_btn').classList.add('disabled');
      document.getElementById('prev_btn').disabled = true;
    }
    if (currentPage !== pageData.size) {
      document.getElementById('next_btn').classList.remove('disabled');
      document.getElementById('next_btn').disabled = false;
    } else if (currentPage === pageData.size) {
      document.getElementById('next_btn').classList.add('disabled');
      document.getElementById('next_btn').disabled = true;
    }
  }

  render() {
    const { pageData } = this.state;
    return (
      <nav aria-label="pagination navigation" className="MuiPagination-root">
        <ul id="custom_pagination" className="MuiPagination-ul">
          <li key="previous">
            <button
              id="prev_btn"
              className="MuiButtonBase-root MuiPaginationItem-root arrows disabled"
              tabIndex="0"
              type="button"
              onClick={this.prev}
              aria-label="Go to previous page"
            >
              <svg
                className="MuiSvgIcon-root MuiPaginationItem-icon"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
              <span className="MuiTouchRipple-root" />
            </button>
          </li>
          {pageData.displayBtn}
          <li key="next">
            <button
              id="next_btn"
              className="MuiButtonBase-root MuiPaginationItem-root arrows"
              tabIndex="-1"
              type="button"
              onClick={this.next}
              aria-label="Go to next page"
            >
              <svg
                className="MuiSvgIcon-root MuiPaginationItem-icon"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pageMovement: PropTypes.func.isRequired,
  getParentElem: PropTypes.func.isRequired,
  selectVal: PropTypes.string,
};

Pagination.defaultProps = {
  selecVal: 'Sort by',
};