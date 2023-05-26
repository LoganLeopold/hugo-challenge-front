import React, { useState } from 'react';

const Field = ({keyValue, updateParentDoc}) => {
  const [key, value] = keyValue;
  const [editing, setEdit] = useState(false);
  const [fieldValue, setVFieldalue] = useState(value);

  const handleChange = (e) => { 
    setVFieldalue(e.target.value);
  }

  const toggleEdit = () => {
    setEdit(!editing);
  }

  const clickEvent = () => {
    updateParentDoc({[key]: fieldValue});
  };

  return (
    <div className='field'>
      <h3>{key}:</h3>
      {!editing && <p>{fieldValue}</p>} 
      {!editing && <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" alt="Pencil for edit" onClick={toggleEdit}/>}
      {editing && <input value={fieldValue} onChange={handleChange}/>}
      {editing && <span onClick={(e)=>{ toggleEdit(e); clickEvent(); }}>Done (submits any change)</span>}
    </div>
  )
};

export default Field;