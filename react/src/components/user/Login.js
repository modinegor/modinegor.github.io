import React, {Component} from 'react'
import Store from '../../redux/store'
import actions from "../../redux/actions";


const store = new Store();

export default class Login extends Component {
    state = {
        value: ''
    };

    render() {
        return (
            <div className='form-group card-body'>
                <label>User Name</label>
                <input type='login' className='form-control' value={this.state.value} onChange={this.handleChange}/>
                <button className='btn btn-primary float-right' style={{marginTop: '5px'}} onClick={this.handleSubmit}>
                    Login
                </button>
            </div>
        )
    }

    handleSubmit = () => {
        if (this.state.value !== '') {
            store.dispatch({type: actions.user.USER_LOGIN, user: this.state.value});

            this.setState({value: ''});
        }
    };

    handleChange = ({target}) => {
        this.setState({value: target.value});
    };
}
