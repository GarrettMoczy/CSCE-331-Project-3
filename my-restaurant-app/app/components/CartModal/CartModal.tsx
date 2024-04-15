import React from "react";
import CartItemComponent from "../MenuItemComponent/CartItemComponent";

interface CartItemProps {
    name: string;
    price: string;
}

function CartModal() {
    const cart: Array<CartItemProps> = JSON.parse(localStorage.getItem("cart") as string) || [];

    return (
        <div>
            hehe
        </div>
    );
}

export default CartModal;
