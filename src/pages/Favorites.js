import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    checkCartHasItems,
    checkFavoritesHasItems,
    itemAdded
} from '../actions/itemsActions';

class Favorites extends React.Component {
    state = {
        favorites: []
    };

    componentWillMount () {
        this.setState({favorites: JSON.parse(localStorage.getItem('favorites'))});
    };

    removeItem = (item) => {
        const index = this.state.favorites.indexOf(item);
        let favorites = this.state.favorites;
        favorites.splice(index, 1);

        this.setState({favorites: favorites});
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.props.checkFavoritesHasItems();
    };

    onChangeSize = (e) => {
        this.setState({size: e.target.value});
    };

    addItemToCart = (item, name) => {
        var e = document.getElementsByName(name)[0];
        var size = e.options[e.selectedIndex].value;
        if (size !== '-') {
            if (localStorage.getItem('cart') === null) {
                localStorage.setItem('cart', JSON.stringify([]));
            }
            
            let inCart = false;
            let cart = JSON.parse(localStorage.getItem('cart'));
    
            const newItem = {
                '_id': item._id,
                'name': item.name,
                'price': item.price,
                'type': item.type,
                'size': size,
                'color': item.color,
                'colors': item.colors,
                'images': item.images,
                'quantity': 1
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
            this.props.itemAdded(newItem, 'CART', item.color);
            this.props.openModel();
    
            this.removeItem(item);
        }
    };

    render () {
        const favorites = this.state.favorites.map((item, index) => {
            const sizes = item.sizes.map((size, index) => {
                if (item.size === size) {
                    return <option selected key={index} value={size}>{size}</option>
                } else {
                    return <option key={index} value={size}>{size}</option>
                }
            });

            return (
                <div key={index} className='favorite-item'>
                    <div className='favorite-item-inner'>
                        <div className='remove' onClick={() => {this.removeItem(item)}}/>
                        <Link to={'/item/' + item._id}>
                            <img src={item.colors[item.color]}/>
                            <div className='input-align'>
                                <p style={{fontSize: '15px', fontWeight: 'bold'}}>{item.name}</p>
                                <p style={{marginLeft: 'auto', fontSize: '15px'}}>{'$' + item.price}</p>
                            </div>
                            <p style={{fontSize: '15px'}}>{item.type}</p>
                        </Link>
                        <select name={index} onChange={(e) => {this.onChangeSize(e)}}>
                            <option value='-'>-</option>
                            {sizes}
                        </select>
                        <button onClick={() => {this.addItemToCart(item, index)}}>ADD</button>
                    </div>
                </div>
            )
        });

        return (
            <div className='profile'>
                <div className='navigation-header'>
                    <h1 className='directory'>FAVORITES</h1>
                </div>
                <div className='favorites'>
                    {favorites}
                </div>
            </div>
        )
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


export default connect(null, mapDispatchToProps)(Favorites);