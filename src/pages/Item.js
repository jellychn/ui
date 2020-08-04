import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    checkCartHasItems,
    checkFavoritesHasItems,
    itemAdded,
    getItem,
    favorited
} from '../actions/itemsActions';
import {
    openHeaderModal
} from '../actions/modalAction';
import heart_img from '../assets/icons/heart.svg';

class Item extends React.Component {
    state = {
        size: '-',
        quantity: 1,
        sizeChosen: true
    };

    componentDidMount() {
        window.scrollTo(0,0);
        this.props.getItem(window.location.pathname.split('/')[2]);
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
                '_id': this.props.item._id,
                'name': this.props.item.name,
                'price': this.props.item.price,
                'category': this.props.item.category,
                'size': this.state.size,
                'color': this.props.color,
                'colors': this.props.item.colors,
                'images': this.props.item.images,
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
            this.props.itemAdded(newItem, 'CART', this.props.color);
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
            this.props.checkFavorited(e.target.value, this.props.item);
        } else if (e.target.name === 'quantity') {
            this.setState({'quantity': parseInt(e.target.value)});
        }
    }

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
            this.props.checkFavorited(color, item);
        } else {
            // add
            favorites.push(item);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.props.checkFavorited(color, item);
            this.props.openHeaderModal()
        }
        checkFavoritesHasItems();
        this.props.checkFavorited(this.props.color, this.props.item);
    };

    favorited = () => {
        if (this.props.favorited) {
            return <button className='favorite' onClick={() => {this.favorite(this.props.item, this.props.checkFavoritesHasItems, this.props.color); this.props.itemAdded(this.props.item, 'FAVORITES', this.props.color);}}>FAVORITED</button>
        } else {
            return <button className='favorite' onClick={() => {this.favorite(this.props.item, this.props.checkFavoritesHasItems, this.props.color); this.props.itemAdded(this.props.item, 'FAVORITES', this.props.color);}}>FAVORITE</button>
        }
    };

    render () {
        if (this.props.itemLoaded) {
            let images = this.props.item.images.map((img, index) => {
                return <img alt={img} key={index} style={{padding: '0 10px 10px 0'}} src={img}/>
            });

            let size = this.props.item.sizes.map((size, index) => {
                return <option key={index} value={size}>{size.toUpperCase()}</option>
            });

            let color = Object.keys(this.props.item.colors).map((color, index) => {
                return <option key={index} value={color}>{color.toUpperCase()}</option>
            });

            let relatedItems = this.props.relatedItems.map((item, index) => {
                return (
                    <div key={index} className='item-option' style={{display: item._id === this.props.item._id ? 'none':'block'}}>
                        <div className='item-option-inner'>
                            <Link to={'/item/' + item._id} onClick={() => {this.getItem(item._id)}}>
                                <img alt={item.name} src={item.images[0]}/>
                                <div className='input-align'>
                                    <p className='item-name'>{item.name.toUpperCase()}</p>
                                    <p className='item-price'>{`$${item.price}`}</p>
                                </div>
                                <p className='item-type'>{item.category.toUpperCase()}</p>
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
                                <p className='item-type'>{this.props.item.category.toUpperCase()}</p>
                                <p className='item-price'>{'$' + this.props.item.price}</p>
                            </div>
                            <h1 className='item-name'>{this.props.item.name.toUpperCase()}</h1>
                            <p className='item-select-info'>SIZE</p>
                            <select name='size' style={{border: this.state.sizeChosen ? '3px solid #eee':'3px solid #facfcf'}} onChange={(e) => {this.onChange(e)}}>
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
                            {this.favorited()}
                        </div>
                    </div>
                    <div className='item-bottom'>
                        <h1>YOU MIGHT ALSO LIKE</h1>
                        <div className='item-options-container'>
                            {relatedItems}
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div className='loading-container'><div className='loader'/></div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.item.item,
        favorited: state.item.favorited,
        color: state.item.color,
        itemLoaded: state.item.itemLoaded,
        relatedItems: state.item.relatedItems
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkCartHasItems: () => dispatch(checkCartHasItems()),
        checkFavoritesHasItems: () => dispatch(checkFavoritesHasItems()),
        itemAdded: (item, added, color) => dispatch(itemAdded(item, added, color)),
        openHeaderModal: () => dispatch(openHeaderModal()),
        getItem: (itemId) => dispatch(getItem(itemId)),
        checkFavorited: (color, item) => dispatch(favorited(color, item))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);