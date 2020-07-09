import React from 'react';
import {Link} from 'react-router-dom';
import cart_img from '../assets/icons/cart.svg';
import profile_img from '../assets/icons/profile.svg';
import search_img from '../assets/icons/search.svg';
import favorite_img from '../assets/icons/favorite.svg';

class Header extends React.Component {
    render () {
        return (
            <div className='header'>
                <div className='header-inner'>
                    <div className='header-container'>
                        <Link className='logo' to='/'>UI_</Link>
                        <Link className='display-link' to='/display/women'>WOMEN</Link>
                        <Link className='display-link' to='/display/men'>MEN</Link>
                        <div className='header-icons-container'>
                            <div className='header-icons' style={{backgroundImage: `url(${search_img})`}}></div>
                            <Link to='/favorites' className='header-icons' style={{backgroundImage: `url(${favorite_img})`}}></Link>
                            <Link to='/profile' className='header-icons' style={{backgroundImage: `url(${profile_img})`}}></Link>
                            <Link to='/cart' className='header-icons end-icon' style={{backgroundImage: `url(${cart_img})`}}></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;