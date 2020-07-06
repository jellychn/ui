import React from 'react';
import Cart from '../components/Cart';
import Address from '../components/Address';
import Payment from '../components/Payment';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'CART'
        }
    }

    navigation = (to) => {
        this.setState({page: to});
    }

    content = () => {
        if (this.state.page === 'CART') {
            return <Cart/>
        } else if (this.state.page === 'ADDRESS') {
            return <Address/>
        } else if (this.state.page === 'PAYMENT') {
            return <Payment/>
        }
    }

    render () {
        return (
            <div className='checkout'>
                <div className='navigation-header'>
                    <h1 className='directory'>{this.state.page}</h1>
                    <div className='navigation'>
                        <h2 onClick={() => {this.navigation('CART')}}>CART</h2>
                        <h2 onClick={() => {this.navigation('ADDRESS')}}>ADDRESS</h2>
                        <h2 onClick={() => {this.navigation('PAYMENT')}}>PAYMENT</h2>
                    </div>
                </div>
                {this.content()}
            </div>
        )
    }
}

export default Checkout;