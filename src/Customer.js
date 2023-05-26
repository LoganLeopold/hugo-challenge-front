import React, { useEffect, useState } from 'react';
import Field from './Field';

const Customer = ({customerObject, updateApplication}) => {
  const [customerDoc, updateCustomer] = useState();

  const updateCustomerDoc = (keyValue) => {
    const [key, value] = Object.entries(keyValue)[0];
    updateCustomer((currentDoc) => {
        currentDoc[key] = value;
        return currentDoc;
    });
    updateApplication(keyValue);
  }

  useEffect(() => {
    updateCustomer(customerObject)
  }, [customerObject]);

  return (
    <div className='customer'>
      {customerDoc && Object.entries(customerDoc).map( keyValue => 
        <Field key={keyValue[0]} keyValue={keyValue} updateParentDoc={updateCustomerDoc}/>
      )}
    </div>
  )
};

export default Customer;