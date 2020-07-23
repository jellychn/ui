import React from 'react';
import './App.scss';
import {connect} from 'react-redux';
import {
  checkCartHasItems,
  checkFavoritesHasItems
} from './actions/itemsActions';

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
import Favorites from './pages/Favorites';
import Modal from './components/Modal';

class App extends React.Component {
  componentDidMount () {
    if (localStorage.getItem('cart') === null) {
      localStorage.setItem('cart', JSON.stringify([]));
    } else {
      this.props.checkCartHasItems();
    }

    if (localStorage.getItem('favorites') === null) {
      localStorage.setItem('favorites', JSON.stringify([]));
    } else {
      this.props.checkFavoritesHasItems();
    }
  };

  render () {
    return (
      <div className="App">
          <Router>
          <Header/>
          <Modal/>
          <div className='app-body'>
            <div className='container'>
              <Switch>
                <Route path='/favorites'>
                  <Favorites/>
                </Route>
                <Route path='/cart'>
                  <Checkout/>
                </Route>
                <Route path='/item/:id'>
                  <Item/>
                </Route>
                <Route path='/profile/:page'>
                  <Profile/>
                </Route>
                <Route path={'/display' || '/display/women/:directory' || '/display/men/:directory'}>
                  <Display/>
                </Route>
                <Route path='/'>
                  <Home/>
                </Route>
              </Switch>
            </div>
          </div>
          <Footer/>
          </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal.modal
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkCartHasItems: () => dispatch(checkCartHasItems()),
    checkFavoritesHasItems: () => dispatch(checkFavoritesHasItems())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
