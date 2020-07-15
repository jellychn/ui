import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class HeaderModal extends React.Component {
    render () {
        if (this.props.added === 'CART') {
            return (
                <div className='modal' style={{display: this.props.modal ? 'block':'none'}}>
                    <div className='header-modal'>
                        <h1>{'ITEM ADDED TO ' + this.props.added} </h1>
                        <div className='img-container'>
                            <img src={this.props.item.colors[this.props.item.color]}/>
                        </div>
                        <div className='item-info'>
                            <div style={{display:'flex'}}>
                                <p>{this.props.item.name}</p>
                                <p style={{margin: '0 0 0 auto'}}>{'$' + this.props.item.price}</p>
                            </div>
                            <p>{this.props.item.type}</p>
                        </div>
                        <Link to='/cart'><button className='cart-button' onClick={this.props.closeModel}>VIEW CART</button></Link>
                        <button className='continue-button' onClick={this.props.closeModel}>CONTINUE SHOPPING</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='modal' style={{display: this.props.modal ? 'block':'none'}}>
                    <div className='header-modal'>
                        <h1>{'ITEM ADDED TO ' + this.props.added} </h1>
                        <div className='img-container'>
                            <img src={this.props.item.images[0]}/>
                        </div>
                        <div className='item-info'>
                            <div style={{display:'flex'}}>
                                <p>{this.props.item.name}</p>
                                <p style={{margin: '0 0 0 auto'}}>{'$' + this.props.item.price}</p>
                            </div>
                            <p>{this.props.item.type}</p>
                        </div>
                        <Link to='/favorites'><button className='cart-button' onClick={this.props.closeModel}>VIEW FAVORITES</button></Link>
                        <button className='continue-button' onClick={this.props.closeModel}>CONTINUE SHOPPING</button>
                    </div>
                </div>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return {
        modal: state.modal,
        item: state.headerModalItem,
        added: state.headerModalAdded
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModel: () => dispatch({type:'CLOSE_MODEL'})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderModal);

