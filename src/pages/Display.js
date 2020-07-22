import React from 'react';
import {connect} from 'react-redux';
import {
    getItems,
    updateGender
} from '../actions/searchActions';
import DisplayItem from '../components/DisplayItems';


class Display extends React.Component {
    componentDidMount () {
        window.scrollTo(0,0);
        if (window.location.pathname.split('/').includes('women') || window.location.pathname.split('/').includes('men')) {
            this.props.updateGender(window.location.pathname.split('/')[2]);
        }
        this.props.getItems();
    };

    render () {
        let items = [];
        if (this.props.sortBy === 'low price') {
            items = [].concat(this.props.items).sort((a, b) => a.price > b.price ? 1 : -1).map((item, index) => 
                <DisplayItem key={index} item={item} index={index}/>
            );
        } else if (this.props.sortBy === 'high price') {
            items = [].concat(this.props.items).sort((a, b) => a.price < b.price ? 1 : -1).map((item, index) => 
                <DisplayItem key={index} item={item} index={index}/>
            );
        } else if (this.props.sortBy === 'a-z') {
            items = [].concat(this.props.items).sort((a, b) => a.name > b.name ? 1 : -1).map((item, index) => 
                <DisplayItem key={index} item={item} index={index}/>
            );
        } else if (this.props.sortBy === 'z-a') {
            items = [].concat(this.props.items).sort((a, b) => a.name < b.name ? 1 : -1).map((item, index) => 
                <DisplayItem key={index} item={item} index={index}/>
            );
        } else {
            items = this.props.items.map((item, index) => {
                return <DisplayItem key={index} item={item} index={index}/>
            });
        }

        if (this.props.itemsLoaded) {
            if (this.props.items.length > 0) {
                return (
                    <div className='display'>
                        {items}
                    </div>
                )
            } else {
                return <div className='no-items'><h1>WE COULD NOT FIND ANYTHING</h1></div>
            }
        } else {
            return <div className='loading-container'><div className='loader'/></div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.search.items,
        sortBy: state.search.sortBy,
        itemsLoaded: state.search.loaded
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: () => {dispatch(getItems())},
        updateGender: (gender) => {dispatch(updateGender(gender))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);