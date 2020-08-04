import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    closeModal
} from '../actions/modalAction';

class HeaderModal extends React.Component {
    render () {
        if (this.props.added === 'CART') {
            return (
                <div className='header-modal' style={{display: this.props.headerModal ? 'block':'none'}}>
                    <h1>{'ITEM ADDED TO ' + this.props.added} </h1>
                    <div className='img-container'>
                        <img alt={this.props.item.name} src={this.props.item.colors[this.props.item.color]}/>
                    </div>
                    <div className='item-info'>
                        <div style={{display:'flex'}}>
                            <p className='item-name'>{this.props.item.name.toUpperCase()}</p>
                            <p className='item-price'>{this.props.item.quantity + ' X $' + this.props.item.price}</p>
                        </div>
                        <p className='item-type'>{this.props.item.category.toUpperCase()}</p>
                    </div>
                    <Link to='/cart'><button className='cart-button' onClick={this.props.closeModal}>VIEW CART</button></Link>
                    <button className='continue-button' onClick={this.props.closeModal}>CONTINUE SHOPPING</button>
                </div>
            )
        } else {
            return (
                <div className='header-modal' style={{display: this.props.headerModal ? 'block':'none'}}>
                    <h1>{'ITEM ADDED TO ' + this.props.added} </h1>
                    <div className='img-container'>
                        <img alt={this.props.item.name} src={this.props.item.colors[this.props.item.color]}/>
                    </div>
                    <div className='item-info'>
                        <div style={{display:'flex'}}>
                            <p className='item-name'>{this.props.item.name.toUpperCase()}</p>
                            <p className='item-price'>{'$' + this.props.item.price}</p>
                        </div>
                        <p className='item-type'>{this.props.item.category.toUpperCase()}</p>
                    </div>
                    <Link to='/favorites'><button className='cart-button' onClick={this.props.closeModal}>VIEW FAVORITES</button></Link>
                    <button className='continue-button' onClick={this.props.closeModal}>CONTINUE SHOPPING</button>
                </div>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return {
        item: state.item.headerModalItem,
        added: state.item.headerModalAdded,
        headerModal: state.modal.headerModal
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderModal);

