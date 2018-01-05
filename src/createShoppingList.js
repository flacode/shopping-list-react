import React, { Component } from 'react';

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
                <input type="submit" value="Create"/>
            </form>
        );
    }
}

export default class NewShoppingList extends Component{
    render(){
        return(
            <div>
                <h2>Create Shopping List</h2>
                <NewShoppingListForm />
            </div>
        );
    }
}