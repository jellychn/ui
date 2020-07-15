import React from 'react';
import Settings from '../components/Settings';
import Orders from '../components/Orders';

class Profile extends React.Component {
    state = {
        page: window.location.pathname.split('/')[2].toUpperCase() // take from url insted
    }

    navigation = (to) => {
        this.setState({page: to});
    }

    content = () => {
        if (this.state.page === 'SETTINGS') {
            return <Settings/>
        } else if (this.state.page === 'ORDERS') {
            return <Orders/>
        }
    }

    render () {
        return (
            <div className='profile'>
                <div className='navigation-header'>
                    <h1 className='directory'>{this.state.page}</h1>
                    <div className='navigation'>
                        <h2 onClick={() => {this.navigation('SETTINGS')}}>SETTINGS</h2>
                        <h2 onClick={() => {this.navigation('ORDERS')}}>ORDERS</h2>
                    </div>
                </div>
                {this.content()}
            </div>
        )
    }
}

export default Profile;