import React, { useEffect, useState } from 'react';
import Field from './Field';
import axios from 'axios'
import { validationMethodMap as validation } from "../validationUtils";

const Vehicle = ({ vehicleObject, updateApplication, updateApplicationErrors, removeVehicle }) => {
  const [vehicleDoc, updateVehicle] = useState({})
  const [errors, setErrorObject] = useState({})
  
  useEffect(()=>{
    updateVehicle(vehicleObject)
  }, [vehicleObject]);

  const fieldLengths = {
    vin: 225,
    make: 150,
    model: 150
  }

  useEffect(() => {
    const id = vehicleDoc.vin ? vehicleDoc.vin : vehicleObject.vin
    updateApplicationErrors(`vehicle${id}`, Object.keys(errors).length)
  }, [errors])

  const updateVehicleErrors = (field, count) => {
    setErrorObject((errorsObject) => {
      const newErrorObject = {
        ...errorsObject
      }
      if (count === 0) { 
        delete newErrorObject[field] 
      } else {
        newErrorObject[field] = count
      }
      return newErrorObject
    });
  }

  const removeThisVehicle = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_LOCAL_API_BASE_URL}/vehicle/${vehicleDoc.vin}`)
      console.log(res);
      if (res.data === "success") {
        removeVehicle(vehicleDoc.vin);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='vehicle'>
      <button onClick={removeThisVehicle}>Remove this vehicle</button>
      {vehicleDoc && Object.entries(vehicleDoc).map( keyValue => {
        if (keyValue[0] !== "application") {
          return (
            <Field 
              key={keyValue[0]} 
              docType={'vehicle'}
              documentId={vehicleDoc.vin} 
              keyValue={keyValue}
              fieldLengths={fieldLengths}
              validation={validation[keyValue[0]] ? validation[keyValue[0]] : validation['varChar']}
              updateApplication={updateApplication}
              updateDocumentErrors={updateVehicleErrors}
            />
          )
        } else {
          return undefined
        }
      })}
    </div>
  )
}

export default Vehicle;