import React from "react";

function AddNewItem(){

    const fileHandler = (event) => {
        const file = event.target.files[0];
        console.log(event.target);
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            console.log(results.data)
            setCsvData(results.data);
            localStorage.setItem('local-expense-data',JSON.stringify(results.data));
          },
          error: (error) => {
            console.error("Error parsing CSV:", error.message);
          }
        });
      }

    return(
        <>
            <div className="flex flex-col justify-between h-full">
                <div className="grid grid-cols-2 gap-4">
                    <label>Transaction Date</label>
                    <input type="Date"></input>
                    <label>Description</label>
                    <input placeholder="what did you buy"></input>
                    <label>Category</label>
                    <input></input>
                    <label>Amount</label>
                    <input></input>
                                    {/*
                        *should have drop down for category for the following categories
                        * Bills & Utilities: Rent, mortgage, utilities, internet, phone, etc.
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

                <div className="block">
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