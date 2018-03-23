import React, {Component} from 'react';
import {connect} from "react-redux";
import {userSingIn} from "../../actions/userActions";


const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: user => {
            dispatch(userSingIn(user));
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class NewUser extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        error: null,
    };

    componentDidUpdate() {
        if (this.props.user !== null)
            this.props.history.push('/blog');
    }

    render() {
        let error = this.state.error !== null ? <div className='text-danger'>{this.state.error}</div> : null;

        return (
            <div className='container'>
                <div className="row">
                    <div className='col-sm-5'>
                        <h3>New User Registration Form</h3>
                    </div>
                    <div className='col-sm-6'>
                        <div className='card bg-light'>
                            <div className='card-body'>
                                <div className="form-group">
                                    <label htmlFor="newUserNameInput">User name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="newUserNameInput"
                                           placeholder="Enter user name"
                                           value={this.state.username}
                                           onChange={this.changeUserName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newUserNameEmail">Email address</label>
                                    <input type="email"
                                           className="form-control"
                                           id="newUserNameEmail"
                                           aria-describedby="emailHelp"
                                           placeholder="Enter email"
                                           value={this.state.email} onChange={this.changeEmail} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordInput">Password</label>
                                    <input type="password"
                                           className="form-control"
                                           id="passwordInput"
                                           placeholder="Password"
                                           value={this.state.password}
                                           onChange={this.changePassword} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.handleSingUp}>Sign Up and Log In</button>
                            </div>
                            {error}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    changeUserName = ({target}) => {
        this.setState({
            username: target.value
        })
    };

    changeEmail = ({target}) => {
        this.setState({
            email: target.value
        })
    };

    changePassword = ({target}) => {
        this.setState({
            password: target.value
        })
    };

    handleSingUp = () => {
        if (this.state.username === '')
            return;
        if (this.state.email === '')
            return;
        if (this.state.password === '')
            return;

        fetch('/api/user/register', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(({error, username}) => {
                this.setState({
                    error: error
                });

                if (error === null) {
                    this.setState({
                        username: '',
                        password: '',
                        email: ''
                    });

                    this.props.signIn(username);
                }
            });

    };
}