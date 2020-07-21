import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {
    checkCartHasItems,
    checkFavoritesHasItems,
    itemAdded
} from '../actions/itemsActions';
import img from '../assets/icons/primary.jpg';
import heart_img from '../assets/icons/heart.svg';
import heart_focus_img from '../assets/icons/heart-focus.svg';

class Item extends React.Component {
    state = {
        item: {},
        loaded: false,
        size: '-',
        color: '',
        quantity: 1,
        favorited: false,
        sizeChosen: true
    };

    componentDidMount() {
        window.scrollTo(0,0);
        const itemId = window.location.pathname.split('/')[2];
        axios.get('http://localhost:4001/api/items/' + itemId).then(res => {
            const keys = Object.keys(res.data.colors);
            this.setState({item:res.data, loaded: true, color: keys[0]});
            this.checkFavorited(keys[0]);
        });
    };

    addItemToCart = () => {
        if (this.state.size !== '-') {
            this.setState({sizeChosen: true});
            if (localStorage.getItem('cart') === null) {
                localStorage.setItem('cart', JSON.stringify([]));
            }
            
            let inCart = false;
            let cart = JSON.parse(localStorage.getItem('cart'));
            const newItem = {
                '_id': this.state.item._id,
                'name': this.state.item.name,
                'price': this.state.item.price,
                'category': this.state.item.category,
                'size': this.state.size,
                'color': this.state.color,
                'colors': this.state.item.colors,
                'images': this.state.item.images,
                'quantity': this.state.quantity
            }
    
            for (let i=0; i<cart.length; i++) {
                if (cart[i]._id === newItem._id && cart[i].size === newItem.size && cart[i].color === newItem.color) {
                    cart[i].quantity = cart[i].quantity += newItem.quantity;
                    inCart = true;
                }
            }
    
            if (inCart === false) {
                cart.push(newItem);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            this.props.checkCartHasItems();
            this.props.itemAdded(newItem, 'CART', this.state.color);
            this.props.openModel();
        } else if (this.state.size === '-') {
            this.setState({sizeChosen: false});
        }
    };

    onChange = (e) => {
        if (e.target.name === 'size') {
            this.setState({'size': e.target.value});
            this.setState({sizeChosen: true});
        } else if (e.target.name === 'color') {
            this.setState({'color': e.target.value});
            this.checkFavorited(e.target.value);
        } else if (e.target.name === 'quantity') {
            this.setState({'quantity': parseInt(e.target.value)});
        }
    }

    checkFavorited = (color) => {
        if (localStorage.getItem('favorites') === null) {
            localStorage.setItem('favorites', JSON.stringify([]))
        }
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        let inFavorites = false;

        for (let i=0;i<favorites.length;i++) {
            if (this.state.item._id === favorites[i]._id && favorites[i].color === color) {
                inFavorites = true;
                break;
            }
        }

        this.setState({favorited: inFavorites});
    };

    favorite = (item, checkFavoritesHasItems, color) => {
        if (localStorage.getItem('favorites') === null) {
            localStorage.setItem('favorites', JSON.stringify([]));
        }
    
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        let inArray = false;
        let index = 0;
        item.color = color;
        item.size = this.state.size;
    
        for (let i=0;i<favorites.length;i++) {
            if (favorites[i]._id === item._id && favorites[i].color === color) {
                inArray = true;
                break;
            }
            index += 1;
        };

        if (inArray) {
            // remove
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.setState({favorited: false});
        } else {
            // add
            favorites.push(item);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.setState({favorited: true});
            this.props.openModel()
        }
        checkFavoritesHasItems();
        this.checkFavorited(color);
    };

    render () {
        if (this.state.loaded) {
            let images = this.state.item.images.map((img, index) => {
                return <img alt={img} key={index} style={{padding: '0 10px 10px 0'}} src={img}/>
            });

            let size = this.state.item.sizes.map((size, index) => {
                return <option key={index} value={size}>{size.toUpperCase()}</option>
            });

            let color = Object.keys(this.state.item.colors).map((color, index) => {
                return <option key={index} value={color}>{color.toUpperCase()}</option>
            });

            return (
                <div className='item'>
                    <div className='item-top'>
                        <div className='item-left'>
                            {images}
                        </div>
                        <div className='item-right'>
                            <div className='item-info'>
                                <p className='item-type'>{this.state.item.category.toUpperCase()}</p>
                                <p className='item-price'>{'$' + this.state.item.price}</p>
                            </div>
                            <h1 className='item-name'>{this.state.item.name.toUpperCase()}</h1>
                            <p className='item-select-info'>SIZE</p>
                            <select name='size' style={{border: this.state.sizeChosen ? '1px solid black':'1px solid red'}} onChange={(e) => {this.onChange(e)}}>
                                <option value='-'>-</option>
                                {size}
                            </select>
                            <p className='item-select-info'>COLOR</p>
                            <select name='color' onChange={(e) => {this.onChange(e)}}>
                                {color}
                            </select>
                            <p className='item-select-info'>QUANTITY</p>
                            <select name='quantity' onChange={(e) => {this.onChange(e)}}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            <button className='add' onClick={this.addItemToCart}>ADD</button>
                            <div className='favorite-container'>
                                <button className='favorite' onClick={() => {this.favorite(this.state.item, this.props.checkFavoritesHasItems, this.state.color); this.props.itemAdded(this.state.item, 'FAVORITES', this.state.color);}}>FAVORITE</button>
                                <div className='favorite-icon' style={{backgroundImage: this.state.favorited ? `url(${heart_focus_img})`:`url(${heart_img})`}}/>
                            </div>
                        </div>
                    </div>
                    <div className='item-bottom'>
                        <h1>YOU MIGHT ALSO LIKE</h1>
                        <div className='item-options-container'>
                            <div className='item-option'>
                                <div className='item-option-inner'>
                                    <Link to='/item'>
                                        <img alt='item img 1' src={img}/>
                                        <div className='input-align'>
                                            <p style={{fontWeight: 'bold'}}>TOM AND JERRY</p>
                                            <p style={{marginLeft: 'auto'}}>$150</p>
                                        </div>
                                        <p>SHIRT</p>
                                    </Link>
                                </div>
                            </div>
    
                            <div className='item-option'>
                                <div className='item-option-inner'>
                                    <Link to='/item'>
                                        <img alt='item img 2' src={img}/>
                                        <div className='input-align'>
                                            <p style={{fontWeight: 'bold'}}>TOM AND JERRY</p>
                                            <p style={{marginLeft: 'auto'}}>$150</p>
                                        </div>
                                        <p>SHIRT</p>
                                    </Link>
                                </div>
                            </div>
    
                            <div className='item-option'>
                                <div className='item-option-inner'>
                                    <Link to='/item'>
                                        <img alt='item img 3' src={img}/>
                                        <div className='input-align'>
                                            <p style={{fontWeight: 'bold'}}>TOM AND JERRY</p>
                                            <p style={{marginLeft: 'auto'}}>$150</p>
                                        </div>
                                        <p>SHIRT</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div className='loading-container'><div className='loader'/></div>
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkCartHasItems: () => dispatch(checkCartHasItems()),
        checkFavoritesHasItems: () => dispatch(checkFavoritesHasItems()),
        itemAdded: (item, added, color) => dispatch(itemAdded(item, added, color)),
        openModel: () => dispatch({type: 'OPEN_MODEL'})
    }
};

export default connect(null, mapDispatchToProps)(Item);