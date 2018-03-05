import React, {Component} from 'react'
import actions from "../../../redux/actions";
import Store from "../../../redux/store";


const store = new Store();

export default class Post extends Component {
    render() {
        return (
            <div className='card'>
                <div className='card-header'>
                    <span style={{cursor: 'pointer'}} onClick={this.handleFilter} title={`Filter by user ${this.props.post.user}`}>
                        {this.props.post.user}
                    </span>
                    <span> @ </span>
                    <time>{this.props.post.date}</time>
                </div>
                <div className="card-body">{this.props.post.text}</div>
            </div>
        )
    }

    handleFilter = ({target}) => {
        store.dispatch({type: actions.posts.POST_FILTER_USER, user: target.innerText})
    };
}