import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addNewPost} from "../../actions/blogActions";
import {connect} from 'react-redux';


const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        savePost: post => {
            dispatch(addNewPost(post));
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
class Input extends Component {
    state = {
        edit: false,
        value: ''
    };

    render() {
        let input = null;

        if (!this.state.edit)
            input = <input className='form-control' onSelect={this.handleSelect}/>;
        else
            input = <textarea className='form-control'
                              style={{resize: 'none', overflow: 'hidden'}}
                              onChange={this.handleChange}
                              onBlur={this.handleDrop}
                              value={this.state.value}
                              autoFocus />;

        return (
            <div style={{marginBottom: '50px', padding: '10px'}}>
                {input}
                <button className='btn btn-primary float-right'
                        style={{marginTop: '5px'}}
                        onClick={this.handleCreateNewPost}>Submit</button>
            </div>
        )
    }

    handleSelect = () => {
        this.setState({edit: true});
    };

    handleDrop = () => {
        if (this.state.value === '')
            this.setState({edit: false});
    };

    handleChange = ({target}) => {
        this.setState({value: target.value});
    };

    handleCreateNewPost = () => {
        let {user} = this.props,
            text = this.state.value;

        fetch('http://localhost:5002/api/blog', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                user,
                text
            })
        })
            .then(response => response.json())
            .then(data => {
                let date = new Date(data.date);

                this.props.savePost({
                    date: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
                    _id: data._id,
                    user,
                    text
                })
            });

        this.setState({
            value: '',
            edit: false
        });
    }
}

Input.propTypes = {
    user: PropTypes.string,
    savePost: PropTypes.func
};

export default Input;
