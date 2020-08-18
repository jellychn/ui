import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    updateCartItemQuantity
} from '../actions/cartActions';

class CartItem extends React.Component {
    state = {
        quantity: 1
    };

    componentDidMount() {
        this.setState({quantity: this.props.item.quantity});
    };

    changeQuantity = (item, type) => {
        if (type === '+') {
            this.setState({quantity: this.state.quantity + 1});
        } else if (type === '-') {
            if (this.state.quantity !== 1) {
                this.setState({quantity: this.state.quantity - 1});
            }
        }
        this.props.updateCartItemQuantity(item, this.state.quantity);
    };

    render () {
        return (
            <div key={this.props.index} className='order-item'>
                <div className='order-item-inner'>
                    <Link className='img-link' to={'/item/' + this.props.item._id}>
                        <img alt={this.props.item.name} src={this.props.item.colors[this.props.item.color]}/>
                    </Link>
                    <div className='order-info'>
                        <p style={{fontWeight: 'bold', color: 'black'}}>{this.props.item.name.toUpperCase()}</p>
                        <p>{this.props.item.category.toUpperCase()}</p>
                        <p>{'SIZE ' + this.props.item.size.toUpperCase()}</p>
                        <p>{'COLOR ' + this.props.item.color.toUpperCase()}</p>
                        <button onClick={() => {this.props.remove(this.props.item)}}>REMOVE</button>
                    </div>
                    <div className='quantity-container'>
                        <button style={{margin:'0 5px 0 0'}} onClick={() => {this.changeQuantity(this.props.item, '-')}}>-</button>
                        <p>{this.state.quantity}</p>
                        <button style={{margin:'0 10px 0 5px'}} onClick={() => {this.changeQuantity(this.props.item, '+')}}>+</button>
                        <p style={{fontWeight: 'bold'}}>{' X $' + this.props.item.price}</p>
                    </div>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateCartItemQuantity: (item, quantity) => dispatch(updateCartItemQuantity(item, quantity))
    }
};

export default connect(null, mapDispatchToProps)(CartItem);