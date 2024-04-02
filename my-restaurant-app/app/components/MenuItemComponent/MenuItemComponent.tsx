"use client"

interface MenuItemProps {
    name: string;
    price: string;
    altTxt: string;
    thisOnClick: () => void;
}

export default function MenuItem({name, price, altTxt, thisOnClick}: MenuItemProps){
    return(
        <button className='flex flex-col justify-center items-center  rounded-3xl border-white border-4 overflow-off' onClick={thisOnClick}>
            <div className='font-bold text-white'>
                {name}
            </div>
            <div className='flex justify-center font-bold text-white'>
                {price}
            </div>
        </button>
    );
}