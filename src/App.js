import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Display from './pages/Display';
import Profile from './pages/Profile';
import Item from './pages/Item';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div className="App">
        <Router>
        <Header/>
        <body>
          <div className='container'>
            <Switch>
              <Route path='/cart'>
                <Checkout/>
              </Route>
              <Route path='/item'>
                <Item/>
              </Route>
              <Route path='/profile'>
                <Profile/>
              </Route>
              <Route path={'/display' || '/display/women' || '/display/men'}>
                <Display/>
              </Route>
              <Route path='/'>
                <Home/>
              </Route>
            </Switch>
          </div>
        </body>
        <Footer/>
        </Router>
    </div>
  );
}

export default App;
