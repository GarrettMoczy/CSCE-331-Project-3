'use client'
import React, { useState, useEffect } from 'react'
import Navbar from "../components/Navbar/Navbar";

import Modal from './modal';
import Translate from '../components/Translate/Translate';
import DeleteFunction from "../components/ManagerComponent/deleteFunction"
import CreateMenuItemFunction from "../components/ManagerComponent/createMenuItemFunction"
import CreateDrinkFunction from "../components/ManagerComponent/createDrinkFunction"
import CreateIngredientFunction from "../components/ManagerComponent/createIngredientFunction"
import ChangePriceFunction from "../components/ManagerComponent/changePriceFunction"
import IncreaseStockFunction from "../components/ManagerComponent/increaseStockFunction"
import TableFunction from "../components/ManagerComponent/TableFunction"




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

    // Holding ingredients:, drinks, menu options:
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
    const [drinkList, setDrinkList] = useState<Drink[]>([]);
    const [menuList, setMenuList] = useState<MenuOption[]>([]);


    useEffect(() => {
        getIngredients();
        getDrinks();
        getMenuOptions();
    }, []);

    function newMenuItem(name: string, price: string, calories: string, ingredients: string[] ) {
        fetch('http://localhost:3000/new_menu_option', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Headers': "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, price, calories, ingredients}),
        })
        .then(response => {
            return response.text();
        })
    }
    function newIngredient(name: string, stock: string, price: string, minStock: string, addOn: boolean) {
        fetch('http://localhost:3000/new_add_on', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Headers': "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, stock, price, minStock, addOn}),
        })
        .then(response => {
            return response.text();
        })
    }
    function newDrink(size: string, price: string) {
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

    function increaseStock(name: string, stock: string) {
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

    function changePrice(name: string, price: string) {
        fetch('http://localhost:3000/change_price', {
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
                    name: item.name_ing,
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
            <div className='fixed right-0 bottom-3 z-[999]'>
                <Translate></Translate>
            </div>
           
            <div>


            <div className='grid grid-cols-4 gap-4'>
                {/* Fix Formatting */}
                <div id='New Options'>   
                    <br />
                    <br />
                    <br />                  
                    <CreateMenuItemFunction name='Create Menu Item' items={ingredientList} fun={newMenuItem} />
                    <CreateDrinkFunction name='Create Drink Size' fun={newDrink} />
                    <CreateIngredientFunction name='Create Ingredient' fun={newIngredient} />
                </div>

                {/* Fix Formatting */}
                <div id='Delete Options'>
                    <br />
                    <br />
                    <br /> 
                    <DeleteFunction name="Delete Ingredient" items = {ingredientList} fun = {deleteIngredient} />
                    <DeleteFunction name="Delete Drink" items = {drinkList} fun = {deleteDrink} />
                    <DeleteFunction name="Delete Menu Item" items = {menuList} fun = {deleteMenuItem} />
                </div>
                    
                {/* Fix Formatting */}    
                <div id='Changing'>
                    <br />
                    <br />
                    <br /> 
                    <IncreaseStockFunction name="Increase Ingredient Stock" items={ingredientList} fun={increaseStock} />
                    <ChangePriceFunction name="Change Menu Item Price" items={menuList} fun={changePrice} />
                </div>
                {/* Fix Formatting */} 
                <div id='Tables' className=''>
                    <br />
                    <br />
                    <br /> 
                    <TableFunction></TableFunction>
                </div>
            </div>
        </main>
    )
}

