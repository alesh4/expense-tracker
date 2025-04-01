import React from "react";
import Papa from "papaparse";
function AddNewItem(props){

    const fileHandler = (event) => {
        const file = event.target.files[0];
        console.log(event.target);
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            console.log(results.data)
            //setCsvData(results.data);
            localStorage.setItem('local-expense-data',JSON.stringify(results.data));
          },
          error: (error) => {
            console.error("Error parsing CSV:", error.message);
          }
        });
        props.setDisplayAddNew(false);
    }

    const handleSubmit = (formdata) =>{
        /* TODO: write test to check for date submit */
        let item = {"Transaction Date": "10/02/2024",
                    "Post Date": "10/04/2024",
                    "Description": "CANTEEN",
                    "Category": "Food & Drink",
                    "Type": "Sale",
                    "Amount": "-2.80",
                    "Memo": ""}
        item = Object.fromEntries(formdata.entries());
        /* TODO: handle form invalid */
        //else
        props.setDisplayAddNew(false);
        props.handleChildSaved(item);
    }

    const handleCancelClicked = (event) => {
        props.setDisplayAddNew(false);
    }

    return(
        <>
            <div className="flex flex-col justify-between h-full">
                {/* fix adding this div prevents the file input from going beyond the height */}
                <form action={handleSubmit}>
                <div>
                <div className="flex flex-row justify-between pb-8">
                    {/*<button className="text-2xl text-white bg-gray-700 px-4 border rounded-md">&times;</button> */}
                    <button className="text-2xl text-white bg-gray-500 h-10 w-10 border rounded-full" onClick={handleCancelClicked}>&times;</button>
                    <h3>Add New</h3>
                    <button className="text-2xl text-white bg-gray-500 px-4 border rounded-md" type="submit">Save</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {/* TODO: - change layout of the component as it does not look like it fits*/}
                    <label>Transaction Date</label>
                    <input name="Transaction Date" type="Date"></input>
                    <label>Description</label>
                    <input name="Description" placeholder="what did you buy"></input>
                    <label>Category</label>
                    <select name="Category">
                        <option value="Bills & Utilites">Bills & Utilities</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Personal">Personal</option>
                        <option value="Gas">Gas</option>
                        <option value="Home">Home</option>
                        <option value="Auto">Auto</option>
                        <option value="Education">Education</option>
                        <option value="Travel">Travel</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Fees & Adjustments">Fees & Adjustments</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                    <label>Amount</label>
                    <input type="string" name="Amount"></input>
                    <label>Memo</label>
                    <input type="string" name="Memo"></input>
                                    {/*
                        *should have drop down for category for the following categories
                        Bills & Utilities: Rent, mortgage, utilities, internet, phone, etc.
                        Gas: Fuel purchases for your vehicle
                        Fees & Adjustments: Bank fees, late payment fees, etc.
                        Entertainment: Movies, concerts, sporting events, etc.
                        Health & Wellness: Doctor visits, gym memberships, etc.
                        Personal: Clothing, personal care products, etc.
                        Professional Services: Legal fees, accounting fees, etc.
                        Gifts and Donations: Purchases for gifts and charitable donations
                        Groceries: Food purchases at grocery stores
                        Food and Drink: Restaurant meals, takeout, etc.
                        Shopping: General retail purchases
                        Education: Tuition, books, etc.
                        Home: Home improvement, furniture, etc.
                        Automotive: Car payments, repairs, etc.
                        Cash Out: Cash withdrawals
                        Travel: Flights, hotels, etc.
                        Miscellaneous: Any spending that doesn't fit into other categories
                        */}
                </div>
                </div>
                </form>
                <div className="">
                    <h3>Or add multiple as csv file</h3>
                    <div>
                        <input id='file-upload' type="file" onChange={fileHandler} className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'></input>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddNewItem;