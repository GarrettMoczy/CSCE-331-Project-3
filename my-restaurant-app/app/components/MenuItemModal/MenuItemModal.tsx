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
        <div className="flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off w-4/5 h-4/5">
            <div className="header flex flex-row items-center justify-items-center h-28 w-full p-5">
            <img src={"images/tacos/" + name + ".jpg"} className="w-24 pr-5"></img>
                <div>
                    {name}
                </div>
                <div className="flex-auto">
                        
                </div>
                <div className="">
                    <button onClick={() => {thisOnClick(); setOpenModal(false);}} className="self-center p-1 m-3 h-16 w-52 text-xl border-2 border-zinc-700 bg-black">Send to Cart </button>
                    <button className="text-xl m-5" onClick={()=> setOpenModal(false)}> X </button>
                </div>
            </div>
            <div className="flex flex-col">
            </div>
        </div>
    </div>
    );
} 

export default MenuItemModal;