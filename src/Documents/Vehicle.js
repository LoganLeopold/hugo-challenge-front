import React, { useState } from 'react';
import Field from './Field';
import { validationMethodMap as validation } from "../validationUtils";

const Vehicle = ({vehicleObject, updateApplication, sendErrorToApp}) => {
  const [vehicleDoc, updateVehicle] = useState(vehicleObject)
  
  const fieldLengths = {
    vin: 225,
    make: 150,
    model: 150
  }

  const updateVehicleDoc = (keyValue) => {
    const [key, value] = Object.entries(keyValue)[0];
    if (vehicleDoc[key] !== value) {
      updateVehicle((currentDoc) => {
          currentDoc[key] = value;
          updateApplication(vehicleDoc.vin, {[key]: value});
          return currentDoc;
      });
    }
  }

  return (
    <div className='vehicle'>
      {Object.entries(vehicleDoc).map( keyValue => {
        if (keyValue[0] != "application") {
          return (
            <Field 
              key={keyValue[0]} 
              keyValue={keyValue} 
              updateParentDocument={updateVehicleDoc} 
              fieldLengths={fieldLengths} 
              validation={validation[keyValue[0]] ? validation[keyValue[0]] : validation['varChar']}
              sendErrorToApp={sendErrorToApp}
            />
          )
        }
      }
      )}
    </div>
  )
}

export default Vehicle;