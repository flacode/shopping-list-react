import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableHeading extends Component{
    render(){
        return (
            <th>{ this.props.heading }</th>
        );
    }
}

TableHeading.propTypes = {
    heading: PropTypes.string.isRequired
}
