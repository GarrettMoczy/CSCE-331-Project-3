'use client'
import MenuItemComp from "../components/MenuItemComponent/MenuItemComponent";
import DrinkItemComp from "../components/DrinkItemComponent/DrinkItemComponent";
import React, { useState, useEffect } from 'react'
import Navbar from "../components/Navbar/Navbar";

export default function Menu() {
    enum ItemType {
        Drink = 1,
        Taco = 2,
        AddOn = 3
    }

    interface MenuItem {
        name: string;
        price: string;
        altTxt: string;
        calorie: number;
        type: ItemType;
        id: number;
        // thisOnClick: () => void;
    }

    interface CartItem {
        name: string;
        price: string;
        type: ItemType;
    }

    interface DrinkItem{
        size: string;
        price: number;
        name: string;
        altTxt: string;
        calorie: string;
        type: ItemType;
    }

    interface IngredientItem {
        name: string,
        id: number,
        price: number
    }
    
    
    const [MenuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [DrinkItems, setDrinkItems] = useState<DrinkItem[]>([]);
    const [includedIngredients, setIncludedIngredients] = useState<IngredientItem[][]>([])
    const [allIngredients, setAllIngredients] = useState<IngredientItem[]>([])
    
    useEffect(() => {
        getMenuItems();
        getDrinks();
        getIngredients();
    }, []);

    function addToCart(item: any) {
        const newItem: CartItem = { name: item.name, price: item.price, type: item.type};
        let cart: CartItem[] = [];
        if (localStorage.getItem("cart") !== null) {
            cart = JSON.parse(localStorage.getItem("cart") as string);
        }
       
        cart.push(newItem);
        const testVar = JSON.stringify(cart);
        console.log(testVar);
        localStorage.setItem("cart", testVar);
    }

    function getMenuItems(){
        fetch(`http://localhost:3000/menu_items`) // Replace with the actual API endpoint URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Process the data received from the API and store it in the state   
                const menuData: MenuItem[] = data.map((item: any) => ({
                    name: item.name,
                    price: item.price,
                    altTxt: "",
                    calorie: item.calorie,
                    type: ItemType.Taco,
                    id: item.id
                }));
                setMenuItems(menuData);
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
                const drinkData: DrinkItem[] = data.map((item: any) => ({
                    size: item.size,
                    price: item.price,
                    name: "",
                    type: ItemType.Drink,
                    calorie: item.calories
                }));
                setDrinkItems(drinkData);
        })
    }

    function getIngredients() {
        fetch('http://localhost:3000/menu_item_ingredients') 
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const ingredientArray: IngredientItem[][] = [];
                const allIngredientsArray: IngredientItem[]= [];
                data.forEach((item: any) => {
                    let ingredient: IngredientItem = {name: item.name_ing, id: item.id, price: item.add_on_price}
                    if (!ingredientArray[item.item_id]) {
                        ingredientArray[item.item_id] = [];
                    }
                    ingredientArray[item.item_id].push(ingredient);
                    if(item.valid_add_on) {
                        allIngredientsArray[item.id] = ingredient;
                    }
                });
                setIncludedIngredients(ingredientArray)
                setAllIngredients(allIngredientsArray)
            })
    }

    function filterAddOns(includedIngredients: IngredientItem[], allIngredients: IngredientItem[]): IngredientItem[] {
        return allIngredients.filter((x) => {
            return !includedIngredients.some((element) => x.id === element.id);
        });
    }
   
    return (
        <main>
            <Navbar></Navbar>
            <div className="flex flex-col items-left h-auto w-auto pt-20">
                <h1 className="text-8xl p-5">
                    Tacos
                </h1>
                <div className="flex flex-row flex-wrap font-bold text-white overflow-off">
                    {MenuItems.map((MenuItem, index) => (
                        <MenuItemComp
                            key={index}
                            name={MenuItem.name}
                            price={MenuItem.price}
                            calorie={MenuItem.calorie}
                            thisOnClick={() => addToCart(MenuItem)}
                            includedIngredients={includedIngredients?.at(MenuItem.id) || []}
                            addOns = {filterAddOns(includedIngredients?.at(MenuItem.id) || [], allIngredients)}
                            altTxt={MenuItem.altTxt}
                            id={MenuItem.id}
                        />
                    ))}
                </div>
                <h1 className="text-8xl p-5">
                    Drinks
                </h1>
                <div className="flex flex-row flex-wrap font-bold text-white overflow-off">
                    {DrinkItems.map((DrinkItem, index) => (
                        <DrinkItemComp
                            key={index}
                            size={DrinkItem.size}
                            price={DrinkItem.price}
                            calorie={DrinkItem.calorie}
                            thisOnClick= {(item: any) => addToCart(item)}
                            altTxt={DrinkItem.altTxt}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}