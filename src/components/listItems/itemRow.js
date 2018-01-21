/* Component to render individual items in shopping list */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemRow extends Component {
    onClickUpdate = () => {
      // item object to update-redirect to edit form
      this.props.handleUpdate(this.props.item);
    }
    onClickDelete = () => {
      this.props.handleDelete(this.props.item.id);
    }

    render() {
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
  item: PropTypes.shape.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default ItemRow;