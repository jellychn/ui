import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import cart_img from '../assets/icons/cart.svg';
import profile_img from '../assets/icons/profile.svg';
import search_img from '../assets/icons/search.svg';
import favorite_img from '../assets/icons/favorite.svg';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: false,
            displayPage: false
        }
    }

    componentDidMount() {
        this.checkHeader();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.checkHeader();
            console.log('hi')
        }
    }


    checkHeader = () => {
        if (window.location.pathname.split('/')[1] === 'display') {
            this.setState({displayPage: true});
        } else {
            this.setState({displayPage: false});
        }
    }

    toggleFilter = () => {
        this.setState({filter: !this.state.filter})
    }

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

                    <div className='display-header' style={{display: this.state.displayPage ? 'flex':'none'}}>
                        <h2 className='display-directory'>WOMAN / SHIRTS</h2>
                        <p className='filter' onClick={this.toggleFilter}>FILTERS</p>
                        <select className='options'>
                            <option>LOW PRICE</option>
                            <option>HIGH PRICE</option>
                            <option>A-Z</option>
                            <option>Z-A</option>
                        </select>
                    </div>
                    <div className='item-type-container' style={{display: this.state.filter ? 'block':'none'}}>
                        <p>SHIRT</p>
                        <p>SHORTS</p>
                        <p>PANTS</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);