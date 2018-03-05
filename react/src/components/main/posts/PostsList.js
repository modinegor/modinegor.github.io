import React, {Component} from 'react'
import Post from "./Post";


export default class PostsList extends Component {
    render() {
        const postElements = this.props.posts.map(post =>
            <li key={post.id} style={{listStyle: 'none'}}>
                <Post post={post}/>
            </li>
        );

        return (
            <ul>
                {postElements}
            </ul>
        )
    }
};
