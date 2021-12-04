import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const levels = [1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6'];

export default function MPPHeading(props) {
  const { level, ...rest } = props;
  const LevelComponent = `h${level}`;

  // though children is a required prop, there are cases
  // where no children are passed from organism(missing content)
  // we end up rendering an empty heading with no content.
  if (props.children) {
    return (
      <LevelComponent
        {...rest}
        className={cx('pypl-heading', props.className)}
      >
        {props.children}
      </LevelComponent>
    );
  }
  return null;
}

MPPHeading.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf(levels),
  className: PropTypes.string,
};

MPPHeading.defaultProps = {
  level: '1',
  className: '',
};