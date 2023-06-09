import React, { useEffect, useState } from 'react';
import Field from './Field';
import { validationMethodMap as validation } from "../validationUtils";

const Customer = ({ customerObject, updateApplication, updateApplicationErrors }) => {
  const [customerDoc, updateCustomer] = useState({});
  const [errors, setErrorObject] = useState({})
  
  // establishing
  useEffect(() => {
    updateCustomer(customerObject)
  },[customerObject]);

  const fieldLengths = {
    lastname: 255,
    firstname: 255,
    birthday: 10,
    street: 255,
    city: 255,
    state: 75,
  }

  useEffect(() => {
    updateApplicationErrors('customer', Object.keys(errors).length)
  }, [errors])

  const updateCustomerErrors = (field, count) => {
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
    <div className='customer'>
      {customerDoc && Object.entries(customerDoc).map( keyValue => {
        if (keyValue[0] !== "application" && keyValue[0] !== "customer") {
          return (
            <Field 
              key={keyValue[0]} 
              docType={'customer'}
              documentId={customerDoc.customer} 
              keyValue={keyValue}
              fieldLengths={fieldLengths}
              validation={validation[keyValue[0]] ? validation[keyValue[0]] : validation['varChar']}
              updateApplication={updateApplication}
              updateDocumentErrors={updateCustomerErrors}
            />
          )
        } else {
          return undefined
        }
      })}
  </div>
  )
};

export default Customer;