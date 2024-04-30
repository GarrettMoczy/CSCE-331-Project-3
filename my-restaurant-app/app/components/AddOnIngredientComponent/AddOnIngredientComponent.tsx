'use client'
import React from "react"
import {useState} from "react"

interface IngredientItem {
    name: string,
    id: number,
    price: number
}

interface IngredientItemProp {
    name: string,
    id: number,
    price: number
    addedItems: IngredientItem[]
}



export default function IncludedIngredientComp({name, id, price, addedItems}: IngredientItemProp) {

    function modifyRemovedIngredients() {
        let obj = addedItems.findIndex(o => o.name === name)
        if(obj != -1) {
            if(obj == 0) {
                addedItems.splice(0,1)
            }
            addedItems.splice(obj,obj)
        }
        else {
            addedItems.push({name, id, price})
        }
        console.log(addedItems)
    }
    const [selected, setSelected] = useState(false)

    return (
        !selected && (
        <button onClick={() => {modifyRemovedIngredients(); if(addedItems.find(o => o.name === name)){ setSelected(true)}}} className="border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 p-2 w-auto text-sm">
            <img className="w-32 m-2" src={"images/ingredients/" + name + ".jpg"} alt={name}/>
            {name} | +{price.toFixed(2)}$
        </button>)
        || selected && (
        <button onClick={() => {modifyRemovedIngredients(); if(!addedItems.find(o => o.name === name)){ setSelected(false)}}} className="border-green-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 p-2 w-auto relative text-sm">
            <img className="w-32 m-2" src={"images/ingredients/" + name + ".jpg"} alt={name}/>
            <img src={"images/GreenCheck.png"} className="w-12 absolute z-[1001] top-14 left-14"></img>
            {name} | +{price.toFixed(2)}$
        </button>)
    );
}