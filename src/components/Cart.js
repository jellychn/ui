import React from 'react';
import {connect} from 'react-redux';
import {
    checkCartHasItems
} from '../actions/itemsActions';
import CartItem from '../components/CartItems';

class Cart extends React.Component {
    state = {
        subtotal: 0,
        total: 0,
        delivery: 10
    }

    componentWillMount () {
        if (localStorage.getItem('cart') === null) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        this.setState({cart: JSON.parse(localStorage.getItem('cart'))});
    }

    componentDidMount () {
        this.subtotal();
    }

    subtotal = () => {
        let subtotal = 0;
        JSON.parse(localStorage.getItem('cart')).map((item) => {
            subtotal += parseInt(item.quantity) * parseInt(item.price);
        });
        this.setState({subtotal: subtotal, total: subtotal + this.state.delivery});
    };

    remove = (item) => {
        let index = 0;
        let cart = JSON.parse(localStorage.getItem('cart'));
        for (let i=0;i<cart.length;i++) {
            if (cart[i]._id === item._id && cart[i].size === item.size && cart[i].color === item.color) {
                break;
            }
            index += 1;
        }
        cart.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(cart));
        this.subtotal();
        this.props.checkCartHasItems();
    };

    render () {
        let cartItems = JSON.parse(localStorage.getItem('cart')).map((item, index) => {
            return <CartItem index={index} item={item} subtotal={this.subtotal} remove={this.remove}/>
        });

        return (
            <div className='cart'>
                <div className='cart-items-container'>
                    {cartItems}
                </div>
                <div className='summary'>
                    <p>{'SUBTOTAL $' + this.state.subtotal}</p>
                    <p>{'ESTIMATED DELIVERY $' + this.state.delivery}</p>
                    <p className='total'>{'TOTAL $' + this.state.total}</p>
                    <button>CHECKOUT</button>
                    <button className='paypal'>PAYPAL</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkCartHasItems: () => dispatch(checkCartHasItems())
    }
};

export default connect(null, mapDispatchToProps)(Cart);