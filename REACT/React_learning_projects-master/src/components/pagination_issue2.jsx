/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";

export default class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageData: {
        code: [],
        page: 1,
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    const { total, limit } = this.props;
    const totalPageCount = Math.ceil(total / limit);
    this.init({
      size: totalPageCount, // pages size
      page: 1, // selected page
      step: 3, // pages before and after current
    });
  }

  extend(data) {
    const { pageData } = this.state;
    data = data || {};
    pageData.size = data.size || 300;
    pageData.page = data.page || 1;
    pageData.step = data.step || 3;
    this.setState({
      pageData: {...pageData},
    });
  }

  add(s, f) {
    const { pageData } = this.state;
    const numClass = "MuiButtonBase-root MuiPaginationItem-root";
    for (var i = s; i < f; i++) {
      pageData.code.push([
          <li>
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
          </li>
      ]);
    }
    this.setState({
      pageData: {...pageData},
    });
  }

  first() {
    const { pageData } = this.state;
    const numClass = "MuiButtonBase-root MuiPaginationItem-root";
    console.log("Initial value before first add", pageData.code);
    pageData.code.push([
          <li>
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
          <li>
            <button
                id="button_dot_first"
                className="MuiPaginationItem-root MuiPaginationItem-ellipsis"
                tabIndex="0"
                type="button"
                aria-label="Go to page button dot first"
            >
              ...
            </button>
          </li>
    ]);
    console.log("First called!!");
    this.setState({
      pageData: {...pageData},
    });
  }

  last() {
    const { pageData } = this.state;
    const numClass = "MuiButtonBase-root MuiPaginationItem-root";
    console.log("Initial value before last add", pageData.code);
    pageData.code.push([
        <li>
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
        <li>
          <button
            id={`button_${pageData.size}`}
            className={pageData.page === pageData.size ? `${numClass} clicked` : numClass }
            tabIndex="0"
            type="button"
            aria-label={`Go to page last`}
            onClick={this.handleClick}
          >
            {pageData.size}
          </button>
        </li>
    ]);
    this.setState({
      pageData: {...pageData},
    });
  }

  init(data) {
    this.extend(data);
    this.start();
  }

  handleClick(e) {
    const { pageData } = this.state;
    const currentPage = Number(e.target.innerText);
    console.log("target click", e.target, e.target.innerText);
    pageData.page = currentPage;
    this.setState({
        pageData,
    });
    this.disablePageArrow(currentPage);
    this.props.pageMovement(currentPage);
    this.start();
  }

  // previous page
  prev() {
    const { pageData } = this.state;
    pageData.page--;
    if (pageData.page < 1) {
      pageData.page = 1;
    }
    this.setState({
      pageData: {...pageData},
    });
    this.disablePageArrow(pageData.page);
    this.props.pageMovement(pageData.page);
    this.start();
  }

  // next page
  next() {
    const { pageData } = this.state;
    pageData.page++;
    if (pageData.page > pageData.size) {
      pageData.page = pageData.size;
    }
    this.setState({
      pageData: {...pageData},
    });
    this.disablePageArrow(pageData.page);
    this.props.pageMovement(pageData.page);
    this.start();
  }

  finish() {
    const { pageData } = this.state;
    pageData.displayBtn = pageData.code;
    pageData.code = [];
    this.setState({
      pageData: {...pageData},
    });
  }

  // find pagination type
  start() {
    const { pageData } = this.state;
    if (pageData.size < pageData.step * 2 + 6) {
      pageData.code = [];
      this.add(1, pageData.size + 1);
    } else if (pageData.page < pageData.step * 2 + 1) {
      pageData.code = [];
      this.add(1, pageData.step * 2 + 4);
      this.last();
    } else if (pageData.page > pageData.size - pageData.step * 2) {
      pageData.code = [];
      this.first();
      this.add(pageData.size - pageData.step * 2 - 2, pageData.size + 1);
    } else {
      pageData.code = [];
      this.first();
      this.add(
        pageData.page - pageData.step,
        pageData.page + pageData.step + 1
      );
      this.last();
    }
    console.log("Inside start!", pageData);
    this.setState({
      pageData: {...pageData},
    });
    this.finish();
  }

  // currentActivePage(c) {
  //   const parent = document.getElementById('custom_pagination');
  //   const btn = parent.getElementsByTagName('button');
  //   const { pageData } = this.state;
  //   for (var i = 0; i < btn.length; i++) {
  //       if (+btn[i].innerHTML === c) btn[i].classList.add("clicked");
  //       else btn[i].classList.remove("clicked");
  //   }
  // }

  disablePageArrow(currentPage) {
    const { pageData } = this.state;
    if (currentPage !== 1) {
      document.getElementById("prev_btn").classList.remove("disabled");
      document.getElementById("prev_btn").disabled = false;
    } else if (currentPage === 1) {
      document.getElementById("prev_btn").classList.add("disabled");
      document.getElementById("prev_btn").disabled = true;
    }
    if (currentPage !== pageData.size) {
      document.getElementById("next_btn").classList.remove("disabled");
      document.getElementById("next_btn").disabled = false;
    } else if (currentPage === pageData.size) {
      document.getElementById("next_btn").classList.add("disabled");
      document.getElementById("next_btn").disabled = true;
    }
  }

  render() {
    const { pageData } = this.state;
    return (
      <nav aria-label="pagination navigation" className="MuiPagination-root">
        <ul id="custom_pagination" className="MuiPagination-ul">
          <li>
            <button
              id="prev_btn"
              className="MuiButtonBase-root MuiPaginationItem-root disabled"
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
          <li>
            <button
              id="next_btn"
              className="MuiButtonBase-root MuiPaginationItem-root"
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
};
