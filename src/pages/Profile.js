import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Settings from '../components/Settings';
import Orders from '../components/Orders';
import {
    getUser
} from '../actions/userActions';

class Profile extends React.Component {
    state = {
        page: window.location.pathname.split('/')[2].toUpperCase()
    }

    componentDidMount () {
        window.scrollTo(0,0);
        this.props.getUser();
    };

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({page:window.location.pathname.split('/')[2].toUpperCase()});
        }
    }

    navigation = (to) => {
        this.setState({page: to});
    };

    content = () => {
        if (this.state.page === 'SETTINGS') {
            return <Settings/>
        } else if (this.state.page === 'ORDERS') {
            return <Orders/>
        }
    };

    render () {
        if (this.props.user !== null) {
            return (
                <div className='profile'>
                    <div className='navigation-header'>
                        <h1 className='directory'>{this.state.page}</h1>
                        <div className='navigation'>
                            <Link to='/profile/settings'><h2 onClick={() => {this.navigation('SETTINGS')}}>SETTINGS</h2></Link>
                            <Link to='/profile/orders'><h2 onClick={() => {this.navigation('ORDERS')}}>ORDERS</h2></Link>
                        </div>
                    </div>
                    {this.content()}
                </div>
            )
        } else {
            return <div className='loading-container'><div className='loader'/></div>
        }
    };
};

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(getUser())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));