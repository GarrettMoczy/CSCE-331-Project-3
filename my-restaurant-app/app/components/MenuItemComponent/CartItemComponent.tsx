"use client"

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

export default function CartItem({name, price, addedItems, removedItems, type}: CartItemProps){
   addedItems? price += addedItems.reduce((total, item) => total + item.price, 0): price
    return(
        <div className="flex flex-col border-b-2 border-gray-200 m-2 p-2">
            <div className="flex flex-row items-center justify-items-center">
                <img className="w-10 mx-2 float-left" src={type == 2? "images/tacos/"+ name + ".jpg": "images/drinks/"+ name.split(' ')[0] + ".jpg"}/>
                {name}: {price.toFixed(2)}$
            </div>
            {addedItems && addedItems.map((item, index) => (
                <div className="justify-self-end self-end text-sm text-green-700">
                    +{item.name}
                </div>
            ))}

            {removedItems && removedItems.map((item, index) => (
                <div className="justify-self-end self-end text-sm text-red-500">
                    No {item.name}
                </div>
            ))}
        </div>
    );
}