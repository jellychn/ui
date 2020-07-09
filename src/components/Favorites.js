import React from 'react';
import {Link} from 'react-router-dom';
import img from '../assets/icons/primary.jpg';

function Favorites() {
    return (
        <div className='favorites'>
            <div className='favorite-item'>
                <div className='favorite-item-inner'>
                    <Link to='/item'>
                        <div className='remove'/>
                        <img src={img}/>
                        <div className='input-align'>
                            <p style={{fontSize: '15px', fontWeight: 'bold'}}>TOM AND JERRY</p>
                            <p style={{marginLeft: 'auto', fontSize: '15px'}}>$150</p>
                        </div>
                        <p style={{fontSize: '15px'}}>SHIRT</p>
                        <button>ADD</button>
                    </Link>
                </div>
            </div>

            <div className='favorite-item'>
                <div className='favorite-item-inner'>
                    <Link to='/item'>
                        <div className='remove'/>
                        <img src={img}/>
                        <div className='input-align'>
                            <p style={{fontSize: '15px', fontWeight: 'bold'}}>TOM AND JERRY</p>
                            <p style={{marginLeft: 'auto', fontSize: '15px'}}>$150</p>
                        </div>
                        <p style={{fontSize: '15px'}}>SHIRT</p>
                        <button>ADD</button>
                    </Link>
                </div>
            </div>

            <div className='favorite-item'>
                <div className='favorite-item-inner'>
                    <Link to='/item'>
                        <div className='remove'/>
                        <img src={img}/>
                        <div className='input-align'>
                            <p style={{fontSize: '15px', fontWeight: 'bold'}}>TOM AND JERRY</p>
                            <p style={{marginLeft: 'auto', fontSize: '15px'}}>$150</p>
                        </div>
                        <p style={{fontSize: '15px'}}>SHIRT</p>
                        <button>ADD</button>
                    </Link>
                </div>
            </div>

            <div className='favorite-item'>
                <div className='favorite-item-inner'>
                    <Link to='/item'>
                        <div className='remove'/>
                        <img src={img}/>
                        <div className='input-align'>
                            <p style={{fontSize: '15px', fontWeight: 'bold'}}>TOM AND JERRY</p>
                            <p style={{marginLeft: 'auto', fontSize: '15px'}}>$150</p>
                        </div>
                        <p style={{fontSize: '15px'}}>SHIRT</p>
                        <button>ADD</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Favorites;