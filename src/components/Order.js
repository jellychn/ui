import React from 'react';

function Order() {
    return (
        <div className='order'>
            <div className='order-details'>
                <h1>SHIPPING</h1>
                <form>
                    <p>CONTACT</p>
                    <input type='text' placeholder='NAME'/>
                    <input type='text' placeholder='NUMBER'/>
                    <p>ADDRESS</p>
                    <input type='text' placeholder='STREET'/>
                    <input type='text' placeholder='Appartment, UNIT, etc'/>
                    <select>
                        <option>NEW ZEALAND</option>
                    </select>
                    <select>
                        <option>State/Province/Region</option>
                    </select>
                    <select>
                        <option>City</option>
                    </select>
                    <input type='text' placeholder='Zip Code'/>
                </form>
                <h1 style={{margin: '40px 0 10px 0'}}>PAYMENT</h1>
                <p>CARD NUMBER</p>
                <input type='text' placeholder='0000 0000 0000 0000'/>
                <p>CARD HOLDER</p>
                <input type='text' placeholder='NAME'/>
                <p>EXPIRES</p>
                <input type='text' placeholder='MM/YY'/>
                <p>CVV</p>
                <input type='text' placeholder='000'/>
            </div>

            <div className='summary'>
                <p>SUBTOTAL $150</p>
                <p>ESTIMATED DELIVERY $10</p>
                <p className='total'>TOTAL $160</p>
                <button>PLACE ORDER</button>
            </div>
        </div>
    )
}

export default Order;