"use client"
import React from "react";
import Translate from "../components/Translate/Translate";
import { useState } from 'react';
import Link from 'next/link';
import CartItemComponent from "../components/MenuItemComponent/CartItemComponent";
import "./page.css"

interface CartItemProps {
    name: string;
    price: number;
    addedItems: IngredientItem[];
    removedItems: IngredientItem[];
    type: number;
}

interface IngredientItem {
    name: string,
    id: number,
    price: number
}


export default function checkOut() {
    const [cart, setCart] = useState<CartItemProps[]>(localStorage.getItem("cart") != null ? JSON.parse(localStorage.getItem("cart") as string) : [])

    function calculateSubtotal(cart: CartItemProps[]): number {
        let subtotal = 0;
        cart.forEach((CartItem) => {
            subtotal += CartItem.price;
            if (CartItem.addedItems) {
                CartItem.addedItems.forEach((addon) => {
                    subtotal += addon.price;
                });
            }
        });
        return subtotal;
    }
    let subtotal = calculateSubtotal(cart)
    // function checkOut() {
    //     const cartItemNames = cart.map((item) => (item.name));
    //     console.log(JSON.stringify({cartItemNames,Drinks,AddOns}))
    //     fetch('http://localhost:3000/new_order', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({cartItemNames,Drinks,AddOns})
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Failed to send order');
    //         }
    //         else {
    //             localStorage.clear();
    //         }
    //         return response.json()
    //     })
    //     .then((data) => {
    //         //console.log(data)
    //         alert(data.orderId)
    //         localStorage.clear()
            
    //     });
    // }

    return (
        <main className="bg-zinc-200 text-black h-screen">
            <div className='fixed right-0 bottom-0 z-[999]'>
                <Translate></Translate>
            </div>
            <div>
                <div className='flex w-100vw bg-white text-black'>
                    <Link className='text-[25px] mt-[14px] ml-[16px] text-bold' href="/" passHref>
                        PACO PACO
                    </Link>
                    <Link  className='text-[25px] mt-[14px] ml-[16px] text-semibold' href="/menu">
                        {"<"} Back to Menu
                    </Link>
                </div>
            </div>
            <div className="flex flex-row w-full justify-between h-100vh flex-wrap p-20">
                <h1 className=" w-full text-[50px] text-black">CHECK OUT</h1>  
                    <div className="flex  flex-col justify-around relative border-zinc-400 border-2 rounded-lg w-2/5 h-full">
                        <h2 className="flex flex-row items-center justify-items-center h-28 w-full text-[25px]">
                            <div className="border-b-2 border-zinc-400 w-full p-5">
                                MY CART
                            </div>
                        </h2>
                        <div className="h-4/5">
                            {cart.map((CartItem, index) => (
                                <CartItemComponent
                                    key={index}
                                    name={CartItem.name}
                                    price={CartItem.price}
                                    addedItems={CartItem.addedItems}
                                    removedItems={CartItem.removedItems}
                                    type={CartItem.type}
                                />
                            ))}
                        </div>
                        <footer className="flex flex-col items-start justify-items-start h-28 w-full text-md p-5 text-gray-700">
                            <div className="w-full flex flex-row font-bold">
                                <div className="">
                                    Subtotal: 
                                </div>
                                <div className="ml-auto">
                                    {subtotal.toFixed(2)}$
                                </div>
                            </div>
                            <div className="w-full flex flex-row font-semibold border-b-2 border-zinc-400 border-dashed">
                                <div>
                                    Tax:
                                </div>
                                <div className="ml-auto">
                                    {(subtotal * 0.08).toFixed(2)}$
                                </div>
                            </div>
                            <div className="w-full flex flex-row font-bold text-black text-lg">
                                <div>
                                    Order Total:
                                </div>
                                <div className="ml-auto">
                                    {(subtotal * 1.08).toFixed(2)}$
                                </div>
                            </div>
                        </footer>
                    </div>
                    <div className="flex flex-col justify-around relative border-zinc-400 border-2 rounded-lg w-2/5 h-full"> 
                           Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text 
                    </div>
            </div>
        </main>
    );
}