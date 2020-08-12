import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../actions/modalAction';
import axios from 'axios';
import {
    authenticatePage,
    authenticate
} from '../actions/userActions';


class AuthenticateModal extends React.Component {
    state = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        validatedEmail: true,
        validatedPassword: true,
        validatedFirstname: true,
        validatedLastname: true,
        validateLogin: true,
        errorMsg: '',
        error: false
    }

    changeForm = (page) => {
        this.props.authenticatePage(page);
        this.setState({email:'', password:'', firstname:'', lastname:'', errorMsg:'', error:false});
    };

    onChange = (e) => {
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

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    onRegister = (e) => {
        e.preventDefault();
        let validated = 0;
        this.setState({errorMsg:'', error:false});
        if (this.state.email.length > 0 && this.validateEmail(this.state.email)) {
            this.setState({validatedEmail:true});
            validated += 1;
        } else {
            this.setState({validatedEmail:false});
        }
        if (this.state.password.length >= 8) {
            this.setState({validatedPassword:true});
            validated += 1;
        } else {
            this.setState({validatedPassword:false});
        }
        if (this.state.firstname.length > 0) {
            this.setState({validatedFirstname:true});
            validated += 1;
        } else {
            this.setState({validatedFirstname:false});
        }
        if (this.state.lastname.length > 0) {
            this.setState({validatedLastname:true});
            validated += 1;
        } else {
            this.setState({validatedLastname:false});
        }

        if (validated === 4) {
            let data = {
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname.charAt(0).toUpperCase() + this.state.firstname.slice(1),
                lastname: this.state.lastname.charAt(0).toUpperCase() + this.state.lastname.slice(1)
            };
            
            axios.post('http://localhost:4001/api/users/register', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}}
            ).then(res => {
                if (res.status === 200 && Object.keys(res.data).includes('error')) {
                    this.setState({errorMsg:res.data.error.toUpperCase(), error:true});
                } else if (res.status === 201) {
                    this.changeForm('success');
                } else {
                    this.setState({errorMsg:'SOMETHING WENT WRONG: PLEASE TRY AGAIN', error:true});
                }
            }).catch(err => {
                this.setState({errorMsg:'SOMETHING WENT WRONG: PLEASE TRY AGAIN', error:true});
            });
        }
    };

    onLogin = (e) => {
        e.preventDefault();
        let validated = 0;
        this.setState({errorMsg:'', error:false});
        if (this.state.email.length > 0 && this.validateEmail(this.state.email)) {
            this.setState({validatedEmail:true});
            validated += 1;
        } else {
            this.setState({validatedEmail:false});
        }
        if (this.state.password.length > 0) {
            this.setState({validatedPassword:true});
            validated += 1;
        } else {
            this.setState({validatedPassword:false});
        }
        
        if (validated === 2) {
            let data = {
                email: this.state.email,
                password: this.state.password
            };

            axios.post('http://localhost:4001/api/users/login', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}}
            ).then(res => {
                if (res.status === 200 && res.status === 200 && Object.keys(res.data).includes('error')) {
                    this.setState({errorMsg:res.data.error.toUpperCase(), error:true});
                } else if (res.status === 200) {
                    this.setState({email:'', password:''});
                    localStorage.setItem('token', res.data.token);
                    this.props.authenticate(true, false);
                    this.props.closeModal();
                } else {
                    this.setState({errorMsg:'SOMETHING WENT WRONG: PLEASE TRY AGAIN', error:true});
                }
            }).catch(err => {
                this.setState({errorMsg:'SOMETHING WENT WRONG: PLEASE TRY AGAIN', error:true});
            });
        }
    };

    onKeyPressRegister = (e) => {
        if (e.key === 'Enter') {
            this.onRegister();
        }
    };

    onKeyPressLogin = (e) => {
        if (e.key === 'Enter') {
            this.onLogin();
        }
    };

    authenticationType = () => {
        if (this.props.page === 'login') {
            return (
                <div className='login'>
                    <form method="POST" autoComplete="off">
                        <h1>SIGN IN.</h1>
                        <h2 style={{display: this.state.error ? 'block':'none'}}>{this.state.errorMsg}</h2>
                        <h2 style={{display: this.state.validateLogin ? 'none':'block'}}>EMAIL OR PASSWORD IS INCORRECT</h2>
                        <h2 style={{display: this.state.validatedEmail ? 'none':'block'}}>PLEASE ENTER A VALID EMAIL ADDRESS</h2>
                        <input type='text' placeholder='EMAIL' name='email' style={{border: this.state.validatedEmail ? '3px solid #eee':'3px solid #facfcf'}} value={this.state.email} onChange={(e) => {this.onChange(e)}}/>
                        <input type='password' placeholder='*****' name='password' style={{border: this.state.validatedPassword ? '3px solid #eee':'3px solid #facfcf'}} value={this.state.password} onChange={(e) => {this.onChange(e)}}/>
                        <p onClick={() => {this.changeForm('register')}}>REGISTER</p>
                        <button onKeyPress={this.onKeyPressLogin} onClick={(e) => {this.onLogin(e)}}>NEXT</button>
                    </form>
                </div>
            )
        } else if (this.props.page === 'register') {
            return (
                <div className='register'>
                    <form method="POST" autoComplete="off">
                        <h1>REGISTER.</h1>
                        <h2 style={{display: this.state.error ? 'block':'none'}}>{this.state.errorMsg}</h2>
                        <h2 style={{display: this.state.validatedEmail ? 'none':'block'}}>PLEASE ENTER A VALID EMAIL ADDRESS</h2>
                        <input type='text' placeholder='EMAIL' name='email' style={{border: this.state.validatedEmail ? '3px solid #eee':'3px solid #facfcf'}} value={this.state.email} onChange={(e) => {this.onChange(e)}}/>
                        <h2 style={{display: this.state.validatedPassword ? 'none':'block'}}>PASSWORD MUST BE 8 CHARACTERS LONG</h2>
                        <input type='password' placeholder='PASSWORD' name='password' style={{border: this.state.validatedPassword ? '3px solid #eee':'3px solid #facfcf'}} value={this.state.password} onChange={(e) => {this.onChange(e)}}/>
                        <input type='text' placeholder='FIRST NAME' name='firstname' style={{border: this.state.validatedFirstname ? '3px solid #eee':'3px solid #facfcf'}} value={this.state.firstname} onChange={(e) => {this.onChange(e)}}/>
                        <input type='text' placeholder='LAST NAME' name='lastname' style={{border: this.state.validatedLastname ? '3px solid #eee':'3px solid #facfcf'}} value={this.state.lastname} onChange={(e) => {this.onChange(e)}}/>
                        <p onClick={() => {this.changeForm('login')}}>LOGIN</p>
                        <button onKeyPress={this.onKeyPressRegister} onClick={(e) => {this.onRegister(e)}}>NEXT</button>
                    </form>
                </div>
            )
        } else if (this.props.page === 'success') {
            return (
                <div className='register'>
                    <h1>YOU HAVE SUCCESSFULLY REGISTERD.</h1>
                    <p onClick={() => {this.changeForm('login')}}>LOGIN</p>
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
        page: state.user.page
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
        authenticatePage: (page) => dispatch(authenticatePage(page)),
        authenticate: (bol, logout) => dispatch(authenticate(bol, logout))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateModal);