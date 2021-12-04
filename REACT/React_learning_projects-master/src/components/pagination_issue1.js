/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPageCount: 0,
      currentPageButtons: [],
      totalPages: [],

    };
    this.handleClick = this.handleClick.bind(this);
    this.goPrevious = this.goPrevious.bind(this);
    this.goNext = this.goNext.bind(this);
  }

  componentDidMount() {
    // const currentPageButtons = this.renderPagination(1);
    const { total, limit } = this.props;
    const totalPageCount = Math.ceil(total / limit);
    const numClass = 'MuiButtonBase-root MuiPaginationItem-root';
    const totalPages =  Array(totalPageCount)
      .fill(1)
      .map((_, i) => (
        <li>
          <button
            id={`button_${i + 1}`}
            className={i === 0 ? `${numClass} clicked` : numClass}
            tabIndex="0"
            type="button"
            aria-label={`Go to page ${i + 1}`}
            onClick={this.handleClick}
          >
            {i + 1}
          </button>
        </li>
      ));
    this.setState({
        totalPageCount,
        totalPages,
        currentPageButtons: totalPages.slice(0,10),
    });
  }

  goPrevious() {
    const { currentPage, totalPageCount } = this.state;
    const page = currentPage !== 1 ? currentPage - 1 : 1;
    // const current = document.getElementById(`button_${page}`);
    this.disablePageArrow(page);
    this.currentActivePage(`button_${page}`);
    this.props.pageMovement(page);
    this.setState({
        currentPage: page,
        currentPageButtons: this.renderPagination(page),
    });
  }

  goNext() {
    const { currentPage, totalPageCount } = this.state;
    const page = currentPage !== totalPageCount ? currentPage + 1 : totalPageCount;
    // const current = document.getElementById(`button_${page}`);
    this.disablePageArrow(page);
    this.currentActivePage(`button_${page}`);
    this.props.pageMovement(page);
    this.setState({
        currentPage: page,
        currentPageButtons: this.renderPagination(page),
    });
  }

  handleClick(e) {
    const currentPage = Number(e.target.innerHTML);
    console.log("Current page value!", );
    this.currentActivePage(e.target.id);
    this.disablePageArrow(currentPage);
    this.props.pageMovement(currentPage);
    this.setState({
      currentPage,
      currentPageButtons: this.renderPagination(currentPage),
    });
  }

  currentActivePage(current) {
    console.log("Current page!", current, document.getElementById(current));
    const parentEle = document.getElementById('custom_pagination');
    for (const el of parentEle.children) {
      if(el) el.children[0].classList.remove('clicked');
    }
    document.getElementById(current).classList.add('clicked');
  }

  disablePageArrow(currentPage) {
    const { totalPageCount } = this.state;
    if (currentPage !== 1) {
      document.getElementById('prev_btn').classList.remove('disabled');
      document.getElementById('prev_btn').disabled = false;
    } else if (currentPage === 1) {
      document.getElementById('prev_btn').classList.add('disabled');
      document.getElementById('prev_btn').disabled = true;
    }
    if (currentPage !== totalPageCount) {
      document.getElementById('next_btn').classList.remove('disabled');
      document.getElementById('next_btn').disabled = false;
    } else if (currentPage === totalPageCount) {
      document.getElementById('next_btn').classList.add('disabled');
      document.getElementById('next_btn').disabled = true;
    }
  }

  renderPagination(currentPage) {
    const { totalPageCount, totalPages } = this.state;
    const lowerVal = currentPage - 1 <= totalPageCount-10 ? currentPage - 1 : totalPageCount-10;
    const upperVal = currentPage + 9 <= totalPageCount ? currentPage + 9 : totalPageCount;
    console.log("---", lowerVal, upperVal, currentPage);
    return totalPages.slice(lowerVal, upperVal);
  }

  render() {
    const { currentPageButtons } = this.state;
    return (
      <nav aria-label="pagination navigation" className="MuiPagination-root">
        <ul id="custom_pagination" className="MuiPagination-ul">
          <li key="prev">
            <button
              id="prev_btn"
              className="MuiButtonBase-root MuiPaginationItem-root disabled"
              tabIndex="0"
              type="button"
              onClick={this.goPrevious}
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
          {currentPageButtons}
          <li key="next">
            <button
              id="next_btn"
              className="MuiButtonBase-root MuiPaginationItem-root"
              tabIndex="-1"
              type="button"
              onClick={this.goNext}
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
};
