import React, {Component} from 'react'
import Store from "../../redux/store";


const store = new Store();

export default class Input extends Component {
    state = {
        edit: false,
        value: '',
        lines: 1
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
                        onClick={this.handleSubmit}>Submit</button>
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
        console.log(target.innerHTML.height);
        this.setState({value: target.value});
    };

    handleSubmit = () => {
        let date = new Date(),
            date_format = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        store.dispatch({type: 'ADD_NEW_POST', post: this.state.value, date: date_format});

        this.setState({
            edit: false,
            value: ''
        })
    };
}
