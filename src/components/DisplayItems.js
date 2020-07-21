import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    checkFavoritesHasItems,
    itemAdded
} from '../actions/itemsActions';
import {
    setItemArrayChangedFalse
} from '../actions/searchActions';
import heart_img from '../assets/icons/heart.svg';
import heart_focus_img from '../assets/icons/heart-focus.svg';

class DisplayItem extends React.Component {
    state = {
        color: Object.keys(this.props.item.colors)[0],
        favorited: false,
        colors: {
            'black': '#000000',
            'white': '#FFFFFF',
            'gray': '#b4b8b8',
            'blue': '#42aaf5',
            'dark blue': '#3266a8',
            'light blue': '#8cddff',
            'red': '#f76d63',
            'dark red': '#a62d2d',
            'pink': '#facfcf',
            'green': '#adfca9',
            'dark green': '#87c284',
            'purple': '#deaae6',
            'orange': '#ebac38',
            'yellow': '#fffca1',
            'brown': '#d47948'
        }
    }

    componentDidMount () {
        this.checkFavorited(this.state.color);
    };

    componentDidUpdate () {
        if (this.props.itemArrayChanged) {
            this.changeColor(Object.keys(this.props.item.colors)[0]);
            this.props.setItemArrayChangedFalse();
        }
    };

    checkFavorited = (color) => {
        if (localStorage.getItem('favorites') === null) {
            localStorage.setItem('favorites', JSON.stringify([]))
        }
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        let inFavorites = false;

        for (let i=0;i<favorites.length;i++) {
            if (this.props.item._id === favorites[i]._id && favorites[i].color === color) {
                inFavorites = true;
                break;
            }
        }

        this.setState({favorited: inFavorites});
    };

    changeColor = (color) => {
        this.setState({color:color});
        this.checkFavorited(color);
    };

    favorite = (item, checkFavoritesHasItems, color) => {
        if (localStorage.getItem('favorites') === null) {
            localStorage.setItem('favorites', JSON.stringify([]));
        }
    
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        let inArray = false;
        let index = 0;
        item.color = color;
        item.size = '-';
    
        for (let i=0;i<favorites.length;i++) {
            if (favorites[i]._id === item._id && favorites[i].color === color) {
                inArray = true;
                break;
            }
            index += 1;
        };

        if (inArray) {
            // remove
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.setState({favorited: false});
        } else {
            // add
            favorites.push(item);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.setState({favorited: true});
            this.props.openModel()
        }
        checkFavoritesHasItems();
        this.checkFavorited(color);
    };  
 
    render () {
        let colors = Object.keys(this.props.item.colors).map((color, index) => {
            if (index === 0 || index === Object.keys(this.props.item).length - 1) {
                return <div key={index} className='color-view' onClick={() => {this.changeColor(color)}} style={{backgroundColor:this.state.colors[color], border: color === this.state.color ? '3px solid #eee':'1px solid #eee'}}/>
            } else {
                return <div key={index} className='color-view' onClick={() => {this.changeColor(color)}} style={{backgroundColor:this.state.colors[color], margin: '0 5px', border: color === this.state.color ? '3px solid #eee':'1px solid #eee'}}/>
            }
        });

        return (
            <div key={this.props.index} className='display-item'>
                <div className='display-item-inner'>
                    <div className='color-view-container'>
                            {colors}
                            <div 
                                className='like' 
                                onClick={() => {this.favorite(this.props.item, this.props.checkFavoritesHasItems, this.state.color); this.props.itemAdded(this.props.item, 'FAVORITES', this.state.color)}}
                                style={{backgroundImage: this.state.favorited ? `url(${heart_focus_img})`:`url(${heart_img})`}}
                            />
                    </div>
                    <Link to={'/item/' + this.props.item._id}>
                        <img alt={this.props.item.name} src={this.props.item.colors[this.state.color]}/>
                        <div className='input-align'>
                            <p style={{fontSize: '15px', fontWeight: 'bold'}}>{this.props.item.name.toUpperCase()}</p>
                            <p style={{marginLeft: 'auto', fontSize: '15px'}}>{'$' + this.props.item.price}</p>
                        </div>
                        <p style={{fontSize: '15px'}}>{this.props.item.category.toUpperCase()}</p>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itemArrayChanged: state.search.itemArrayChanged
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkFavoritesHasItems: () => dispatch(checkFavoritesHasItems()),
        itemAdded: (item, added, color) => dispatch(itemAdded(item, added, color)),
        openModel: () => dispatch({type:'OPEN_MODEL'}),
        setItemArrayChangedFalse: () => dispatch(setItemArrayChangedFalse())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayItem);