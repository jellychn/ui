import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    changeCategory,
    updateGender,
    updateSearchQuery,
    getItems,
    changeSortBy
} from '../actions/searchActions';

import cart_img from '../assets/icons/cart.svg';
import profile_img from '../assets/icons/profile.svg';
import search_img from '../assets/icons/search.svg';
import favorite_img from '../assets/icons/favorite.svg';

class Header extends React.Component {
    state = {
        filter: false,
        displayPage: false,
        filterMsg: 'SHOW FILTERS',
        filters: [
            'shirts',
            'pants',
            'shorts',
            'tees'
        ],
        onDisplayPage: false
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
    }

    checkHeader = () => {
        if (window.location.pathname.split('/')[1] === 'display') {
            this.setState({displayPage: true});
        } else {
            this.setState({displayPage: false, filter: false, filterMsg: 'SHOW FILTERS'});
        }
    }

    toggleFilter = () => {
        if (this.state.filter === false) {
            this.setState({filter: true, filterMsg: 'HIDE FILTERS'});
        } else {
            this.setState({filter: false, filterMsg: 'SHOW FILTERS'});
        }
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.getItems();
            this.props.history.push('/display/' + this.props.gender);
        }
    }

    handleOnClick = () => {
        this.props.getItems();
        this.props.history.push('/display/' + this.props.gender);
    };

    sortBy = () => {
        const e = document.getElementById("sort");
        const sort = e.options[e.selectedIndex].value;
        this.props.changeSortBy(sort);
        this.props.getItems();   
    }

    render () {
        const filters = this.state.filters.map((filter, index) => {
            return <Link onClick={() => {this.props.changeCategory(filter)}} key={index} to={`/display/woman/${filter}`}><p>{filter.toUpperCase()}</p></Link>
        });

        return (
            <div className='header' onClick={this.props.closeModal}>
                <div className='header-inner'>
                    <div className='header-container'>
                        <Link className='logo' to='/' onClick={() => {this.props.updateGender('')}}>Ui</Link>
                        <Link className='display-link' to='/display/women' style={{borderBottom: this.props.gender === 'women' && this.state.onDisplayPage ? '3px solid black':'3px solid #eee'}} onClick={() => {this.props.updateGender('women')}}>WOMEN</Link>
                        <Link className='display-link' to='/display/men' style={{borderBottom: this.props.gender === 'men' && this.state.onDisplayPage ? '3px solid black':'3px solid #eee'}} onClick={() => {this.props.updateGender('men')}}>MEN</Link>
                        <div className='header-icons-container'>
                            <div className='header-icons' onClick={() => {this.handleOnClick()}} style={{backgroundImage: `url(${search_img})`}}></div>
                            <input type='search' onKeyPress={(e) => {this.handleKeyPress(e)}} onChange={(e) => {this.props.updateSearchQuery(e.target.value)}}/>
                            <Link to='/profile/settings' className='header-icons' style={{backgroundImage: `url(${profile_img})`}}></Link>
                            <Link to='/favorites' className='header-icons' style={{backgroundImage: `url(${favorite_img})`}}><div style={{display: this.props.favorites ? 'block':'none'}} className='favorites-indicator'/></Link>
                            <Link to='/cart' className='header-icons end-icon' style={{backgroundImage: `url(${cart_img})`}}><div style={{display: this.props.cart ? 'block':'none'}} className='cart-indicator'/></Link>
                        </div>
                    </div>

                    <div style={{display: this.props.modal ? 'none':'block'}}>
                        <div className='display-header' style={{display: this.state.displayPage ? 'flex':'none'}}>
                            <h2 className='display-directory'>{`${this.props.gender.toUpperCase()} / ${this.props.category.toUpperCase()}`}</h2>
                            <p className='filter' onClick={this.toggleFilter}>{this.state.filterMsg}</p>
                            <div className='sort-by-container'>
                                <p style={{margin:'0 0 auto 0'}}>SORT BY: </p>
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

const mapStateToProps = (state) => {
    return {
        cart: state.item.cart,
        favorites: state.item.favorites,
        modal: state.item.modal,
        gender: state.search.gender,
        category: state.search.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch({type: 'CLOSE_MODEL'}),
        changeCategory: (category) => {dispatch(changeCategory(category))},
        updateGender: (gender) => {dispatch(updateGender(gender))},
        updateSearchQuery: (q) => {dispatch(updateSearchQuery(q))},
        getItems: () => {dispatch(getItems())},
        changeSortBy: (sort) => {dispatch(changeSortBy(sort))}
    } 
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));