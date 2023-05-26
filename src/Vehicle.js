import React, { useEffect, useState } from 'react';
import Field from './Field';

const Vehicle = ({vehicleObject, updateApplication}) => {
  const [vehicleDoc, updateVehicle] = useState(vehicleObject)

  const updateVehicleDoc = (keyValue) => {
    const [key, value] = Object.entries(keyValue)[0];
    updateVehicle((currentDoc) => {
        currentDoc[key] = value;
        updateApplication(vehicleDoc.vin, {[key]: value});
        return currentDoc;
    });
  }

  return (
    <div className='vehicle'>
      {Object.entries(vehicleDoc).map( keyValue => 
        <Field key={keyValue[0]} keyValue={keyValue} updateParentDoc={updateVehicleDoc}/>
      )}
    </div>
  )
}

export default Vehicle;