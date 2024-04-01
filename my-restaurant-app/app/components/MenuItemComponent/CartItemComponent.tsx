"use client"

interface CartItemProps {
    name: string;
    price: string;
}

export default function CartItem({name, price}: CartItemProps){
    return(
        <div>
            {name}: {price}
        </div>
    );
}