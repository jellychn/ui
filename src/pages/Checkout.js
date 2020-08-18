import React from 'react';
import {connect} from 'react-redux';
import {
    getUser
} from '../actions/userActions';
import axios from 'axios';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentType: 'CARD',
            email: '',
            name: '',
            number: '',
            mobile: '',
            street: '',
            appartment: '',
            country: '-',
            state: '',
            city: '',
            zipcode: '',
            validatedEmail: true,
            validatedName: true,
            validatedNumber: true,
            validatedMobileNumber: true,
            validatedStreet: true,
            validatedAppartment: true,
            validatedCountry: true,
            validatedState: true,
            validatedCity: true,
            validatedZipcode: true,
            error: false,
            errorMsg: ''
        }
    }

    componentDidMount () {
        window.scrollTo(0,0);
        this.props.getUser();
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    onPlaceOrder = (e) => {
        e.preventDefault();
        let validated = true;
        this.setState({
            validatedEmail: true,
            validatedName: true,
            validatedNumber: true,
            validatedMobileNumber: true,
            validatedStreet: true,
            validatedAppartment: true,
            validatedCountry: true,
            validatedState: true,
            validatedCity: true,
            validatedZipcode: true,
            error: false,
            errorMsg: ''
        });
        // validate address
        if (this.state.email.length === 0 || !this.validateEmail(this.state.email)) {
            this.setState({validatedEmail:false});
            validated = false;
        }
        if (this.state.name.length === 0) {
            this.setState({validatedName: false});
            validated = false;
        }
        var regex = /^(\+?\d{1,3}|\d{1,4})$/gm
        if (this.state.number.length === 0 || !this.state.number.match(regex)) {
            this.setState({validatedNumber: false});
            validated = false;
        }
        if (this.state.mobile.length === 0 || !/^\d+$/.test(this.state.mobile)) {
            this.setState({validatedMobileNumber: false});
            validated = false;
        }
        if (this.state.street.length === 0) {
            this.setState({validatedStreet: false});
            validated = false;
        }
        if (this.state.country === '-' || this.state.country.length === 0) {
            this.setState({validatedCountry: false});
            validated = false;
        }
        if (this.state.state.length === 0) {
            this.setState({validatedState: false});
            validated = false;
        }
        if (this.state.city.length === 0) {
            this.setState({validatedCity: false});
            validated = false;
        }
        if (this.state.zipcode.length === 0 || !/^\d+$/.test(this.state.zipcode)) {
            this.setState({validatedZipcode: false});
            validated = false;
        }

        // validate rest of data
        if (this.state.paymentType.length === 0) {
            validated = false;
        }
        if (!/^\d+$/.test(this.state.subtotal)) {
            validated = false;
        }
        if (!/^\d+$/.test(this.state.total)) {
            validated = false;
        }
        if (!/^\d+$/.test(this.state.delivery)) {
            validated = false;
        }
        if (this.state.cart.length === 0) {
            validated = false;
        }

        if (validated) {
            const data = {
                paymentType: this.state.paymentType,
                // subtotal: this.state.subtotal,
                // total: this.state.total,
                // delivery: this.state.delivery,
                // order: this.state.cart,
                address: {
                    email: this.state.email,
                    name: this.state.name,
                    number: this.state.number,
                    mobile: this.state.mobile,
                    street: this.state.street,
                    appartment: this.state.appartment,
                    country: this.state.country,
                    state: this.state.state,
                    city: this.state.city,
                    zipcode: this.state.zipcode,
                }
            }

            if (this.props.authenticated && this.props.user._id !== null &&  this.props.user._id !== undefined) {
                data.userId = this.props.user._id;
            } else {
                data.userId = null;
            }

            axios.post('http://localhost:4001/api/orders/add', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}}).then(res => {
                console.log(res)
                if (res.status === 201) {
                    // notifiy, reset cart
                } else {
                    this.setState({error:true, errorMsg:'SOMETHING WENT WRONG, PLEASE TRY AGAIN.'});
                }
            }).catch(err => {
                this.setState({error:true, errorMsg:'SOMETHING WENT WRONG, PLEASE TRY AGAIN.'});
            });
        }
    };

    render () {
        return (
            <div className='checkout'>
                <div className='navigation-header'>
                    <h1 className='directory'>CHECKOUT</h1>
                </div>
                <form method='POST' className='order'>
                    <div className='order-details'>
                        <p style={{display: this.state.error ? 'block':'none', fontSize:'12px', color:'#facfcf', marginBottom:'10px'}}>{this.state.errorMsg}</p>
                        <h1>SHIPPING</h1>
                        <p>CONTACT</p>
                        <input type='text' name='email' placeholder='EMAIL' onChange={(e) => {this.onChange(e)}} style={{border: this.state.validatedEmail ? '3px solid #eee':'3px solid #facfcf'}}/>
                        <input type='text' name='name' placeholder='FULL NAME' onChange={(e) => {this.onChange(e)}} style={{border: this.state.validatedName ? '3px solid #eee':'3px solid #facfcf'}}/>
                        <div className='input-align'>
                            <input type='text' name='number' placeholder='+ [ ]' onChange={(e) => {this.onChange(e)}} style={{border: this.state.validatedNumber ? '3px solid #eee':'3px solid #facfcf', width: '100px'}}/>
                            <input type='text' name='mobile' placeholder='MOBILE' onChange={(e) => {this.onChange(e)}} style={{border: this.state.validatedMobileNumber ? '3px solid #eee':'3px solid #facfcf'}}/>
                        </div>
                        <p>ADDRESS</p>
                        <input type='text' name='street' placeholder='STREET' onChange={(e) => {this.onChange(e)}} style={{border: this.state.validatedStreet ? '3px solid #eee':'3px solid #facfcf'}}/>
                        <input type='text' name='appartment' placeholder='Appartment, UNIT, etc' onChange={(e) => {this.onChange(e)}} style={{border: this.state.validatedAppartment ? '3px solid #eee':'3px solid #facfcf'}}/>
                        <select name='country' onChange={(e) => {this.onChange(e)}} style={{border: this.state.validatedCountry ? '3px solid #eee':'3px solid #facfcf'}}>
                            <option>-</option>
                            <option>NEW ZEALAND</option>
                        </select>
                        <input type='text' name='state' placeholder='State/Province/Region' onChange={(e) => {this.onChange(e)}} style={{border: this.state.validatedState ? '3px solid #eee':'3px solid #facfcf'}}/>
                        <input type='text' name='city' placeholder='City' onChange={(e) => {this.onChange(e)}} style={{border: this.state.validatedCity ? '3px solid #eee':'3px solid #facfcf'}}/>
                        <input type='text' name='zipcode' placeholder='Zip Code' onChange={(e) => {this.onChange(e)}} style={{border: this.state.validatedZipcode ? '3px solid #eee':'3px solid #facfcf'}}/>
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
                        <button onClick={(e) => {this.onPlaceOrder(e)}}>PLACE ORDER</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        authenticated: state.user.authenticated
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUser())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);