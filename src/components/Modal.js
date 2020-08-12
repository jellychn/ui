import React from 'react';
import {connect} from 'react-redux';
import HeaderModal from './HeaderModal';
import SearchModal from './SearchModal';
import AuthenticateModal from './AuthenticateModal';
import UpdatePasswordModal from './UpdatePasswordModal';

class Modal extends React.Component {
    render () {
        return (
            <div className='modal' style={{display: this.props.modal ? 'block':'none'}}>
                <HeaderModal/>
                <SearchModal/>
                <AuthenticateModal/>
                <UpdatePasswordModal/>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        modal: state.modal.modal
    }
};

export default connect(mapStateToProps)(Modal);