import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './App.css';
import axios from 'axios'
import Customer from './Customer.js';
import Vehicle from './Vehicle';

const Application = () => {
  
  const { id } = useParams();
  const [application, setApplication] = useState({ customer: {}, vehicles: [], application: '' });
  const [hasChanged, setHasChanged] = useState(false);

  const getApp = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_LOCAL_API_BASE_URL}/application/${id}`);
      console.log(res);
      setApplication(res.data);
      return res;
    } catch (error) {
      return error;
    }
  }

  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current === false) {
      const app = getApp();
      hasLoaded.current = true;
    }; 
  },[]);

  const updateCustomer = async (keyValue) => {
    const thisUpdateReq = await sendUpdate({customer: [{customer: application.customer.customer, keyValues: keyValue}]});
    const [key, value] = Object.entries(keyValue)[0];
    setApplication((currApp) => {
      currApp.customer[key] = value;
      return currApp;
    });
    if (hasChanged !== true) {
      setHasChanged(true);
    }
  };

  const updateVehicle = async (vin, keyValue) => {
    const thisUpdateReq = await sendUpdate({vehicles: [{vin: vin, keyValues: keyValue}]});
    const [key, value] = Object.entries(keyValue)[0]; 
    const vehicleIndex = application.vehicles.findIndex( (v) => { return v.vin === vin });
    setApplication((currApp) => {
      currApp.vehicles[vehicleIndex][key] = value;
      return currApp;
    });
    if (hasChanged !== true) {
      setHasChanged(true);
    }
  };

  const sendUpdate = async (update) => {
    const res = await axios.put(`http://localhost:3001/application/${application.application}`, update);
    return res;
  }
  
  return (
    <div className="App">
      <h1>
        Application:
        <span>{application.application}</span>
      </h1>
      <h4>Submit At Bottom</h4>
      <Link to={'/applications'} className='all-apps'>All Applications</Link>
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
      {hasChanged && <button>Submit Application</button>}
    </div>
  );
}

export default Application;
