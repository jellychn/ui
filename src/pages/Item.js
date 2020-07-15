import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import itemFunctions from '../tools/itemFunctions';
import img from '../assets/icons/primary.jpg';

class Item extends React.Component {
    state = {
        item: {},
        loaded: false,
        size: '',
        color: '',
        quantity: 1
    };

    componentDidMount() {
        const itemId = window.location.pathname.split('/')[2];
        axios.get('http://localhost:4001/api/items/' + itemId).then(res => {
            const keys = Object.keys(res.data.colors);
            this.setState({item:res.data, loaded: true, size: res.data.sizes[0], color: keys[0]});
        });
    };

    addItemToCart = () => {
        if (localStorage.getItem('cart') === null) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        
        let inCart = false;
        let cart = JSON.parse(localStorage.getItem('cart'));
        const newItem = {
            '_id': this.state.item._id,
            'name': this.state.item.name,
            'price': this.state.item.price,
            'type': this.state.item.type,
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
        this.props.itemAdded(newItem, 'CART');
        this.props.openModel();
    };

    onChange = (e) => {
        if (e.target.name === 'size') {
            this.setState({'size': e.target.value});
        } else if (e.target.name === 'color') {
            this.setState({'color': e.target.value});
        } else if (e.target.name === 'quantity') {
            this.setState({'quantity': parseInt(e.target.value)});
        }
    }

    render () {
        if (this.state.loaded === true) {
            let images = this.state.item.images.map((img, index) => {
                return <img key={index} style={{padding: '0 10px 10px 0'}} src={img}/>
            });

            let size = this.state.item.sizes.map((size, index) => {
                return <option key={index} value={size}>{size}</option>
            });

            let color = Object.keys(this.state.item.colors).map((color, index) => {
                return <option key={index} value={color}>{color}</option>
            });

            return (
                <div className='item'>
                    <div className='item-top'>
                        <div className='item-left'>
                            {images}
                        </div>
                        <div className='item-right'>
                            <div className='item-info'>
                                <p className='item-type'>{this.state.item.type}</p>
                                <p className='item-price'>{'$' + this.state.item.price}</p>
                            </div>
                            <h1 className='item-name'>{this.state.item.name}</h1>
                            <p className='item-select-info'>SIZE</p>
                            <select name='size' onChange={(e) => {this.onChange(e)}}>
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
                            <button className='favorite' onClick={() => {itemFunctions.favorite(this.state.item, this.props.checkFavoritesHasItems); this.props.itemAdded(this.state.item, 'FAVORITES'); this.props.openModel()}}>FAVORITE</button>
                        </div>
                    </div>
                    <div className='item-bottom'>
                        <h1>YOU MIGHT ALSO LIKE</h1>
                        <div className='item-options-container'>
                            <div className='item-option'>
                                <div className='item-option-inner'>
                                    <Link to='/item'>
                                        <img src={img}/>
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
                                        <img src={img}/>
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
                                        <img src={img}/>
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
            return <div></div>
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkCartHasItems: () => dispatch(actions.checkCartHasItems()),
        checkFavoritesHasItems: () => dispatch(actions.checkFavoritesHasItems()),
        itemAdded: (item, added) => dispatch(actions.itemAdded(item, added)),
        openModel: () => dispatch({type: 'OPEN_MODEL'})
    }
};

export default connect(null, mapDispatchToProps)(Item);