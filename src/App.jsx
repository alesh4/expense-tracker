import Papa from 'papaparse';

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import { Route, Routes } from 'react-router-dom'


import './App.css'
import AddNewItem from './components/AddNewItem.jsx';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
/*
* TODO: want it to look like the following screens. 
* Login Screen / Signup Screen → Home/Dashboard Screen
* Home/Dashboard Screen → (Add Expense, View/Edit Expense, Category/Reports)
* Add Expense → Home/Dashboard Screen
* Category/Reports → Home/Dashboard Screen
* Settings Screen
* Maybe forgot password down the line
* data should look like
  {
  "Transaction Date": "10/02/2024",
  "Post Date": "10/04/2024",
  "Description": "CANTEEN 10",
  "Category": "Food & Drink",
  "Type": "Sale",
  "Amount": "-2.80",
  "Memo": ""
}
*/
function App() {
  let mDate = new Date('2025-01-02');
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  /*headers: Transaction Date, Post Date, Description, Category, Type, Amount, Memo*/
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const local_data = localStorage.getItem('local-expense-data');
    if(local_data){
      setCsvData(JSON.parse(local_data));
    }
  }, []);

  const [displayAddNew, setDisplayAddNew] = useState(true);
  const handleAddNewClick = (event) =>{
    setDisplayAddNew(true);
  }

  const handleChildSaved = (data) =>{
    data = data ?? null;
    console.log(data);
    if(data){
      setCsvData([...csvData, data]);
      localStorage.setItem('local-expense-data',JSON.stringify(csvData));
    }
  }

  

  console.log(csvData);

  return (
    <>
    {/* beware. using relative here to allow absolute for our button */}
    <div style={{height:"600px", width:"360px"}} className='relative mx-auto text-gray-700 bg-gray-200 p-8 text-xl'>
      
      { displayAddNew &&  
      <div className='h-full'>
      
      {/* this component works but needs more work <AddNewItem setDisplayAddNew={setDisplayAddNew} handleChildSaved={handleChildSaved}/> */}
      
      </div>
      }
      
      {/* had a div of h-full here */}
      { !displayAddNew && 
        <div className='h-full w-full items-center justify-between flex flex-col'>
          
            { csvData.map((item,index) => {
              return(
              <div className='text-2xl'>
              <h3 key={index} className='w-full'>{item.Category}</h3>
              </div>)
            })}
          
          <div className='mx-auto text-4xl text-white bg-gray-700 hover:bg-gray-600 font-medium cursor-pointer border-0 py-2.5 px-8'><button onClick={handleAddNewClick}>+</button>
          </div>
        </div>
        
      }
      
    </div>
    
    <PWABadge />
    </>
    
  )
}

export default App
