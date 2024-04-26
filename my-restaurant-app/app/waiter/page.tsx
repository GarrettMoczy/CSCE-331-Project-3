'use client'
import MenuItemComp from "../components/MenuItemComponent/MenuItemComponent";
import React, { useState, useEffect } from 'react'
import Translate from "../components/Translate/Translate";
import Navbar from "../components/Navbar/Navbar";
export default function Menu() {

    interface MenuItem {
        name: string;
        price: string;
        altTxt: string;
        thisOnClick: () => void;
    }
    
    function MenuItemClick(){
        console.log("click")
    }
    
    const [MenuItems, setMenuItems] = useState<MenuItem[]>([]);
    
    useEffect(() => {
        getIngredients();
    });

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
                    thisOnClick: () => {console.log("click")}
                }));
                setMenuItems(menuData);
        })
    }

    return (
        <main className="flex flex-col items-center justify-between p-2">
            <Translate></Translate>
            <Navbar></Navbar>
            <div className="ingredientTabel flex-col justify-center items-center border-rose-700 border-4 h-full w-full overflow-auto rounded-xl">
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
        </main>
    );
}