import React from 'react';
import PropTypes from 'prop-types';

const TableHeading = props => (
  <th>{ props.heading }</th>
);

TableHeading.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default TableHeading;
