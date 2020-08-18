import React from 'react';
import {connect} from 'react-redux';
import {
    getUser,
    authenticateTriggered
} from '../actions/userActions';
import {
    getCart,
    removeItemFromCart
} from '../actions/cartActions';
import CartItem from '../components/CartItems';

class Cart extends React.Component {
    componentDidMount () {
        window.scrollTo(0,0);
        this.props.getCart();
    };

    componentDidUpdate () {
        if (this.props.authenticateTriggered) {
            this.props.getCart();
            this.props.authenticateTriggeredFunction(false);
        }
    };

    remove = (item) => {
        this.props.removeItemFromCart(item);
    };

    content = () => {
        if (this.props.cartRequested && !this.props.authenticateTriggered) {
            let cartItems = this.props.cart.map((item, index) => {
                return <CartItem key={index} index={index} item={item} remove={this.remove}/>
            });
    
            if (this.props.cart.length > 0) {
                return (
                    <div className='cart'>
                        <div className='cart-items-container'>
                            {cartItems}
                        </div>
                        <div className='summary'>
                            <p>{'SUBTOTAL $' + this.props.subtotal}</p>
                            <p>{'ESTIMATED DELIVERY $' + this.props.delivery}</p>
                            <p className='total'>{'TOTAL $' + this.props.total}</p>
                            <button onClick={() => {this.navigation('ORDER')}}>CHECKOUT</button>
                            <button className='paypal'>PAYPAL</button>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className='cart'>
                        <div className='cart-items-container'>
                            <h4>YOUR CART IS EMPTY</h4>
                        </div>
                    </div>
                )
            }
        } else {
            return <div className='loading-container'><div className='loader'/></div>
        }
    };

    render () {
        return (
            <div className='checkout'>
                <div className='navigation-header'>
                    <h1 className='directory'>CART</h1>
                </div>
                {this.content()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        authenticated: state.user.authenticated,
        cart: state.cart.cart,
        authenticateTriggered: state.user.authenticateTriggered,
        cartRequested: state.cart.cartRequested,
        total: state.cart.total,
        subtotal: state.cart.subtotal,
        delivery: state.cart.delivery
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUser()),
        getCart: () => dispatch(getCart()),
        authenticateTriggeredFunction: (bol) => dispatch(authenticateTriggered(bol)),
        removeItemFromCart: (item) => dispatch(removeItemFromCart(item))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart);