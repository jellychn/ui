import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
    getItems,
    updateSearchQuery
} from '../actions/searchActions';
import {
    closeModal
} from '../actions/modalAction';

class SearchModal extends React.Component {
    state = {
        searchItems: [],
        loaded: true,
        changed: false,
        timer: 0
    }

    componentDidMount () {
        setInterval(() => {
            if (this.state.timer !== 0) {
                this.setState({timer:this.state.timer - 1});
            }
        }, 1000);
    };

    componentDidUpdate () {
        if (this.state.changed && this.state.timer === 0) {
            this.setState({changed:false});

            if (this.props.q.length !== 0) {
                axios.get('http://localhost:4001/api/items?q=' + this.props.q, {params: {gender:this.props.gender, category: this.props.category}}).then(res => {
                    this.setState({searchItems: res.data, loaded: true});
                })
            } else {
                this.setState({loaded:true});
            }
        }

        if (this.props.searchModal) {
            document.getElementById('search').focus();
        }
    };

    handleKeyPress = (e) => {
        this.setState({loaded:false});
        if (e.key === 'Enter') {
            this.props.getItems();
            this.props.closeModal();
            this.setState({loaded:true});
        }
    }

    onChange = () => {
        this.setState({searchItems:[],changed:true,timer:2,loaded:false});
    };

    onClose = () => {
        this.props.updateSearchQuery('');
        this.setState({searchItems:[], loaded:true});
        this.props.closeModal();
        document.getElementById('search').value = '';
    };

    display = (searchItems) => {
        if (this.state.loaded) {
            return (
                <React.Fragment>
                    <div style={{display: this.state.searchItems.length > 0 ? 'block':'none'}} className='results'>
                        {searchItems}
                    </div>
                    <Link to='/display/' style={{display: this.state.searchItems.length > 0 ? 'block':'none'}} onClick={() => {this.props.getItems();this.props.closeModal()}}>VIEW ALL</Link>
                    <h4 style={{display: this.state.searchItems.length > 0 ? 'none':'block'}}>NO ITEMS TO SHOW</h4>
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

    render () {
        const searchItems = this.state.searchItems.slice(0,9).map((item, index) => {
            return (
                <div key={index} className='result'>
                    <div className='result-inner'>
                        <Link to={'/item/' + item._id} onClick={this.onClose}>
                            <img alt={item.name} src={item.images[0]}/>
                        </Link>
                        <div style={{display:'flex'}}>
                            <p style={{fontWeight:'bold', margin:'3px 0 0 0'}}>{item.name.toUpperCase()}</p>
                            <p style={{margin:'3px 0 0 auto'}}>{'$' + item.price}</p>
                        </div>
                        <p>{item.category.toUpperCase()}</p>
                    </div>
                </div>
            )
        });
        
        return (
            <div className='search-modal' style={{display: this.props.searchModal ? 'flex':'none'}} onKeyPress={(e) => {this.handleKeyPress(e)}} onChange={(e) => {this.props.updateSearchQuery(e.target.value);this.onChange()}}>
                <div style={{display:'flex'}}>
                    <input id='search' type='text'/>
                    <div className='close' onClick={this.onClose}/>
                </div>
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
        category: state.search.category
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: () => {dispatch(getItems())},
        updateSearchQuery: (q) => {dispatch(updateSearchQuery(q))},
        closeModal: () => dispatch(closeModal())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);