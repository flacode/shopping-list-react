/* Item component to display items in a shopping list in a table */
import React, { Component } from 'react';
// import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TableHeading from '../tableHeading';
import ItemRow from './itemRow';
import ToggleableItemForm from './toggleForm';

class ItemDashBoard extends Component {
    state = {
      items: [],
    };

    componentDidMount() {
      this.loadItemsFromServer();
      setInterval(this.loadItemsFromServer, 5000);
    }

    loadItemsFromServer = () => {
      const items = [
        {
          name: 'rice', id: '1', bought_from: 'supermarket', quantity: '5', status: 'false',
        },
        {
          name: 'plates', id: '2', bought_from: 'supermarket', quantity: '2', status: 'false',
        },
        {
          name: 'matooke', id: '3', bought_from: 'market', quantity: '6', status: 'true',
        },
      ];
      this.setState({
        items,
      });
    }

    handleCreateItem = (item) => {
      item.id = Math.floor((Math.random() * 100) + 1);
      const newItems = this.state.items.concat(item);
      this.setState({
        items: newItems,
      });
    }

    handleDeleteItem = (itemId) => {
      // TODO: For debugging purposes
      console.log(`item to be deleted ${itemId}`);
    }

    handleUpdateItem = (itemId) => {
      // TODO: For debugging purposes
      console.log(`Id for item to be updated ${itemId}`);
    }

    render() {
      return (
        <div>
          <ItemTable
            items={this.state.items}
            handleDeleteRow={this.handleDeleteItem}
            handleUpdateRow={this.handleUpdateItem}
          />
          <ToggleableItemForm onFormSubmit={this.handleCreateItem} />
        </div>
      );
    }
}

const ItemTable = (props) => {
  const rows = props.items.map(item => (
    <ItemRow
      item={item}
      key={item.id.toString()}
      handleDelete={props.handleDeleteRow}
      handleUpdate={props.handleUpdateRow}
    />
  ));
  return (
    <table>
      <thead>
        <tr>
          <TableHeading heading="Name" />
          <TableHeading heading="Quantity" />
          <TableHeading heading="From" />
          <TableHeading heading="Status" />
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

ItemTable.propTypes = {

  items: PropTypes.shape.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  handleUpdateRow: PropTypes.func.isRequired,
};

export default ItemDashBoard;
