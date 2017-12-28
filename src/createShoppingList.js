import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import ItemForm from './itemForm';
import TableHeading from './tableHeading';

class ItemRow extends Component {
    render(){
        const item = this.props.item;
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.bought_from}</td>
            </tr>
        );
    }
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
                <TableHeading heading="Name"/>
                <TableHeading heading="Quantity"/>
                <TableHeading heading="From"/>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
            );
    }
}

class NewShoppingListForm extends Component{
    render(){
        return(
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                    />
                </label>
                <br/>
                <label>
                    Due date:
                    <input
                        type="date"
                    />
                </label>
                <br/>
                <ItemTable items={this.props.items} />
                <h3>Add items to shopping list.</h3>
                <ItemForm />
                <br/>
                <input type="submit" value="Done"/>
            </form>
        );
    }
}

export default class NewShoppingList extends Component{
    render(){
        return(
            <div>
                <h2>Create Shopping List</h2>
                <NewShoppingListForm items={this.props.items}/>
            </div>
        );
    }
}