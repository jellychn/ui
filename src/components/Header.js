import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    changeCategory
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
        ]
    }

    componentDidMount() {
        this.checkHeader();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.checkHeader();
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

    render () {
        const filters = this.state.filters.map((filter, index) => {
            return <Link onClick={() => {this.props.changeCategory(filter)}} key={index} to={`/display/woman/${filter}`}><p>{filter.toUpperCase()}</p></Link>
        });

        return (
            <div className='header' onClick={this.props.closeModal}>
                <div className='header-inner'>
                    <div className='header-container'>
                        <Link className='logo' to='/'>UI_</Link>
                        <Link className='display-link' to='/display/women'>WOMEN</Link>
                        <Link className='display-link' to='/display/men'>MEN</Link>
                        <div className='header-icons-container'>
                            <div className='header-icons' style={{backgroundImage: `url(${search_img})`}}></div>
                            <Link to='/profile/settings' className='header-icons' style={{backgroundImage: `url(${profile_img})`}}></Link>
                            <Link to='/favorites' className='header-icons' style={{backgroundImage: `url(${favorite_img})`}}><div style={{display: this.props.favorites ? 'block':'none'}} className='favorites-indicator'/></Link>
                            <Link to='/cart' className='header-icons end-icon' style={{backgroundImage: `url(${cart_img})`}}><div style={{display: this.props.cart ? 'block':'none'}} className='cart-indicator'/></Link>
                        </div>
                    </div>

                    <div style={{display: this.props.modal ? 'none':'block'}}>
                        <div className='display-header' style={{display: this.state.displayPage ? 'flex':'none'}}>
                            <h2 className='display-directory'>WOMAN / SHIRTS</h2>
                            <p className='filter' onClick={this.toggleFilter}>{this.state.filterMsg}</p>
                            <select className='options'>
                                <option>LOW PRICE</option>
                                <option>HIGH PRICE</option>
                                <option>A-Z</option>
                                <option>Z-A</option>
                            </select>
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
        modal: state.item.modal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch({type: 'CLOSE_MODEL'}),
        changeCategory: (category) => {changeCategory(category)}
    } 
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));