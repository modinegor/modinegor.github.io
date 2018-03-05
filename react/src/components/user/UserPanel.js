import React, {Component} from 'react'
import Login from "./Login";
import User from "./User";


export default class UserPanel extends Component {
    render() {
        let content = null;

        if (!this.props.user)
            content = <Login />;
        else
            content = <User user={this.props.user}/>;

        return (
            <div className='card float-right' style={{width: '20%'}}>
                {content}
            </div>
        )
    }
}
