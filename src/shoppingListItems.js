/* Item component to display items in a shopping list in a table */
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TableHeading from './tableHeading';
import Delete from "./delete";

class ItemRow extends Component {
    render(){
        const item = this.props.item;
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.bought_from}</td>
                <td>{item.status}</td>
                <td><Delete /></td>
            </tr>
        );
    }
}

ItemRow.propTypes = {
    item: PropTypes.object.isRequired
}

class ItemTable extends Component {
    render(){
        const rows = this.props.items.map((item) => {
            return(
                <ItemRow
                item={item} 
                key={item.id.toString()} />
            );
                });
        return (
        <Table>
            <thead>
                <tr>
                    <TableHeading heading="Name"/>
                    <TableHeading heading="Quantity"/>
                    <TableHeading heading="From"/>
                    <TableHeading heading="Status"/>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
            );
    }
}

ItemTable.propTypes = {
    items: PropTypes.array.isRequired
}

export default ItemTable;