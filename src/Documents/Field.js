import React, { useEffect, useState } from 'react';

const Field = ({keyValue, updateParentDocument, validation, fieldLengths, sendErrorToApp}) => {
  const [key, value] = keyValue;
  const [editing, setEdit] = useState(false);
  const [fieldValue, setVFieldalue] = useState(value);
  const [errors, setErrors] = useState([])

  const clickEvent = () => {
    updateParentDocument({[key]: fieldValue});
  };

  const handleChange = (e) => { 
    if (e.target.value > e.target.maxLength) {
      // setErrors((currErrors)=>{
      //   currErrors.push(`This field has max length of ${e.target.maxLength} and you've already reached the limit`);
      // })
      validateField('varChar', e.target.maxLength)
    }
    setVFieldalue(e.target.value);
  }

  const toggleEdit = () => {
    setEdit(!editing);
  }

  useEffect(()=>{
    if (validation) {
      validation.name === 'varChar' ? validateField(fieldLengths[key]) : validateField();
    }
  }, []);

  const validateField = () => {
    if (validation) {
      let currentErrors;
      // Use validation to return array of errors
      if (validation.name != 'varChar') {
        currentErrors = validation(fieldValue);
      } else {
        currentErrors = validation(fieldValue, fieldLengths[key]);
      }
      // set field errors state
      setErrors(currentErrors);
      sendErrorToApp(key, currentErrors.length)
    };
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
        {editing && <input value={fieldValue} onChange={handleChange} maxLength={fieldLengths[key]} onBlur={validateField}/>}
        {editing && <span onClick={(e)=>{ toggleEdit(e); clickEvent(); }}>Done (submits any change)</span>}
      </div>
      {errors.length > 0 && (
        <ul className='fieldErrorList'>
          <p>{key.toUpperCase()} Errors:</p>
          { errors.map( (error, i) => <li key={i} className='fieldError'>{error}</li>)}
        </ul>
      )}
    </div>
  )
};

export default Field;