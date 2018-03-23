import React, {Component} from 'react';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {connect} from "react-redux";


const mapStateToProps = state => {
    return {
        user: state.user
    }
};

@connect(mapStateToProps)
export default class Login extends Component {
    componentDidUpdate() {
        if (this.props.user !== null)
            this.props.history.push('/blog');
    }

    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div className='col-sm-5'>
                        <h3>Welcome to react blog</h3>
                    </div>
                    <div className='col-sm-4'>
                        <SignIn history={this.props.history}/>
                        <SignUp history={this.props.history}/>
                    </div>
                </div>
            </div>
        )
    }
}
