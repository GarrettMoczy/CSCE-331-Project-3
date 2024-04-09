"use client"

interface CartItemProps {
    name: string;
    price: string;
}

export default function CartItem({name, price}: CartItemProps){
    return(
        <div className="flex">
            <div>
                {name}: {price}
            </div>
        </div>
    );
}