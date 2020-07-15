import React from 'react';
import './App.scss';
import {connect} from 'react-redux';
import * as actions from './actions/actions';

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
import HeaderModal from './components/HeaderModal';

class App extends React.Component {
  componentWillMount () {
    if (localStorage.getItem('cart') === null) {
      localStorage.setItem('cart', JSON.stringify([]));
    };

    if (localStorage.getItem('favorites') === null) {
      localStorage.setItem('favorites', JSON.stringify([]));
    };
  }

  componentDidMount () {
    this.props.checkCartHasItems();
    this.props.checkFavoritesHasItems();
  };

  render () {
    return (
      <div className="App">
          <Router>
          <Header/>
          <HeaderModal/>
          <body>
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkCartHasItems: () => dispatch(actions.checkCartHasItems()),
    checkFavoritesHasItems: () => dispatch(actions.checkFavoritesHasItems())
  }
};

export default connect(null, mapDispatchToProps)(App);
