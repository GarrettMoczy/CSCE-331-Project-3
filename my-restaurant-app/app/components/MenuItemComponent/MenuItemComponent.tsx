"use client"

interface MenuItemProps {
    name: string;
    price: string;
    altTxt: string;
    thisOnClick: () => void;
}

export default function MenuItem({name, price, altTxt, thisOnClick}: MenuItemProps){
    return(
        <button className='w-full h-full flex justify-center items-center bg-slate-100 rounded-3xl border-rose-700 border-4' onClick={thisOnClick}>
            <div className='flex justify-center items-center text-5xl font-bold text-rose-700 p-20'>
                {name}
            </div>
            <div className='flex justify-center items-center text-5xl font-bold text-rose-700 p-20'>
                {price}
            </div>
        </button>
    );
}