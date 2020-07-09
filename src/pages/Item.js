import React from 'react';
import {Link} from 'react-router-dom';
import img from '../assets/icons/primary.jpg';

class Item extends React.Component {
    render () {
        return (
            <div className='item'>
                <div className='item-top'>
                    <div className='item-left'>
                        <div className='items-container'>
                            <img style={{padding: '0 10px 10px 0'}} src={img}/>
                            <img style={{padding: '0 0 10px 10px'}} src={img}/>
                        </div>
                        <div className='items-container'>
                            <img style={{padding: '10px 10px 10px 0'}} src={img}/>
                            <img style={{padding: '10px 0 10px 10px'}} src={img}/>
                        </div>
                        <div className='items-container'>
                            <img style={{padding: '10px 10px 0 0'}} src={img}/>
                            <img style={{padding: '10px 0 10px 10px'}} src={img}/>
                        </div>
                    </div>
                    <div className='item-right'>
                        <div className='item-info'>
                            <p className='item-type'>TEE</p>
                            <p className='item-price'>$150</p>
                        </div>
                        <h1 className='item-name'>TOM AND JERRY</h1>
                        <p className='item-select-info'>SIZE</p>
                        <select>
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                        </select>
                        <p className='item-select-info'>COLOR</p>
                        <select>
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                        </select>
                        <button className='add'>ADD</button>
                        <button className='favorite'>FAVORITE</button>
                    </div>
                </div>
                <div className='item-bottom'>
                    <h1>YOU MIGHT ALSO LIKE</h1>
                    <div className='item-options-container'>
                        <div className='item-option'>
                            <div className='item-option-inner'>
                                <Link to='/item'>
                                    <img src={img}/>
                                    <div className='input-align'>
                                        <p style={{fontWeight: 'bold'}}>TOM AND JERRY</p>
                                        <p style={{marginLeft: 'auto'}}>$150</p>
                                    </div>
                                    <p>SHIRT</p>
                                </Link>
                            </div>
                        </div>

                        <div className='item-option'>
                            <div className='item-option-inner'>
                                <Link to='/item'>
                                    <img src={img}/>
                                    <div className='input-align'>
                                        <p style={{fontWeight: 'bold'}}>TOM AND JERRY</p>
                                        <p style={{marginLeft: 'auto'}}>$150</p>
                                    </div>
                                    <p>SHIRT</p>
                                </Link>
                            </div>
                        </div>

                        <div className='item-option'>
                            <div className='item-option-inner'>
                                <Link to='/item'>
                                    <img src={img}/>
                                    <div className='input-align'>
                                        <p style={{fontWeight: 'bold'}}>TOM AND JERRY</p>
                                        <p style={{marginLeft: 'auto'}}>$150</p>
                                    </div>
                                    <p>SHIRT</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item;