/* shopping list component to display shopping lists in a table */
import React, { Component } from 'react';
import TableHeading from './tableHeading';
import { Table } from 'react-bootstrap';
import Delete from "./delete";


class ShoppingListRow extends Component {
    render(){
        const shoppingList = this.props.shoppingList;
        return (
            <tr>
                <td>{shoppingList.name}</td>
                <td>{shoppingList.due_date}</td>
                <td><Delete /></td>
            </tr>
        );
    }
}

class ShoppingListTable extends Component {
    render(){
        const rows = this.props.shoppingLists.map((shoppingList) => {
            return(
                <ShoppingListRow
                shoppingList={shoppingList}
                key={shoppingList.id.toString()} />
            );
                });
        return (
        <Table> 
            <thead>
                <TableHeading heading="Name"/>
                <TableHeading heading="Due date"/>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
            );
    }
}

export default ShoppingListTable;