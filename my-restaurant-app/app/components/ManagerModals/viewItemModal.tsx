'use client'
import React, { useState } from "react"
import "../MenuItemModal/MenuItemModal.css"
import "../ManagerComponent/table.css"

interface ModalItemProps {
    setOpenModal: any;
}

interface Table {
    col1: any;
    col2: any;
    col3: any;
    col4: any;
    col5: any
}

// Prompt the user to delete an item and based on parameters to decide from which
// setOpenModal - if the modal is open
// name - Title of modal
// item - array of which possible items maybe deleted
// thisOnClick - function used
function viewItemModal({ setOpenModal}: ModalItemProps) {
    const [fun, setFun] = useState("Menu Items");
    const [tableVal, setTableVal] = useState<Table[]>([]);

    const[col1, setCol1] = useState("");
    const[col2, setCol2] = useState("");
    const[col3, setCol3] = useState("");
    const[col4, setCol4] = useState("");
    const[col5, setCol5] = useState("");

    const changeFun = (e: any) => {
        setFun(e.target.value);
    }

    function tableCreation() {
        if(fun == "Menu Items") {
            setCol1("Name");
            setCol2("Price");
            setCol3("Calories");
            setCol4("Ingredients");
            setCol5("");
            getMenuItems();
            console.log(tableVal);

        }
        if(fun == "Ingredients") {
            setCol1("Name");
            setCol2("Stock");
            setCol3("Price");
            setCol4("Min Stock");
            setCol5("Valid Add-on");
            getIngredients();
            console.log(tableVal);
        }
        if(fun == "Drinks") {
            setCol1("Size");
            setCol2("Price");
            setCol3("Calories");
            setCol4("");
            setCol5("");
            getDrinks();
            console.log(tableVal);
        }
    }

        function getMenuItems(){
            fetch(`http://localhost:3000/get_menu_items`) // Replace with the actual API endpoint URL
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    const tableData: Table[] = data.map((item: any) => ({
                    col1: item.menu_name,
                    col2: item.price,
                    col3: item.calories,
                    col4: [item.items].toString()
                }));
                setTableVal(tableData);
            })
        }

        function getIngredients(){
            fetch(`http://localhost:3000/ingredients`) // Replace with the actual API endpoint URL
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    const tableData: Table[] = data.map((item: any) => ({
                    col1: item.name_ing,
                    col2: item.stock,
                    col3: item.add_on_price,
                    col4: item.min_stock,
                    col5: [item.valid_add_on].toString()
                }));
                setTableVal(tableData);
            })
        }

        function getDrinks(){
            fetch(`http://localhost:3000/drinks`) // Replace with the actual API endpoint URL
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    const tableData: Table[] = data.map((item: any) => ({
                    col1: item.size,
                    col2: item.price,
                    col3: item.calories
                }));
                setTableVal(tableData);
            })
        }

    
    return (
    <div className="modalBackground">
        <div className="border-zinc-700 border-2 bg-zinc-900 rounded-lg">
            <div className="self-end float-right p-2">
                <button onClick={()=> setOpenModal(false)}> X </button>
            </div>
            <div className="ml-2 text-lg">
                {fun}
            </div>
            <div className="">
                <div>
                    <table>
                            <thead>
                                <tr>
                                    <th>{col1} </th>
                                    <th>{col2} </th>
                                    <th>{col3} </th>
                                    <th>{col4} </th>
                                    <th>{col5} </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                tableVal.map((obj,key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{obj.col1}</td>
                                            <td>{obj.col2}</td>
                                            <td>{obj.col3}</td>
                                            <td>{obj.col4}</td>
                                            <td>{obj.col5}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <select onChange={changeFun} className="flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 w-52">
                    <option value={"Menu Items"}>Menu Items</option>
                    <option value={"Ingredients"}>Ingredients</option>
                    <option value={"Drinks"}>Drinks</option>
                </select>
                <div id="Generate">
                    <button onClick={() => {tableCreation();}} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40"> Generate Table </button>
                </div>
            </div>
        </div>
    );
} 

export default viewItemModal;