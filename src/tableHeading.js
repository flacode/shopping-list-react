import React, { Component } from 'react';

export default class TableHeading extends Component{
    render(){
        return (
            <th>{ this.props.heading }</th>
        );
    }
}
