"use client"
import { table } from "console";
import React, {useState} from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CartItem from "../MenuItemComponent/CartItemComponent";
import { format } from "date-fns";

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


    const changeFun = (e: any) => {
        setFun(e.target.value);
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
        }
        if(fun == "Together") {
            setCol1("First item");
            setCol2("Second item");
            setCol3("Times together")
            sellsTogether(startFormatted,endFormatted);
        }
        if(fun == "Excess") {
            setCol1("Ingredients");
            setCol2("");
            setCol3("");
            excessReport(startFormatted,endFormatted);
        }
    }

    //---------------Getting Tables---------------//


    function salesReport(strDate: string, enDate: string) {
        fetch('http://localhost:3000/sales_report', {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Headers': "*",
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
        fetch('http://localhost:3000/sells_together', {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Headers': "*",
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
        fetch('http://localhost:3000/excess_report', {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Headers': "*",
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

    return(
        <div>
            <div className='flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 w-1/2 h-1/2'>
                <div id="table">
                    <table>
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
                <div id="functionality">
                    <DatePicker dateFormat="yyyy-mm-dd" selectsStart selected={startDate} onChange={(date: any) => setStartDate(date)} />
                    <DatePicker dateFormat="yyyy-mm-dd" selectsEnd selected={endDate} onChange={(date: any) => setEndDate(date)} endDate={endDate} startDate={startDate} minDate={startDate} />
                    <select onChange={changeFun} className="flex flex-col relative flex-wrap border-zinc-700 border-2 bg-zinc-900 rounded-lg overflow-off m-5 w-52">
                        <option value={"Sales"}>Sales Report</option>
                        <option value={"Together"}>Sells Together</option>
                        <option value={"Excess"}>Excess Report</option>
                    </select>
                    <div id="Generate">
                        <button onClick={() => {tableCreation();}} className="self-center border-2 rounded-md bg-black p-1 m-3 w-40"> Generate Table </button>
                    </div>
                </div>
            </div>
        </div>
    );
}