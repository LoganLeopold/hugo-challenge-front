import React, { useEffect, useState } from 'react';
import Field from './Documents/Field';
import axios from 'axios'
import { validationMethodMap as validation } from "./validationUtils";

const NewVehicle = ({ vehicleObject, updateApplication }) => {
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

  // useEffect(() => {
  //   const id = vehicleDoc.vin ? vehicleDoc.vin : vehicleObject.vin
  //   updateApplicationErrors(`vehicle${id}`, Object.keys(errors).length)
  // }, [errors])

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

  return (
    <div className='vehicle'>
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
              updateDocumentErrors={updateVehicleErrors}
            />
          )
        } else {
          return undefined
        }
      })}
      {/* <button onClick={submitVehicle}>Add Vehicle</button> */}
    </div>
  )
};

export default NewVehicle;