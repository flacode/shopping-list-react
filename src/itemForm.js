import React, { Component } from 'react';

export default class ItemForm extends Component{
    render(){
        return(
            <form>
                <input
                    type="text"
                    placeholder="Item name"
                /> 
                <input
                    type="number"
                    min="1"
                    placeholder="Quantity"
                />
                <input
                    type="text"
                    placeholder="From"
                />
                <input type="submit" value="Add item" />
            </form>
        );
    }
}