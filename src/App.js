import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios'

const App = () => {
  const [appList, setAppList] = useState([])
  const hasLoaded = useRef(false);

  const getAllApps = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_LOCAL_API_BASE_URL}/applications/all`);
      setAppList(res.data);
      return res.data;
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    if (hasLoaded.current === false) {
      const apps = getAllApps();
      hasLoaded.current = true
    }
  })

  return (
    <div>
      <h1>All Applications</h1>
      {appList && appList.map( (app, i) => <Link key={i} to={`/application/${app.application}`}>{app.firstname} {app.lastname}: {app.birthday}</Link>)}
    </div>
  )
}

export default App;
