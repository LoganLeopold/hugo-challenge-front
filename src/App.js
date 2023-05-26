import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import axios from 'axios'
import Customer from './Customer.js';
import Vehicle from './Vehicle';

function App() {

  const initialState = {
    customer: {},
    vehicles: []
  };
  const [application, setApplication] = useState(initialState);

  const getApp = async () => {
    const res = await axios.get(`${process.env.REACT_APP_LOCAL_API_BASE_URL}/application/a7210f38-33b6-4dd9-a91a-a3af9f848f24`);
    try {
      setApplication(res.data);
    } catch (error) {
      return error;
    }
  }

  const hasLoaded = useRef(false)

  useEffect(() => {
    if (hasLoaded.current === false) {
      hasLoaded.current = true;
    } else {
      const app = getApp();
    }
  }, [])

  const updateCustomer = (keyValue) => {
    const [key, value] = Object.entries(keyValue)[0];
    setApplication((currApp) => {
      currApp.customer[key] = value;
      return currApp;
    });
  };

  const updateVehicle = (vin, keyValue) => {
    const [key, value] = Object.entries(keyValue)[0];
    const vehicleIndex = application.vehicles.findIndex( (v) => { return v.vin === vin });
    setApplication((currApp) => {
      currApp.vehicles[vehicleIndex][key] = value;
      return currApp;
    })
  }

  return (
    <div className="App">
      <h1>Application</h1>
      <h3>Customer</h3>
      <Customer customerObject={application.customer} updateApplication={updateCustomer}/>
      <div className="vehicles">
        {application.vehicles.map( (v,i) => 
          <React.Fragment key={i}>
            <h3>Vehicle {i+1}</h3>
            <Vehicle key={v.vin} vehicleObject={v} updateApplication={updateVehicle}/>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default App;
