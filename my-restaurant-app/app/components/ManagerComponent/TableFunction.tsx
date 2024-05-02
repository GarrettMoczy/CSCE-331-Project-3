"use client"
import { table } from "console";
import React, {useState} from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CartItem from "../MenuItemComponent/CartItemComponent";
import { format } from "date-fns";
import "./table.css"

interface Table {
    col1: any;
    col2: any;
    col3: any;
}


export default function CreateDrink(){
    const [date, setDate] = useState(format( new Date(), 'yyyy-mm-dd'));
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [fun, setFun] = useState("Sales");
    const [tableVal, setTableVal] = useState<Table[]>([]);

    const[col1, setCol1] = useState("");
    const[col2, setCol2] = useState("");
    const[col3, setCol3] = useState("");

    const[tableStatus, setTableStatus] = useState(true);
    const[dateStatus, setDateStatus] = useState(true);


    const changeFun = (e: any) => {
        setFun(e.target.value);
        if(e.target.value == "Restock") {
            setDateStatus(false);
        }
        else {
            setDateStatus(true);
        }
    }

    function tableCreation() {
        const start: any = startDate;
            const startFormatted: string = format(start, 'yyyy-MM-dd');
            console.log(startFormatted);

            const end: any = endDate;
            const endFormatted: string = format(end, "yyyy-MM-dd");
            console.log(endFormatted);
        if(fun == "Sales") {
            setCol1("Taco Name");
            setCol2("Times sold");
            setCol3("");
            salesReport(startFormatted,endFormatted);
            setTableStatus(false);
        }
        if(fun == "Together") {
            setCol1("First item");
            setCol2("Second item");
            setCol3("Times together")
            sellsTogether(startFormatted,endFormatted);
            setTableStatus(false);
        }
        if(fun == "Excess") {
            setCol1("Ingredients");
            setCol2("");
            setCol3("");
            excessReport(startFormatted,endFormatted);
            setTableStatus(false);
        }
        if(fun == "Product") {
            setCol1("Ingredients");
            setCol2("Count");
            setCol3("");
            productUsage(startFormatted,endFormatted);
            setTableStatus(false);
        }
        if(fun == "Restock") {
            setCol1("Ingredients");
            setCol2("Stock");
            setCol3("");
            restock();
            setTableStatus(false);
        }
        if(fun == "Orders") {
            setCol1("Order ID");
            setCol2("Price");
            setCol3("Items");
            getOrders(startFormatted,endFormatted);
            setTableStatus(false);
        }
    }

    //---------------Getting Tables---------------//


    function salesReport(strDate: string, enDate: string) {
        fetch(' https://csce-331-project-3-10.onrender.com/sales_report', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({strDate, enDate}),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const tableData: Table[] = data.map((item: any) => ({
            col1: item.item_name,
            col2: item.count
        }));
        setTableVal(tableData);
        })
        console.log(tableVal);
    }

    function sellsTogether(strDate: string, enDate: string) {
        fetch(' https://csce-331-project-3-10.onrender.com/sells_together', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({strDate, enDate}),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const tableData: Table[] = data.map((item: any) => ({
            col1: item.item_1,
            col2: item.item_2,
            col3: item.total_times_combined
        }));
        setTableVal(tableData);
        })
        console.log(tableVal);
        
    }

    function excessReport(strDate: string, enDate: string) {
        fetch(' https://csce-331-project-3-10.onrender.com/excess_report', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({strDate, enDate}),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const tableData: Table[] = data.map((item: any) => ({
            col1: item.name_of_item,
        }));
        setTableVal(tableData);
        })
        console.log(tableVal);
    }

    function productUsage(strDate: string, enDate: string) {
        fetch('http://localhost:3000/product_usage', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({strDate, enDate}),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const tableData: Table[] = data.map((item: any) => ({
            col1: item.name,
            col2: item.count
        }));
        setTableVal(tableData);
        })
        console.log(tableVal);
    }

    function restock(){
        fetch(`http://localhost:3000/restock`) // Replace with the actual API endpoint URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const tableData: Table[] = data.map((item: any) => ({
                col1: item.item,
                col2: item.quantity
            }));
            setTableVal(tableData);
        })
    }

    function getOrders(strDate: string, enDate: string) {
        fetch('http://localhost:3000/view_orders', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({strDate, enDate}),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const tableData: Table[] = data.map((item: any) => ({
            col1: item.order_id,
            col2: item.price,
            col3: [item.items].toString() + ","  + [item.drink_items].toString() + "," + [item.ing_items].toString() 
        }));
        setTableVal(tableData);
        })
        console.log(tableVal);
    }

    return(
        <div>
            <div className='flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 w-fit'>
                <div id="table" className="table-auto">
                    <div className="ml-2" hidden={!tableStatus}>
                        Waiting for table generation
                    </div>
                    <table hidden={tableStatus}>
                        <thead>
                            <tr>
                                <th>{col1} </th>
                                <th>{col2} </th>
                                <th>{col3} </th>
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
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <br />
                <div id="functionality" className="ml-2">
                    <div hidden={!dateStatus}>
                        Start Date:
                        <DatePicker className="flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 w-52" dateFormat="yyyy-MM-dd" selectsStart selected={startDate} onChange={(date: any) => setStartDate(date)} />
                        <br />
                        End Date:
                        <DatePicker className="flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 w-52" dateFormat="yyyy-MM-dd" selectsEnd selected={endDate} onChange={(date: any) => setEndDate(date)} endDate={endDate} startDate={startDate} minDate={startDate} />
                    </div>
                    <select onChange={changeFun} className="flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 w-52">
                        <option value={"Sales"}>Sales Report</option>
                        <option value={"Together"}>Sells Together</option>
                        <option value={"Excess"}>Excess Report</option>
                        <option value={"Product"}>Product Usage</option>
                        <option value={"Restock"}>Restock Report</option>
                        <option value={"Orders"}>View Orders</option>
                    </select>
                    <div id="Generate">
                        <button onClick={() => {tableCreation();}} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40"> Generate Table </button>
                    </div>
                </div>
            </div>
        </div>
    );
}