import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

class Cart extends React.Component {
    state = {
        cart: [],
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
        this.state.cart.map((item) => {
            subtotal += parseInt(item.quantity) * parseInt(item.price);
        });
        this.setState({subtotal: subtotal, total: subtotal + this.state.delivery});
    };

    remove = (item) => {
        const index = this.state.cart.indexOf(item);
        let tempArray = this.state.cart; 
        tempArray.splice(index, 1)
        this.setState({cart: tempArray});
        localStorage.setItem('cart', JSON.stringify(tempArray));
        this.subtotal();
        this.props.checkCartHasItems();
    };

    render () {
        let cartItems = this.state.cart.map((item, index) => {
            return (
                <div key={index} className='order-item'>
                    <div className='order-item-inner'>
                        <Link className='img-link' to={'/item/' + item._id}>
                            <img src={item.colors[item.color]}/>
                        </Link>
                        <div className='order-info'>
                            <p style={{fontWeight: 'bold', color: 'black'}}>{item.name}</p>
                            <p>{item.type}</p>
                            <p>{'SIZE ' + item.size}</p>
                            <p>{'COLOR ' + item.color}</p>
                            <button onClick={() => {this.remove(item)}}>REMOVE</button>
                        </div>
                        <p style={{margin: '0 0 0 auto', fontWeight: 'bold'}}>{item.quantity + ' X ' + '$' + item.price}</p>
                    </div>
                </div>
            )
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
        checkCartHasItems: () => dispatch(actions.checkCartHasItems())
    }
};

export default connect(null, mapDispatchToProps)(Cart);