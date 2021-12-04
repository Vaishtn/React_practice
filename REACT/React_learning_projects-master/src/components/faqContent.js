import React from 'react';
import htmlToReact from 'html-to-react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const htmlToReactParser = new htmlToReact.Parser();

const renderParagraph = (paragraph) => {
  if (paragraph) {
    return <p className="faq-content__paragraph">{htmlToReactParser.parse(paragraph.text)}</p>;
  }
  return null;
};

const renderHatchLink = (link) => {
  if (link && link.text) {
    let linkTarget;
    if (link.target) {
      linkTarget = `${link.target}`;
    }
    return (
      <a id={link.id} href={link.href} target={linkTarget} className="faq-content__link">
        {link.text}
      </a>
    );
  }
  return null;
};

const FaqContent = (props) => {
  const { paragraph, link } = props.content;

  const moleculeClasses = cx('faq-content', props.className);

  return (
    <div className={moleculeClasses}>
      {renderParagraph(paragraph)}
      {renderHatchLink(link)}
    </div>
  );
};

export default FaqContent;

FaqContent.propTypes = {
  content: PropTypes.shape({
    paragraph: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
    link: PropTypes.shape({
      id: PropTypes.string,
      href: PropTypes.string,
      text: PropTypes.string,
      target: PropTypes.oneOf(['_self', '_blank']),
    }),
  }),
  className: PropTypes.string,
};

FaqContent.defaultProps = {
  content: {
    paragraph: {
      text: '300 characters maximum is recommended to minimize scrolling in a mobile view.',
    },
    link: {
      id: '',
      href: '#',
      text: '34 characters maximum per line',
      target: '_blank',
    },
  },
  className: '',
};