"use client"
import {useState} from "react"
import Modal from "../MenuItemModal/MenuItemModal";
interface MenuItemProps {
    name: string;
    price: string;
    altTxt: string;
    calorie: number;
    thisOnClick: () => void;
}

export default function MenuItem({name, price, altTxt, calorie, thisOnClick}: MenuItemProps){
    const [openModal, setOpenModal] = useState(false);
    return(
        <div>
            <div className='flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 w-52'>
                <div className="flex flex-col px-5 pt-5">
                    <img src={"images/tacos/" + name + ".jpg"} className="w-40 h-50"></img>
                    <div className='font-bold text-white'>
                        {name}
                    </div>
                    <div className="justify-self-end text-sm">
                        {parseFloat(price).toFixed(2)}$ | {calorie} cal
                    </div>
                </div>
                <button onClick={() => setOpenModal(true)} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40">
                        Customize
                </button>
            </div>
        {openModal && <Modal 
                        setOpenModal={setOpenModal}
                        name={name}
                        price={price}
                        altTxt={altTxt}
                        calorie={calorie}
                        thisOnClick= {thisOnClick} />}
        </div>
    );
}