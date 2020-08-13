import React from 'react';
import axios from 'axios';

class Orders extends React.Component {
    state = {
        orders: [],
        featched: false
    }

    componentDidMount () {
        const token = window.localStorage.getItem('token');
        axios.post('http://localhost:4001/api/orders/userOrders', {}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then(res => {
            if (res.status === 200) {
                this.setState({orders: res.data, featched: true});
            }
        });
    };

    render () {
        if (this.state.featched) {
            if (this.state.orders.length > 0) {
                const orders = this.state.orders.map((order, index) => {
                    const orderItems = order.order.map((item, index) => {
                        return (
                            <div key={index} className='order-item'>
                                <div className='order-item-inner'>
                                    <div className='img-link'>
                                        <img alt={item.name} src={item.colors[item.color]}/>
                                    </div>
                                    <div className='order-info'>
                                        <p style={{fontWeight: 'bold', color: 'black'}}>{item.name.toUpperCase()}</p>
                                        <p>{item.category.toUpperCase()}</p>
                                        <p>{`SIZE ${item.size.toUpperCase()}`}</p>
                                        <p>{`COLOR ${item.color.toUpperCase()}`}</p>
                                    </div>
                                    <p style={{margin: '0 0 0 auto', fontWeight: 'bold'}}>{`${item.quantity} X $${item.price}`}</p>
                                </div>
                            </div>
                        )
                    });
        
                    return (
                        <div key={index} className='ordered'>
                            <div className='order-header'>
                                <p style={{fontWeight: 'bold'}}>{`ORDER NO. ${order._id.toUpperCase()}`}</p>
                                <p style={{marginBottom: '20px', color: 'gray'}}>{`PLACED ON ${order.date}`}</p>
                                <p>ORDER STATUS: {order.status.toUpperCase()}</p>
                                <p>{`DELIVERY $${order.delivery}`} </p>
                                <p>{`TOTAL $${order.total}`} </p>
                            </div>
                            <div className='order-body'>
                                {orderItems}
                                <div className='order-options'>
                                    <button style={{display: order.proccesed ? 'none':'block'}}>CANCLE ORDER</button>
                                    <button style={{display: order.proccesed ? 'block':'none'}}>TRACK ORDER</button>
                                </div>
                            </div>
                        </div>
                    )
                });
            
                return (
                    <div className='order-list'>
                        {orders}
                    </div>
                )
            } else {
                return (
                    <div className='order-list'>
                        <h4 style={{padding:'0 0 0 20px'}}>YOU HAVE NO ORDERS</h4>
                    </div>
                )
            }
        } else {
            return <div className='loading-container'><div className='loader'/></div>
        }
    } 
}

export default Orders;