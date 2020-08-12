import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {
    toggleNotification,
    closeModal
} from '../actions/modalAction';


class UpdatePasswordModal extends React.Component {
    state = {
        oldPassword: '',
        newPassword: '',
        validatedOldPassword: true,
        validatedNewPassword: true,
        error: false,
        errorMsg: ''
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({error:false, errorMsg:'', validatedOldPassword: true, validatedNewPassword: true});
        let validated = 0;
        if (this.state.oldPassword.length > 0) {
            this.setState({validatedOldPassword:true});
            validated += 1;
        } else {
            this.setState({validatedOldPassword:false, error:true, errorMsg:'PLEASE FILL IN THE FIELDS'});
        }
        if (this.state.newPassword.length > 0) {
            this.setState({validatedNewPassword:true});
            validated += 1;
        } else {
            this.setState({validatedNewPassword:false, error:true, errorMsg:'PLEASE FILL IN THE FIELDS'});
        }

        if (validated === 2) {
            const token = window.localStorage.getItem('token');
            if (token !== null || token !== undefined || token !== '') {
                axios.post('http://localhost:4001/api/users/updatePassword', {'oldPassword': this.state.oldPassword, 'newPassword': this.state.newPassword}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then(res => {
                    if (res.status === 200 && Object.keys(res.data).includes('error')) {
                        this.setState({error: true, errorMsg: res.data.error});
                    } else if (res.status === 200) {
                        this.props.toggleNotification(true, 'PASSWORD UPDATED');
                        this.onReset();
                    } else {
                        this.setState({error: true});
                    }
                }).catch(err => {
                    this.setState({error: true});
                });
            } else {
                this.setState({error: true});
            }
        }
    };

    onChange = (e) => {
        if (e.target.name === 'old password') {
            this.setState({'oldPassword': e.target.value});
        } else if (e.target.name === 'new password') {
            this.setState({'newPassword': e.target.value});
        }
    };

    onReset = () => {
        this.props.closeModal();
        this.setState({newPassword:'', oldPassword:'', error:false, errorMsg:'', validatedOldPassword: true, validatedNewPassword: true});
    };

    render () {
        return (
            <div className='update-password-modal' style={{display: this.props.passwordModal ? 'block':'none'}}>
                <h1>UPDATE PASSWORD</h1>
                <p style={{color: '#facfcf'}}>{this.state.errorMsg.toUpperCase()}</p>
                <form >
                    <p>OLD PASSWORD</p>
                    <input type='password' name='old password' style={{border: this.state.validatedOldPassword ? '3px solid #eee':'3px solid #facfcf'}} value={this.state.oldPassword} onChange={(e) => this.onChange(e)}/>
                    <p>NEW PASSWORD</p>
                    <input type='password' name='new password' style={{border: this.state.validatedNewPassword ? '3px solid #eee':'3px solid #facfcf'}} value={this.state.newPassword} onChange={(e) => this.onChange(e)}/>
                    <button onClick={(e) => {this.onSubmit(e)}}>SUBMIT</button>
                    <p className='cancle' onClick={this.onReset}>CANCLE</p>
                </form>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        passwordModal: state.modal.passwordModal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleNotification: (bol, text) => dispatch(toggleNotification(bol, text)),
        closeModal: () => dispatch(closeModal())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdatePasswordModal);
