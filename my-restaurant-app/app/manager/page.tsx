'use client'
import React, { useState, useEffect } from 'react'
import Navbar from "../components/Navbar/Navbar";
import DeleteFunction from "../components/ManagerComponent/deleteFunction"
import CreateMenuItemFunction from "../components/ManagerComponent/deleteFunction"



export default function Manager() {

    // Used for deletion:
    interface Ingredient {
        name: string;
    }

    interface Drink {
        name: string;
    }
    
    interface MenuOption {
        name: string;
    }

    // What ingredients will be apart of a menu option:
    interface menuIngredients {
        name: string;
    }


    // Holding ingredients:, drinks, menu options:
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
    const [drinkList, setDrinkList] = useState<Drink[]>([]);
    const [menuList, setMenuList] = useState<MenuOption[]>([]);


    useEffect(() => {
        getIngredients();
        getDrinks();
        getMenuOptions();
    }, []);

    function newMenuItem(name: string, price: string, ingredients: string[] ) {
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
        if(name == null) {
            return;
        }
        let stock = prompt('Amount of stock:');
        if(stock == null) {
            return;
        }
        let price = prompt('Price of the ingredient');
        if(price == null) {
            return;
        }
        let minStock = prompt('What is the minimum stock of this ingredient:');
        if(minStock == null) {
            return;
        }
        

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
        let size = prompt('New size of drink:');
        if(size == null) {
            return;
        }
        let price = prompt('Price for the size:');
        if(price == null) {
            return;
        }

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

    function deleteDrink(name: string) {
        fetch('http://localhost:3000/delete_drink', {
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
    function deleteMenuItem(name: string) {
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
    function deleteIngredient(name: string) {
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

    //---------------Update Options---------------//

    function increaseStock() {
        let name = prompt('What is the name of the ingredient you want to increase the stock of:');
        if(name == null) {
            return;
        }
        let stock = prompt('How much would you like to increase the stock by:');
        if(stock == null) {
            return;
        }

        fetch('http://localhost:3000/change_stock', {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Headers': "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, stock}),
        })
        .then(response => {
            return response.text();
        })
    }

    function changePrice() {
        let name = prompt('Menu item to change the price of:');
        if(name == null) {
            return;
        }
        let price = prompt('New price:');
        if(name == null) {
            return;
        }
        fetch('http://localhost:3000/change_stock', {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Headers': "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, price}),
        })
        .then(response => {
            return response.text();
        })
    }

    //---------------Helper Functions---------------//

    // Getting items and putting them into their assigned states:
    function getIngredients(){
        fetch(`http://localhost:3000/ingredients`) // Replace with the actual API endpoint URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Process the data received from the API and store it in the state   
                const ingData: Ingredient[] = data.map((item: any) => ({
                    name: item.name,
                }));
                setIngredientList(ingData);
        })
    }
    function getDrinks(){
        fetch(`http://localhost:3000/drinks`) // Replace with the actual API endpoint URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Process the data received from the API and store it in the state   
                const ingData: Drink[] = data.map((item: any) => ({
                    name: item.size,
                }));
                setDrinkList(ingData);
        })
    }
    function getMenuOptions(){
        fetch(`http://localhost:3000/menu_items`) // Replace with the actual API endpoint URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Process the data received from the API and store it in the state   
                const ingData: MenuOption[] = data.map((item: any) => ({
                    name: item.name,
                }));
                setMenuList(ingData);
        })
    }



    return (
        <main>
            <Navbar></Navbar>
            <div>
                <div className='New Options'>
                    <CreateMenuItemFunction name='Create Menu Item' items={ingredientList} fun={newMenuItem} />
                </div>


                <div className='Delete Options'>
                    <DeleteFunction name="Delete Ingredient" items = {ingredientList} fun = {deleteIngredient} />
                    <DeleteFunction name="Delete Drink" items = {drinkList} fun = {deleteDrink} />
                    <DeleteFunction name="Delete Menu Item" items = {menuList} fun = {deleteMenuItem} />
                </div>
                    
                <div className='Changing'>
                    <button onClick={increaseStock}>Increase Stock</button>
                    <br />
                    <button onClick={changePrice}>Change Price</button>
                </div>
            </div>
        </main>
    )
}

