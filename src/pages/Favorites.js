import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

class Favorites extends React.Component {
    state = {
        favorites: []
    };

    componentWillMount () {
        this.setState({favorites: JSON.parse(localStorage.getItem('favorites'))});
    };

    removeItem = (item) => {
        const index = this.state.favorites.indexOf(item);
        let favorites = this.state.favorites;
        favorites.splice(index, 1);

        this.setState({favorites: favorites});
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.props.checkFavoritesHasItems();
    };

    render () {
        const favorites = this.state.favorites.map((item, index) => {
            return (
                <div key={index} className='favorite-item'>
                    <div className='favorite-item-inner'>
                        <div className='remove' onClick={() => {this.removeItem(item)}}/>
                        <Link to={'/item/' + item._id}>
                            <img src={item.images[0]}/>
                            <div className='input-align'>
                                <p style={{fontSize: '15px', fontWeight: 'bold'}}>{item.name}</p>
                                <p style={{marginLeft: 'auto', fontSize: '15px'}}>{'$' + item.price}</p>
                            </div>
                            <p style={{fontSize: '15px'}}>{item.type}</p>
                        </Link>
                        <button>ADD</button>
                    </div>
                </div>
            )
        });

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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkFavoritesHasItems: () => dispatch(actions.checkFavoritesHasItems())
    }
};


export default connect(null, mapDispatchToProps)(Favorites);