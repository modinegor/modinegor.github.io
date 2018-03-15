import React, {Component} from 'react';


export default class Register extends Component {
    render() {
        return (
            <div className='container'>
                <div class="row">
                    <div className='col-sm-5'>
                        <h3>Welcome to react blog</h3>
                    </div>
                    <div className='col-sm-4'>
                        <SingIn/>
                        <SingUp/>
                    </div>
                </div>
            </div>
        )
    }
}