import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/layout/Users';
import Search from './components/Search';
import Alert from './components/Alert';
import About from './components/Pages/about.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './components/User';

export const finderContext = React.createContext();

function App() {

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({});
  const [repos,setRepos]=useState([]);


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
    fetch(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(response => response.json())
      .then(async data => {
        setUser(data);
      });
    setLoading(false);

  }

  const getUserRepo = async username => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(response => response.json())
      .then(async data => {
        setRepos(data);
      });
    setLoading(false);
  }


  // Clear users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  // Set Alert
  const sendAlert = (msg, type) => {
    setAlert({ message:msg, type:type });
    setTimeout(()=>{
      setAlert();
    },3000)

  }

  const finderContextValue = {
    getUser,
    getUserRepo,
    user,
    repos,
    alert,
    setAlert,
    sendAlert
  } 


  return (
    <Router>
      <finderContext.Provider value={finderContextValue}>
        <div className="App">
          <Navbar title="GitHub Finder" />
          <Switch>
            <Route exact path='/'>
              <Search
                searchUsers={searchUser}
                clearUsers={clearUsers}
                showClear={users.length > 0 ? true : false}
                alert={alert}
                />
              {users && <Users loading={loading} users={users} />}
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
            <Route exact path='/user/:login'>
              <User
                user={user}
                getUser={getUser}
                loading={loading}
              />
            </Route>
          </Switch>
        </div>
      </finderContext.Provider>
    </Router>

  );
}

export default App;
