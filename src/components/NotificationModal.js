import React from 'react';
import {connect} from 'react-redux';
import {
    toggleNotification
} from '../actions/modalAction';

class NotificationModal extends React.Component {
    render () {
        return (
            <div className='notification-modal' style={{display: this.props.notificationModal ? 'block':'none'}} onClick={() => this.props.toggleNotification(false, '')}>
                <h1>{this.props.notificationText}</h1>
            </div>
        )
    };
};

const mapStateToprops = state => {
    return {
        notificationModal: state.modal.notificationModal,
        notificationText: state.modal.notificationText
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleNotification: (bol, text) => dispatch(toggleNotification(bol, text))
    }
};

export default connect(mapStateToprops, mapDispatchToProps)(NotificationModal);