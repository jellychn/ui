import React from 'react';
import {connect} from 'react-redux';
import {
    getItems
} from '../actions/searchActions';
import DisplayItem from '../components/DisplayItems';


class Display extends React.Component {
    componentDidMount() {
        this.props.getItems();
    };

    render () {
        let items = this.props.items.map((item, index) => {
            return <DisplayItem key={index} item={item} index={index}/>
        });

        return (
            <div className='display'>
                {items}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.search.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: () => {dispatch(getItems())}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);