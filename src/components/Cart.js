import React from 'react';
import img from '../assets/icons/primary.jpg';

function Cart() {
    return (
        <div className='cart'>
            <div className='cart-items-container'>
                <div className='order-item'>
                    <div className='input-align'>
                        <img src={img}/>
                        <div className='order-info'>
                            <p style={{fontSize: '20px', fontWeight: 'bold', color: 'black'}}>TOM AND JERRY</p>
                            <p>TEE</p>
                            <p>SIZE L</p>
                            <p>COLOR WHITE</p>
                            <button>REMOVE</button>
                        </div>
                        <p style={{margin: '0 0 0 auto', fontWeight: 'bold', textAlign: 'right'}}>2 X $80</p>
                    </div>
                </div>
                <div className='order-item'>
                    <div className='input-align'>
                        <img src={img}/>
                        <div className='order-info'>
                            <p style={{fontSize: '20px', fontWeight: 'bold', color: 'black'}}>TOM AND JERRY</p>
                            <p>TEE</p>
                            <p>SIZE L</p>
                            <p>COLOR WHITE</p>
                            <button>REMOVE</button>
                        </div>
                        <p style={{margin: '0 0 0 auto', fontWeight: 'bold', textAlign: 'right'}}>2 X $80</p>
                    </div>
                </div>
                <div className='order-item'>
                    <div className='input-align'>
                        <img src={img}/>
                        <div className='order-info'>
                            <p style={{fontSize: '20px', fontWeight: 'bold', color: 'black'}}>TOM AND JERRY</p>
                            <p>TEE</p>
                            <p>SIZE L</p>
                            <p>COLOR WHITE</p>
                            <button>REMOVE</button>
                        </div>
                        <p style={{margin: '0 0 0 auto', fontWeight: 'bold', textAlign: 'right'}}>2 X $80</p>
                    </div>
                </div>
            </div>
            <div className='summary'>
                <p>SUBTOTAL $150</p>
                <p>ESTIMATED DELIVERY $10</p>
                <p className='total'>TOTAL $160</p>
                <button>CHECKOUT</button>
                <button className='paypal'>PAYPAL</button>
            </div>
        </div>
    )
}

export default Cart;