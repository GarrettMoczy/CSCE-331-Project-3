'use client'
import React from "react"
import "./MenuItemModal.css"

interface ModalItemProps {
    setOpenModal: any;
    name: string;
    price: string;
    altTxt: string;
    calorie: number;
    thisOnClick: () => void;
}

function MenuItemModal({ setOpenModal, name, price, altTxt, calorie, thisOnClick }: ModalItemProps) {
    return (
    <div className="modalBackground">
        <div className="flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5">
            <div className="self-end float-right p-2">
                <button onClick={()=> setOpenModal(false)}> X </button>
            </div>
            <div className="flex flex-col">
                <img src={"images/tacos/" + name + ".jpg"} className="w-40 h-50"></img>
                <div className='font-bold text-white'>
                    {name}
                </div>
                <div className="justify-self-end text-sm">
                    {parseFloat(price).toFixed(2)}$ | {calorie} cal
                </div>
            </div>
            <div>
                <button onClick={() => {thisOnClick(); setOpenModal(false);}} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40">Send to Cart </button>
                <button className="self-center border-2 rounded-md bg-black p-1 m-3 w-40" onClick={() => setOpenModal(false)}>Cancel</button>
            </div>
        </div>
    </div>
    );
} 

export default MenuItemModal;