"use client"

import { David_Libre } from "next/font/google";

interface MenuItemProps {
    name: string;
    price: string;
    altTxt: string;
    thisOnClick: () => void;
}

export default function MenuItem({name, price, altTxt, thisOnClick}: MenuItemProps){
    return(
        <div className='flex flex-col border-white border-2 bg-zinc-900 overflow-off' onClick={thisOnClick}>
            <div className='font-bold text-white'>
                {name}
            </div>
            <div className="justify-self-end text-sm">
                {parseFloat(price).toFixed(2)}$
            </div>
        </div>
    );
}