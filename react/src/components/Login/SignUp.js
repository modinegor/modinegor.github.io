import React, {Component} from 'react';
import {Link} from "react-router-dom";


export default class SignUp extends Component {
    render() {
        return (
            <div className='card bg-light top-separate-block'>
                <div className='card-body'>
                    <div className="form-group">
                        <h6>
                            Not registered yet?
                        </h6>
                        <h5>
                            Create an account
                        </h5>
                    </div>
                    <Link to='/singup' history={this.props.history}>
                        <button type="submit" className="btn btn-primary">
                            Sing Up
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}
