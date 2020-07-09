import React from 'react';
import {Link} from 'react-router-dom';
import filter_img from '../assets/icons/filter.svg';
import img from '../assets/icons/primary.jpg';

class Display extends React.Component {
    render () {
        return (
            <div className='display'>
                <div className='display-header'>
                    <div className='filter-icon' style={{backgroundImage: `url(${filter_img})`}}/>
                    <h2 className='directory'>WOMAN / SHIRTS</h2>
                    <select className='options'>
                            <option>LOW PRICE</option>
                            <option>HIGH PRICE</option>
                            <option>A-Z</option>
                            <option>Z-A</option>
                    </select>
                </div>
                <div className='item-type-container'>
                    <p>SHIRT</p>
                    <p>SHORTS</p>
                    <p>PANTS</p>
                </div>

                <div to='/item' className='display-item'>
                    <div className='display-item-inner'>
                        <Link to='/item'>
                            <div className='like'/>
                            <img src={img}/>
                            <div className='input-align'>
                                <p style={{fontSize: '15px', fontWeight: 'bold'}}>TOM AND JERRY</p>
                                <p style={{marginLeft: 'auto', fontSize: '15px'}}>$150</p>
                            </div>
                            <p style={{fontSize: '15px'}}>SHIRT</p>
                        </Link>
                    </div>
                </div>
                
                <div to='/item' className='display-item'>
                    <div className='display-item-inner'>
                        <Link to='/item'>
                            <div className='like'/>
                            <img src={img}/>
                            <div className='input-align'>
                                <p style={{fontSize: '15px', fontWeight: 'bold'}}>TOM AND JERRY</p>
                                <p style={{marginLeft: 'auto', fontSize: '15px'}}>$150</p>
                            </div>
                            <p style={{fontSize: '15px'}}>SHIRT</p>
                        </Link>
                    </div>
                </div>
                <div to='/item' className='display-item'>
                    <div className='display-item-inner'>
                        <Link to='/item'>
                            <div className='like'/>
                            <img src={img}/>
                            <div className='input-align'>
                                <p style={{fontSize: '15px', fontWeight: 'bold'}}>TOM AND JERRY</p>
                                <p style={{marginLeft: 'auto', fontSize: '15px'}}>$150</p>
                            </div>
                            <p style={{fontSize: '15px'}}>SHIRT</p>
                        </Link>
                    </div>
                </div>
                <div to='/item' className='display-item'>
                    <div className='display-item-inner'>
                        <Link to='/item'>
                            <div className='like'/>
                            <img src={img}/>
                            <div className='input-align'>
                                <p style={{fontSize: '15px', fontWeight: 'bold'}}>TOM AND JERRY</p>
                                <p style={{marginLeft: 'auto', fontSize: '15px'}}>$150</p>
                            </div>
                            <p style={{fontSize: '15px'}}>SHIRT</p>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}

export default Display;