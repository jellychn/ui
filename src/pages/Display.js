import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import itemFunctions from '../tools/itemFunctions';

class Display extends React.Component {
    state = {
        items: []
    };

    componentDidMount() {
        axios.get('http://localhost:4001/api/items').then(res => {
            this.setState({items: res.data});
        });
    };

    render () {
        let items = this.state.items.map((item, index) => {
            return (
                <div key={index} className='display-item'>
                    <div className='display-item-inner'>
                        <div className='like' onClick={() => {itemFunctions.favorite(item, this.props.checkFavoritesHasItems, this.props.itemAdded(item, 'FAVORITES'), this.props.openModel())}}/>
                        <Link to={'/item/' + item._id}>
                            <img src={item.images[0]}/>
                            <div className='input-align'>
                                <p style={{fontSize: '15px', fontWeight: 'bold'}}>{item.name}</p>
                                <p style={{marginLeft: 'auto', fontSize: '15px'}}>{'$' + item.price}</p>
                            </div>
                            <p style={{fontSize: '15px'}}>{item.type}</p>
                        </Link>
                    </div>
                </div>
            )
        });

        return (
            <div className='display'>
                {items}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkFavoritesHasItems: () => dispatch(actions.checkFavoritesHasItems()),
        itemAdded: (item, added) => dispatch(actions.itemAdded(item, added)),
        openModel: () => dispatch({type:'OPEN_MODEL'})
    }
};

export default connect(null, mapDispatchToProps)(Display);