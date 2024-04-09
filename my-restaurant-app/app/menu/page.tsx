'use client'
import MenuItemComp from "../components/MenuItemComponent/MenuItemComponent";
import CartItemComp from "../components/MenuItemComponent/CartItemComponent"
import React, { useState, useEffect } from 'react'


export default function Menu() {

    interface MenuItem {
        name: string;
        price: string;
        altTxt: string;
        thisOnClick: () => void;
    }

    interface CartItem {
        name: string;
        price: string;
    }
    
    function MenuItemClick(){
        console.log("click")
    }
    
    const [MenuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [CartItems, setCartItems] = useState<CartItem[]>([]);
    
    useEffect(() => {
        getIngredients();
    });

    function addToCart(item: any) {
        const Cart: CartItem = ({name: item.name, price: item.price});
        CartItems.push(Cart);
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
                    thisOnClick: () => {addToCart(item)}
                }));
                setMenuItems(menuData);
        })
    }

    return (
        <main>
            <div className="flex flex-row items-center h-screen w-screen justify-end">
                <div className="h-auto w-1/4">
                </div>
                <div className="p-5 mx-20 flex flex-row grid gap-4 grid-cols-3 font-bold text-white border-4 h-3/4 overflow-y-scroll rounded-xl flex-wrap">
                    {MenuItems.map((MenuItem, index) => (
                        <MenuItemComp
                            key={index}
                            name={MenuItem.name}
                            price={MenuItem.price}
                            thisOnClick={MenuItem.thisOnClick}
                            altTxt={MenuItem.altTxt}
                        />
                    ))}
                </div>
                <div className="h-auto w-1/4">
                </div>
                <div className="flex flex-col items-center h-screen bg-slate-100 w-20lvh max-w-md min-w-56  font-mono text-black overflow-auto ">
                    Cart
                    {CartItems.map((CartItem, index) => (
                        <CartItemComp
                            key={index}
                            name={CartItem.name}
                            price={CartItem.price}
                        />
                    ))}
                    <div className="justify-self-end">
                        Total: {CartItems.reduce((sum, item) => sum + parseFloat(item.price), 0)}
                    </div>
                </div>
            </div>
        </main>
    );
}