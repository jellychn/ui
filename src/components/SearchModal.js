import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    getItems,
    setTimer,
    setQueryChanged,
    getSearchItems,
    setSearchItemLoaded,
    updateSearchQuery
} from '../actions/searchActions';
import {
    closeModal
} from '../actions/modalAction';

import {
    getItem
} from '../actions/itemsActions';

class SearchModal extends React.Component {
    state = {
        colors: [
            'black',
            'white',
            'gray',
            'blue',
            'dark blue',
            'light blue',
            'red',
            'dark red',
            'pink',
            'green',
            'dark green',
            'purple',
            'orange',
            'yellow',
            'brown'
        ]
    };

    componentDidMount () {
        setInterval(() => {
            if (this.props.timer !== 0) {
                this.props.setTimer(this.props.timer - 1);
            }
        }, 1000);
    };

    componentDidUpdate () {
        if (this.props.queryChanged && this.props.timer === 0) {
            this.props.setQueryChanged(false);

            if (this.props.q.length > 0) {
                this.props.getSearchItems(false);
                this.props.setSearchItemLoaded(true);
            } else {
                this.props.setSearchItemLoaded(true);
            }
        }

        if (this.props.q.length === 0 && this.props.searchItems.length > 0) {
            this.props.getSearchItems(true);
        }
    };

    onClose = () => {
        this.props.updateSearchQuery('');
        this.props.getSearchItems(true);
        this.props.setSearchItemLoaded(true);
        this.props.closeModal();
        document.getElementById('search').value = '';
    };

    display = (searchItems) => {
        if (this.props.searchItemsloaded) {
            return (
                <React.Fragment>
                    <div style={{display: this.props.searchItems.length === 0 ? 'none':'block'}} className='results'>
                        {searchItems}
                    </div>
                    <Link to='/display/' className='view' style={{display: this.props.searchItems.length > 0 ? 'block':'none'}} onClick={() => {this.props.getItems();this.props.closeModal()}}>VIEW ALL</Link>
                </React.Fragment>
            )
        } else {
            return (
                <div className='loading'>
                    <div className='loader'/>
                </div>
            )
        }
    };

    searchColor = (item) => {
        if (this.state.colors.includes(this.props.q.toLowerCase()) && Object.keys(item.colors).includes(this.props.q.toLowerCase())) {
            return <img alt={item.name} src={item.colors[this.props.q.toLowerCase()]}/>
        } else {
            return <img alt={item.name} src={item.images[0]}/>
        }
    };

    render () {
        const searchItems = this.props.searchItems.slice(0,4).map((item, index) => {
            return (
                <div key={index} className='result'>
                    <div className='result-inner'>
                        <Link to={'/item/' + item._id} onClick={() => {this.onClose(); this.props.getItem(item._id)}}>
                            {this.searchColor(item)}
                        </Link>
                        <div style={{display:'flex'}}>
                            <p className='result-name'>{item.name.toUpperCase()}</p>
                            <p className='result-price'>{'$' + item.price}</p>
                        </div>
                        <p className='result-type'>{item.category.toUpperCase()}</p>
                    </div>
                </div>
            )
        });
        
        return (
            <div className='search-modal' style={{display: this.props.searchModal ? 'flex':'none'}}>
                {this.display(searchItems)}
            </div>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
        searchModal: state.modal.searchModal,
        q: state.search.q,
        gender: state.search.gender,
        category: state.search.category,
        searchItems: state.search.searchItems,
        timer: state.search.timer,
        queryChanged: state.search.queryChanged,
        searchItemsloaded: state.search.searchItemsloaded
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
        setTimer: (time) => dispatch(setTimer(time)),
        setQueryChanged: (bol) => dispatch(setQueryChanged(bol)),
        getSearchItems: (reset) => dispatch(getSearchItems(reset)),
        setSearchItemLoaded: (bol) => dispatch(setSearchItemLoaded(bol)),
        getItems: () => {dispatch(getItems())},
        updateSearchQuery: (q) => {dispatch(updateSearchQuery(q))},
        getItem: (itemId) => dispatch(getItem(itemId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);