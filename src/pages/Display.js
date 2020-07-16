import React from 'react';
import axios from 'axios';
import DisplayItem from '../components/DisplayItems';

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
            return <DisplayItem key={index} item={item} index={index}/>
        });

        return (
            <div className='display'>
                {items}
            </div>
        )
    }
}

export default Display;