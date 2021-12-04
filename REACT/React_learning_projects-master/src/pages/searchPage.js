import React from 'react';
import Data from '../data.json';
import Faq from '../components/faq';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [],
            listArray: [],
            mapper: [],
            key: '',
            data: Data,
        };
        this.handleDropdown = this.handleDropdown.bind(this);
        this.removeFocus = this.removeFocus.bind(this);
        this.getSelected = this.getSelected.bind(this);
    }

    componentDidMount() {
        const term = document.body;
        term.addEventListener('click', this.removeFocus);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.removeFocus);
    }

    removeFocus() {
        const searchBox = document.getElementById('search_select');
        searchBox.style.display = 'none';
    }

    // Get search dropdown selected items
    getSelected(e) {
        const { source } = Data;
        const accordian = this.state.data;
        const listItems = source.map(item => item.value);
        const matchKey = listItems.indexOf(e.target.textContent);
        const currentEle = source[matchKey];
        const {
            faq1, faq2, faq3, faq4,
        } = accordian;
        const faqs = [faq1, faq2, faq3, faq4];
        for (let i = 1; i <= faqs.length; i += 1) {
            if (`faq${i}` !== currentEle.url.id) {
                accordian[`faq${i}`].config.openItems = -1;
            }
        }
        // if (currentEle.url.index === 0) {
        //     accordian[currentEle.url.id].config.openItems = '0';
        // } else {
        //     accordian[currentEle.url.id].config.openItems = currentEle.url.index;
        // }
        accordian[currentEle.url.id].config.openItems = currentEle.url.index;
        this.setState({ data: accordian });
        document.getElementById(currentEle.url.id)
            .getElementsByClassName(currentEle.url.class)[currentEle.url.index]
            .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }

    // Creating dynamic element for search dropdown
    displayItems() {
        const { listArray } = this.state;
        return listArray.map((item, index) =>
            (
                <li className="ui-menu-item">
                    <button
                        id={`ui-id${index + 1}`}
                        key={item.key}
                        tabIndex="-1"
                        className="ui-menu-item-wrapper"
                        onClick={this.getSelected}
                    >
                        {item.value}
                    </button>
                </li>
            ));
    }

    // Handle search dropdown dynamic list
    getFilterValue(key) {
        const returnArray = [];
        const { source } = Data;
        // eslint-disable-next-line array-callback-return
        source.filter((item) => {
            if (key && item.value.trim().toLocaleLowerCase().search(key) >= 0) {
                if (returnArray.indexOf(item) === -1) {
                    returnArray.push(item);
                }
            }
        });
        return returnArray;
    }

    // Handle search dropdown
    handleDropdown() {
        let mapper = [];
        const searchBox = document.getElementById('search_select');
        const searchBar = document.getElementById('tags');
        const key = searchBar.value && searchBar.value.trim().toLowerCase();
        searchBox.style.left = `${searchBar.offsetLeft}px`;
        searchBox.style.marginTop = '-20px';
        const arrayVal = this.getFilterValue(key);
        mapper = arrayVal.map(item => item.value);
        if (mapper && mapper.length) {
            searchBox.style.display = 'block';
        } else {
            searchBox.style.display = 'none';
        }
        this.setState({
            listItems: mapper,
            listArray: arrayVal,
            mapper,
            key,
        });
    }

    render() {
        const {
            customHeroProps,
            faq1,
            faq2,
            faq3,
            faq4,
        } = this.state.data;
        const { mapper, key } = this.state;
        console.log("==============, this.state: ", this.state.data);
        return (
            <React.Fragment>
                <div>
                    <section className="home-hero-organism custom-hero" data-building-block="organism">
                        <p className="home-hero__paragraph">
                            <div className="search_input_box">
                                <input
                                    aria-label="Search help topics here"
                                    type="text"
                                    className="form-control tags aucomp ui-autocomplete-input"
                                    id="tags"
                                    placeholder="Search help topics here"
                                    autoComplete="off"
                                    onChange={this.handleDropdown}
                                />
                                <label htmlFor="tags" id="search_label" className="accessAid">
                                    {customHeroProps.inputBox.placeholder}
                                </label>
                                <div id="search_select" className="search_dropdown">
                                    <ul
                                        id="ui-id-1"
                                        className="ui-menu ui-widget
                                ui-widget-content ui-autocomplete ui-front"
                                    >
                                        {this.displayItems()}
                                    </ul>
                                </div>
                                {key && mapper.length === 0 ?
                                    <p id="no-results" className="display-message">
                                        {customHeroProps.noresult.text}
                                    </p> :
                                    null}
                                <p className="hero_header">
                                    {customHeroProps.paragraph.text}
                                </p>
                                <p className="text-links"><a className="span6 center-block hero-link" href={customHeroProps.links.link1}>{customHeroProps.links.text1}</a>  <a className="span6 center-block hero-link morespace" href={customHeroProps.links.link2}>{customHeroProps.links.text2}</a></p>
                            </div>
                        </p>
                    </section>
                </div>
                <Faq {...faq1} />
                <Faq {...faq2} />
                <Faq {...faq3} />
                <Faq {...faq4} />
            </React.Fragment>
        );
    }
}
