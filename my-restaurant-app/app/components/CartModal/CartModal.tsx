import CartItemComponent from "../MenuItemComponent/CartItemComponent";
import "./CartModal.css"
import React, { useState, useEffect } from 'react'

interface CartItemProps {
    name: string;
    price: string;
    type: number;
    addedItems: IngredientItem[];
    removedItems: IngredientItem[];
}


interface IngredientItem {
    name: string,
    id: number,
    price: number
}

function CartModal({ setOpenModal }: { setOpenModal: any }) {

    function checkOut(CartItems : any[], Drinks: any[], AddOns: any[],) {
        const cartItemNames = CartItems != null ? CartItems.map((item) => (item.name)) : [""];
        console.log(JSON.stringify({cartItemNames,Drinks,AddOns}))
        fetch('http://localhost:3000/new_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cartItemNames,Drinks,AddOns})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send order');
            }
            else {
                localStorage.clear();
            }
            return response.json()
        })
        .then((data) => {
            //console.log(data)
            alert(data.orderId)
            localStorage.clear()
            setCart([])
            
        });
    }

    const [cart, setCart] = useState<CartItemProps[]>(localStorage.getItem("cart") != null ? JSON.parse(localStorage.getItem("cart") as string) : [])

    // const cart: Array<CartItemProps> = JSON.parse(localStorage.getItem("cart") as string);

    return (
        <div>
            <img className="z-[999] w-5 fixed right-0 top-10 mr-2 mt-4"src="/images/triangle-white.png"></img>
            <div className="flex flex-col fixed flex-wrap bg-white border-w overflow-off rounded-md my-5 z-[999] text-black font-semibold h-96 w-52 mr-2 right-0 top-10 items-center">
                <div>
                    {
                    cart.map((CartItem, index) => (
                                <CartItemComponent
                                    key={index}
                                    name={CartItem.name}
                                    price={CartItem.price}
                                />
                            ))}
                </div>
                
                {cart.length === 0 && 
                <div> 
                    Hungry? We have something for that...
                </div>
                }
                <button className="" onClick={() => {localStorage.clear()}}>
                    clear cart
                </button>
                <button className="mt-auto bg-black text-white border rounded-md border-white w-full " onClick={() => { checkOut(cart,[""],[""]); setOpenModal(false)}}>
                    Check out
                </button>
            </div>
        </div>
    );
}

export default CartModal;