import React from 'react';
import {Link} from 'react-router-dom';
import img from '../assets/icons/primary.jpg';

class Display extends React.Component {
    render () {
        return (
            <div className='display'>
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