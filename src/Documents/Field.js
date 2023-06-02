import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Field = ({ docType, documentId, keyValue, fieldLengths, validation, updateApplication, updateDocumentErrors }) => {
  const [key, value] = keyValue;
  const [editing, setEdit] = useState(false);
  const [fieldValue, setVFieldalue] = useState();
  const [errors, setErrors] = useState([]);
  const [dbMock, setDbMock] = useState();
  
  // for initial load
  useEffect(() => {
    setVFieldalue(value);
    setDbMock(value);
  }, [value])

  const handleChange = (e) => { 
    setVFieldalue((e.target.value));
  }

  const toggleEdit = () => {
    setEdit(!editing);
  }

  useEffect(()=>{
    if (errors && errors.length > 0) {
      // console.log("field useEffect > 0 errors")
      updateDocumentErrors(key, errors.length)
    }
  }, [errors])
  
  useEffect(()=>{
    if (validation && fieldValue) {
      validateField(fieldValue);
    }
  }, [fieldValue]);

  const validateField = (value) => {
    const testedValue = value ? value : fieldValue;
    if (validation) {
      let currentErrors;
      // Use validation to return array of errors
      if (validation.name != 'varChar') {
        currentErrors = validation(testedValue);
      } else {
        currentErrors = validation(testedValue, fieldLengths[key]);
      }
      // set field errors state
      setErrors(currentErrors);
    };
  } 

  const clickEvent = async (e) => {
    const sendError = "*** NOT SUBMITTED *** either errors on field or data is the same.";
    if (errors.length <= 0 && fieldValue != dbMock) {
      const res = await sendUpdate({[key]: fieldValue});
      if (res.data) {
        setDbMock(Object.values(res.data)[0]);
        updateApplication(docType, res.data, documentId);
      }
    } else {
      setErrors((currErrors) => {
        if (!currErrors.includes(sendError)) currErrors.push(sendError);
        return currErrors;
      })
    }
  };

  const sendUpdate = async (update) => {
    const res = await axios.put(`http://localhost:3001/${docType}/${documentId}`, update);
    return res;
  }

  return (
    <div className='field'>
      <div className='fieldInfo'>
        <h3>{key}:</h3>
        {!editing && <p>{fieldValue}</p>} 
        {!editing && (
          <span onClick={toggleEdit}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" alt="Pencil for edit" onClick={toggleEdit}/> 
            Click to Edit
          </span>
        )}
        {editing && <input value={fieldValue} onChange={handleChange} maxLength={fieldLengths[key]} onBlur={()=>validateField(fieldValue)}/>}
        {editing && <span onClick={(e)=>{ 
          toggleEdit(e);
          clickEvent(); 
        }}>Done (submits any change)</span>}
      </div>
      {errors && errors.length > 0 && (
        <ul className='fieldErrorList'>
          <p>{key.toUpperCase()} Errors:</p>
          { errors.map( (error, i) => <li key={i} className='fieldError'>{error}</li>)}
        </ul>
      )}
    </div>
  )
};

export default Field;