import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/layout/Users';
import { useState, useEffect } from 'react'
import Search from './components/Search';
import Alert from './components/Alert';
import About from './components/Pages/about.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './components/User';



function App() {

  const [loading, setLoading] = useState();
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({});


  const searchUser = async text => {
    setLoading(true);

    fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(response => response.json())
      .then(data => {
        setUsers(data.items);
        setLoading(false);
      });

  }

  const getUser = async username => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {
          setUser(data);
      }).then(console.log(user));
  }



// Clear users
const clearUsers = () => {
  setUsers([]);
  setLoading(false);
}

// Set Alert
const sendAlert = (msg, type) => {
  setAlert({ msg, type });
}

return (
  <Router>
    <div className="App">
      <Navbar title="GitHub Finder" />
      {alert && <Alert />}
      <Switch>
        <Route exact path='/'>
          <Search
            searchUsers={searchUser}
            clearUsers={clearUsers}
            showClear={users.length > 0 ? true : false} 
            sendAlert={sendAlert} />
          {users && <Users loading={loading} users={users} />}
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/user/:login'>
          <User 
          user = {user}
          getUser = {getUser}
          loading = {loading}
           />
        </Route>
      </Switch>
    </div>
  </Router>

);
}

export default App;
