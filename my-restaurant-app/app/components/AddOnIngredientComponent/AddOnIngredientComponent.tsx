'use client'
import React from "react"

interface IngredientItem {
    name: string,
    id: number,
    price: number
}


export default function addOnIncludedIngredientComp({name, id, price}: IngredientItem) {
    return (
        <button className="border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 p-2 w-auto text-sm">
            <img className="w-32 m-2" src={"images/ingredients/" + name + ".jpg"}/>
            {name} | +{price.toFixed(2)}$
        </button>
    );
}