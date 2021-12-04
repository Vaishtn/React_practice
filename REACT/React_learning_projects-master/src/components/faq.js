import React from 'react';
import htmlToReact from 'html-to-react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MPPHeading from './heading';
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from './accordion';
import FaqContent from './faqContent';

const htmlToReactParser = new htmlToReact.Parser();

export default class Faq extends React.Component {
  renderHeadline = (headline) => {
    if (headline) {
      return (
        <div className="text-xs-center">
          <MPPHeading level="2" className="faq__headline">
            {htmlToReactParser.parse(headline.text)}
          </MPPHeading>
        </div>
      );
    }
    return null;
  };

  renderFaqHeadline = (headline) => {
    if (headline) {
      return (
        <MPPHeading level="4" className="faq__sectionheadline pp-sans-small-regular">
          {htmlToReactParser.parse(headline.text)}
        </MPPHeading>
      );
    }
    return null;
  };

  renderFaqItems(faqs) {
    if (faqs) {
      const items = faqs.map((faq, faqIndex) => {
        const Element =
          {
            FaqContent,
          }[faq.item && faq.item.config && faq.item.config.type] || FaqContent;
        const faqKey = `${faq.headline}${faqIndex}`;
        return (
          <AccordionItem key={faqKey}>
            <AccordionHeader>{this.renderFaqHeadline(faq.headline)}</AccordionHeader>
            <AccordionContent>
              <Element {...faq.item} />
            </AccordionContent>
          </AccordionItem>
        );
      });
      return items;
    }
    return null;
  }

  render() {
    const { headline, faqs } = this.props.content;
    const { id, theme, openItems } = this.props.config;
    const faqAccordionClasses = cx('faq', theme, this.props.className);

    return (
      <section className={faqAccordionClasses} id={id} data-building-block="organism">
        <div className="container">
          {this.renderHeadline(headline)}
          <div className="row">
            <div className="center-block col-xs-12 faq__column">
              <Accordion openItems={openItems || 0}>{this.renderFaqItems(faqs)}</Accordion>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Faq.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string,
    theme: PropTypes.oneOf(['theme-background-color-blue', 'theme-background-color-white'])
      .isRequired,
    openItems: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  }),
  content: PropTypes.shape({
    headline: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
    faqs: PropTypes.arrayOf(
      PropTypes.shape({
        headline: {
          text: PropTypes.string.isRequired,
        }.isRequired,
        item: PropTypes.oneOfType([PropTypes.shape(FaqContent.propTypes).isRequired]).isRequired,
      }),
    ).isRequired,
  }),
  className: PropTypes.string,
};

Faq.defaultProps = {
  config: {
    id: '',
    theme: 'theme-background-color-blue',
  },
  content: {
    headline: {
      text: '30 characters maximum',
    },
    faqs: [
      {
        headline: {
          text:
            '106 characters maximum to not equal more than ' +
            '2 lines in a mobile view is recommended for ideal viewing.',
        },
        item: FaqContent.defaultProps,
      },
      {
        headline: {
          text:
            '106 characters maximum to not equal more than ' +
            '2 lines in a mobile view is recommended for ideal viewing.',
        },
        item: FaqContent.defaultProps,
      },
    ],
  },
  className: '',
};