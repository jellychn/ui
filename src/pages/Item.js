import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {
    checkCartHasItems,
    checkFavoritesHasItems,
    itemAdded
} from '../actions/itemsActions';
import {
    openHeaderModal
} from '../actions/modalAction';
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
        sizeChosen: true,
        youMightAlsoLike: []
    };

    componentDidMount() {
        window.scrollTo(0,0);
        this.getItem(window.location.pathname.split('/')[2]);
    };

    getItem = (itemId) => {
        window.scrollTo(0,0);
        this.setState({loaded:false});
        axios.get('http://localhost:4001/api/items/' + itemId).then(res => {
            const keys = Object.keys(res.data.colors);
            this.setState({item:res.data, color: keys[0]});
            this.checkFavorited(keys[0]);

            axios.get('http://localhost:4001/api/items/', {params: {gender:res.data.gender, category: res.data.category}}).then(res => {
                const shuffled = this.shuffle(res.data);
                this.setState({youMightAlsoLike:shuffled, loaded:true});
            });
        });
    };

    shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        
        return array.slice(0, 6);
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
            this.props.openHeaderModal();
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
            this.props.openHeaderModal()
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

            let youMayAlsoLike = this.state.youMightAlsoLike.map((item, index) => {
                return (
                    <div key={index} className='item-option' style={{display: item._id === this.state.item._id ? 'none':'block'}}>
                        <div className='item-option-inner'>
                            <Link to={'/item/' + item._id} onClick={() => {this.getItem(item._id)}}>
                                <img alt={item.name} src={item.images[0]}/>
                                <div className='input-align'>
                                    <p style={{fontWeight: 'bold'}}>{item.name.toUpperCase()}</p>
                                    <p style={{marginLeft: 'auto'}}>{`$${item.price}`}</p>
                                </div>
                                <p>{item.category.toUpperCase()}</p>
                            </Link>
                        </div>
                    </div>
                )
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
                            {youMayAlsoLike}
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
        openHeaderModal: () => dispatch(openHeaderModal())
    }
};

export default connect(null, mapDispatchToProps)(Item);