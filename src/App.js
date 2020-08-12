import React from 'react';
import './App.scss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  checkCartHasItems,
  checkFavoritesHasItems
} from './actions/itemsActions';
import {
  checkAuthenticated
} from './actions/userActions';

import {
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
import NotificationModal from './components/NotificationModal';

class App extends React.Component {
  componentDidMount () {
    this.props.checkAuthenticated();
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

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
        this.props.checkAuthenticated();
    }
}

  render () {
    if (this.props.request) {
      return <div className='loading-container'><div className='loader'/></div>
    } else {
      return (
        <div className="App">
            <Header/>
            <Modal/>
            <NotificationModal/>
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
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal.modal,
    request: state.user.request,
    loaded: state.search.loaded
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkCartHasItems: () => dispatch(checkCartHasItems()),
    checkFavoritesHasItems: () => dispatch(checkFavoritesHasItems()),
    checkAuthenticated: () => dispatch(checkAuthenticated())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
