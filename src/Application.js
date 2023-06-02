import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './App.css';
import axios from 'axios'
import Customer from './Documents/Customer.js';
import Vehicle from './Documents/Vehicle';
import NewVehicle from './NewVehicle';

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
  
  const updateApplication = (docType, fieldUpdate, id) => {
    const [key, value] = Object.entries(fieldUpdate)[0]
    if (docType === "customer") {
      setApplication((currApp) => { 
        return {
          ...currApp,
          customer: {
            ...currApp.customer,
            [key]: value,
          }
        }
      })
    } 
    else {
      setApplication((currApp) => {
        return {
          ...currApp,
          vehicles: {
            ...currApp.vehicles,
            [id]: {
              ...currApp.vehicles[id],
              [key]: value
            }
          }
        }
      })
    }
  }

  const removeVehicle = (vin) => {
    setApplication((currApp) => {
      const newApp = {
        ...currApp
      }
      delete newApp.vehicles[vin]
      return newApp;
    })
  }

  const updateApplicationErrors = (key, count) => {
    if (errors && errors[key] !== count) {
      setErrors((errorsObject) => {
        const newErrorObject = {
          ...errorsObject
        }
        if (count === 0) { 
          delete newErrorObject[key] 
        } else {
          newErrorObject[key] = count
        }
        return newErrorObject
      }) 
    }
  }

  const validateApplication = () => {
    let check = true;
    if (errors) {
      for (let i = 0; i < Object.keys(errors).length; i++) {
        const [field, docErrors] = Object.entries(errors)[i];
        if (docErrors > 0) {
          check = false
          return check;
        }
      }
    }
    return check;
  }

  const submitApplication = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_LOCAL_API_BASE_URL}/application/submit`, {
        customer: application.customer,
        vehicles: Object.values(application.vehicles)
      });
      if (res.data) {
        setPrice(res.data.price)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const check = validateApplication();
    setIsValid(check);
  }, [errors])

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
              removeVehicle={removeVehicle}
            />
          </React.Fragment>
        )}
        {/* {Object.keys(application.vehicles).length > 3 && <NewVehicle application={application}/>} */}
      </div>
      <div className='submit-price'>
        {<button onClick={submitApplication} disabled={!isValid}>Submit Application{!isValid && <span>Fix errors on form!</span>}</button>}
        {price && <p>Price: {price}</p>}
      </div>
    </div>
  );
}

export default Application;
