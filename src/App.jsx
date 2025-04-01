import Papa from 'papaparse';

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import { Route, Routes } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Tooltip, Legend } from 'chart.js';

import './App.css'
import AddNewItem from './components/AddNewItem.jsx';
import CategoryContainer from './components/CategoryContainer.jsx';

ChartJS.register(ArcElement, Tooltip, Legend);

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
  const [displayAddNew, setDisplayAddNew] = useState(true);
  const [csvData, setCsvData] = useState([]);
  const [aggregatedCsvData, SetAggregatedCsvData] = useState([]);

  useEffect(() => {
    const local_data = localStorage.getItem('local-expense-data');
    if(local_data){
      setCsvData(JSON.parse(local_data));
    }
  }, []);//}, [displayAddNew]); was dependant on the variable

  useEffect(() =>{
    let ourAggregatedData = {};
    for(var i = 0; i < csvData.length; i++){
      let cat = csvData[i]['Category'];
      //if(csvData[i]['Category'])
      cat = cat ?? null;
      if(cat === null || cat.length < 1){
        continue;
      }
      if(!ourAggregatedData[cat]){
        ourAggregatedData[cat] = 0;
      }
      ourAggregatedData[cat] = ourAggregatedData[cat] + Math.abs(csvData[i]['Amount']);
    }
    //console.log("our aggregated data");
    //console.log(ourAggregatedData);
    SetAggregatedCsvData(ourAggregatedData);
  }, [csvData]);

  const handleAddNewClick = (event) =>{
    setDisplayAddNew(true);
  }

  const handleChildSaved = (data) =>{
    data = data ?? null;
    //console.log(data);
    if(data){
      const newCsvData = [...csvData,data]
      setCsvData(newCsvData);
      localStorage.setItem('local-expense-data',JSON.stringify(newCsvData));
      //console.log("right after save");
    }
  }  

  //console.log(csvData);
  //console.log(aggregatedCsvData);

  const data = Object.values(aggregatedCsvData);
  const labels = Object.keys(aggregatedCsvData);

  const data_for_doughnut = {
    labels:labels, 
    datasets:[{label:'My dataset', data:data, backgroundColor: ['lime','green','darkgreen','cornflowerblue','blue','darkblue','lightcoral','indianred','palevioletred','plum','orchid','purple','steelblue','navy','teal']}]
  };

  //(Object.keys(aggregatedCsvData).map((item,index) => {console.log("item found at " + index); console.log(item); console.log(aggregatedCsvData[item])}));

  return (
    <>
    {/* beware. using relative here to allow absolute for our button */}
    <div style={{height:"600px", width:"360px"}} className='relative mx-auto text-gray-700 bg-gray-200 p-8 text-xl'>
      
      { displayAddNew &&  
      <div className='h-full'>
      
      {/* this component works but needs more work <AddNewItem setDisplayAddNew={setDisplayAddNew} handleChildSaved={handleChildSaved}/> */}
      <div></div>
      <AddNewItem setDisplayAddNew={setDisplayAddNew} handleChildSaved={handleChildSaved}/>
      </div>
      }
      
      {/* had a div of h-full here */}
      { !displayAddNew && 
        <div className='h-full w-full items-center justify-between flex flex-col overflow-auto'>

            <Doughnut data={data_for_doughnut} width="100%" height="200" />
          
            { aggregatedCsvData && Object.keys(aggregatedCsvData).length > 0 ? (
              <div className='text-2xl' >
              { Object.keys(aggregatedCsvData).map((item,index) => {
              return(
              
              <CategoryContainer category={item} value={aggregatedCsvData[item]}/>
              )
            })} </div> ) : null }

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
