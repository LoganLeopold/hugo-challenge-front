import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './App.css';
import axios from 'axios'
import Customer from './Documents/Customer.js';
import Vehicle from './Documents/Vehicle';

const Application = () => {

  const { id } = useParams();
  const [application, setApplication] = useState({ customer: {}, vehicles: [], application: '' });
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState({});
  const [price, setPrice] = useState();

  const getApp = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_LOCAL_API_BASE_URL}/application/${id}`);
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
  }, []);
  
  const submitApplication = async () => {
    const res = await axios.post(`http://localhost:3001/application/submit`, {});
    return res;
  }

  useEffect(() => {
    console.log(errors);
  }, [errors])

  const getFieldErrors = (key, fieldErrors) => {
    setErrors((currErrors)=>{
      if (fieldErrors < 1) {
        delete currErrors[key];
        console.log(currErrors);
      } else {
        currErrors[key] = fieldErrors;
      }
      return currErrors;
    });
  }

  return (
    <div className="App">
      <h1>
        Application:
        <span>{application.application}</span>
      </h1>
      <h4>Submit At Bottom</h4>
      <Link to={'/'} className='all-apps'>All Applications</Link>
      <h3>Customer</h3>
      <Customer 
        customerObject={application.customer} 
        // updateApplication={updateCustomer} 
        sendErrorToApp={getFieldErrors} 
      />
      {/* <div className="vehicles">
        {application.vehicles.map((vehicle, i) =>
          <React.Fragment key={i}>
            <h3>Vehicle {i + 1}</h3>
            <Vehicle 
              key={vehicle.vin} 
              vehicleObject={vehicle} 
              // updateApplication={updateVehicle} 
              sendErrorToApp={getFieldErrors} 
            />
          </React.Fragment>
        )}
      </div> */}
      {isValid && <button onClick={submitApplication}>Submit Application</button>}
      {price && <p>Price: {price}</p>}
    </div>
  );
}

export default Application;
