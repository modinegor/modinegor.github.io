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
        wrong: false
    };

    render() {
        let wrong = this.state.wrong ? <div className='text-danger'>Username or Password is wrong</div> : null;

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
                {wrong}
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

            fetch('http://localhost:5002/api/user/login', {
                method: 'POST',
                username: this.state.username,
                body: JSON.stringify(this.state)
            })
                .then(response => {
                    console.log(response);
                    return response.json()
                })
                .then(({username}) => {
                    // this.setState({
                    //     wrong: !user
                    // });
                    //
                    // if (user !== null) {
                    //     this.props.signInUser(user)
                    // }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}

SignIn.propTypes = {
    signInUser: PropTypes.func
};

export default SignIn;
