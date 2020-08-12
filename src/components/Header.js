import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    changeCategory,
    updateGender,
    updateSearchQuery,
    getItems,
    changeSortBy,
    getSearchItems,
    setSearchItemLoaded,
    setQueryChanged,
    setTimer
} from '../actions/searchActions';
import {
    openSearchModal,
    openAuthenticateModal,
    closeModal
} from '../actions/modalAction';
import {
    authenticatePage,
    authenticate
} from '../actions/userActions';

import cart_img from '../assets/icons/cart.svg';
import profile_img from '../assets/icons/profile.svg';
import search_img from '../assets/icons/search.svg';
import favorite_img from '../assets/icons/favorite.svg';

class Header extends React.Component {
    state = {
        userOptions: false,
        filter: false,
        displayPage: false,
        filterMsg: 'SHOW FILTERS',
        filters: [
            'all',
            'shirts',
            'pants',
            'shorts',
            'tees'
        ],
        onDisplayPage: false,
        page: ''
    }

    componentDidMount() {
        this.checkHeader();
        if (window.location.pathname.split('/').includes('display')) {
            this.setState({onDisplayPage: true});
        } else {
            this.setState({onDisplayPage: false});
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.checkHeader();

            if (window.location.pathname.split('/').includes('women') || window.location.pathname.split('/').includes('men')) {
                this.props.updateGender(window.location.pathname.split('/')[2]);
            }

            if (window.location.pathname.split('/').includes('display')) {
                this.setState({onDisplayPage: true});
            } else {
                this.setState({onDisplayPage: false});
            }

            this.props.getItems();
        }

        if (this.props.searchModal) {
            document.getElementById('search').focus();
            document.getElementById('search').value = this.props.q;
        }
    }

    checkHeader = () => {
        if (window.location.pathname.split('/')[1] === 'display') {
            this.setState({displayPage: true});
        } else {
            this.setState({displayPage: false, filter: false, filterMsg: 'SHOW FILTERS'});
        }

        if (window.location.pathname.split('/').includes('profile')) {
            this.setState({page:'profile'});
        } else if (window.location.pathname.split('/').includes('favorites')) {
            this.setState({page:'favorites'});
        } else if (window.location.pathname.split('/').includes('cart')) {
            this.setState({page:'cart'});
        } else {
            this.setState({page:''});
        }
    }

    toggleFilter = () => {
        if (this.state.filter === false) {
            this.setState({filter: true, filterMsg: 'HIDE FILTERS'});
        } else {
            this.setState({filter: false, filterMsg: 'SHOW FILTERS'});
        }
    }

    sortBy = () => {
        const e = document.getElementById("sort");
        const sort = e.options[e.selectedIndex].value;
        this.props.changeSortBy(sort);
        this.props.getItems();   
    }

    onSearch = () => {
        this.props.setSearchItemLoaded(false);
        this.props.setTimer(2);
        this.props.setQueryChanged(true);
        this.props.updateGender(null);
        this.props.changeCategory('all');
    };

    onClose = () => {
        this.props.updateSearchQuery('');
        this.props.getSearchItems(true);
        this.props.setSearchItemLoaded(true);
        this.props.getItems();
        this.props.closeModal();
        document.getElementById('search').value = '';
    };

    onKeyPress = (e) => {
        this.props.setSearchItemLoaded(false);
        if (e.key === 'Enter') {
            this.props.getItems();
            this.props.closeModal();
            this.props.setSearchItemLoaded(true);
            this.props.updateGender(null);
            this.props.changeCategory('all');
            this.props.history.push('/display');
        }
    };

    onPressSearch = () => {
        this.props.getItems();
        this.props.closeModal();
        this.props.setSearchItemLoaded(true);
        this.props.updateGender(null);
        this.props.changeCategory('all');
        this.props.history.push('/display');
    };

    userOptions = () => {
        this.setState({userOptions:!this.state.userOptions})
    };

    directory = () => {
        if (this.props.gender === null) {
            if (this.props.q.length > 0) {
                return <h2 className='display-directory'>{`${this.props.category.toUpperCase()} | SEARCH: ${this.props.q.toUpperCase()}`}</h2>
            } else {
                return <h2 className='display-directory'>{this.props.category.toUpperCase()}</h2>
            }
        } else {
            if (this.props.q.length > 0) {
                return <h2 className='display-directory'>{`${this.props.gender.toUpperCase()} / ${this.props.category.toUpperCase()} | SEARCH:  ${this.props.q.toUpperCase()}`}</h2>
            } else {
                return <h2 className='display-directory'>{`${this.props.gender.toUpperCase()} / ${this.props.category.toUpperCase()}`}</h2>
            }
        }
    };

    logout = () => {
        window.localStorage.removeItem('token');
        this.props.authenticate(false, true);
        if (window.location.pathname.split('/').includes('profile')) {
            this.props.history.push('/display');
        }
    };

    render () {
        const filters = this.state.filters.map((filter, index) => {
            if (this.props.gender === null) {
                return <Link onClick={() => {this.props.changeCategory(filter); this.props.getItems()}} key={index} to={`/display/${filter}`}><p>{filter.toUpperCase()}</p></Link>
            } else {
                return <Link onClick={() => {this.props.changeCategory(filter); this.props.getItems()}} key={index} to={`/display/${this.props.gender}/${filter}`}><p>{filter.toUpperCase()}</p></Link>
            }
        });

        if (this.props.searchModal) {
            return (
                <div className='header'>
                    <div className='header-inner'>
                        <div className='header-container'>
                            <div className='header-icons-container' style={{margin:'0 auto'}}>
                                <div className='search' onClick={() => {this.onPressSearch()}} style={{backgroundImage: `url(${search_img})`}}></div>
                                <input id='search' type='text' onKeyPress={(e) => {this.onKeyPress(e)}} onChange={(e) => {this.props.updateSearchQuery(e.target.value);this.onSearch()}}/>
                                <div className='close' onClick={this.onClose}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='header'>
                    <div className='header-inner'>
                        <div className='header-container'>
                            <Link className='logo' to='/' onClick={() => {this.props.updateGender('')}}>Ui</Link>
                            <Link className='display-link' to='/display/women' style={{borderBottom: this.props.gender === 'women' && this.state.onDisplayPage ? '5px solid black':'5px solid #eee'}} onClick={() => {this.props.updateGender('women');this.props.getItems()}}>WOMEN</Link>
                            <Link className='display-link' to='/display/men' style={{borderBottom: this.props.gender === 'men' && this.state.onDisplayPage ? '5px solid black':'5px solid #eee'}} onClick={() => {this.props.updateGender('men');this.props.getSearchItems()}}>MEN</Link>
                            <div className='header-icons-container' style={{margin:'0 0 0 auto'}}>
                                <div className='header-icons-wrapper' style={{borderBottom: '3px solid white'}}>
                                    <div className='header-icons' onClick={this.props.openSearchModal} style={{backgroundImage: `url(${search_img})`}}></div>
                                </div>
                                <div className='header-icons-wrapper' style={{borderBottom: this.state.page === 'favorites' ? '3px solid #eee':'3px solid white'}}>
                                    <Link to='/favorites' className='header-icons' style={{backgroundImage: `url(${favorite_img})`}}><div style={{display: this.props.favorites ? 'block':'none'}} className='favorites-indicator'/></Link>
                                </div>
                                <div className='header-icons-wrapper' style={{borderBottom: this.state.page === 'cart' ? '3px solid #eee':'3px solid white'}}>
                                    <Link to='/cart' className='header-icons' style={{backgroundImage: `url(${cart_img})`}}><div style={{display: this.props.cart ? 'block':'none'}} className='cart-indicator'/></Link>
                                </div>
                                <div className='header-icons-wrapper' style={{borderBottom: this.state.page === 'profile' ? '3px solid #eee':'3px solid white'}}>
                                    <div className='header-icons' style={{backgroundImage: `url(${profile_img})`}} onClick={this.userOptions}></div>
                                </div>
                            </div>
                        </div>

                        <div className='user-options' style={{display: this.state.userOptions ? 'block':'none'}}>
                            <Link to='/profile/settings' style={{display: this.props.authenticated ? 'block':'none'}}><p onClick={this.userOptions}>SETTINGS</p></Link>
                            <Link to='/profile/orders' style={{display: this.props.authenticated ? 'block':'none'}}><p onClick={this.userOptions}>ORDERS</p></Link>
                            <p onClick={this.logout} style={{display: this.props.authenticated ? 'block':'none'}}>LOGOUT</p>
                            <p onClick={() => {this.userOptions();this.props.openAuthenticateModal();this.props.authenticatePage('login')}} style={{display: this.props.authenticated ? 'none':'block'}}>LOGIN</p>
                            <p onClick={() => {this.userOptions();this.props.openAuthenticateModal();this.props.authenticatePage('register')}} style={{display: this.props.authenticated ? 'none':'block'}}>REGISTER</p>
                        </div>
    
                        <div style={{display: this.props.modal ? 'none':'block'}}>
                            <div className='display-header' style={{display: this.state.displayPage ? 'flex':'none'}}>
                                {this.directory()}
                                <p className='filter' onClick={this.toggleFilter}>{this.state.filterMsg}</p>
                                <div className='sort-by-container'>
                                    <p style={{margin:'0 0 auto 0', fontWeight:'bold'}}>SORT BY: </p>
                                    <select id='sort' className='options' onChange={this.sortBy}>
                                        <option value='-'>-</option>
                                        <option value='low price'>LOW PRICE</option>
                                        <option value='high price'>HIGH PRICE</option>
                                        <option value='a-z'>A-Z</option>
                                        <option value='z-a'>Z-A</option>
                                    </select>
                                </div>
                            </div>
                            <div className='item-type-container' style={{display: this.state.filter ? 'block':'none'}}>
                                {filters}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.item.cart,
        favorites: state.item.favorites,
        modal: state.modal.modal,
        gender: state.search.gender,
        category: state.search.category,
        searchModal: state.modal.searchModal,
        q: state.search.q,
        authenticated: state.user.authenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
        changeCategory: (category) => {dispatch(changeCategory(category))},
        updateGender: (gender) => {dispatch(updateGender(gender))},
        updateSearchQuery: (q) => {dispatch(updateSearchQuery(q))},
        getItems: () => {dispatch(getItems())},
        changeSortBy: (sort) => {dispatch(changeSortBy(sort))},
        openSearchModal: () => dispatch(openSearchModal()),
        getSearchItems: (reset) => dispatch(getSearchItems(reset)),
        setSearchItemLoaded: (bol) => dispatch(setSearchItemLoaded(bol)),
        setQueryChanged: (bol) => dispatch(setQueryChanged(bol)),
        setTimer: (time) => dispatch(setTimer(time)),
        openAuthenticateModal: () => dispatch(openAuthenticateModal()),
        authenticatePage: (page) => dispatch(authenticatePage(page)),
        authenticate: (bol, logout) => dispatch(authenticate(bol, logout))
    } 
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));