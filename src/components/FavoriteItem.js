import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    checkCartHasItems,
    checkFavoritesHasItems,
    itemAdded
} from '../actions/itemsActions';
import {
    openHeaderModal
} from '../actions/modalAction';

class FavoriteItem extends React.Component {
    state = {
        sizeChosen: true,
        size: '-'
    };

    onChangeSize = (e) => {
        this.setState({size: e.target.value});
        this.setState({sizeChosen: true});
    };

    addItemToCart = (item, name) => {
        var e = document.getElementsByName(name)[0];
        var size = e.options[e.selectedIndex].value;
        if (size !== '-') {
            this.setState({sizeChosen: true});
            if (localStorage.getItem('cart') === null) {
                localStorage.setItem('cart', JSON.stringify([]));
            }
            
            let inCart = false;
            let cart = JSON.parse(localStorage.getItem('cart'));
    
            const newItem = {
                '_id': item._id,
                'name': item.name,
                'price': item.price,
                'category': item.category,
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
            this.props.openHeaderModal();
            
            this.props.removeItem(item);
        } else if (this.state.size === '-') {
            this.setState({sizeChosen: false});
        }
    };

    render () {
        const sizes = this.props.item.sizes.map((size, index) => {
            if (this.props.item.size === size) {
                return <option selected key={index} value={size}>{size}</option>
            } else {
                return <option key={index} value={size}>{size.toUpperCase()}</option>
            }
        });

        return (
            <div key={this.props.index} className='favorite-item'>
                <div className='favorite-item-inner'>
                    <div className='remove' onClick={() => {this.props.removeItem(this.props.item)}}/>
                    <Link to={'/item/' + this.props.item._id}>
                        <img alt={this.props.item.name} src={this.props.item.colors[this.props.item.color]}/>
                        <div className='input-align'>
                            <p style={{fontSize: '15px', fontWeight: 'bold'}}>{this.props.item.name.toUpperCase()}</p>
                            <p style={{marginLeft: 'auto', fontSize: '15px', fontWeight:'bold'}}>{'$' + this.props.item.price}</p>
                        </div>
                        <p style={{fontSize: '15px', fontWeight:'bold', color:'lightGray'}}>{this.props.item.category.toUpperCase()}</p>
                    </Link>
                    <select name={this.props.index} style={{border: this.state.sizeChosen ? '1px solid black':'1px solid red'}} onChange={(e) => {this.onChangeSize(e)}}>
                        <option value='-'>-</option>
                        {sizes}
                    </select>
                    <button onClick={() => {this.addItemToCart(this.props.item, this.props.index)}}>ADD</button>
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
        openHeaderModal: () => dispatch(openHeaderModal())
    }
};

export default connect(null, mapDispatchToProps)(FavoriteItem);