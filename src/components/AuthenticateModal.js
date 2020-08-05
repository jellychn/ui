import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../actions/modalAction';
import {
    loginRegister
} from '../actions/userActions';


class AuthenticateModal extends React.Component {
    state = {
        email: '',
        password: '',
        firstname: '',
        lastname: ''
    }

    changeForm = (type) => {
        if (type) {
            this.props.loginRegister(type);
            this.setState({email:'', password:'', firstname:'', lastname:''});
        } else {
            this.props.loginRegister(type);
            this.setState({email:'', password:'', firstname:'', lastname:''});
        }
    };

    onChange = (e) => {
        console.log(e.target.value)
        if (e.target.name === 'email') {
            this.setState({'email':e.target.value});
        } else if (e.target.name === 'password') {
            this.setState({'password':e.target.value});
        } else if (e.target.name === 'firstname') {
            this.setState({'firstname':e.target.value});
        } else if (e.target.name === 'lastname') {
            this.setState({'lastname':e.target.value});
        }
    };

    authenticationType = () => {
        if (this.props.login) {
            return (
                <div className='login'>
                    <form method="post" action="/form" autoComplete="off">
                        <h1>SIGN IN.</h1>
                        <input type='text' placeholder='EMAIL' name='email' value={this.state.email} onChange={(e) => {this.onChange(e)}}/>
                        <input type='password' placeholder='*****' name='password' value={this.state.password} onChange={(e) => {this.onChange(e)}}/>
                        <p onClick={() => {this.changeForm(false)}}>REGISTER</p>
                        <button>NEXT</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className='register'>
                    <form method="post" action="/form" autoComplete="off">
                        <h1>REGISTER.</h1>
                        <input type='text' placeholder='EMAIL' name='email' value={this.state.email} onChange={(e) => {this.onChange(e)}}/>
                        <input type='password' placeholder='PASSWORD' name='password' value={this.state.password} onChange={(e) => {this.onChange(e)}}/>
                        <input type='text' placeholder='FIRST NAME' name='firstname' value={this.state.firstname} onChange={(e) => {this.onChange(e)}}/>
                        <input type='text' placeholder='LAST NAME' name='lastname' value={this.state.lastname} onChange={(e) => {this.onChange(e)}}/>
                        <p onClick={() => {this.changeForm(true)}}>LOGIN</p>
                        <button>NEXT</button>
                    </form>
                </div>
            )
        }
    };

    render () {
        return (
            <div className='authenticate-modal' style={{display: this.props.authenticateModal ? 'block':'none'}}>
                <div className='close' onClick={this.props.closeModal}/>
                {this.authenticationType()}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        authenticateModal: state.modal.authenticateModal,
        login: state.user.login
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
        loginRegister: (bol) => dispatch(loginRegister(bol))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateModal);