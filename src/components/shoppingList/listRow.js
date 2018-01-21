/* component to render row for a shopping list */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingListRow extends Component {
    onClickUpdate = () => {
      // shoppinglist object to update-redirect to edit form
      this.props.handleUpdate(this.props.shoppingList);
    }
    onClickDelete = () => {
      this.props.handleDelete(this.props.shoppingList.id);
    }

    render() {
      const shoppingList = this.props.shoppingList;
      return (
        <tr>
          <td>{shoppingList.name}</td>
          <td>{shoppingList.due_date}</td>
          <td colSpan={2}>
            <button> View</button>
            <button onClick={this.onClickUpdate}>Update</button>
            <button onClick={this.onClickDelete}>Delete</button>
          </td>
        </tr>
      );
    }
}
ShoppingListRow.propTypes = {
  shoppingList: PropTypes.shape.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default ShoppingListRow;
