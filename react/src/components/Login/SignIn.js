import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {userSingIn} from "../../actions/userActions";


const mapDispatchToProps = dispatch => {
    return {
        signInUser: user => {
            dispatch(userSingIn(user))
        }
    }
};

@connect(null, mapDispatchToProps)
class SignIn extends Component {
    state = {
        password: '',
        username: '',
        error: null
    };

    render() {
        let error = this.state.error ? <div className='text-danger'>{this.state.error}</div> : null;

        return (
            <div className='card bg-light'>
                <div className='card-body'>
                    <div className="form-group">
                        <label htmlFor="userNameInput">User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userNameInput"
                            placeholder="Enter user name"
                            value={this.state.username}
                            onChange={this.onUserNameChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}/>
                    </div>
                    <button type="submit"
                            className="btn btn-primary"
                            onClick={this.handleSingIn}>Sign In</button>
                </div>
                {error}
            </div>
        )
    }

    onUserNameChange = ({target}) => {
        this.setState({username: target.value})
    };

    onPasswordChange = ({target}) => {
        this.setState({password: target.value})
    };

    handleSingIn = () => {
        if (this.state.username !== '') {

            fetch('/api/user/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(this.state)
            })
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.json()
                })
                .then(({username}) => {
                    this.setState({
                        error: null,
                        username: '',
                        password: ''
                    });
                    this.props.signInUser(username);
                })
                .catch(() => {
                    this.setState({
                        error: 'Wrong username or password'
                    })
                })
        }
    }
}

SignIn.propTypes = {
    signInUser: PropTypes.func
};

export default SignIn;
