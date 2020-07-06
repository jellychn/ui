import React from 'react';
import {Link} from 'react-router-dom';
import women_img from '../assets/icons/women_img.jpg';
import men_img from '../assets/icons/men_img.jpg';

class Home extends React.Component {
    render () {
        return (
            <div className='home'>
                <div className='item-container'>
                    <h1>SHOP</h1>
                    <div className='display-item-body'>
                        <Link to='/display/women' className='display-item'>
                            <img src={women_img}/>
                            <h4 className='msg'>Womens's</h4>
                        </Link>
                        <Link to='/display/men' className='display-item'>
                            <img src={men_img}/>
                            <h4 className='msg'>Men's</h4>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;