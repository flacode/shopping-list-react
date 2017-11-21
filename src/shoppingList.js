/* shopping list component to display shopping lists in a table */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
ShoppingListRow.propTypes = {
    shoppingList: PropTypes.object.isRequired
}

class ShoppingListTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            shoppingLists: []
        };
    }

    componentDidMount(){
        const shoppingLists = [
            {"name": "Food", "id": "1", "due_date": "2017-07-09"},
            {"name": "School items", "id": "2", "due_date": "2017-08-09"},
            {"name": "Hardware", "id": "3", "due_date": "2017-07-29"}
          ]        
        this.setState({
            shoppingLists,
        });
    }
    render(){
        const rows = this.state.shoppingLists.map((shoppingList) => {
            return(
                <ShoppingListRow
                shoppingList={shoppingList}
                key={shoppingList.id.toString()} />
            );
                });
        return (
        <Table> 
            <thead>
                <tr>
                    <TableHeading heading="Name"/>
                    <TableHeading heading="Due date"/>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
            );
    }
}

ShoppingListTable.propTypes = {
    shoppingLists: PropTypes.array.isRequired
}

export default ShoppingListTable;