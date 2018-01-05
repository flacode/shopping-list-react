/* Item component to display items in a shopping list in a table */
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TableHeading from './tableHeading';
import ItemForm from './shoppingListItemForm'
class ItemDashBoard extends Component{
    state = {
        items: []
    };

    componentDidMount(){
        this.loadItemsFromServer();
        setInterval(this.loadItemsFromServer, 5000)
    }

    loadItemsFromServer = () => {
        const items = [
            {"name": "rice", "id": "1", "bought_from": "supermarket", "quantity": "5", "status": "false"},
            {"name": "plates", "id": "2", "bought_from": "supermarket", "quantity": "2", "status": "false"},
            {"name": "matooke", "id": "3", "bought_from": "market", "quantity": "6", "status": "true"}
          ]
        this.setState({
            items,
        });
    }

    handleCreateItem = (item) => {
        item.id=Math.floor((Math.random() * 100) + 1);
        const newItems = this.state.items.concat(item);
        this.setState({
            items: newItems,
        })
    }

    handleDeleteItem = (itemId) => {
        console.log('item to be deleted '+ itemId)
    }

    handleUpdateItem = (itemId) => {
        console.log('Id for item to be updated '+ itemId)
    }

    render(){
        return(
            <div>
                <ItemTable
                    items={this.state.items}
                    handleDeleteRow={this.handleDeleteItem}
                    handleUpdateRow={this.handleUpdateItem}
                />
                <ToggleableItemForm onFormSubmit={this.handleCreateItem} />
            </div>
        )
    }
}

class ItemTable extends Component {
    render(){
        const rows = this.props.items.map((item) => {
            return (
                <ItemRow
                    item={item} 
                    key={item.id.toString()} 
                    handleDelete={this.props.handleDeleteRow}
                    handleUpdate={this.props.handleUpdateRow}
                />
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
    items: PropTypes.array.isRequired,
    handleDeleteRow: PropTypes.func.isRequired,
    handleUpdateRow: PropTypes.func.isRequired,
}

class ItemRow extends Component {
    onClickUpdate = () => {
        // item object to update-redirect to edit form
        this.props.handleUpdate(this.props.item);
    }
    onClickDelete = () => {
        this.props.handleDelete(this.props.item.id);
    }

    render(){
        const item = this.props.item;
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.bought_from}</td>
                <td>{item.status}</td>
                <td>
                    <button>View</button>
                    <button onClick={this.onClickUpdate}>Update</button>
                    <button onClick={this.onClickDelete}>Delete</button>
                </td>
            </tr>
        );
    }
}

ItemRow.propTypes = {
    item: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
}

class ToggleableItemForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
        this.handleAddClick=this.handleAddClick.bind(this);
        this.handleFormClose=this.handleFormClose.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
    }

    handleAddClick(){
        this.setState({
            isOpen: true
        });
    }

    handleFormClose(){
        this.setState({
            isOpen: false
        });
    }

    handleFormSubmit(item){
        if (item.name === ''){
            // will return error message here
            console.log("Item name provided")
            return
        }
        if (item.quantity === ''){
            // will return error message here
            console.log("No quantity provided")
            return
        }
        if (item.bought_from === ''){
            // will return error message here
            console.log("No bought from provided")
            return
        }
        if (item.status === ''){
            // will return error message here
            console.log("No status provided")
            return
        }
        
        this.props.onFormSubmit(item);
        this.setState({
           isOpen: false 
        });
    }

    render(){
        if (this.state.isOpen){
            return(
                <ItemForm onFormClose={this.handleFormClose} onFormSubmit={this.handleFormSubmit}/>
            );
        } else {
            return(
                <button type='button' onClick={this.handleAddClick}>Add</button>
            );
        }
    }
}

ToggleableItemForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
}

export default ItemDashBoard;
