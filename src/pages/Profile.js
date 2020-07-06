import React from 'react';
import Settings from '../components/Settings';
import Orders from '../components/Orders';
import Favorites from '../components/Favorites';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'SETTINGS' // take from url insted
        }
    }

    navigation = (to) => {
        this.setState({page: to});
    }

    content = () => {
        if (this.state.page === 'SETTINGS') {
            return <Settings/>
        } else if (this.state.page === 'ORDERS') {
            return <Orders/>
        } else if (this.state.page === 'FAVORITES') {
            return <Favorites/>
        }

    }

    render () {
        return (
            <div className='profile'>
                <div className='navigation-header'>
                    <h1 className='directory'>{this.state.page}</h1>
                    <div className='navigation'>
                        <h2 onClick={() => {this.navigation('SETTINGS')}}>SETTINGS</h2>
                        <h2 onClick={() => {this.navigation('FAVORITES')}}>FAVORITES</h2>
                        <h2 onClick={() => {this.navigation('ORDERS')}}>ORDERS</h2>
                    </div>
                </div>
                {this.content()}
            </div>
        )
    }
}

export default Profile;