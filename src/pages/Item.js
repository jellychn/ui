import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import img from '../assets/icons/primary.jpg';

class Item extends React.Component {
    state = {
        item: {},
        loaded: false
    };

    componentDidMount() {
        const itemId = window.location.pathname.split('/')[2];
        axios.get('http://localhost:4001/api/items/' + itemId).then(res => {
            this.setState({item:res.data, loaded: true});
        });
    };

    render () {
        if (this.state.loaded === true) {
            let images = this.state.item.images.map((img, index) => {
                return <img key={index} style={{padding: '0 10px 10px 0'}} src={img}/>
            });

            let size = this.state.item.sizes.map((size, index) => {
                return <option key={index}>{size}</option>
            });

            let color = this.state.item.colors.map((color, index) => {
                return <option key={index}>{color}</option>
            });

            return (
                <div className='item'>
                    <div className='item-top'>
                        <div className='item-left'>
                            {images}
                        </div>
                        <div className='item-right'>
                            <div className='item-info'>
                                <p className='item-type'>{this.state.item.type}</p>
                                <p className='item-price'>{'$' + this.state.item.price}</p>
                            </div>
                            <h1 className='item-name'>{this.state.item.name}</h1>
                            <p className='item-select-info'>SIZE</p>
                            <select name='size'>
                                {size}
                            </select>
                            <p className='item-select-info'>COLOR</p>
                            <select name='color'>
                                {color}
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
        } else {
            return <div></div>
        }
    }
}

export default Item;