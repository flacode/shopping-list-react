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
    constructor(props){
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount(){
        const items = [
            {"name": "rice", "id": "1", "bought_from": "supermarket", "quantity": "5", "status": "false"},
            {"name": "plates", "id": "2", "bought_from": "supermarket", "quantity": "2", "status": "false"},
            {"name": "matooke", "id": "3", "bought_from": "market", "quantity": "6", "status": "true"}
          ]
        this.setState({
            items,
        });
    }

    render(){
        const rows = this.state.items.map((item) => {
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