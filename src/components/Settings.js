import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {
    toggleNotification,
    openUpdatePasswordModal
} from '../actions/modalAction';
import {
    getUser
} from '../actions/userActions';

class Settings extends React.Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        edit: false,
        error: false,
        errorMsg: ''
    };

    componentDidMount () {
        if (this.props.user !== null) {
            this.setState({
                firstname: this.props.user.firstname.charAt(0).toUpperCase() + this.props.user.firstname.slice(1),
                lastname: this.props.user.lastname.charAt(0).toUpperCase() + this.props.user.lastname.slice(1),
                email: this.props.user.email
            });
        }
    };

    onChange = (e) => {
        if (e.target.name === 'email') {
            this.setState({'email':e.target.value});
        } else if (e.target.name === 'firstname') {
            this.setState({'firstname':e.target.value});
        } else if (e.target.name === 'lastname') {
            this.setState({'lastname':e.target.value})
        } else if (e.target.name === 'password') {
            this.setState({'password':e.target.value});
        }
    };

    edit = (edit) => {
        this.setState({edit:edit});
    };

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    onSubmit = (e) => {
        e.preventDefault();
        let validated = 0;
        this.setState({errorMsg:'', error:false});
        if (this.state.email.length > 0 && this.validateEmail(this.state.email)) {
            this.setState({validatedEmail:true});
            validated += 1;
        } else {
            this.setState({validatedEmail:false});
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

        if (validated === 3) {
            const data = {
                'email': this.state.email,
                'firstname': this.state.firstname.charAt(0).toUpperCase() + this.state.firstname.slice(1),
                'lastname': this.state.lastname.charAt(0).toUpperCase() + this.state.lastname.slice(1)
            };
            const token = window.localStorage.getItem('token');
            if (token !== null || token !== undefined || token !== '') {
                axios.post('http://localhost:4001/api/users/updateDetails', JSON.stringify(data), {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then(res => {
                    if (res.status === 200) {
                        this.props.toggleNotification(true, 'PROFILE UPDATED');
                        this.props.getUser();
                        this.edit(false);
                    } else {
                        this.setState({error: true});
                    }
                }).catch(err => {
                    this.setState({error: true});
                });
            } else {
                this.setState({error:true});
            }
        } else {
            this.setState({error:true});
        }
    };

    content = () => {
        if (this.state.edit) {
            return (
                <form>
                    <div className='input-align' style={{width: '100%'}}>
                        <div style={{width: '100%', marginRight: '20px'}}>
                            <p>FIRSTNAME</p>
                            <input type='text' value={this.state.firstname} name='firstname' onChange={(e) => {this.onChange(e)}}/>
                        </div>
                        <div style={{width: '100%'}}>
                            <p>LASTNAME</p>
                            <input type='text' value={this.state.lastname} name='lastname' onChange={(e) => {this.onChange(e)}}/>
                        </div>
                    </div>

                    <p>EMAIL</p>
                    <input type='text' value={this.state.email.toLowerCase()} name='email' onChange={(e) => {this.onChange(e)}}/>
                    <p>PASSWORD</p>
                    <p className='edit-password' onClick={this.props.openUpdatePasswordModal}>EDIT PASSWORD</p>
                    <button onClick={(e) => {this.onSubmit(e)}}>SUBMIT</button>
                    <p className='cancle' onClick={() => {this.edit(false)}}>CANCLE</p>
                </form>
            )
        } else {
            return (
                <React.Fragment>
                    <div className='input-align' style={{width: '100%'}}>
                        <div style={{width: '100%', marginRight: '20px'}}>
                            <p>FIRSTNAME</p>
                            <h3>{this.state.firstname}</h3>
                        </div>
                        <div style={{width: '100%'}}>
                            <p>LASTNAME</p>
                            <h3>{this.state.lastname}</h3>
                        </div>
                    </div>

                    <p>EMAIL</p>
                    <h3>{this.state.email.toLowerCase()}</h3>
                    <p>PASSWORD</p>
                    <h1>**********</h1>
                    <button onClick={() => {this.edit(true)}}>EDIT</button>
                </React.Fragment>
            )
        }
    }

    render () {
        return (
            <div className='settings'>
                {this.content()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleNotification: (bol, text) => dispatch(toggleNotification(bol, text)),
        getUser: () => dispatch(getUser()),
        openUpdatePasswordModal: () => dispatch(openUpdatePasswordModal())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);