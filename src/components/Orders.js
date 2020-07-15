import React from 'react';
import img from '../assets/icons/primary.jpg';

function Orders() {
    return (
        <div className='order-list'>
            <div className='ordered'>
                <div className='order-header'>
                    <p style={{fontWeight: 'bold'}}>ORDER NO 1234567890</p>
                    <p style={{fontWeight: '400', marginBottom: '20px', color: 'gray'}}>PLACED ON 10/05/2020</p>
                    <div className='input-align'>
                        <p>ITEMS 2 | TOTAL $150 </p>
                    </div>
                </div>
                <div className='order-body'>
                    <div className='order-item'>
                        <div className='order-item-inner'>
                            <div className='img-link'>
                                <img src={img}/>
                            </div>
                            <div className='order-info'>
                                <p style={{fontWeight: 'bold', color: 'black'}}>TOM AND JERRY</p>
                                <p>TEE</p>
                                <p>SIZE L</p>
                                <p>COLOR WHITE</p>
                            </div>
                            <p style={{margin: '0 0 0 auto', fontWeight: 'bold'}}>2 X $80</p>
                        </div>
                    </div>
                    <div className='order-item'>
                        <div className='order-item-inner'>
                            <div className='img-link'>
                                <img src={img}/>
                            </div>
                            <div className='order-info'>
                                <p style={{fontWeight: 'bold', color: 'black'}}>TOM AND JERRY</p>
                                <p>TEE</p>
                                <p>SIZE L</p>
                                <p>COLOR WHITE</p>
                            </div>
                            <p style={{margin: '0 0 0 auto', fontWeight: 'bold'}}>2 X $80</p>
                        </div>
                    </div>
                    <div className='order-options'>
                        <button>CANCLE X</button>
                        <p>|</p>
                        <button>TRACK</button>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Orders;