import React from 'react';


import {connect} from 'react-redux';
import {
    checkFavoritesHasItems
} from '../actions/itemsActions';

import FavoriteItem from '../components/FavoriteItem';

class Favorites extends React.Component {
    state = {
        favorites: JSON.parse(localStorage.getItem('favorites'))
    };

    componentDidMount () {
        window.scrollTo(0,0);
    };

    removeItem = (item) => {
        console.log(item)
        const index = this.state.favorites.indexOf(item);
        let favorites = this.state.favorites;
        favorites.splice(index, 1);

        this.setState({favorites: favorites});
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.props.checkFavoritesHasItems();
    };

    render () {
        const favorites = this.state.favorites.map((item, index) => {
            return <FavoriteItem key={index} item={item} index={index} removeItem={this.removeItem}/>
        });

        if (this.state.favorites.length > 0) {
            return (
                <div className='profile'>
                    <div className='navigation-header'>
                        <h1 className='directory'>FAVORITES</h1>
                    </div>
                    <div className='favorites'>
                        {favorites}
                    </div>
                </div>
            )
        } else {
            return (
                <div className='profile'>
                    <div className='navigation-header'>
                        <h1 className='directory'>FAVORITES</h1>
                    </div>
                    <div className='favorites'>
                        <h4 style={{padding:'0 0 0 20px'}}>YOU HAVE NO FAVORITES</h4>
                    </div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkFavoritesHasItems: () => dispatch(checkFavoritesHasItems())
    }
};

export default connect(null, mapDispatchToProps)(Favorites);