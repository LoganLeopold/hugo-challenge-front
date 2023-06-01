import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './App.css';
import axios from 'axios'
import Customer from './Documents/Customer.js';
import Vehicle from './Documents/Vehicle';

const Application = () => {

  const { id } = useParams();
  const [application, setApplication] = useState({ customer: {}, vehicles: {}, application: '' });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
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

  const updateApplication = (docType, fieldUpdate, id) => {
    // console.log("fieldUpdate", fieldUpdate)
    const [key, value] = Object.entries(fieldUpdate)[0]
    if (docType ==="customer") {
      setApplication((currApp) => {
        currApp['customer'][key] = value
        return currApp
      })
    } 
    else {
      setApplication((currApp) => {
        currApp.vehicles[id][key] = value
        return currApp;
      })
    }
  }

  const updateApplicationErrors = (key, count) => {
    if (errors[key] != count) {
      setErrors((errorsObject) => {
        errorsObject[key] = count   
        return errorsObject;
      })
    }   
  }

  // useEffect(() => {
  //   console.log(application)
  // }, [application])

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
        updateApplication={updateApplication} 
        updateApplicationErrors={updateApplicationErrors}
      />
      <div className="vehicles">
        {application.vehicles && Object.values(application.vehicles).map((vehicle, i) =>
          <React.Fragment key={i}>
            <h3>Vehicle {i + 1}</h3>
            <Vehicle 
              key={vehicle.vin} 
              vehicleObject={vehicle} 
              updateApplication={updateApplication} 
              updateApplicationErrors={updateApplicationErrors}
            />
          </React.Fragment>
        )}
      </div>
      {isValid && <button onClick={submitApplication}>Submit Application</button>}
      {price && <p>Price: {price}</p>}
      {/* <button onClick={onSubmitData}>TEST SUBMIT ACTION</button> */}
    </div>
  );
}

export default Application;
