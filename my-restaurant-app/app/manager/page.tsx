'use client'
import React, { useState, useEffect } from 'react'
import Navbar from "../components/Navbar/Navbar";
import Modal from './modal';
import Translate from '../components/Translate/Translate';



export default function Manager() {

    // interface Ingredient {
    //     name: string;
    //     thisOnClick: () => void;
    // }

    // interface menuIngredients {
    //     name: string;
    // }


    // Holding ingredients and list of ingredients in a menu item:
    // const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
    // const [menuIng, setMenuIng] = useState<menuIngredients[]>([]);

    // //Holding item name:
    // const [itemName, setitemName] = useState("");

    // // Hold price:
    // const [itemPrice, setItemPrice] = useState("");

    // // Hold stock:
    // const [itemStock, setItemStock] = useState("");

    // // Hold min stock:
    // const [itemMinStock, setItemMinStock] = useState("");

    // useEffect(() => {
    //     getIngredients();
    // });

    // const [showModal, setShowModal] = useState<boolean>(false);

    // function toggleModal() {
    //     setShowModal(!showModal);
    // }
    
    // function addToMenuItem(item: any) {
    //     const ingredient: menuIngredients = ({name: item});
    //     menuIng.push(ingredient);
    // }

    function newMenuItem() {
        let name = prompt('Name of the menu item:');
        if(name == null) {
            return;
        }
        let price = prompt('Price of the menu item:');
        if(price == null) {
            return;
        }

        let ingredients_prompt = prompt();
        if(ingredients_prompt == null) {
            return;
        }
        var ingredients = ingredients_prompt.split(",");

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

    function deleteDrink() {
        let name = prompt('Drink name to delete:');
        if(name == null) {
            return;
        }
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
    function deleteMenuItem() {
        let name = prompt('Menu Item Name to delete:');
        if(name == null) {
            return;
        }
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
        let name = prompt('Ingredient to delete:');
        if(name == null) {
            return;
        }
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

    // function getIngredients(){
    //     fetch(`http://localhost:3000/ingredients`) // Replace with the actual API endpoint URL
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             // Process the data received from the API and store it in the state   
    //             const ingData: Ingredient[] = data.map((item: any) => ({
    //                 name: item.name,
    //                 thisOnClick: () => {addToMenuItem(item)}
    //             }));
    //             setMenuIng(ingData);
    //     })
    // }

    //---------------Test Functions---------------//


    return (
        <main>
            <Navbar></Navbar>
            <div className='fixed right-0 bottom-3 z-[999]'>
                <Translate></Translate>
            </div>
           
            <div>
                <div className='New Options'>
                    {/* <div className="Create Menu Item">
                        <button type="button" className="btn" onClick={toggleModal}>Create Menu Item</button>
                    </div>
                    <Modal open={showModal} onClose={toggleModal}>
                        <div>
                        <form onSubmit={newMenuItem}>
                                <label>
                                    New Menu Item Name:
                                    <input style={{color: "black"}} type='text' value={itemName} onChange={(e) => setitemName(e.target.value)}/>
                                </label>
                                <label>
                                    Price:
                                    <input style={{color: "black"}} type='text' value={itemPrice} onChange={(e) => setitemName(e.target.value)}/>
                                </label>
                                <label>
                                    Ingredients:
                                    <select name="fruits" multiple={true}>
                                        {ingredientList.map((e, key) => {
                                            return <option key={key} value={e.value}>{e.name}</option>;
                                        })}
                                    </select>
                                    
                                </label>
                                <input type='submit'/>
                        </form>
                        </div>
                    </Modal> */}
                    <button onClick={newMenuItem}>New Ingredient</button>
                    <br />
                    <button onClick={newIngredient}>New Ingredient</button>
                    <br />
                    <button onClick={newDrink}>New Drink</button>
                </div>


                <div className='Delete Options'>

                    <button onClick={deleteIngredient}>Delete Ingredient</button>
                    <br />
                    <button onClick={deleteDrink}>Delete Drink</button>
                    <br />
                    <button onClick={deleteMenuItem}>Delete Menu Itemk</button>
                    {/* <div className="deleteDrink">
                        <button type="button" className="btn" onClick={toggleModal}>Delete Drink</button>
                    </div>
                    <Modal open={showModal} onClose={toggleModal}>
                        <div>
                        <form onSubmit={deleteDrink}>
                                <label>
                                    Drink to be deleted:
                                    <input style={{color: "black"}} type='text' value={itemName} onChange={(e) => setitemName(e.target.value)}/>
                                </label>
                                <input type='submit'/>
                        </form>
                        </div>
                    </Modal>
                    <br />
                        <div className="deleteMenuItem">
                            <button type="button" className="btn" onClick={toggleModal}>Delete Menu Item</button>
                        </div>
                        <Modal open={showModal} onClose={toggleModal}>
                            <div>
                            <form onSubmit={deleteMenuItem}>
                                    <label>
                                        Menu item to be deleted:
                                        <input style={{color: "black"}} type='text' value={itemName} onChange={(e) => setitemName(e.target.value)}/>
                                    </label>
                                    <input type='submit'/>
                            </form>
                            </div>
                        </Modal>
                    <br />
                    <div className="deleteIngredient">
                        <button type="button" className="btn" onClick={toggleModal}>Delete Ingredient</button>
                    </div>
                    <Modal open={showModal} onClose={toggleModal}>
                        <div>
                        <form onSubmit={deleteIngredient}>
                                <label>
                                    Ingredient to be deleted:
                                    <input style={{color: "black"}} type='text' value={itemName} onChange={(e) => setitemName(e.target.value)}/>
                                </label>
                                <input type='submit'/>
                        </form>
                        </div>
                    </Modal> */}
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

