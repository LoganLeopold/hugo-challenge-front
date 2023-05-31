import React, { useEffect, useState } from 'react';
import Field from './Field';
import { validationMethodMap as validation } from "../validationUtils";

const Customer = ({customerObject, updateApplication, sendErrorToApp}) => {
  const [customerDoc, updateCustomer] = useState();
  const [customerErrors, setCustomerErrors] = useState({});
  
  useEffect(() => {
    updateCustomer(customerObject)
  },[customerObject]);

  const reportFieldError = (key, errorCount) => {
    setCustomerErrors((currErrors) => {
      if (errorCount > 0) {
        currErrors[key] = errorCount;
      } else {
        delete currErrors[key];
      }
      return currErrors
    })
  }

  const fieldLengths = {
    lastname: 255,
    firstname: 255,
    birthday: 10,
    street: 255,
    city: 255,
    state: 75,
  }

  const updateCustomerDoc = (keyValue) => {
    const [key, value] = Object.entries(keyValue)[0];
    if (customerDoc[key] !== value) {
      updateCustomer((currentDoc) => {
          currentDoc[key] = value;
          return currentDoc;
      });
      updateApplication(keyValue);
    }
  }

  return (
    <div className='customer'>
      {customerDoc && Object.entries(customerDoc).map( keyValue => {
        if (keyValue[0] != "application" && keyValue[0] != "customer") {
          return (
            <Field 
              key={keyValue[0]} 
              document={{
                docType: 'customer',
                doc: customerDoc
              }}
              keyValue={keyValue} 
              updateParentDocument={updateCustomerDoc} 
              fieldLengths={fieldLengths}
              errorReport={reportFieldError}
              validation={validation[keyValue[0]] ? validation[keyValue[0]] : validation['varChar']}
              sendErrorToApp={sendErrorToApp}
            />
          )
        }
      }
      )}
    </div>
  )
};

export default Customer;