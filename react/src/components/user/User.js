import React, {Component} from 'react'
import Store from "../../redux/store";
import actions from "../../redux/actions";


const store = new Store();

export default class User extends Component {
    render() {
        return (
            <div className='form-group card-body' style={{width: '100%'}}>
                <label className='text-primary'>{this.props.user}</label>
                <button className='btn btn-primary float-right' style={{marginTop: '5px'}} onClick={this.handleSignOut}>
                    Sing Out
                </button>
            </div>
        )
    }

    handleSignOut = () => {
        store.dispatch({type: actions.user.USER_SIGN_OUT})
    }
}
