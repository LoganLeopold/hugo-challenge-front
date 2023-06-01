import React, { useEffect, useState } from 'react';
import Field from './Field';
import { validationMethodMap as validation } from "../validationUtils";

const Vehicle = ({vehicleObject}) => {
  const [vehicleDoc, updateVehicle] = useState()
  
  useEffect(()=>{
    updateVehicle(vehicleObject)
  }, [vehicleObject]);

  const fieldLengths = {
    vin: 225,
    make: 150,
    model: 150
  }

  // const updateVehicleDoc = (keyValue) => {
  //   const [key, value] = Object.entries(keyValue)[0];
  //   if (vehicleDoc[key] !== value) {
  //     updateVehicle((currentDoc) => {
  //         currentDoc[key] = value;
  //         updateApplication(vehicleDoc.vin, {[key]: value});
  //         return currentDoc;
  //     });
  //   }
  // }

  return (
    <div className='vehicle'>
      {vehicleDoc && Object.entries(vehicleDoc).map( keyValue => {
        if (keyValue[0] !== "application") {
          return (
            <Field 
              key={keyValue[0]} 
              fieldLengths={fieldLengths} 
              docType={'vehicle'}
              documentId={vehicleDoc.vin} 
              keyValue={keyValue}
              validation={validation[keyValue[0]] ? validation[keyValue[0]] : validation['varChar']}
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