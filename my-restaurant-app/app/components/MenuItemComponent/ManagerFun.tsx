import {useState, useEffect} from 'react';

function ManagerFun() {

    //---------------Creating Options---------------//

    function newMenuItem() {
        let name = prompt('Name of the menu item:');
        let price = prompt('Price of the menu item:');
        let ingredients_prompt = prompt('Ingredients used in menu item');
        if(ingredients_prompt == null) {
            ingredients = [];
        }
        else {
            var ingredients = ingredients_prompt.split(",");
        }

        fetch('http://localhost:3000/new_menu_option', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Headers': "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, price, ingredients}),
        })
        .then(response => {
            return response.text();
        })
    }
    function newIngredient() {
        let name = prompt('Name of the ingredient');
        let stock = prompt('Amount of stock:')
        let price = prompt('Price of the ingredient');
        let minStock = prompt('What is the minimum stock of this ingredient:');
        

        fetch('http://localhost:3000/new_add_on', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Headers': "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, stock, price, minStock}),
        })
        .then(response => {
            return response.text();
        })
    }
    function newDrink() {
        let size = prompt('New size:');
        let price = prompt('Price for the size');

        fetch('http://localhost:3000/new_drink', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Headers': "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({size, price}),
        })
        .then(response => {
            return response.text();
        })
    }

    //---------------Deleting Options---------------//

    function deleteDrink() {
        let size = prompt('What size would you like to delete:');

        fetch('http://localhost:3000/delete_drink', {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Headers': "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({size}),
        })
        .then(response => {
            return response.text();
        })
    }
    function deleteMenuItem() {
        let name = prompt('What size would you like to delete:');

        fetch('http://localhost:3000/delete_menu_item', {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Headers': "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name}),
        })
        .then(response => {
            return response.text();
        })
    }
    function deleteIngredient() {
        let name = prompt('What size would you like to delete:');

        fetch('http://localhost:3000/delete_ingredient', {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Headers': "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name}),
        })
        .then(response => {
            return response.text();
        })
    }
    return (
        <div>
            <div className='New Options'>
                <button onClick={newMenuItem}>New Menu Item</button>
                <br />
                <button onClick={newIngredient}>New Ingredient</button>
                <br />
                <button onClick={newDrink}>New Drink</button>
            </div>
            <div className='Delete Options'>
                <button onClick={deleteMenuItem}>Delete Menu Item</button>
                <br />
                <button onClick={deleteIngredient}>Delete Ingredient</button>
                <br />
                <button onClick={deleteDrink}>Delete Drink</button>
            </div>
        </div>
    )
}
export default ManagerFun;