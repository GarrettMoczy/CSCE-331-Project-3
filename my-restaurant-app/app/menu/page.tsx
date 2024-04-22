'use client'
import MenuItemComp from "../components/MenuItemComponent/MenuItemComponent";
import CartItemComp from "../components/MenuItemComponent/CartItemComponent"
import React, { useState, useEffect } from 'react'
import Navbar from "../components/Navbar/Navbar";

export default function Menu() {

    interface MenuItem {
        name: string;
        price: string;
        altTxt: string;
        calorie: number;
        // thisOnClick: () => void;
    }

    interface CartItem {
        name: string;
        price: string;
    }
    
    
    const [MenuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [CartItems, setCartItems] = useState<CartItem[]>([]);
    const [numItems, setNumItems] = useState<number>(0);
    
    useEffect(() => {
        getIngredients();
    }, []);

    function addToCart(item: any) {
        const newItem: CartItem = ({name: item.name, price: item.price});
        var cart: Array<CartItem>
        if(localStorage.getItem("cart") == null) {
             cart = []
        }
        else {
            cart= JSON.parse(localStorage.getItem("cart") as string);
        }
       
        cart.push(newItem)
        var testVar = JSON.stringify(cart)
        localStorage.setItem("cart", testVar)
    }

    function getIngredients(){
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
                    // thisOnClick: addToCart(item)
                }));
                setMenuItems(menuData);
        })
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
                            thisOnClick= {() => addToCart(MenuItem)}
                            altTxt={MenuItem.altTxt}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}