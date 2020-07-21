import React from 'react';
import Cart from '../components/Cart';
import Order from '../components/Order';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'CART'
        }
    }

    componentDidMount () {
        window.scrollTo(0,0);
    };

    navigation = (to) => {
        this.setState({page: to});
    }

    content = () => {
        if (this.state.page === 'CART') {
            return <Cart/>
        } else if (this.state.page === 'ORDER') {
            return <Order/>
        }
    }

    render () {
        return (
            <div className='checkout'>
                <div className='navigation-header'>
                    <h1 className='directory'>{this.state.page}</h1>
                    <div className='navigation'>
                        <h2 onClick={() => {this.navigation('CART')}}>CART</h2>
                        <h2 onClick={() => {this.navigation('ORDER')}}>ORDER</h2>
                    </div>
                </div>
                {this.content()}
            </div>
        )
    }
}

export default Checkout;