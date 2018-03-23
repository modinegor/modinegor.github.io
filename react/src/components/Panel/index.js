import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import User from "./User";
import {Link} from "react-router-dom";
import {initData} from "../../actions/blogActions";


const mapStateToProps = state => {
    return {
        user: state.user,
        filter: state.filter.filter,
        search: state.filter.search
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initData: data => {
            dispatch(initData(data));
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
class Panel extends Component {
    componentWillMount() {
        fetch(`/api/blog/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.props.initData(data);
            })
    }

    render() {
        return (
            <div className='navbar navbar-dark fixed-top bg-dark'>
                <Link to='/' className='navbar-brand'>
                    React blog app
                </Link>
                <User user={this.props.user}/>
            </div>
        )
    }
}

Panel.propTypes = {
    user: PropTypes.string,
    filter: PropTypes.string,
    search: PropTypes.string
};

export default Panel;
